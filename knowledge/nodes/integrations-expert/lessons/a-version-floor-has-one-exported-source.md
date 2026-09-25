---
type: Lesson
title: A version floor that a runtime gate and a diagnostic both read has one exported source
description: When the same minimum version appears in a hook's runtime check and in a readiness diagnostic, both read one exported constant; two literals drift the moment a placeholder floor becomes a published one, and the diagnostic then contradicts the gate.
tags: [integrations, versioning, readiness, hooks]
timestamp: 2026-09-25
---

A provider hook gates on a client's minimum release before it acts, and its
readiness check reports the same requirement to the operator. During the
grant-attachment work the floor was a placeholder until the client release
that carried the feature was published; a floor written twice would have
left the diagnostic naming the placeholder after the gate moved.

**Rule.** Export the floor once from the module that owns the wire (for the
messaging package, `CUSTODY_ATTACH_MIN` in its binding-wire module) and
import it everywhere it is compared or printed: the runtime gate, the
readiness problem text, the docs example that a test pins. A release that
raises the floor is then one edit and one review. See the package's
[attachment reference](/nodes/oats-aweb-expert/references/how-a-grant-home-is-attached-to-custody.md)
for the floor this rule came from.
