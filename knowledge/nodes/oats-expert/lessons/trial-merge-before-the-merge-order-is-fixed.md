---
type: Lesson
title: Prepare an open-head trial before the merge order is fixed
description: When the maintainer names an overlapping open PR, prepare a local combined-tree trial and a tested conflict-resolution handoff before either lands, so merge-order planning includes semantic conflicts rather than only Git hunks.
tags: [integration, coordination, testing, handover]
timestamp: 2026-10-27
---
# Preparation while both efforts are still open

When the maintainer identifies another open effort that overlaps yours, ask
your developer to trial-merge locally onto that PR's current head and run
the affected tests from both changes. If the order is still being decided,
do this then rather than waiting for the first PR to land and discovering
the integration work during the second owner's rebase.

The useful handback is not merely “it conflicts” or “the merge is clean.”
Give the maintainer the tested heads, textual hunks and their proposed
resolutions, semantic failures found by the combined run, and a drafted
interaction test with its result. Make that test available to whichever
owner will land second. Use the existing
[affected-test inventory](check-affected-test-inventory-at-handback.md)
to expose consumers, not only the files each author happened to run.

Keep the trial local and unpushed, separate from the real PR branches. It
informs the maintainer's order and prepares a resolution; it neither chooses
the order nor imports another effort into the deliverable. The
[presentation-family review rule](/nodes/oats-maintainer/stewardship/presentation-features-reuse-one-contract.md)
already requires early ordering and scrutiny of the later hand-resolved
rebase. This lesson supplies the lead's preparation for that decision, not
a competing merge policy. A passing trial does not replace
[updated-head integration evidence or content-bound review](/nodes/oats-maintainer/stewardship/review-protocol.md).
Existing execution limits still apply.

# Why the Git conflict list was insufficient

In the reported shared-work/background-client trial, Git flagged an import
line, but the other PR's newly added renderer test harness lacked the new
import supplied by this effort. Fourteen of its fifteen cases failed on
the combined tree despite no textual conflict at that harness. The early
trial exposed the additional repair and produced a draft interaction test
before the maintainer fixed the order.

The distinct lesson is the timing and transferable resolution, not another
claim that clean merges prove too little. Nor does this case establish the
[Desktop coupled-release condition](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md):
overlapping work does not by itself mean either feature is unsafe to ship
alone.

# Elimination route and limits

Eliminate the duplicated harness dependency context through the existing
[importable-logic remedy](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#source-evaluating-tests-include-renderer-modules-not-only-main)
rather than preserving a permanent missing-import checklist. Keep the
interaction regression in the repository. Automated prospective-combination
CI can replace the manual rehearsal; the residual lead judgment is to
surface the overlap early enough for planning and hand the repair to its
landing owner. No such complete automation is claimed delivered here.

Evidence: OKF proposal from oats-expert/sidebar-same-work-expert,
2026-10-27; notes/trial-merge-onto-the-overlapping-open-pr.md.

The source identifies [awebai/oats#1587](https://github.com/awebai/oats/pull/1587)
and [#1589](https://github.com/awebai/oats/pull/1589). This is one effort's
source-reported trial and handoff, not an independently reproduced test run.
The proposal explicitly leaves unobserved whether the later PR carried the
repairs and test. Do not infer a successful landing or measured CI saving.
