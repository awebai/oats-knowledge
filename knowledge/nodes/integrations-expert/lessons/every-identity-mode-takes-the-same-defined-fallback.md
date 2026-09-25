---
type: Lesson
title: Every identity mode takes the same defined fallback; a fallback implemented for one mode and a fatal in the other is a regression hiding behind a rule
description: When a contract defines a default (no configured team means the root's active team), implement it in every code path that needs the value, including the less-used mode (global session grants read the resident custody root's active team), and make readiness derive the value the same way spawn does; removing an old fallback without adding the defined one turns a working deployment into a fatal.
tags: [integrations, fallback, identity, readiness, teams]
timestamp: 2026-09-25
---

**Observed.** The personal-team rule was implemented for local identities:
no configured team means the root's active team. The same change removed
the older environment fallback from the global (session-grant) path and
left a fatal there, so a global-mode deployment with a mapped workspace and
no host team setting, which minted on the previous release, stopped
spawning. Readiness for global mode did not derive the team either.

**Rules.**
- List every code path that consumes the value (local mint, global mint,
  readiness, remedies) before changing where it comes from, and give each
  the contract's fallback; the source differs per mode (the messaging root
  for local, the resident custody root for global) but the rule does not.
- Keep readiness and spawn on one derivation, so the readiness answer
  predicts what spawn does.
- When you remove a fallback, say in the PR what replaces it for each mode;
  "removed" without a replacement per mode is the regression.
- Check the real credential root carries the key you read (the custody
  home's `.aw/teams.yaml` has `active_team`) rather than assuming the
  fixture's shape.
