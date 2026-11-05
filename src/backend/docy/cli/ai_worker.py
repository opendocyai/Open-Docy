"""Cross-platform ai-worker process management for the `docy` CLI.

The worker runs in two forms: auto-spawned by the API server
(`python -m docy.ai_worker`) and manual foreground (`docy ai-worker`).
The stop command itself is `docy stop-ai-worker`, so it never matches
its own pattern.
"""
import os
import signal
import subprocess
import time

from rich.console import Console

console = Console()

# Two launch forms: auto-spawned by the main process as "-m docy.ai_worker",
# and manual foreground "docy ai-worker".
# On Windows the command line is quoted ("docy.exe" ai-worker), so use ["\s]+
# for tolerance; the stop command itself is "docy stop-ai-worker", which never
# matches this pattern.
_WORKER_PATTERN = r'docy\.ai_worker|docy(\.exe)?["\s]+ai-worker'


def _find_workers_windows() -> list[tuple[int, int]]:
    """Return (pid, parent_pid) of python processes whose command line
    identifies an ai worker (PowerShell is present on all supported Windows)."""
    ps_cmd = (
        "Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | "
        "Where-Object { $_.CommandLine -and ($_.CommandLine -match '%s') } | "
        "ForEach-Object { \"{0},{1}\" -f $_.ProcessId, $_.ParentProcessId }"
    ) % _WORKER_PATTERN
    out = subprocess.run(
        ["powershell", "-NoProfile", "-Command", ps_cmd],
        capture_output=True,
        text=True,
        timeout=30,
    )
    workers = []
    for line in out.stdout.splitlines():
        try:
            pid_s, ppid_s = line.strip().split(",", 1)
            workers.append((int(pid_s), int(ppid_s)))
        except ValueError:
            continue
    return workers


def _find_workers_posix() -> list[int]:
    out = subprocess.run(
        ["pgrep", "-f", _WORKER_PATTERN],
        capture_output=True,
        text=True,
        timeout=10,
    )
    if out.returncode not in (0, 1):
        return []
    return [int(x) for x in out.stdout.split() if x.strip().isdigit()]


def _pid_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


def stop_ai_worker() -> None:
    """Stop all running ai-worker processes on this machine."""
    if os.name == "nt":
        workers = _find_workers_windows()
        if not workers:
            console.print("[yellow]No ai-worker process found.[/yellow]")
            return
        # The python.exe of a uv venv is a launcher (shim) that spawns the real
        # interpreter; run taskkill /T only on the tree roots (shims) to avoid
        # duplicate errors on child processes
        matched = {pid for pid, _ in workers}
        roots = [pid for pid, ppid in workers if ppid not in matched]
        for pid in roots:
            res = subprocess.run(
                ["taskkill", "/PID", str(pid), "/T", "/F"],
                capture_output=True,
                text=True,
            )
            console.print(
                f"Stopped ai-worker pid={pid} (rc={res.returncode})"
            )
    else:
        pids = _find_workers_posix()
        if not pids:
            console.print("[yellow]No ai-worker process found.[/yellow]")
            return
        for pid in pids:
            try:
                os.kill(pid, signal.SIGTERM)
            except OSError:
                pass
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            survivors = [p for p in pids if _pid_alive(p)]
            if not survivors:
                break
            time.sleep(0.2)
        for pid in survivors:
            try:
                os.kill(pid, signal.SIGKILL)
            except OSError:
                pass
        console.print(f"Stopped ai-worker pid(s)={pids}")
    console.print(
        "[yellow]Note: if the docy API server is still running, its watcher "
        "respawns the ai-worker within seconds. Set DOCY_NO_AI_WORKER=1 and "
        "restart the server to disable it entirely.[/yellow]"
    )
