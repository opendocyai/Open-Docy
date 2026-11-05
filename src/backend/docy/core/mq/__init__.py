"""
Honker-based message push module (rewrite of the original RabbitMQ mq module)

  - MessageDecorater: event handler registry, same usage as the original
        @decorater.register("on_task_log")
        async def task_log(**kwargs): ...
  - mq_client.Client: producer, delivers messages to the honker persistent queue
  - mq_server: consumer, registers the dispatch_mq_message task, consumed and
    dispatched by the honker worker loop

Message format: {"event": "xxx.xxx", "data": {...}, ...}
Event-name to handler-name mapping: "." in the event name is replaced with
"_", and prefixed with "on_".
"""
import functools
import inspect


class MessageDecorater(object):
    functions = {}

    def register(self, event):
        def wrapper(func):
            @functools.wraps(func)
            def sync_wrapped(*args, **kwargs):
                return func(*args, **kwargs)

            @functools.wraps(func)
            async def async_wrapped(*args, **kwargs):
                return await func(*args, **kwargs)

            wrapped = async_wrapped if inspect.iscoroutinefunction(func) else sync_wrapped

            self.functions[event] = wrapped
            return wrapped

        return wrapper

    def get_backend(self, event):
        return self.functions.get(event)


decorater = MessageDecorater()
