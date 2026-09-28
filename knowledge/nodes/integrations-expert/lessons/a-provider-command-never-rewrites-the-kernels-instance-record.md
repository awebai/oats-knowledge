---
type: Lesson
title: A provider that owns an in-life lifecycle owns its state file and its verbs — it never rewrites the kernel's instance record, and its skills never teach the native mutations underneath
description: When a provider gains commands that change state during an instance's life, it keeps that state in a provider-owned file inside the home, reads it in every entrypoint, and mirrors it into the meta of every hook output rather than editing instance.json; and every shipped skill and inject sends agents through the provider's verbs, allowing the native tool only for read-only diagnostics.
tags: [integrations, provider-state, hooks, instance-record, ownership, skills, lifecycle]
timestamp: 2026-09-25
---

**Observed (2026-09-25), in the first review of a messaging provider's join
and leave verbs.**

- The verbs persisted the joined-team list by reading the kernel's
  `instance.json`, editing its own `capabilityMeta` block and writing the
  whole file back. It worked in the fixture and it is wrong: the kernel writes
  that file itself at spawn, launch and retire (and the Desktop edits it
  through the kernel), so a command racing a kernel write loses one side's
  edit silently, and the provider has bypassed hook output, the one channel
  through which its meta is supposed to reach the kernel.
- The provider's team-membership skill still taught the native client's join,
  leave, invite and switch commands after the provider had taken ownership of
  membership (per-team identity homes, a state file, retire cleanup,
  readiness, the Desktop's operations). An agent following it would have
  changed a membership behind the provider's back.

**Rules.**
- A provider owns its in-life state in its own file inside the home (for
  oats.aweb, `.oats-aweb/teams.json`), and reads it in every entrypoint: its
  commands, its operations, and its launch and retire hooks, beside the
  kernel-fed meta.
- Every hook output mirrors that state into `meta`, so the kernel's record
  carries a copy for inspection; the copy is never the source. A consumer that
  needs the state live (a Desktop panel) reads it through the provider's
  operation.
- Once a provider owns a lifecycle, every shipped skill and inject names the
  provider's verbs for changing it, and allows the native tool only for
  read-only diagnostics (list, status, show). Review skills together with the
  code that takes ownership; the removed-verb scan covers the native tool's
  mutating verbs the same way it covers the kernel's.
- Cleanup of that state follows
  [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md):
  a failed remote leave keeps the local credential.
