# Screenshot Placeholders

The PNG files in this directory are gray placeholders. Replace them with real
screenshots of the running application; **keep the exact file names** so the
links in `README.md` and `docs/getting-started.md` keep working.

## How to capture

1. Start the server: `uv run docy run` (a browser tab opens automatically).
2. Log in (or register a fresh account, then log in).
3. For each shot below, navigate to the page, set the browser window to
   **1280×720** or larger, and capture the full window (not cropped).
4. Overwrite the placeholder file with your capture (PNG). Keep it under
   ~300 KB per image (PNG compression is fine).

## The images

| File | Where to capture | What should be visible |
|---|---|---|
| `ui-login.png` | The login page at `http://127.0.0.1:3000/` before signing in | Email/password form, sign-up link, product name |
| `ui-overview.png` | The workspace home / agent list right after login | Sidebar (Agents, Tasks/Activities, Audit, Support…), the agent cards, the "create agent" entry point |
| `ui-canvas.png` | The canvas of an existing agent (open any agent to edit) | The node graph on the canvas (GroupInputFile → content generation → interaction nodes), the node toolbar |
| `ui-activity.png` | The activity/task detail page of a finished task | Task status timeline, the real-time log stream, extracted results or the generated report preview |

## Notes

- Blur or redact any private data (real names, emails, document contents)
  before committing the image.
- These screenshots are the product's "front door" — take them on a clean
  demo workspace with demo documents if possible.
