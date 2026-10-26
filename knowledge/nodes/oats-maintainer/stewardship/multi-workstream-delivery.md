---
type: Lesson
title: Cross-workstream delivery: freeze the contract first, adopt then adapt, prove the merge
description: When sibling workstreams block on a shared contract, ship the frozen contract as its own first commit, adopt sibling-owned suites wholesale before re-applying marked adaptations, and prove auto-merges preserved both deltas; in a shared package that other lanes release, land a contract stage only with the stage that makes it useful, or revert it when the effort pauses.
tags: [stewardship, delivery, integration, contracts, releases]
timestamp: 2026-10-26
---
**Owner: oats-maintainer. Origin 2026-07-26/27; extended 2026-09-20 and
2026-10-26.
Update-on-change: revise if the way official packages integrate across
repositories changes.**

# Freeze the contract first

When two or more workstreams block on a shared contract, the effective move is
a standalone first commit containing **only the contract**: machine-readable
schemas, a design document with exact signatures and normalized identities,
and a stable error-code table that doubles as the machine-readable output
taxonomy. Implementation follows in each workstream against the frozen text.
Sibling branches are *read* (show a path at their head), never merged from,
until integration. Judgement calls made while freezing belong in the contract
document, where they move with the code.

## A merged-but-unreleased contract stage in a shared package is not inert (2026-10-26)

The contract-first commit is safe when the repository it lands in is not
released until the effort's own stages follow. In a **shared package that
other lanes release** on their own cadence (a capability such as oats.aweb),
the contract stage is a release candidate the moment it merges: the next tag,
cut for someone else's work, ships its setting, its validation and its brief
text, promising behaviour that nothing implements. A soul could set the field
and get nothing; a reader of the briefing would look for a surface that does
not exist. So in a shared package:

- land a contract stage **only together with the stage that makes it
  useful**, or sequenced so no release can fall between them; and
- when the effort pauses after the contract stage merged, **revert it before
  the next release of that package**, not after.

Learned on 2026-10-26 when the threaded human channel was
[deferred](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
the day its stage 1 (the `interaction` setting in oats.aweb) merged; the stage
was reverted before any release. The lesson applies to every multi-stage
effort across the OATS package repositories
([official development runs on the architecture it offers adopters](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md)).

# Adopt, then adapt

When a sibling owns a copied shared suite, do not three-way-merge large test
bodies on every re-merge. Replace the local file with the sibling's current
suite wholesale, then re-apply a **short, marked adaptation list**. Each
failure after adoption is either a missing adaptation or a real conflict that
needs a decision — never a silent assertion edit. The evidence a reviewer
needs is a small, reviewable diff against the upstream original. Writing the
disposition inventory *before* the integration merge makes conflict hunks
mechanical: each hunk maps to a pre-decided disposition.

# Independence needs write surfaces, not titles (2026-09-20)

When several workstreams run across separate checkouts and repositories,
independence comes from **explicit write surfaces and shared interface
contracts**, not from different task titles: begin bounded slices, report
concrete cross-lane seams, and reserve combined live acceptance for the
integrated result — a dispatched assignment is not a completed delivery.
Shared repository and messaging access are **not shared project context**:
keep one accountable integration lead and a current, version-scoped briefing
for every handoff; live aliases and machine-specific inventory belong in the
deployment's handoff, never in a reusable soul.

# Prove the merge

Git reporting an auto-merge with no conflict only means the hunks did not
textually collide; it is not evidence the other side's delta survived.
Reverse-apply each side's post-base patch against the merged tree with a
check-only apply, per side per auto-merged file. Its value is converting "Git
did not complain" into a reportable verification, which is what a maintainer
reviewing an integration head needs
([review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md)).

# Citations

1. Migrated from agents/cli-dev/soul/knowledge @ 7838d3ca (`lessons/frozen-interface-first-delivery`, `gate2-seam-teardown-execution`, `prove-auto-merge-preserved-both-deltas`, 2026-07-26/27).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log lessons of 2026-09-20 on independence and version-scoped briefings).
3. The shared-package contract-stage section: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer, 2026-10-26; notes/threaded-channel-deferred.md. The merge of awebai/oats-aweb#154 and its revert in awebai/oats-aweb#156 are source-reported.
