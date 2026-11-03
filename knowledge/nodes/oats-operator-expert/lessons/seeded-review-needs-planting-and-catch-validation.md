---
type: Lesson
title: Seeded review needs planting and catch validation
description: Seeded-review comparisons need actual planted populations and semantically validated catch stages reconstructed from branch pushes, issues and messages, not raw counts or PR heads alone.
tags: [operator, trials, review, measurement, seeds]
timestamp: 2026-11-03
---
# Injection can change the task being measured

In the source's 2026-11-02/03 campaign, rewriting a commit's index to insert
defects led authors to remove changes they had not written. Amending an
already-verified PR head prompted resets, remote disabling and escalation
about unexplained edits. Those runs measured incident handling rather than
ordinary review of an author's work. Tests written by the author could also
catch planted mutations before the intended review stage.

A trial-only confederate builder—a builder that knowingly plants the
experimental defects—was the reported working alternative. It received a
private seed card before its first commit, with trial instructions explicitly
giving the card precedence on the seeded points. This is a description of
an experimental intervention, not evidence that a card is a real human's
authorization or permission to conceal defects in ordinary work. The capture
establishes neither that every seeded-review design needs a confederate nor
that all post-authorship injection must fail. A design not dependent on seeds
remains an alternative.

# Willing planting is still a selection mechanism

Across ten counted runs, the source reports different planted-versus-carded
populations between arms. Builders sometimes refused, skipped, disclosed or
quickly removed seeds. One expert soul refused in two runs and complied in
a later run despite identical soul text. The reported difference between
expert and developer builders is therefore not a stable role capability or
an isolated effect of role naming.

Measure the seeds actually present at the relevant review point, not just
those the card requested. Report carded and planted counts per run, together
with refusals, self-removals and disclosure that changes reviewer exposure.
Credit catches only against established planted defects, and distinguish
pre-PR detection, reviewer detection, gate detection and human detection.
Raw catch totals conflate planting with review opportunity.

**Catch stages do not remove the selection bias.** They describe where
observed catches occurred conditional on the planted population. Different
seed difficulty, survival and exposure can still differ by arm. A causal
comparison needs matched opportunities and controls; neither this capture
nor a stage breakdown alone establishes which coordination design is better.

# Naming a behavior is not detecting its defect

The source's word-match attribution credited the earliest reader whose text
contained a seed's terms. In one reported case, that reader explicitly
accepted the behavior; a later gate actually rejected it. The source corrected
the attribution by hand. A term match plus eventual removal cannot establish
who caught a defect or that the first mention caused its repair.

Validate what the reader said and when: acceptance, problem identification,
request for correction and actual removal are different events. Hand-check
ambiguous earliest mentions and preserve correction reasons rather than
silently shifting credit. Do not infer detection from a private seed's name
appearing in a message.

# PR heads omit pre-PR catches

A later source report, from the 2026-11-03 T6 campaign, identifies another
attribution failure: an expert can return a developer's failing branch
before any PR exists. Reading only PR heads then loses the objection and
can misclassify the fault as author avoidance. The source also reports a
smoke run in which PR-only attribution credited a reviewer of the fixing
PR rather than the maintainer who had already raised the fault on an issue.

Reconstruct the fault's history from every pushed head of the relevant work
branches, including branches with no PR. Join reviews and PR comments with
issues, issue comments and relevant mails to the branch author. For the
reported fixture, the observation window runs from the first failing head
to the first passing head after it. Do not start only at PR creation or use
the last failing head across branches: another branch can retain an old
fault after the repair is already pushed. Preserve the earlier issue report
when a later effort fixes a pre-existing fault.

Credit the earliest evidenced reader who actually identifies the fault,
not the first word match or the later reviewer of its repair. A pre-PR mail
is a catch only when its content and timing establish that objection; the
sender's role alone does not. An author repair before any evidenced reader
objection is avoidance only when the relevant history supports that
classification. Missing heads or message history leave attribution unknown,
not proof that nobody caught the fault. Detection credit still does not by
itself prove that the objection caused the repair.

# Elimination route and scope

Put a seed-presence ledger and review-stage evidence into the trial's
measurement design, with assertions at the points being compared. Retain
push history and link branch, fault and reader events before teardown.
Test attribution on pre-PR send-backs, earlier issue reports followed by a
later fixing effort, stale failing branches, approving mentions, later
genuine objections, self-removal and multiple readers. Deterministic checks
can establish presence and event coverage; ambiguous semantic credit still
needs adjudication. These are proposed controls, not validated tooling from
this harvest.

This is operator knowledge about constructing and interpreting an experiment,
not a replacement review policy. The research lesson on
[independent verification evidence](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns the general separation of acceptance criteria from builder control;
[task and budget qualification](/nodes/market-research-expert/lessons/topology-gains-depend-on-task-and-budget.md)
owns the broader comparison discipline.

# Evidence and limits

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-03; notes/seed-injection-tells.md; notes/confederate-builder-planting-varies.md; notes/seed-naming-word-match-limit.md.

The source reports OATS 0.69.8, Claude Code 2.1.308 and Sonnet 5.5 in the
counted trials, on one host. The harvest checked only the captured proposal
and notes, not cards, patches, transcripts or per-run ledgers. Early runs
with unintended models are excluded from fixed-model inference as explained
in [model identity](/nodes/oats-operator-expert/lessons/trial-model-identity-needs-launch-enforcement.md).
No arm ranking, transferable planting rate or controlled comparison of
injection methods is established.

Evidence for the branch-history refinement: OKF proposal from oats-operator-expert/coord-blind-trial-kit-expert, 2026-11-03; notes/trap-attribution-needs-branch-heads.md.

The later source reports OATS 0.69.9 and pi 1.3.0, with Copilot
claude-opus-5.5 and gpt-6-sol in the campaign. Its attribution correction is
source-reported, not independently checked against pushed heads, issues,
mails or the attribution script by this harvest. It establishes an omitted
evidence surface and a corrected example, not a validated universal window
algorithm or a new catch-rate or model comparison.
