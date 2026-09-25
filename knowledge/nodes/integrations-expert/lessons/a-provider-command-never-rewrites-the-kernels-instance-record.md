---
type: Lesson
title: A provider command never rewrites the kernel's instance record; in-life provider state lives in a provider-owned file and is mirrored through hook output
description: When a provider gains commands that change state during an instance's life (joining or leaving a team), the tempting persistence is to rewrite the kernel's instance.json from the command; that breaks ownership (the kernel writes that file at spawn, launch and retire, so one side loses the other's edit) and bypasses the provider's only sanctioned channel, hook output; keep such state in a file the provider owns inside the home, read it in every entrypoint beside the kernel-fed meta, and mirror it into the meta of every hook output so the kernel's copy is never the source.
tags: [integrations, provider-state, hooks, instance-record, ownership]
timestamp: 2026-09-25
---

**Observed.** A messaging provider's first release with explicit join and
leave verbs persisted the joined-team list by reading the kernel's
`instance.json`, editing its own `capabilityMeta` block and writing the whole
file back from the command. The retire hook then read that block through
the kernel's `OATS_META`. It worked in the fixture and it is wrong: the
kernel writes that file itself at spawn, launch and retire (and the Desktop
edits it through the kernel), so a command racing a kernel write loses one
side's edit silently, the file is reformatted by a party that does not own
it, and the provider has bypassed hook output, the one channel through which
a provider's meta is supposed to reach the kernel.

**Rules.**
- A provider owns its in-life state in its own file inside the home (a
  provider-named directory or file), and reads it in every entrypoint: its
  commands, its operations, and its launch and retire hooks, beside the
  kernel-fed meta.
- Every hook output mirrors that state into `meta`, so the kernel's record
  carries a copy for inspection and for consumers that read only it; the
  copy is never the source.
- A consumer that needs the state live (a Desktop panel) reads it through
  the provider's operation, not from the kernel's record.
- The same review found the companion rule for cleanup: a leave or retire
  that fails remotely must keep the local credential, or the remote record
  survives with no key to retry the deletion.
