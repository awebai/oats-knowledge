---
type: Lesson
title: Check the affected-test inventory, not only the green runs
description: When full suites run only in CI, require a search-derived inventory of test files consuming changed surfaces at handback and check its coverage against the diff, with a result or non-run reason for each file.
tags: [verification, handover, testing, coordination]
timestamp: 2026-10-27
---
# A run list hides tests nobody thought to run

When local verification is restricted to individual test files and full
suites run only in CI, a green handback proves only the selected files. A
developer, reviewer and lead can all inspect the same successful runs while
missing an existing consumer test. Adding review rounds does not itself
correct a shared omission in test selection.

The lead's brief should request an **affected-test inventory**, not merely a
run list. Search the repository and package test trees for consumers of the
surfaces changed by the diff: rendered rows, footer text, action names,
imports and source-text reads. Include each identified test file, even if
it was not changed, with its result or the reason it was not run. At
handback, the lead checks that inventory against the changed surfaces,
rather than verifying only the runs the developer chose to report.

Search is a discovery aid, not a completeness certificate: indirect helpers,
fixtures and differently named assertions can conceal dependencies. The
inventory makes the selection and its gaps reviewable; it does not prove
that every possible affected test was found. A non-run reason discloses
missing evidence, not permission to waive it. Preserve local execution
limits and CI's full-suite gate; this lesson does not authorize broader
local runs or change maintainer acceptance requirements.

# Text readers are consumers even without imports

The 2026-10-27 refinement makes the search obligation more specific. Test
consumers include function extractors, export or manifest inventories,
whole-module scanners and rendered-output assertions, not only importers.
They can depend on comments, labels and the **form** of a value even when
runtime meaning is unchanged.

Brief the inventory search before implementation, then check it at handback:

- Search test roots for changed function names and old literals, including
  readers that reconstruct a function with a separate dependency context.
- When a representation changes, search its alternate spellings: `.prop`,
  `'prop'`, `"prop"`, property-access helpers such as
  `getPropertyValue("prop")`, and the old displayed value. A dot-property
  search alone misses a test passing the property name as a string.
- Include scanners that consume the whole shipped module, even for a
  comment-only edit; their rules can match text without naming the changed
  function. Discover those readers from the current repository rather than
  treating a fixed list of test files as complete.

These are ways to expose a search blind spot, not a proof of exhaustive
coverage or a requirement to preserve incidental source syntax. Keep each
non-run explicit when the permitted environment cannot execute a reader.
The Desktop-owned
[source-evaluation lesson](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#source-evaluating-tests-include-renderer-modules-not-only-main)
owns the hand-maintained evaluation-context failure and its extraction
remedy; the generalist owns making those readers visible in the handback.

# Distinct responsibility and elimination route

When the maintainer identifies an overlapping open effort,
[prepare an open-head trial and resolution handoff](trial-merge-before-the-merge-order-is-fixed.md)
while the merge order is being chosen. That lesson owns the timing and
transfer of combined-tree findings; this one owns discovery of the test set.

The [provider mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
already separates named local files from CI suites. This lesson owns the
lead's check that the named set reaches the change's consumers. It is later
than [exercising a consumer spec against its built producer](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md),
which tests the composition before developer handover. The maintainer's
[evidence-before-hand-over rule](/nodes/oats-maintainer/stewardship/review-protocol.md#evidence-outside-pr-ci-belongs-before-hand-over)
remains the authority for affected paths absent from PR CI.

[Runner isolation for automatic per-user writes](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md)
addresses an earlier boundary: a new side effect can expose personal state
through unrelated CLI tests, so isolation and guards belong in the spec,
not only in the later affected-test inventory.

Prefer eliminating incidental coupling first: [consumer tests should own
their reading, not copied producer sentences](/nodes/oats-desktop-expert/lessons/kernel-text-tests-own-the-client-reading.md).
For real dependencies, dependency-aware test selection and automated
comparison of affected files with reported evidence can reduce this manual
inventory debt; neither is claimed delivered here. The residual handback
requirement belongs in specification and verification guidance, not a
permanent list of test filenames in knowledge. No soul skill is changed.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, 2026-10-14;
notes/without-local-suites-name-every-test-that-reads-the-change.md.

The source reports that [awebai/oats#1168](https://github.com/awebai/oats/pull/1168)
changed help rows, but its green per-file handback omitted an existing
terminal test still waiting for the old row. Review and lead verification
missed the omission; CI exposed it. The proposal reports that a later
handback included a consumer search and CI passed. The note supports the
initial failure and the inventory recommendation, not that later outcome.
These are source-reported observations, not independently reproduced runs.
The local-run restriction is the reported context, not a new project-wide
policy established by this harvest or proof that search alone caused the
later green result.

Evidence: OKF proposal from oats-expert/oats-expert-workspace-sidebar,
2026-10-27; notes/source-extracting-harnesses.md.

Across one Desktop/TUI effort, the source reports repeated CI failures from
omitted source readers: a newly called helper absent from an extracted
function's context, a comment mistaken for a computed import, and CSS
property readers missed after a shorthand-to-longhands change. In the last
case, a dot-property search missed a string-argument read. The reports span
2026-10-22 through 2026-10-27; no implementation or CI run was independently
reproduced by this harvest. The reported local dependency gap explains why
selected green runs failed to expose the omissions; it is not a permanent
host limitation or permission to replace execution with search.
