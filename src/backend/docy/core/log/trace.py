"""
Generate a global trace_id
"""
import uuid
from contextvars import ContextVar

trace_id_var = ContextVar('trace_id', default='N/A')


def generate_trace_id()->str:
    """
    Generate a global trace_id
    """
    return f"req_{uuid.uuid4().hex[:16]}"

def set_trace_id(trace_id:str):
    """
    Set the global trace_id
    """
    trace_id_var.set(trace_id)


def get_trace_id()->str:
    """
    Get the global trace_id
    """
    return trace_id_var.get() or 'N/A'
