---
type: Lesson
title: Review the whole PR merge range for scope, not only the intended feature files
description: A feature PR can accidentally carry unrelated local, stewardship, or soul commits that are not on the shared main, so maintainers must inspect the actual merge range before running expensive gates.
tags: [lesson, pr-review, mergeability, stewardship, harvest, souls]
timestamp: 2026-09-24
---

Learned 2026-09-24 by a maintainer, twice: once on a desktop feature PR whose
merge range also carried other souls' skill, lesson and stewardship commits,
and once on a mirror PR that carried thirty-three files of a committed soul
because the developer's worktree had been branched from a shared checkout's
local main rather than from the shared remote.

# Lesson

The maintainer check is the **whole merge range** (`origin/main...HEAD`, or
the forge's changed-files and commits view), not the author's intended
feature area. If local direct, stewardship or harvest commits sit on a
developer's branch but not on the shared main, a focused feature PR silently
becomes the vehicle for unrelated decisions or skill changes. A branch that
does not contain the current shared main and shows many non-merge commits is
the tell.

That scope check includes committed soul copies under the repository's
agents tree. A developer's memory-harvest commit into an in-repo soul copy
does not belong on a feature PR even when the harvested lesson is accurate:
developer instances leave lessons in their notes, and central harvesters
promote them through their own path. Accuracy of the content is not the
question; the path is.

# Practice

At the product-direction gate, list the merge range's paths and compare them
with the PR description before running expensive correctness and security
gates. Treat anything under a soul directory as out of scope unless the PR is
explicitly a knowledge PR. If unrelated base commits appear, return the PR
for branch rebuilding from the shared main, or for those base commits to land
through their own proper path first.
