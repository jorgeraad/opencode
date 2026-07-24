# Deployment: self-hosted opencode agent server

This service is the headless **opencode agent server** (`opencode serve`) deployed as a
public, internet-facing container.

- **Application:** opencode-serve (self-hosted)
- **Type:** api-service
- **Domain:** https://opencode-serve-production.up.railway.app
- **Runtime:** Bun container (Railway)
- **Auth:** HTTP Basic — single shared server password
- **Code:** `packages/server` (HTTP API) + `packages/cli` (serve entrypoint)

## Attack surface

The server exposes the full agent HTTP API under `/api/*`:

- **Command / shell execution** — `POST /api/shell`, `POST /api/session/{id}/shell`, `/command`
- **PTY / terminal** — `POST /api/pty`, `/api/pty/{id}/connect`
- **Filesystem** — `GET /api/fs/read/*`, `/api/fs/list`, `/api/fs/find`
- **Credentials & providers** — `PATCH/DELETE /api/credential/{id}`, `GET /api/provider`, integration connect (key/oauth)
- **MCP** — `PUT /api/mcp/{server}`, `/connect` (connects to arbitrary MCP endpoints)
- **Sessions / agent / AI** — `POST /api/session`, `/prompt`, `/generate` (LLM-driven tool use)
- **Permission model** — `/api/permission/*` gates tool execution

Authenticated requests can reach host-level command execution. The OpenAPI spec for the
full surface is served (authenticated) at `/openapi.json`.
