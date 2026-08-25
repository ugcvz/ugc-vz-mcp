# UGC VZ MCP Server

Real UGC creators from the DACH region (Germany, Austria, Switzerland) — as MCP
tools. Search the free [UGC VZ](https://ugc-vz.de) directory, inspect public
creator profiles, and trigger brand outreach requests.

- **Endpoint:** `https://ugc-vz.de/api/mcp`
- **Transport:** Streamable HTTP
- **MCP registry:** `io.github.shufflethis/ugc-vz`
- **Manifest:** [`/.well-known/mcp.json`](https://ugc-vz.de/.well-known/mcp.json)
- **REST alternative:** [OpenAPI 3.1](https://ugc-vz.de/openapi.json) · Docs: [ugc-vz.de/developers](https://ugc-vz.de/developers)

No API key needed. Public results never contain private contact data — brands
receive contact details by email only after an explicit outreach request.

This repository is documentation and discovery metadata. The server itself is
operated by track by track GmbH, Berlin ([Impressum](https://ugc-vz.de/impressum)).

## Connect

Claude Code:

```bash
claude mcp add --transport http ugc-vz https://ugc-vz.de/api/mcp
```

Any client that reads an `mcpServers` block:

```json
{
  "mcpServers": {
    "ugc-vz": {
      "type": "streamable-http",
      "url": "https://ugc-vz.de/api/mcp"
    }
  }
}
```

Clients that only speak stdio (e.g. Claude Desktop) can bridge via
[`mcp-remote`](https://www.npmjs.com/package/mcp-remote) — or use the npm
package from this repo:

```json
{
  "mcpServers": {
    "ugc-vz": {
      "command": "npx",
      "args": ["-y", "ugc-vz-mcp"]
    }
  }
}
```

## Tools

| Tool | Description |
| --- | --- |
| `search_creators` | Free-text search over the creator directory (optional filters: city, topics, verification level). |
| `get_creator` | Public profile for one creator (`UGC-…` id from a search result). |
| `request_outreach` | **Triggers a real outreach request** — UGC VZ emails creator contact details to the given brand address. Not a test endpoint. |
| `get_outreach_status` | Lifecycle status of an outreach request (`submitted` → `working` → `completed`/`failed`). |
| `get_vocab` | Valid search vocabulary: topics, industries, cities, verification levels. |

Typical flow: `search_creators` → `get_creator` → `request_outreach` → `get_outreach_status`.

## Rate limits & auth

Anonymous callers are rate-limited per IP (search counts 3×). Agents signing
requests with [Web Bot Auth](https://web-bot-auth.org) get a higher tier.
Details: [ugc-vz.de/developers](https://ugc-vz.de/developers).

## License

MIT — see [LICENSE](LICENSE). The directory data itself remains subject to the
[UGC VZ terms](https://ugc-vz.de/agb).
