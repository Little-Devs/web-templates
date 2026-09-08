import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

const CATALOG_URL =
	"https://raw.githubusercontent.com/Little-Devs/web-templates/main/templates.json";

const SKELETON_AGENTS_URL =
	"https://raw.githubusercontent.com/Little-Devs/web-templates/main/skeletons/AGENTS.md";
const SKELETON_PROMPT_URL =
	"https://raw.githubusercontent.com/Little-Devs/web-templates/main/skeletons/PROMPT.md";

/** Embedded fallback if raw GitHub fetch of skeletons/ fails (e.g. before merge). */
const FALLBACK_AGENTS_MD = `# AGENTS.md

Copy this file to the **root** of a Little-Devs \`template-*\` repository. Replace bracketed placeholders with this template’s real values. Agents and LLMs must read this file before editing.

**Security and reliability are paramount.** Prefer a correct, boring change over a clever one. Do not invent backends, credentials, tracking, or third-party services.

## Template

- **Name:** \`[TEMPLATE_NAME]\`
- **Catalog id:** \`[TEMPLATE_ID]\`
- **Repository:** \`https://github.com/Little-Devs/template-[name]\`
- **Demo:** \`[DEMO_URL]\`
- **Stack:** \`[FRAMEWORK]\` · \`[STYLING]\` · \`[SCRIPTING]\`
- **Catalog:** https://github.com/Little-Devs/web-templates (\`templates.json\`)
- **MCP:** https://mcp.little.website (\`get_template\`, \`get_agent_docs\`)

## Agent / LLM setup

1. Read \`README.md\`, \`template.json\`, this file, and \`PROMPT.md\`.
2. Discover tokens and components from the repo — do not restyle from memory.
3. Keep the existing stack, file layout, and build commands unless the task explicitly changes them.
4. Work in small, reviewable diffs. Match local naming, comments, and formatting.
5. Verify the change the way a user would (\`npm run dev\` / \`npm run build\`, plus the relevant route).
6. Never commit secrets, \`.env\` files, API keys, or machine-local paths.

This document is harness-agnostic. It applies in Cursor, Claude, Codex, Cloudflare Agents, or any other runner.

## Security and reliability

Treat every change as production-bound.

- No secrets in source, docs, or client bundles.
- No new analytics, pixels, CDNs, or third-party scripts without an explicit request.
- Forms stay static (typically \`mailto:\`) unless the template already has a backend.
- Sanitize any user-controlled string that reaches HTML, URLs, or attributes.
- Preserve HTTPS, existing CSP / security headers, and dependency pins.
- Do not weaken auth, CORS, or cookie settings if they exist.
- Prefer existing dependencies. New packages need a reason and a lockfile update.
- Respect \`prefers-reduced-motion\`. Do not ship layout shift or broken empty/error states.
- If unsure whether a change is safe, stop and ask — do not guess.

## Design tokens and style guides

Use the template’s tokens. Do not introduce a parallel palette or type scale.

Typical sources (use what this repo actually has):

- \`template.json\` → \`aesthetic.colors\`, \`aesthetic.fonts\`, \`sections\`
- CSS custom properties (often \`src/styles/\`, \`variables.css\`, or \`:root\`)
- Tailwind / shadcn theme files when that is the stack

Rules:

- Change brand colour, type, or spacing by editing tokens — not one-off hex in components.
- Keep contrast WCAG AA. Do not flatten hierarchy or drop focus styles.
- Reuse existing layout primitives (grid, section wrappers, buttons, forms).
- Section on/off and light-custom (logo, colours, fonts, copy) are the default customization path.
- Do not add Google Fonts (or any new font host) if the template self-hosts type.

Fill in this template’s tokens when you copy the skeleton:

| Token | Value | Notes |
|-------|-------|-------|
| \`--[color-primary]\` | \`[#000000]\` | \`[Primary name]\` |
| \`--[color-accent]\` | \`[#ffffff]\` | \`[Accent name]\` |
| \`--[color-background]\` | \`[#f5f5f5]\` | \`[Background name]\` |
| Display / body / mono | \`[Font]\` / \`[Font]\` / \`[Font]\` | \`[how fonts are loaded]\` |

## How agents should work

- Follow \`PROMPT.md\` for the reproduction task. Keep placeholders brief and concrete.
- Preserve information architecture unless the prompt says to add/remove a section.
- Swap demo copy, logo, and contact details; do not rewrite the product into a different business.
- Keep performance: no new hero videos, unoptimized images, or unused JS.
- Mobile, tablet, and desktop must all keep working.
- If the catalog or MCP metadata is wrong, say so — do not “fix” \`templates.json\` from a template repo.

## Out of scope

Leave these alone unless the user explicitly asks and the template already supports them:

- New frameworks, meta-frameworks, or CSS libraries
- Databases, auth, payments, CMS, or serverless backends
- Catalog edits, git submodules, or \`web-templates\` repo changes
- Production DNS, Cloudflare, or \`*.little.website\` deploys
- Tracking, A/B, chat widgets, or marketing pixels
- License changes (templates ship MIT)

## Contacts

- **Devs / template questions:** [devs@little.cloud](mailto:devs@little.cloud)
- **Platform (catalog, MCP, mcp.little.website):** Oppy
- **Security:** Steve

If a change could leak data, weaken a form, or add a third-party script, stop and ask Steve before shipping.
`;

const FALLBACK_PROMPT_MD = `# PROMPT.md

Copy this file to the **root** of a Little-Devs \`template-*\` repository. It is a **provider-, framework-, and harness-agnostic** reproduction prompt. Fill the placeholders, then paste the Prompt block into any agent.

Read \`AGENTS.md\` first. Security and reliability are paramount.

---

## Prompt

Customize the \`[TEMPLATE_NAME]\` (\`[TEMPLATE_ID]\`) website template for the following brief.

### Brief

- **Business / project:** \`[who this site is for]\`
- **Primary goal:** \`[one sentence — e.g. book a quote, explain the service]\`
- **Audience:** \`[who lands here]\`
- **Must keep:** existing stack, tokens, and section structure
- **Must change:** \`[logo, colours, fonts, copy, contact — list only what applies]\`
- **Must not:** new backend, new analytics, new framework, secrets in the repo

### Constraints

- Follow \`AGENTS.md\`. Do not invent services or credentials.
- Edit design tokens (CSS variables / theme) instead of one-off hex in components.
- Keep the current \`[FRAMEWORK]\` + \`[STYLING]\` stack and folder layout.
- Forms stay static (\`mailto:\` or existing handler only).
- No new third-party scripts, pixels, or font hosts.
- Responsive: mobile, tablet, desktop. Preserve focus styles and reduced-motion.
- Small, reviewable diff. Match local style.

### Acceptance checks

- [ ] \`README.md\`, \`template.json\`, \`AGENTS.md\`, and this file were read before edits
- [ ] Tokens updated in one place; UI consumes those tokens
- [ ] Requested copy/logo/contact replaced; leftover demo names are gone
- [ ] No new backend, auth, payment, or tracking
- [ ] No secrets or \`.env\` committed
- [ ] \`npm run build\` (or this repo’s equivalent) succeeds
- [ ] Home (and any touched routes) render; empty/error states still make sense
- [ ] Keyboard and screen-reader basics still work (labels, contrast, focus)

### Deliver

Summarize files changed and any placeholder that could not be filled from the brief. Do not deploy.
`;

// Types for the template catalog
interface Template {
	id: string;
	name: string;
	description: string;
	category: string;
	subcategory?: string;
	repository: string;
	submodulePath: string;
	demoUrl?: string;
	previewImage?: string;
	techStack: {
		framework: string;
		version: string;
		styling: string;
		scripting: string;
		buildTool: string;
		stateManagement?: string;
	};
	features: string[];
	aesthetic: {
		style: string;
		description: string;
		fonts: Record<string, string>;
		colors: Record<string, string>;
	};
	sections?: string[];
	pages?: Array<{ path: string; name: string; description: string }>;
	useCases: string[];
	customization: {
		difficulty: string;
		colorScheme: string;
		typography: string;
		layout: string;
	};
	performance: {
		framework: string;
		cssOnly?: string;
		animations?: string;
		pwa?: string;
		lighthouse: string;
	};
	license: string;
	author: string;
	createdAt: string;
	lastUpdated: string;
	tags: string[];
}

interface Catalog {
	version: string;
	lastUpdated: string;
	totalTemplates: number;
	categories: string[];
	templates: Template[];
}

// Fetch catalog from GitHub with edge caching
async function getCatalog(): Promise<Catalog> {
	const response = await fetch(CATALOG_URL, {
		cf: { cacheTtl: 300 }, // Cache at edge for 5 minutes
	});
	return response.json();
}

async function fetchText(url: string): Promise<string | null> {
	try {
		const response = await fetch(url, {
			cf: { cacheTtl: 300 },
		});
		if (!response.ok) {
			return null;
		}
		const text = await response.text();
		return text.trim() ? text : null;
	} catch {
		return null;
	}
}

/** https://github.com/org/repo → https://raw.githubusercontent.com/org/repo/main */
function githubRepoToRawBase(repository: string): string | null {
	try {
		const url = new URL(repository);
		if (url.hostname !== "github.com") {
			return null;
		}
		const parts = url.pathname.split("/").filter(Boolean);
		if (parts.length < 2) {
			return null;
		}
		const owner = parts[0];
		const repo = parts[1].replace(/\.git$/, "");
		return `https://raw.githubusercontent.com/${owner}/${repo}/main`;
	} catch {
		return null;
	}
}

interface SkeletonDocs {
	agentsMd: string;
	promptMd: string;
	agentsSource: "github" | "fallback";
	promptSource: "github" | "fallback";
}

async function getCanonicalSkeletons(): Promise<SkeletonDocs> {
	const [agentsMd, promptMd] = await Promise.all([
		fetchText(SKELETON_AGENTS_URL),
		fetchText(SKELETON_PROMPT_URL),
	]);
	return {
		agentsMd: agentsMd ?? FALLBACK_AGENTS_MD,
		promptMd: promptMd ?? FALLBACK_PROMPT_MD,
		agentsSource: agentsMd ? "github" : "fallback",
		promptSource: promptMd ? "github" : "fallback",
	};
}

// MCP Agent for web templates catalog
export class WebTemplatesMCP extends McpAgent {
	server = new McpServer({
		name: "web-templates",
		version: "1.0.0",
	});

	async init() {
		// Tool: List templates with optional filtering
		this.server.tool(
			"list_templates",
			"List available web templates. Filter by category (landing-page, dashboard, portfolio) or framework (Astro, Nuxt). Returns template IDs, descriptions, and GitHub repository URLs for cloning.",
			{
				category: z
					.enum(["landing-page", "dashboard", "portfolio", "ecommerce", "blog", "documentation"])
					.optional(),
				framework: z.string().optional(),
				tag: z.string().optional(),
			},
			async ({ category, framework, tag }) => {
				const catalog = await getCatalog();
				let templates = catalog.templates;

				if (category) {
					templates = templates.filter((t) => t.category === category);
				}
				if (framework) {
					templates = templates.filter(
						(t) => t.techStack.framework.toLowerCase() === framework.toLowerCase(),
					);
				}
				if (tag) {
					templates = templates.filter((t) => t.tags.includes(tag));
				}

				const results = templates.map((t) => ({
					id: t.id,
					name: t.name,
					description: t.description,
					category: t.category,
					framework: t.techStack.framework,
					repository: t.repository,
					tags: t.tags,
				}));

				return {
					content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
				};
			},
		);

		// Tool: Get full template details
		this.server.tool(
			"get_template",
			"Get complete metadata for a specific template including features, aesthetic details, sections, use cases, and the GitHub repository URL to clone it.",
			{
				id: z.string(),
			},
			async ({ id }) => {
				const catalog = await getCatalog();
				const template = catalog.templates.find((t) => t.id === id);

				if (!template) {
					const available = catalog.templates.map((t) => t.id).join(", ");
					return {
						content: [
							{
								type: "text",
								text: `Template '${id}' not found. Available templates: ${available}`,
							},
						],
					};
				}

				return {
					content: [{ type: "text", text: JSON.stringify(template, null, 2) }],
				};
			},
		);

		// Tool: Search templates by keyword
		this.server.tool(
			"search_templates",
			"Search templates by keyword across names, descriptions, features, tags, and use cases. Returns matching templates with their repository URLs.",
			{
				query: z.string(),
			},
			async ({ query }) => {
				const catalog = await getCatalog();
				const q = query.toLowerCase();

				const results = catalog.templates.filter(
					(t) =>
						t.name.toLowerCase().includes(q) ||
						t.description.toLowerCase().includes(q) ||
						t.features.some((f) => f.toLowerCase().includes(q)) ||
						t.tags.some((tag) => tag.includes(q)) ||
						t.useCases.some((uc) => uc.toLowerCase().includes(q)),
				);

				if (results.length === 0) {
					return {
						content: [
							{
								type: "text",
								text: `No templates found matching '${query}'. Try searching for: dark theme, animation, dashboard, astro, landing page, etc.`,
							},
						],
					};
				}

				return {
					content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
				};
			},
		);

		// Tool: List categories with template counts
		this.server.tool(
			"list_categories",
			"List all available template categories with the number of templates in each category.",
			{},
			async () => {
				const catalog = await getCatalog();

				const counts = catalog.templates.reduce(
					(acc, t) => {
						acc[t.category] = (acc[t.category] || 0) + 1;
						return acc;
					},
					{} as Record<string, number>,
				);

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(
								{
									categories: catalog.categories,
									templateCounts: counts,
									totalTemplates: catalog.totalTemplates,
									lastUpdated: catalog.lastUpdated,
								},
								null,
								2,
							),
						},
					],
				};
			},
		);

		// Tool: Canonical AGENTS.md + PROMPT.md skeletons
		this.server.tool(
			"get_agent_skeletons",
			"Return the canonical AGENTS.md and PROMPT.md skeletons for Little-Devs template-* repos. Fetches skeletons/ from Little-Devs/web-templates on main; embeds fallback text if GitHub is unreachable.",
			{},
			async () => {
				const skeletons = await getCanonicalSkeletons();
				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(
								{
									agentsMd: skeletons.agentsMd,
									promptMd: skeletons.promptMd,
									sources: {
										agentsMd: skeletons.agentsSource,
										promptMd: skeletons.promptSource,
									},
									urls: {
										agentsMd: SKELETON_AGENTS_URL,
										promptMd: SKELETON_PROMPT_URL,
									},
									copyInto: "template repo root (not docs/)",
								},
								null,
								2,
							),
						},
					],
				};
			},
		);

		// Tool: Per-template AGENTS.md + PROMPT.md
		this.server.tool(
			"get_agent_docs",
			"Fetch AGENTS.md and PROMPT.md for a catalog template id from the template repo on main (raw.githubusercontent.com). If either file is missing, returns the canonical skeletons plus a note that the template repo still needs them.",
			{
				id: z.string(),
			},
			async ({ id }) => {
				const catalog = await getCatalog();
				const template = catalog.templates.find((t) => t.id === id);

				if (!template) {
					const available = catalog.templates.map((t) => t.id).join(", ");
					return {
						content: [
							{
								type: "text",
								text: `Template '${id}' not found. Available templates: ${available}`,
							},
						],
					};
				}

				const rawBase = githubRepoToRawBase(template.repository);
				const agentsUrl = rawBase ? `${rawBase}/AGENTS.md` : null;
				const promptUrl = rawBase ? `${rawBase}/PROMPT.md` : null;

				const [templateAgents, templatePrompt] = await Promise.all([
					agentsUrl ? fetchText(agentsUrl) : Promise.resolve(null),
					promptUrl ? fetchText(promptUrl) : Promise.resolve(null),
				]);

				const missing: string[] = [];
				if (!templateAgents) missing.push("AGENTS.md");
				if (!templatePrompt) missing.push("PROMPT.md");

				let agentsMd = templateAgents;
				let promptMd = templatePrompt;
				let skeletonSources: SkeletonDocs | null = null;

				if (missing.length > 0) {
					skeletonSources = await getCanonicalSkeletons();
					agentsMd = agentsMd ?? skeletonSources.agentsMd;
					promptMd = promptMd ?? skeletonSources.promptMd;
				}

				const note =
					missing.length > 0
						? `Template repo ${template.repository} is missing ${missing.join(" and ")} on main. Returning canonical skeletons for the missing file(s). Copy skeletons/AGENTS.md and skeletons/PROMPT.md into the template root — they are mandatory alongside README.md, template.json, and LICENSE.`
						: undefined;

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(
								{
									id: template.id,
									name: template.name,
									repository: template.repository,
									agentsMd,
									promptMd,
									files: {
										agentsMd: {
											url: agentsUrl,
											source: templateAgents ? "template" : "skeleton",
										},
										promptMd: {
											url: promptUrl,
											source: templatePrompt ? "template" : "skeleton",
										},
									},
									...(note ? { note } : {}),
								},
								null,
								2,
							),
						},
					],
				};
			},
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

	if (url.pathname === "/mcp") {
		return WebTemplatesMCP.serve("/mcp", {
			binding: "WEB_TEMPLATES_MCP",
		}).fetch(request, env, ctx);
	}

		// Root path - return simple info page
		if (url.pathname === "/") {
			return new Response(
				JSON.stringify({
					name: "Little-Devs Web Templates MCP Server",
					version: "1.0.0",
					description:
						"MCP server for discovering and accessing production-ready website templates",
					endpoint: "/mcp",
					tools: [
						"list_templates",
						"get_template",
						"search_templates",
						"list_categories",
						"get_agent_skeletons",
						"get_agent_docs",
					],
					catalog: "https://github.com/Little-Devs/web-templates",
				}),
				{
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return new Response("Not found", { status: 404 });
	},
};
