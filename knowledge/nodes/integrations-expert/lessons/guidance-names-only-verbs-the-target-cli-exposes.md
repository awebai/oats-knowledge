---
type: Lesson
title: Integration guidance names only verbs the target CLI exposes, and readiness follows the hook's own selection
description: A capability's setup text must be pinned to the real CLI it drives by a test that runs each named verb's help, host-only settings are manifest metadata verified by resolver tests, and a readiness check must resolve the team exactly as the spawn hook does.
tags: [lesson, integrations, setup, readiness, host-only, testing]
timestamp: 2026-09-24
---

Learned 2026-09-24 while hardening a messaging integration's setup command
after its shipped guidance recommended a team-creation command that no release
of the target CLI had ever exposed.

# Rule

- **Every CLI verb the capability prints or runs is pinned by a test** that
  executes that verb's help against the real binary when it is on the path,
  and skips with a message naming the unverified verbs otherwise. Guidance
  offers the user only paths the CLI exposes today, however convenient a
  shortcut would be.
- **A setting only the host may supply is declared as manifest metadata**
  (`hostOnly: true`) and verified by a resolver test that a workspace-file
  value is refused. The provider receives one merged payload and cannot tell
  which configuration layer a value came from, so provider-side provenance
  checks are theatre.
- **Readiness resolves the team the way the spawn hook does.** If the hook
  fails a soul whose workspace team label is unmapped but falls back to the
  messaging root's active team when no label exists, the readiness check must
  report exactly those two outcomes, from one shared rule and one fixture.
  A readiness verdict that disagrees with spawn is worse than none: it sends
  the operator to the wrong remedy.

# Why

Guidance text has no consumer in code; nothing fails when it names a command
that does not exist, and the first person to find out is a new operator at
the exact moment they are least equipped to diagnose it. The same is true of
readiness: a check that approximates the hook drifts the first time the hook
changes.

# Consequences

- A setup command that can run the CLI for the operator does so only through
  primitives that exist, one authority at a time, with secrets withheld from
  every output path including argument-parse errors (a `--flag=value` form is
  a token on stderr if the parser echoes unknown arguments).
- The verb test scans the capability's own texts (binaries, injections,
  README); vendored upstream skills are the upstream project's to verify.

See also [capability resources resolve inside the package root](/nodes/integrations-expert/lessons/capability-resources-resolve-inside-the-package-root.md)
for the other half of the integrity story, and the operator node's
[the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md).
