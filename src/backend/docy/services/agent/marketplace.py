# -*- coding: utf-8 -*-
# @Time    : 2025/11/21 17:25
# @Author  : yanjia
# @File    : marketplace.py
# @Desc    : None
from datetime import date, datetime, UTC
from typing import Optional

from sqlalchemy import and_, func, select, Select
from sqlalchemy.orm import aliased
from sqlalchemy_crud_plus import JoinConfig

from ..crud import agent_dao, marketplace_dao, user_dao, marketplace_action_dao, task_dao

from base.base_manager import BaseManager
from core.log import log
from models.tb_payment import PriceType, CoinType
from models.tb_agent import Agent, Marketplace, MarketplaceAgentActionType
from docy.schema.marketplace import CreateMarketAgentAction

LOG = log.get_logger()


class AgentMarketplaceManager(BaseManager):

    model = Marketplace
    dao = marketplace_dao

    async def get_marketplace_agent_by_id(self, agent_id: str):
        return await self.dao.select_model(self.db, agent_id, is_delete=False)

    async def get_market_queryset(self, **kwargs) ->Select:
        """
        Get the queryset.
        """
        creator_alias = aliased(user_dao.model, name="creator")
        publisher_alias = aliased(user_dao.model, name="publisher")

        query_set = await self.dao.select_order(
            kwargs.pop("sort_columns", "created_at"),
            kwargs.pop("sort_orders", "asc"),
            join_conditions=[
                JoinConfig(
                    model=creator_alias,
                    join_on=and_(
                        self.dao.model.creator_id == creator_alias.id,
                        creator_alias.is_delete == False,
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
                JoinConfig(
                    model=publisher_alias,
                    join_on=and_(
                        self.dao.model.publisher_id == publisher_alias.id,
                        publisher_alias.is_delete == False,
                    ),
                    join_type="inner",
                    fill_result=True,
                ),
            ],
            is_delete=False,
            **{k:v for k,v in kwargs.items() if v is not None or v != ''} ,
        )

        return query_set

    async def add_market_agent_action(self, action_type: int, marketplace_id: str, agent_id: str):
        """
        Add a market agent action.
        """
        create_market_agent_schema = CreateMarketAgentAction(
            action_type=action_type,
            agent_id=agent_id,
            market_id=marketplace_id,
            action_date=datetime.now(UTC).date()
        )
        return await marketplace_action_dao.create_model(self.db, create_market_agent_schema, commit=True)

    async def get_task_execute_rate_by_agent(self, marketplace_id: str, start_date: date, end_date: date) -> dict:
        """
        Get the success/failure rate of the given tasks.
        """
        agent_list = await agent_dao.select_models(self.db, market_record_id=marketplace_id, is_delete=False)
        query = await task_dao.get_task_execute_rate(
            self.db,
            agent_id_list=[agent.id for agent in agent_list],
            start_date=start_date,
            end_date=end_date
        )
        current_days_success_count = 0
        current_days_failure_count = 0

        latest_days_success_count = 0
        latest_days_failure_count = 0

        for row in query:
            day, success_count, failure_count = row
            if start_date <= day <= end_date:
                current_days_success_count += success_count
                current_days_failure_count += failure_count
            else:
                latest_days_success_count += success_count
                latest_days_failure_count += failure_count
        current_total_count = current_days_success_count + current_days_failure_count

        success_rate = round(current_days_success_count / current_total_count * 100, 1) if current_total_count > 0 else 0
        failure_rate = round(current_days_failure_count / current_total_count * 100, 1) if current_total_count > 0 else 0
        success_rate_with_compare = (current_days_success_count - latest_days_success_count) / latest_days_success_count if latest_days_success_count else 0
        failure_rate_with_compare = (current_days_failure_count - latest_days_failure_count) / latest_days_failure_count if latest_days_failure_count else 0
        rate_dict = {
            "success": success_rate,
            "success_with_compare": success_rate_with_compare,  # Success rate YoY comparison
            "failure": failure_rate,
            "failure_with_compare": failure_rate_with_compare  # Failure rate YoY comparison
        }

        return rate_dict

    async def get_market_agent_actions(self, marketplace_id: str, start_date: date, end_date: date):
        """
        Get market agent views/use counts and their YoY comparison.
        """

        query = await marketplace_action_dao.get_market_agent_action_list(
            self.db,
            marketplace_id=marketplace_id,
            start_date=start_date,
            end_date=end_date
        )
        current_days_views_count = 0
        current_days_uses_count = 0

        latest_days_views_count = 0
        latest_days_uses_count = 0

        for row in query:
            action_type, day, count = row
            if start_date <= day <= end_date:
                if action_type == MarketplaceAgentActionType.view.value:
                    current_days_views_count += count
                if action_type == MarketplaceAgentActionType.use.value:
                    current_days_uses_count += count
            else:
                if action_type == MarketplaceAgentActionType.view.value:
                    latest_days_views_count += count
                if action_type == MarketplaceAgentActionType.use.value:
                    latest_days_uses_count += count

        latest_days_views_with_compare = (current_days_views_count - latest_days_views_count) / latest_days_views_count * 100 if latest_days_views_count else 0
        latest_days_uses_with_compare = (current_days_uses_count - latest_days_uses_count) / latest_days_uses_count * 100 if latest_days_uses_count else 0

        agent_views = {
            "views": current_days_views_count,
            "views_with_compare": round(latest_days_views_with_compare, 1),
            "uses": current_days_uses_count,
            "uses_with_compare": round(latest_days_uses_with_compare, 1),
        }

        return agent_views

    async def get_market_agent_task_response_time(self, marketplace_id: str, start_date: date, end_date: date) -> dict:
        """
        Get the response time of the tasks belonging to the agent.
        """
        agent_list = await agent_dao.select_models(
            self.db, market_record_id=marketplace_id, is_delete=False
        )

        response_time_dict = await task_dao.get_task_execute_response_times(
            self.db,
            agent_id_list=[agent.id for agent in agent_list],
            start_date=start_date,
            end_date=end_date,
        )
        return response_time_dict

    async def get_repeat_usage_rate(self, agent_id: str, start_date: date, end_date: date = None) -> dict:
        """
        Get the repeat usage rate.
        """

        repeat_usage_rate = {
            "repeat_usage_rate_list": [30, 40, 50],
            "repeat_usage_week_list": ["3", "4", "5"]
        }

        return repeat_usage_rate

    async def get_marketplace_agent_analytics(self, marketplace_id: str, start_date: date, end_date: Optional[date] = None):
        """
        Get the market agent analytics data.
        @param str agent_id
        @param date start_date
        @param date end_date
        """
        if not end_date:  # When end_date is not passed, only the current day's data is computed
            end_date = start_date

        agent_analytics = {}

        execute_rate = await self.get_task_execute_rate_by_agent(marketplace_id, start_date, end_date)
        agent_analytics.update(execute_rate)

        agent_views = await self.get_market_agent_actions(marketplace_id, start_date, end_date)
        agent_analytics.update(agent_views)

        agent_response_time = await self.get_market_agent_task_response_time(marketplace_id, start_date, end_date)
        agent_analytics.update(agent_response_time)

        repeat_usage_rate = await self.get_repeat_usage_rate(marketplace_id, start_date, end_date)
        agent_analytics.update(repeat_usage_rate)

        return agent_analytics

    async def update_action_count(self, action_type: MarketplaceAgentActionType, marketplace_id: str):
        """
        Update the marketplace action counts.
        """
        marketplace = await self.dao.select_model(self.db, marketplace_id, is_delete=False)
        if marketplace:
            if action_type == MarketplaceAgentActionType.view:
                if marketplace.view_count:
                    marketplace.view_count += 1
                else:
                    marketplace.view_count = 1

            if action_type == MarketplaceAgentActionType.use:
                if marketplace.use_count:
                    marketplace.use_count += 1
                else:
                    marketplace.use_count = 1
            await self.db.commit()

    async def set_marketplace_agent_price(self, marketplace_id: str, price: int, price_type: PriceType, coin_type: CoinType):
        """
        Set the marketplace template price.
        """
        marketplace = await self.dao.select_model(self.db, marketplace_id)
        if marketplace:
            marketplace.price = price
            marketplace.price_type = price_type
            marketplace.coin_type = coin_type
            await self.db.commit()
