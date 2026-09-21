---
type: Decision
title: The loopback interface is Desktop's trust boundary
description: Because Desktop's backend can type into live agent terminals, it binds loopback only, guards Host on every request and Origin on every command-running route, and treats remote use as the operator's own SSH forward; polling over push transport was a deliberate deferral.
tags: [desktop, security, trust-boundary, loopback, transport]
timestamp: 2026-07-27
---
# Context

Decided with the founder on 2026-07-17 for the browser-panel predecessor and
re-affirmed unchanged when Desktop succeeded the panel (2026-07-24). The
backend process reads agent sessions and delivers keystrokes into them. Any
page that can reach it can therefore act as the operator inside every agent
on the machine. That single fact shapes the whole boundary.

# Decision

**Bind loopback only, and make the loopback interface itself the trust
boundary.** Remote use is the operator's own SSH port-forward, never a public
bind; Desktop is not a network product and must not grow into one by
convenience.

**The Host guard covers every request, not only mutations.** A hostile page
can DNS-rebind its own hostname to the loopback address and read through GET
routes; same-origin policy does not help because the attacker owns that
origin. The first guard covered only POSTs because GETs were "just roster
reads"; the moment file-serving GET routes existed, that assumption became a
workspace-file leak (2026-07-22).

**Anything that runs a command is a mutation behind the Origin guard.** A GET
route that spawns a child process on cache miss is a CSRF fan-out surface on a
fixed loopback port: `no-cors` GETs omit Origin, so a per-route Origin check
is not a defence. Model such routes as POSTs, and coalesce concurrent misses so
trusted callers cannot multiply the same process either (2026-07-27).

**A proxy in front of the server inherits the boundary; it never launders
it.** A development or harness proxy that rewrote Host and Origin to the
upstream loopback authority so its requests would pass was a blocker: it
turned the guard into a formality for anyone who could reach the proxy. The
proxy validates the inbound Host itself and forwards the browser's real
Origin. Note that a naive port-strip mangles bare IPv6 loopback hosts.

**Inside the privileged window, navigation and outbound fetch are part of the
boundary.** Rendered content (markdown, transcripts) can carry links: deny
same-window navigation, not merely `window.open`, or a remote page inherits
the preload bridge. A privileged fetch proxy must compare the *resolved*
origin against the loopback origin rather than the input shape — WHATWG URL
resolves `//host/x` and `/\host/x` to another host. A sanitiser decides which
markup survives but not how surviving anchors navigate; raw-HTML anchors
bypass the markdown renderer, so every surviving link is normalised after
sanitising.

**Client-supplied paths are selectors, never authority.** Path-shaped input
from the renderer selects among server-computed, admitted roots; see
[Workspace admission is privileged and transactional](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md)
for how those roots are admitted and held.

# Transport simplicity

Reading the agent through its real terminal transport — whichever target
type (local multiplexer, herdr, remote via the installed CLI) — was chosen
over a runtime-specific chat protocol because it is identical across agent
runtimes and needs no runtime cooperation. Push transport (WebSockets/SSE)
was deferred deliberately in favour of polling; the deferral stands until
polling demonstrably chafes. Anyone proposing push must show the chafing.

# Rejected alternatives

- A public or LAN bind "for convenience" — rejected: the process types into
  terminals.
- Per-route Origin checks on GETs — rejected: `no-cors` GETs omit Origin.
- Blocklisting bad URL shapes — rejected: check the resolved origin.
- Trusting the sanitiser alone for links — rejected: navigation behaviour is a
  second decision after markup survival.

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md);
[Verification judgment for Desktop's privileged surfaces](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop.md](https://github.com/awebai/oats/blob/main/docs/desktop.md) (security section)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/web-pane.md` (founder decision 2026-07-17; loopback and zero-dependency choices); SHA-256 `7fd5ecc5f26eda4e714db517382b67e9f490caf245efbf99c7628daefb974be3`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/architecture/desktop-backend-architecture.md`; SHA-256 `4160cfcdca27e11f1250f2e9304dea65ef2a17b9e3494737a1ca5c92a4f19ce8`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/loopback-host-guard-all-requests.md`; SHA-256 `1a4ef7fd96ffcf5cba50bfdfb6c90e1ee63fdfc171ecfdd91f47580e4925b48a`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/command-running-get-csrf-fanout.md`; SHA-256 `d687ae2c01d8b1fbda8327223b24c3de05852a6f4ebc6991e05928960285da30`.
5. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/harness-proxy-origin-guard.md`; SHA-256 `8eca6c262321ef16ad26be90c46501f4845033f9858c78c9eb28444e5a4645c4`.
6. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/desktop-shell-hardening-review-lessons.md`; SHA-256 `3e7981803e566ec7642f50692e9f97d26a8ef21ea57a286c3e251c55f41affe0`.
7. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/url-resolution-ssrf-footgun.md`; SHA-256 `25e0d3809c879c1af154559b7f1cf9ecc05c324652289f58c88bc4480726bfd3`.
8. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/sanitize-marked-markdown-before-innerhtml.md`; SHA-256 `6175f57a9fe71b89f32b1a7a34b100fe9f194b178da0dacecc2d0442ad66acd9`.
