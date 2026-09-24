---
type: Lesson
title: A personal team per workspace needs a service primitive
description: A personal-workspace team and token-free shared-team joining both require a human CLI login the messaging service does not yet provide; until then the provider exposes setup as a required guided step and never invents local shims.
tags: [lesson, aweb, messaging, teams, defaults, integrations]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations expert, checking with the messaging
service's coordinator against reviewed source after the framework's human
asked for a personal team per person per workspace with no steps.

- The hosted "create team" command is a fresh signup: a new key, a new
  account, a team named `default:<username>`, a refusal for an existing
  username; an existing hosted identity cannot create a second hosted team.
- The local path requires a local registry and a running service; it does
  not route through the hosted service, and two machines bootstrapping their
  own local stacks do not converge on one team, whatever the names say.
- No endpoint returns an existing team on a repeated create; every path
  refuses.

A follow-up source check narrowed the missing primitive: the messaging CLI
has no reusable human credential. The hosted side has browser sessions and
an OAuth 2.1 server for connectors, but no CLI login, device-code flow or
other command-line human session. Personal namespaces hold exactly one team
named `default`, while organisation namespaces already hold several; the
registry's uniqueness key `(domain, name)` would support idempotency, and
the server's fixed-name personal default helper is already idempotent on
`(owner, slug)`, so the first server change is to generalise a
caller-supplied slug. Spawn invites carry `max_uses` and expiry in the
model, but the CLI hardcodes single use and minting needs team-key
authority; the session-authorised route that adds an existing identity
exists only in the dashboard path.

The shape proposed to the service (not a landed contract): a prerequisite
human CLI login, then session-authorised verbs that mint a short-expiry
single-use spawn invite and redeem it in place, one for the personal
workspace team keyed on the workspace and one for an entitled human joining
a named team without a token. Refusals return structured data (entitled or
not, and why) so readiness can print the exact remedy. The provider's
per-spawn path, a single-use invite minted with the root's authority, does
not change.

Interim consequence for a provider that is the workspace default: an
unmapped team label is answered with a readiness problem, and setup remains
one guided step over existing primitives (hosted signup with a username, a
team API-key init, or an invite token), never an improvised local team. The
general form: a zero-step default on top of an external service exists only
where the service has an idempotent create-or-return call scoped to a
logged-in person; otherwise the default must make the missing step visible.
See [guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md).
