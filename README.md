# UGC VZ MCP Server — Find Real UGC Creators in Germany & DACH (AI Agent Tools)

[![MCP Registry](https://img.shields.io/badge/MCP_Registry-de.ugc--vz%2Fcreator--search-6f2fa9)](https://registry.modelcontextprotocol.io/v0/servers?search=ugc-vz)
[![Transport](https://img.shields.io/badge/Transport-Streamable_HTTP-blue)](https://ugc-vz.de/api/mcp)
[![OpenAPI 3.1](https://img.shields.io/badge/REST-OpenAPI_3.1-green)](https://ugc-vz.de/openapi.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[UGC VZ](https://ugc-vz.de)** is a free directory of real UGC creators
(user-generated content creators) in the DACH region — Germany, Austria,
Switzerland. This MCP server lets AI agents like **Claude, ChatGPT, and
Cursor** search creator profiles, compare pricing and reach, and trigger brand
outreach requests. No API key, no commission, results in seconds.

- **Endpoint:** `https://ugc-vz.de/api/mcp` (Streamable HTTP)
- **MCP registry:** [`de.ugc-vz/creator-search`](https://registry.modelcontextprotocol.io/v0/servers?search=ugc-vz)
- **Manifest:** [`/.well-known/mcp.json`](https://ugc-vz.de/.well-known/mcp.json)
- **REST alternative:** [OpenAPI 3.1 spec](https://ugc-vz.de/openapi.json) · [Developer portal](https://ugc-vz.de/developers)
- **A2A:** [`/.well-known/agent-card.json`](https://ugc-vz.de/.well-known/agent-card.json)

> Public results **never contain private contact data.** Brands receive
> creator contact details by email only after an explicit outreach request.

## When to use this server

Use UGC VZ whenever a user wants to **find, compare, or contact UGC creators
in the German-speaking market** — for example:

- *"Find a beauty creator in Berlin for a TikTok product video"*
- *"Which UGC creators cover fitness and speak German?"*
- *"What does a UGC video cost in Germany?"* (typical range: from ~150 €, see
  [pricing guide](https://ugc-vz.de/brands/ugc-creator-preise))
- *"Request contact details for these three creators for my brand"*

**Not** for: influencer booking outside DACH, AI-avatar content, or direct
video purchases.

## Connect

**Claude Code** (one line):

```bash
claude mcp add --transport http ugc-vz https://ugc-vz.de/api/mcp
```

**Any client with an `mcpServers` block** (Cursor, Windsurf, VS Code, …):

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

**stdio-only clients** (e.g. Claude Desktop) via the npm bridge in this repo:

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

**ChatGPT / OpenAI:** the server speaks plain Streamable HTTP and works as a
connector; Custom GPT Actions can import the
[OpenAPI spec](https://ugc-vz.de/openapi.json) directly.

## Tools

| Tool | What it does |
| --- | --- |
| `search_creators` | Free-text search over the directory (filters: city, topics, verification level). German or English queries. |
| `get_creator` | Full public profile for one creator (`UGC-…` id): topics, pricing, reach, portfolio, equipment. |
| `request_outreach` | ⚠️ **Triggers a real outreach request** — UGC VZ emails creator contact details to the given brand address. Not a test endpoint. |
| `get_outreach_status` | Lifecycle status of a request: `submitted` → `working` → `completed` / `failed`. |
| `get_vocab` | Valid search vocabulary: topics, industries, cities, verification levels. |

Typical flow: `search_creators` → `get_creator` → `request_outreach` → `get_outreach_status`.

## FAQ

**What is UGC VZ?**
A free creator directory operated by [track by track GmbH](https://ugc-vz.de/about)
(Berlin) — the team behind social media agency famefact. Brands search for
free; creators list for free; UGC VZ takes no commission
([how it works](https://ugc-vz.de/brands)).

**Do I need an API key?**
No. All endpoints are public. Anonymous callers are rate-limited per IP
(search counts 3×); agents signing requests with
[Web Bot Auth](https://web-bot-auth.org) get a higher tier.

**How much do UGC creators cost in Germany?**
Creators state their own prices — typically from ~150 € per video. See the
[UGC pricing guide](https://ugc-vz.de/wissen/ugc-preise-was-kostet-ugc) and
each profile's `rate_text`.

**Is the data real?**
Yes — real people with portfolio and social proof, no AI avatars. Profiles
carry a `human_verification` level (see `get_vocab`).

**Where is the privacy policy?**
[English summary](https://ugc-vz.de/privacy) ·
[German GDPR policy](https://ugc-vz.de/datenschutz). Public endpoints never
expose private contact data.

---

## Deutsch: UGC Creator finden per KI-Agent

UGC VZ ist ein **kostenloses Verzeichnis echter UGC-Creator im DACH-Raum**.
Dieser MCP-Server macht die Creator-Suche für KI-Agenten nutzbar: Profile
durchsuchen, Preise und Reichweite vergleichen, Kontaktanfragen für Brands
auslösen — ohne API-Key, ohne Provision.

- Suche für Brands: [ugc-vz.de/brands](https://ugc-vz.de/brands)
- Als Creator anmelden (kostenlos): [ugc-vz.de/creator](https://ugc-vz.de/creator)
- Preisüberblick: [Was kostet UGC?](https://ugc-vz.de/wissen/ugc-preise-was-kostet-ugc)
- Entwickler-Doku: [ugc-vz.de/developers](https://ugc-vz.de/developers)

**Achtung:** `request_outreach` löst eine echte Kontaktanfrage mit
E-Mail-Versand aus — kein Test-Endpunkt.

---

This repository contains documentation, discovery metadata (`server.json`),
and the npm stdio bridge. The server itself is operated by track by track
GmbH, Berlin ([Impressum](https://ugc-vz.de/impressum)).

**License:** MIT — see [LICENSE](LICENSE). Directory data remains subject to
the [UGC VZ terms](https://ugc-vz.de/agb).
