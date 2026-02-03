# Little-Devs Web Templates MCP Server

A remote MCP (Model Context Protocol) server for discovering and accessing production-ready website templates from the [Little-Devs Web Templates](https://github.com/Little-Devs/web-templates) collection.

**Endpoint:** `https://mcp.little.websites/mcp`

## Available Tools

| Tool | Description |
|------|-------------|
| `list_templates` | List all templates with optional filtering by category, framework, or tag |
| `get_template` | Get complete metadata for a specific template by ID |
| `search_templates` | Search templates by keyword across names, descriptions, features, and tags |
| `list_categories` | List available categories with template counts |

## Connect from Claude Desktop / Cursor

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "web-templates": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.little.websites/mcp"
      ]
    }
  }
}
```

## Connect from Cloudflare AI Playground

1. Go to https://playground.ai.cloudflare.com/
2. Enter the MCP server URL: `https://mcp.little.websites/mcp`
3. Start using the tools to discover templates

## Example Usage

**List all landing page templates:**
```
list_templates(category: "landing-page")
```

**Get details for a specific template:**
```
get_template(id: "flowforge")
```

**Search for dark-themed templates:**
```
search_templates(query: "dark theme")
```

## Local Development

```bash
# Install dependencies
npm install

# Generate Cloudflare Worker types
npm run cf-typegen

# Start local dev server
npm run dev
# Server runs at http://localhost:8787/mcp

# Deploy to Cloudflare
npm run deploy
```

## Template Catalog

The MCP server fetches the template catalog from:
https://raw.githubusercontent.com/Little-Devs/web-templates/main/templates.json

Responses are cached at the edge for 5 minutes.

## Available Templates

| Template | Category | Framework | Description |
|----------|----------|-----------|-------------|
| flowforge | landing-page | Astro | Technical luxury automation platform |
| devhub | landing-page | Astro | GitHub-inspired developer platform |
| glass-showcase | landing-page | Astro | Horizontal-scrolling glassmorphism showcase |
| therme-kanzian | landing-page | Astro | Wellness spa with video hero |
| stitch | dashboard | Astro | Modern admin dashboard with charts |
| flat-technology | portfolio | Nuxt | Architecture studio with GSAP animations |

## License

MIT
