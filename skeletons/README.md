# Agent doc skeletons

Copy these files into the **root** of every Little-Devs `template-*` repository:

| File | Purpose |
|------|---------|
| [`AGENTS.md`](./AGENTS.md) | How agents/LLMs must work in that template (security, tokens, scope, contacts) |
| [`PROMPT.md`](./PROMPT.md) | Provider-agnostic reproduction prompt (brief, constraints, acceptance checks) |

Do not leave them in a `docs/` or `skeletons/` folder inside the template repo. Agents and `web-templates-mcp` (`get_agent_docs`) look at `{repo}/main/AGENTS.md` and `{repo}/main/PROMPT.md`.

Replace bracketed placeholders (`[TEMPLATE_NAME]`, tokens, stack) after copying. See [CONTRIBUTING.md](../CONTRIBUTING.md) — both files are required alongside `README.md`, `template.json`, and `LICENSE`.
