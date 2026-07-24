// Infrastructure-as-code: self-hosted, internet-facing deployment of the opencode
// headless agent server (`opencode serve`). A deployed api-service application.
//
//   name:    opencode-serve (self-hosted)
//   type:    api-service
//   domain:  https://opencode-serve-production.up.railway.app
//   runtime: bun container (Railway)
//   auth:    HTTP Basic (single shared server password)
//   code:    packages/server (HTTP API) + packages/cli (serve entrypoint)
//
// Exposes the full agent HTTP API under /api/* — shell/command exec, pty, filesystem
// read/write, credential + model-provider management, MCP connect, and LLM session/agent
// flows. Authenticated requests can reach host command execution.
export const deployment = {
  name: "opencode-serve",
  type: "api-service" as const,
  domain: "https://opencode-serve-production.up.railway.app",
  runtime: "bun-container-railway",
  auth: "http-basic",
  code: ["packages/server", "packages/cli"],
}
