"""Hatchling build hook: ship the built frontend inside the wheel.

The dist-web directory only exists after `docy build-web`. A static
force-include would fail the build on a fresh checkout (where the frontend
has not been built yet), so the include is added conditionally here.

Target mapping differs: the wheel ships the files as docy/web/static, while
the sdist must keep the original src/frontend/dist-web path so that the
wheel built from the sdist can still find them.
"""

from pathlib import Path

from hatchling.builders.hooks.plugin.interface import BuildHookInterface

SOURCE = "src/frontend/dist-web"


class FrontendHook(BuildHookInterface):
    """Conditionally force-include src/frontend/dist-web."""

    def initialize(self, version: str, build_data: dict) -> None:
        dist_web = Path(self.root) / SOURCE
        if not (dist_web / "index.html").is_file():
            return
        if self.target_name == "sdist":
            target = SOURCE
        else:
            target = "docy/web/static"
        build_data["force_include"][SOURCE] = target
