---
type: Lesson
title: An integration that owns a lifecycle ships skills that teach its verbs, not the native mutations underneath
description: When a provider owns an external lifecycle (team membership, identities), its shipped skills must send agents through the provider's own verbs and reserve the native tool's mutating commands for diagnostics or for the provider's internals, because a native join, leave, invite or switch run by hand bypasses the provider's state, cleanup, readiness and the GUI's operations.
tags: [integrations, skills, lifecycle, ownership, teams]
timestamp: 2026-09-25
---

**Observed.** The messaging provider's team-membership skill still taught
agents the native client's join, leave, invite and switch commands after
the provider had taken ownership of team membership: per-team identity
homes, a state file, retire cleanup, readiness and the GUI's operations. An
agent following the skill would have changed a membership behind the
provider's back and left every one of those views wrong.

**Rules.**
- Once a provider owns a lifecycle, every shipped skill and inject names the
  provider's verbs for changing it, and allows the native tool only for
  read-only diagnostics (list, status, show).
- The human's bar applies to what ships: no manual native mutation in any
  doc or skill on the person's or the agent's path.
- Review skills together with the code that takes ownership; a skill is
  part of the contract's surface, and the removed-verb scan should cover the
  native tool's mutating verbs the same way it covers the kernel's.
