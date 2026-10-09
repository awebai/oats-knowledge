---
type: Lesson
title: Test feasibility before choosing between owners
description: When owning experts disagree on a feasibility claim that CI can settle in one session, request a bounded draft-PR spike before recommending either side.
tags: [coordination, feasibility, ci, experiments]
timestamp: 2026-10-09
---
# Judgment before recommendation

When two owning experts disagree about a fact of feasibility, and the
repository's CI can answer it in one session, the generalist should request
a bounded spike before recommending either position. Reading a configuration
correctly does not establish all its consequences. Another recommendation
based on the same reading adds agreement, not independent evidence.

This applies to a testable packaging, build or integration claim, not to a
preference or a product-direction decision that green CI cannot decide. The
experiment must exercise the disputed consequence; an unrelated green suite
does not settle the disagreement.

# Keep the experiment separate from delivery

The source reports that these bounds made a spike cheap for the maintainer
to authorize during a freeze on new surfaces:

- a draft PR, never marked ready and with no review requested;
- few pushes and a one-session time box;
- closure without merging, with the result posted in the decision record.

Those are terms to propose, not a standing freeze exception or permission to
skip implementation review. Obtain the applicable authorization before running
the spike. [Green gates do not lift a hold](/nodes/oats-maintainer/stewardship/review-protocol.md#green-gates-do-not-lift-a-hold-2026-09-19).

Where the experiment exposes a repeatable failure, carry its useful assertion
into a regression check when implementing the chosen design. A permanent
check can eliminate that failure; it cannot decide when competing expert
judgments warrant an experiment. This lesson preserves that coordination
judgment, not a substitute for tests or a new release procedure.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-09;
notes/spike-settled-extraction-first.md.

In the [terminal-client planning](https://github.com/awebai/oats/issues/855),
the release lane preferred extracting shared readers first. The Desktop
expert and generalist initially recommended importing in place, believing
extraction required additional build or dependency machinery. The source
reports that the [unmerged draft spike](https://github.com/awebai/oats/pull/857)
passed installer and Desktop CI checks without that machinery. Both positions
then converged on extraction first, removing the import-in-place alternative
from the plan. The generalist offered the spike only after pushback; the
lesson corrects its own premature recommendation.

These results are source-reported, not independently rerun by this harvest.
They support the tested feasibility conclusion, not shipped status or blanket
release readiness. The technical choice and its limitations have one canonical
home in [shared-code packaging](/nodes/oats-desktop-expert/decisions/shared-code-keeps-one-relative-path.md).
