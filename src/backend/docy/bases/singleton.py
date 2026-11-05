"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/11/7
Last Modified: 2025/11/7
Last Editor:
Filename: singleton
Description: metaclass for singleton objects.
"""

import threading


class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                # first creation
                cls._instances[cls] = super().__call__(*args, **kwargs)
            else:
                # later calls update the instance parameters
                if any(list(args)) or kwargs:
                    instance = cls._instances[cls]
                    instance.__init__(*args, **kwargs)
            return cls._instances[cls]
