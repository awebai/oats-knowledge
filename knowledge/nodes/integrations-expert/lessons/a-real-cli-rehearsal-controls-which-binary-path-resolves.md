---
type: Lesson
title: A real-CLI rehearsal controls which binary PATH resolves, ahead of package shims
description: A test or rehearsal that needs a specific installed client release puts that binary first on PATH or invokes it by absolute path, because a package's dependency shims under node_modules/.bin shadow the intended client and produce failures that look like the change's fault.
tags: [integrations, testing, rehearsal, path, versions]
timestamp: 2026-09-25
---

The provider's test suite runs the real client for its rehearsal fixtures
([a fake that accepts what the real binary refuses hides a broken hook](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)).
When the required client release was newer than the one a package dependency
installed as a shim, the test runner's PATH found the shim first and the
suite failed on a missing flag that the intended release had.

**Rules.**
- State the client release a fixture needs, and make the runner resolve that
  release: the binary's directory first on PATH, or an absolute path, never
  "whatever `aw` is".
- Record which binary ran (its version output) in the rehearsal log, so a
  failure is attributed to the binary before it is attributed to the change.
- The same applies to a long-running helper the client starts: its version is
  its own, not PATH's ([a missing wake is diagnosed from the daemon's own log](/nodes/integrations-expert/lessons/a-missing-wake-is-diagnosed-from-the-broker-daemons-own-log.md)).
