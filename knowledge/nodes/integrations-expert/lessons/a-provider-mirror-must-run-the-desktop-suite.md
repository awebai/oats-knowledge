---
type: Lesson
title: A provider mirror must run the Desktop suite, with the Desktop package's own dependencies installed
description: The Desktop pins a bundled provider's manifest settings byte for byte in recorded fixtures, so a mirror PR that changes a bundled manifest goes red on the Desktop suite unless those fixtures are recaptured; the mirror gate runs the Desktop tests, and a fresh worktree installs the Desktop package's devDependencies first, or every Desktop test fails for a missing module rather than for the change.
tags: [lesson, integrations, mirror, release, desktop, fixtures, tests]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the maintainer while landing a provider release's
mirror into the framework repository.

# What happened

The mirror PR changed the bundled manifest's setting description. The kernel
suites the gate ran were green, the payload matched the release tag, and the
mirror was approved. The merge watcher went red: a Desktop test asserts that a
recorded stand-in equals the bundled manifest's identity settings byte for
byte, and a release-workflow test failed from the same cause. The fix was a
fixture-only recapture from the mirror's tree by the Desktop engineer, and a
fast-forward of the mirror to that commit.

The developer then ran the Desktop suite in their worktree and reported a
wall of failures. All of them were one missing module: the Desktop package
carries its own devDependencies, and a fresh worktree had not installed them.
With that package installed, the suite passed in full.

# Rule

- A mirror PR that touches a bundled capability's manifest runs the Desktop
  suite before handoff. If the manifest's settings changed, the Desktop
  engineer recaptures the fixtures from the mirror's tree, and the mirror
  fast-forwards to that commit; when the fixture commit's parent is the
  mirror's head, no cherry-pick is needed: the new head is the fixture commit itself, so
  the only new review surface is its delta, and the watcher is re-armed at
  that new oid.
- Running the Desktop suite in a worktree needs an install inside the
  Desktop package first. A wall of missing-module failures is an environment
  fact, not a verdict: report it as such and install before reading any test
  as failed.
- The gate list for a provider mirror is therefore: the kernel suites, payload
  parity with the tag, the catalog pin, the guide lines, the floors, and the
  Desktop tests.

# Why

The Desktop is a consumer of provider manifests, and it pins them by
recording rather than by reading, so a manifest change is a Desktop change
whether or not anyone in the provider's lane touched the Desktop. A gate that
runs only the kernel suites proves the kernel, not the release.

See also [integration guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md)
for the other release-gate rule of this node, and
[review the whole PR merge range for scope](/nodes/oats-expert/lessons/pr-branch-merge-range-scope.md)
for the review discipline this extends.
