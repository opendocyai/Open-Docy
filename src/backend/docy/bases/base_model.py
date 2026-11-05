"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: base_model
Description:
"""

from datetime import datetime, UTC
from sqlalchemy import Column, String, Boolean, DateTime, func, event, BIGINT, text, inspect
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, mapped_column, object_session, class_mapper
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.util.concurrency import greenlet_spawn
from loguru import logger

from docy.core.fields import UTCDateTime
from docy.core._string import gen_snowflake_id
from docy.bases.dbs import Base as SQLBase


class AbstractBase(SQLBase):
    """
    Base class of all database tables.
    """

    __abstract__ = True
    id = Column(String(64), primary_key=True, unique=True, default=lambda: gen_snowflake_id())
    is_delete = Column(Boolean, default=False)
    created_at = mapped_column(UTCDateTime, server_default=func.now(), default=func.now())
    update_at = mapped_column(
        UTCDateTime,
        server_default=func.now(),
        server_onupdate=func.now(),
        onupdate=func.now(),
        default=func.now()
    )

    def __repr__(self):
        return f"<{type(self).__name__}, id={self.id}>"

    def delete(self):
        if not hasattr(self, "delete_at"):
            session = Session.object_session(self)
            if session:
                session.delete(self)
                session.commit()

    def soft_delete(self):
        session = Session.object_session(self)
        if session:
            setattr(self, "is_delete", True)
            if hasattr(self, "delete_at"):
                setattr(self, "is_delete", datetime.now(UTC))
            session.commit()
        else:
            raise Exception("Session error")

    async def async_delete(self):
        if not hasattr(self, "delete_at"):
            session = AsyncSession.object_session(self)
            if session:
                await session.delete(self)

    async def soft_async_delete(self):
        sync_session = object_session(self)  # get the real SyncSession
        if not sync_session:
            raise Exception("Session error")

        def _inner():
            self.is_delete = True
            if hasattr(self, "delete_at"):
                self.delete_at = datetime.now(UTC)
            sync_session.commit()

        await greenlet_spawn(_inner)  # wrap the sync commit in a greenlet

    def undelete(self):
        pass

    def to_dict(self, model = None, includes: list[str] = None, excludes: list[str] = None, attach_fields: list[str] = None) -> dict:
        """
        Convert the object to a dict.
        """
        if not model:
            model = self
        mapper = class_mapper(self.__class__)
        columns = [c.key for c in mapper.columns]
        if excludes:
            columns = [k for k in columns if k not in excludes]
        if includes:
            columns = [k for k in columns if k in includes]
        if attach_fields:
            columns.extend(attach_fields)

        return {c: getattr(model, c, None) for c in columns}


class SoftDeleteMixin:
    delete_at = Column(DateTime, nullable=True, default=None)

    def delete(self):
        self.delete_at = datetime.now()
        session = Session.object_session(self)
        if session:
            session.add(self)
            session.commit()

    async def async_delete(self):
        self.delete_at = datetime.now()
        session = AsyncSession.object_session(self)
        if session:
            try:
                session.add(self)  # must use the async method
            except SQLAlchemyError as e:
                await session.rollback()
                raise

    def undelete(self):
        self.delete_at = None
        session = Session.object_session(self)
        if session:
            session.add(self)
            session.commit()

    async def async_undelete(self):
        self.delete_at = None
        session = AsyncSession.object_session(self)
        if session:
            await session.add(self)


class Base(SoftDeleteMixin, AbstractBase):
    __abstract__ = True

    def delete(self):
        super().delete()


def delete_at_set_listener(target, value, old_value, initiator):
    if isinstance(target, SoftDeleteMixin):
        target._delete_at_updated = value != old_value


def before_update(mapper, connection, target):
    table_name = getattr(target, '__tablename__', None)
    if table_name == 'agent':  # replace with the table name you want to debug
        try:
            session = object_session(target)
            if session:
                state = inspect(target)
                 # get the history of the template_json field
                attr = getattr(state.attrs, 'template_json', None)
                if attr:
                    hist = attr.load_history()
                    if hist.has_changes():
                        pass
                    else:
                        # even without changes, print the current value (optional)
                        current_val = getattr(target, 'template_json', None)
        except Exception as e:
            logger.warning(f"  Could not retrieve temple_json history: {e}")

    before_update_time(mapper, connection, target)
    if isinstance(target, SoftDeleteMixin):
        if hasattr(target, "_delete_at_updated") and target._delete_at_updated:
            if target.delete_at:
                target.is_delete = True
                logger.info(f"{target} is deleted.")
            else:
                target.is_delete = False
                logger.info(f"{target} is undelete.")


def before_update_time(mapper, connection, target):
    if hasattr(target, "update_at"):
        target.update_at = datetime.utcnow()


@event.listens_for(AbstractBase, "before_mapper_configured", propagate=True)
def on_new_class(mapper, cls_):
    if isinstance(cls_(), SoftDeleteMixin):
        event.listen(cls_, "before_update", before_update)
        event.listen(cls_.delete_at, "set", delete_at_set_listener)
    else:
        event.listen(cls_, "before_update", before_update_time)
