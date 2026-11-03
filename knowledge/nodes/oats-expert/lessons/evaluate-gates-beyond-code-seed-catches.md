---
type: Lesson
title: Evaluate merge gates beyond code-seed catches
description: A small coordination trial attributed few code-seed catches to the merge gate but surfaced direction and evidence-checking work, so compare those duties and human burden separately before choosing a gate design.
tags: [coordination, trials, review, gates, human-oversight]
timestamp: 2026-11-03
---
# Match the experiment to the gate's job

A code-defect trial can show where its planted defects were caught without
measuring all the work a direction, product or evidence gate performs. For
a lead comparing coordination designs, separate implementation review,
early direction review, merge-time judgment and the checks left to the
human. A low incremental code-catch count is not evidence that the gate is
useless; moving those checks to the human is not removing their cost.

The 2026-11-02/03 source report describes ten counted runs on real OATS
instances in scratch deployments with local forge and messaging:

| Condition | Runs | Source-reported observation |
| --- | --- | --- |
| Existing-role control | 3 | Code seeds were caught before the PR, through developer review and expert verification. |
| Variant with read-only PR reviewer, launch check and merge gate | 3 | The reviewer was credited with 36 of 41 code seeds and the gate with one; one late direction/product refusal was reported. |
| Variant without the launch check | 3 | Three late refusals were reported. |
| Variant without any gate | 1 | The scripted human returned three premature or author-supplied review requests and took on the evidence check. |

Here **launch check means review of the proposed work from its plan brief**,
not an OATS process-launch readiness check. The source reports every arm
shipped both efforts, including a cross-repository contract change, with no
escaped planted seed. The campaign also required handoff rescues, described
in [overdue handbacks and missing wakes](/nodes/oats-expert/lessons/overdue-handbacks-need-a-record-check.md).
Completion after intervention is not unassisted workflow success, and no
escaped planted seed is not proof of defect-free code.

# Keep the human accounting and timing visible

The source reports about 9–11 human minutes for the launch-check variant,
against 18 minutes and seven requests in the single no-gate run. The latter
included requests before independent review and author-controlled evidence
that the scripted human rejected. The existing-role control was reported at
about 4–7 minutes; the variant required the human to approve each plan and
the reserved contract merge. Thus the comparison is not simply "adding a
gate halves human time": different arms assigned different duties.

These are the trial's **scripted-human accounting**, not observed time saved
for real users. The capture contains no per-request ledger or full timing
method. Three late refusals without a launch check versus one with it is a
reported outcome count, not an isolated causal estimate of an early gate's
benefit. The single no-gate run cannot establish a typical doubling. The
source's small, overlapping cost ranges likewise do not select a cheaper
architecture.

# What the next comparison should establish

Before using trial outcomes to choose a gate, write an evaluation contract
that measures the intended duties separately:

- Implementation defects versus deviations from the approved direction or
  unwanted product work; code seeds alone under-sample the latter duties.
- When an objection appears and how much work precedes it, rather than only
  whether the final change ships.
- Who supplies acceptance evidence, who checks it and which requests reach
  the human; a separate reader and author-controlled evidence are distinct.
- Planted opportunities and catch attribution, alongside human requests,
  accounting assumptions and rescue interventions. Unequal planted
  populations or self-removal can change catch shares without changing
  review quality;
  [seeded-review measurement](/nodes/oats-operator-expert/lessons/seeded-review-needs-planting-and-catch-validation.md)
  owns how to plant seeds and credit catches.

The elimination route is explicit outcome definitions and per-stage evidence
in the trial harness, with controls for planted populations and attribution,
followed by separately reviewed coordination guidance. These are evaluation
requirements to implement, not tooling or a replacement gate certified here.
The research records on
[oversight timing](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
and [independent verification evidence](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
own the broader research, not these local trial observations.

# Evidence and decision boundary

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-03; notes/t1-first-comparison-gate-catches-little-on-code-seeds.md.

The source identifies Claude Sonnet 5.5, small local seeds, two efforts per
run and a scripted human. Only the captured proposal and named note were
read; no kit, transcript, patch, model-startup record or per-run metrics were
inspected, and no trial was repeated. Planting compliance differed between
builders, so the 41-seed catch breakdown is conditional on the source's
reported population, not a transferable detection rate or a role ranking.
No statistical uncertainty or controlled separation of all arm differences
is available in the capture.

This lesson informs the lead's evaluation practice. It does not choose the
pending gate design, remove a reviewer, supersede the
[lead's integrated-plan direction](/nodes/oats-expert/decisions/lead-expert-authors-the-cross-area-plan.md)
or change [maintainer review authority](/nodes/oats-maintainer/stewardship/review-protocol.md).
The source explicitly proposes evidence, not human acceptance of those
choices. Adoption belongs to the
[coordination redesign](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md)
and its owners.
