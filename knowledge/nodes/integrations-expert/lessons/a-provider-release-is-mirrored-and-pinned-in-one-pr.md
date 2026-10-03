---
type: Lesson
title: A provider release is tagged in its own repository first, then mirrored and pinned in one framework PR whose gate runs the Desktop suite
description: A release of a mirrored capability is staged, reviewed and tagged in the package's repository; one framework PR then carries the payload byte-identical to the tag together with the catalog, workspace and docs pins, and its gate includes the Desktop suite, because the Desktop records bundled manifests in fixtures.
tags: [integrations, release, mirror, catalog, pins, desktop, tests]
timestamp: 2026-09-25
---

The framework repository mirrors each official capability's payload and pins
its catalog to a tag of the package repository. Orderings that went wrong
before this was settled: a pin that named a tag not yet pushed, a mirror
reviewed against a stage that then moved, and a separate post-tag pin commit
that left the mirror and its pin reviewable apart. The settled practice
(oats.okf 4.0.2 and oats.aweb 1.16.1, 2026-09-28) is one PR after the tag.

**Order of record.**
1. Stage the release in the package repository; its reviewers approve the
   stage head; merge it and push the tag; read the tag back (annotated object
   and peeled commit).
2. Open ONE framework PR that carries the payload byte-identical to the
   tagged tree (the parity checker, never a hand copy), the catalog, workspace
   and docs pins, the version literals the tests carry, and any kernel tests
   the release reclassifies. Review it as one diff.
3. Run the gate: the affected kernel suites, payload parity with the tag, the
   pins, the floors, and the Desktop suite.

**Why the Desktop suite.** The Desktop pins a bundled provider's manifest
settings by recording, in fixtures, so a manifest change is a Desktop change
whether or not anyone in the provider's lane touched the Desktop. A mirror
once went red after approval on exactly that; the fix was a fixture-only
recapture from the mirror's tree. Running the Desktop suite in a fresh
worktree needs the Desktop package's own devDependencies installed first: a
wall of missing-module failures is an environment fact, not a verdict.

The general release judgement (source, tag, pin; pin, bump and mirror bytes
land together) is the framework's
[release traps](/nodes/oats-maintainer/stewardship/release-traps.md); this lesson
is the provider-mirror instance of it.
