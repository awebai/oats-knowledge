---
type: Lesson
title: Check the affected-test inventory, not only the green runs
description: When full suites run only in CI, require a search-derived inventory of test files consuming changed surfaces at handback and check its coverage against the diff, with a result or non-run reason for each file.
tags: [verification, handover, testing, coordination]
timestamp: 2026-10-14
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

# Distinct responsibility and elimination route

The [provider mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
already separates named local files from CI suites. This lesson owns the
lead's check that the named set reaches the change's consumers. It is later
than [exercising a consumer spec against its built producer](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md),
which tests the composition before developer handover. The maintainer's
[evidence-before-hand-over rule](/nodes/oats-maintainer/stewardship/review-protocol.md#evidence-outside-pr-ci-belongs-before-hand-over)
remains the authority for affected paths absent from PR CI.

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
