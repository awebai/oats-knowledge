---
type: Decision
title: Runtime, messaging and viewers have separate owners; a wake is a hint, not consumption
description: The kernel owns execution lifecycle, the messaging capability owns identity and delivery, viewers are clients; the wake broker never fetches or acknowledges mail for an agent, and recovery means a fresh receipt with one identity holder.
tags: [integrations, messaging, runtime, recovery, ownership]
timestamp: 2026-09-05
---
# Decision

Accepted 2026-09-05 from the operator's runtime and migration requests and
the joint implementation with the messaging capability's owners. Under the
official-capabilities redesign the parties are the **kernel** and the
**messaging capability** (not "OATS versus a product"), but the split is
unchanged:

- The kernel owns execution lifecycle — launch, session receipts, inspection,
  input and attach.
- The messaging capability owns identity, delivery policy and any per-host
  wake service.
- Desktop and terminal tabs are **clients** of those operations; a host
  session must continue when every viewer closes
  ([viewers are not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)).

# Rejected alternatives and why

- **Harness-native messaging channels in the kernel.** Rejected: terminal
  input already wakes any harness that has a terminal. If a native channel is
  ever justified, it belongs to the messaging capability, keeping the kernel
  runtime-neutral ([kernel responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
- **A broker that fetches or acknowledges mail on the agent's behalf.**
  Rejected: a wake is a *hint* to the instance to fetch work under its own
  identity. A message consumed by proxy is exactly the invisible loss that
  made polling unsafe; submission is not consumption, and qualification checks
  the actual fetch/reply path
  ([adoption evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md)).
- **Replaying a saved launch command as "restart".** Rejected: it proves
  nothing about who holds the identity. Recovery of a standing seat is a fresh
  supported execution receipt with **exactly one live identity holder**, a
  supported binding and a preserved rollback path.
- **OATS as a second custodian of host credentials.** Rejected: remote hosts
  are reached through the operator's existing SSH configuration; the server
  registry stores no keys.

# Current contracts

Mechanics live with the code and move with it: `docs/execution-targets.md`,
`docs/integrations.md`, `docs/servers.md` in
[awebai/oats](https://github.com/awebai/oats).

# Citations

1. Legacy `agents/lead/soul/knowledge/operating-boundaries.md` (2026-09-05); SHA-256 `bee6a3a9a071e75f318a73bbaae12ec982e687ef27970d953e6f5b0dc5d48fe7`.
2. Legacy `agents/lead/soul/AGENTS.md` identity-handover clause ("one live holder, a supported binding, and a preserved rollback path").
