---
type: Lesson
title: Cross-workstream delivery: freeze the contract first, adopt then adapt, prove the merge
description: When sibling workstreams block on a shared contract, ship the frozen contract as its own first commit, adopt sibling-owned suites wholesale before re-applying marked adaptations, and prove auto-merges preserved both deltas.
tags: [stewardship, delivery, integration, contracts]
timestamp: 2026-09-20
---
**Owner: oats-expert. Origin 2026-07-26/27 (package-engine delivery across
parallel workstreams); extended 2026-09-20. Update-on-change: revise if the way official packages
integrate across repositories changes.**

# Freeze the contract first

When two or more workstreams block on a shared contract, the effective move is
a standalone first commit containing **only the contract**: machine-readable
schemas, a design document with exact signatures and normalized identities,
and a stable error-code table that doubles as the machine-readable output
taxonomy. Implementation follows in each workstream against the frozen text.
Sibling branches are *read* (show a path at their head), never merged from,
until integration. Judgment calls made while freezing — such as keying a lock
by the identity in the acquired manifest rather than the source string, or
keeping the catalog resolver an injection point so tests use fixtures — belong
in the contract document, where they move with the code.

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
check-only apply: it succeeds only if every added line is present and every
removed line absent. Run it per side per auto-merged file. On the delivery
that motivated it the check found nothing missing — its value was converting
"Git did not complain" into a reportable verification, which is what a
maintainer reviewing an integration head needs
([review protocol](/nodes/oats-expert/stewardship/review-protocol.md)).

# Citations

1. Legacy `agents/cli-dev/soul/knowledge/lessons/` `frozen-interface-first-delivery` (2026-07-26), `gate2-seam-teardown-execution` (07-27), `prove-auto-merge-preserved-both-deltas` (07-27).
2. Legacy `agents/oats-expert/soul/knowledge/stewardship/delivery-log.md` lessons of 2026-09-20 on independence and version-scoped briefings.
