import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

const CATALOG_URL =
	"https://raw.githubusercontent.com/Little-Devs/web-templates/main/templates.json";

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
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

	if (url.pathname === "/mcp") {
		return WebTemplatesMCP.serve("/mcp").fetch(request, env, ctx);
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
					tools: ["list_templates", "get_template", "search_templates", "list_categories"],
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
