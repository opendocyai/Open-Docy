"""Windows file lock diagnostics: enumerate python process handles and locate handles holding a given file."""
import ctypes
import subprocess
from ctypes import wintypes

from loguru import logger

LOG = logger.bind(module="win_handle_diag")


class UNICODE_STRING(ctypes.Structure):
    _fields_ = [
        ("Length", wintypes.USHORT),
        ("MaximumLength", wintypes.USHORT),
        ("Buffer", ctypes.POINTER(ctypes.c_wchar)),
    ]


class SYSTEM_HANDLE_TABLE_ENTRY_INFO(ctypes.Structure):
    _fields_ = [
        ("UniqueProcessId", wintypes.USHORT),
        ("CreatorBackTraceIndex", wintypes.USHORT),
        ("ObjectTypeIndex", ctypes.c_ubyte),
        ("HandleAttributes", ctypes.c_ubyte),
        ("HandleValue", wintypes.USHORT),
        ("Object", ctypes.c_void_p),
        ("GrantedAccess", wintypes.ULONG),
    ]


class SYSTEM_HANDLE_INFORMATION(ctypes.Structure):
    _fields_ = [
        ("NumberOfHandles", wintypes.ULONG),
        ("Handles", SYSTEM_HANDLE_TABLE_ENTRY_INFO * 1),
    ]


def _get_python_pids() -> set[int]:
    pids = {int(ctypes.windll.kernel32.GetCurrentProcessId())}
    try:
        out = subprocess.run(
            ["wmic", "process", "where", "name='python.exe'", "get", "ProcessId"],
            capture_output=True, text=True, errors="replace", timeout=10,
        ).stdout
        for part in out.split():
            try:
                pids.add(int(part))
            except ValueError:
                pass
    except Exception:
        pass
    return pids


def _iter_system_handles():
    ntdll = ctypes.WinDLL("ntdll")
    ntqsi = ntdll.NtQuerySystemInformation
    ntqsi.argtypes = [ctypes.c_int, ctypes.c_void_p, wintypes.ULONG, ctypes.POINTER(wintypes.ULONG)]
    ntqsi.restype = ctypes.c_long
    size = wintypes.ULONG(0)
    ntqsi(16, None, 0, ctypes.byref(size))
    for _ in range(8):
        buf = ctypes.create_string_buffer(size.value)
        rc = ntqsi(16, buf, size.value, ctypes.byref(size))
        if rc == 0:
            break
    else:
        return
    info = ctypes.cast(buf, ctypes.POINTER(SYSTEM_HANDLE_INFORMATION)).contents
    count = info.NumberOfHandles
    entries = ctypes.cast(
        ctypes.addressof(info) + 8,
        ctypes.POINTER(SYSTEM_HANDLE_TABLE_ENTRY_INFO * count),
    ).contents
    for i in range(count):
        yield entries[i]


def log_handle_holders(hint: str) -> None:
    """Log all handles whose name contains hint and their owning processes (python processes only)."""
    kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
    ntdll = ctypes.WinDLL("ntdll")
    ntqo = ntdll.NtQueryObject
    ntqo.argtypes = [wintypes.HANDLE, ctypes.c_int, ctypes.c_void_p, wintypes.ULONG, ctypes.POINTER(wintypes.ULONG)]
    ntqo.restype = ctypes.c_long
    kernel32.OpenProcess.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
    kernel32.OpenProcess.restype = wintypes.HANDLE
    kernel32.DuplicateHandle.argtypes = [
        wintypes.HANDLE, wintypes.HANDLE, wintypes.HANDLE,
        ctypes.POINTER(wintypes.HANDLE), wintypes.DWORD, wintypes.BOOL, wintypes.DWORD,
    ]
    kernel32.DuplicateHandle.restype = wintypes.BOOL
    kernel32.CloseHandle.argtypes = [wintypes.HANDLE]
    kernel32.CloseHandle.restype = wintypes.BOOL

    try:
        pids = _get_python_pids()
        proc_cache = {}
        matched = 0
        for ent in _iter_system_handles():
            if ent.UniqueProcessId not in pids:
                continue
            h_proc = proc_cache.get(ent.UniqueProcessId)
            if h_proc is None:
                h_proc = kernel32.OpenProcess(0x0040, False, ent.UniqueProcessId)
                proc_cache[ent.UniqueProcessId] = h_proc
            if not h_proc:
                continue
            dup = wintypes.HANDLE()
            ok = kernel32.DuplicateHandle(
                h_proc, ent.HandleValue, kernel32.GetCurrentProcess(),
                ctypes.byref(dup), 0, False, 0x0002,
            )
            if not ok:
                continue
            name_len = wintypes.ULONG(0)
            ntqo(dup, 1, None, 0, ctypes.byref(name_len))
            if name_len.value:
                name_buf = ctypes.create_string_buffer(name_len.value)
                rc = ntqo(dup, 1, name_buf, name_len.value, ctypes.byref(name_len))
                if rc == 0:
                    ustr = ctypes.cast(name_buf, ctypes.POINTER(UNICODE_STRING)).contents
                    if ustr.Buffer and ustr.Length:
                        try:
                            name = ustr.Buffer[: ustr.Length // 2]
                            if hint in name:
                                matched += 1
                                LOG.warning(
                                    f"HANDLE HOLDER: pid={ent.UniqueProcessId} "
                                    f"type_idx={ent.ObjectTypeIndex} "
                                    f"access=0x{ent.GrantedAccess:08x} -> {name}"
                                )
                        except Exception:
                            pass
            kernel32.CloseHandle(dup)
        for h in proc_cache.values():
            if h:
                kernel32.CloseHandle(h)
        LOG.warning(f"win_handle_diag scanned pids={sorted(pids)} matched={matched}")
    except Exception as e:
        LOG.error(f"win_handle_diag error: {e}")
