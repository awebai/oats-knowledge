---
type: Lesson
title: Condensing instructions must preserve when each rule is loaded
description: Review instruction moves against the destination skill's load trigger, keep exceptions with their rules, and have an independent reader per capability check the full original rather than trust the condenser's rule list.
tags: [instructions, review, skills, condensation, cross-area]
timestamp: 2026-10-27
---
# Preserved words are not preserved coverage

Moving a rule from an always-loaded inject into a skill changes when the
agent sees it. Calling the move a removed duplicate is justified only if
the destination is loaded in every situation that needs the rule. A rule
can still exist in the package while disappearing from the agent's working
context at precisely the moment it matters.

The source's condensation effort kept a rule list for each capability, yet
independent reviewers found five lost or misplaced rules. The lists had
not omitted the rows: they marked them as kept or duplicate. Among the
reported gaps, release authority disappeared from the path used to tag,
and the solo maintainer's release responsibility moved out of the inject
without a skill that the solo case would load. The defect was the claimed
coverage, not a missing inventory entry.

# Review the situation that loads the rule

For each rule leaving the inject, name the situation that needs it and the
trigger that loads its proposed home. If that path does not load the skill,
keep the rule in the always-loaded text or repair the routing; its presence
somewhere else is not enough. Check exceptions on the same path: wherever a
rule is stated, keep its exception with it so compression does not silently
turn a conditional rule into an absolute one.

Assign an independent reader to each capability being condensed. Have that
reader read the **old text in full** and compare it with the new locations
and triggers, rather than take the condenser's rule list as the review's
source of truth. The list is a useful claim to challenge, not evidence that
the move preserved behavior. This is an instruction-editing check, not a
new requirement for additional reviewers on every kind of PR.

# Canonical boundaries and prevention

[Enumerating the guarantees the old behavior held up](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md)
is the general method. Here the guarantee at risk is contextual instruction
coverage, and even a complete-looking disposition list can misstate it.
The kernel's [composed-instructions lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
owns composition invariants and target availability; this lesson adds the
condensation-specific check that an available skill is actually triggered.

Prefer a single maintained rule home with reliable routing over duplicated
prose that can drift. Tests can pin structural properties such as which
block owns a rule and whether a required skill is available in a composition.
They do not prove that the skill's natural-language trigger covers the
situations the removed inject covered. Put the trigger-and-exception check
in the owning instruction-authoring/review guidance; keep the independent
semantic comparison for what structural tests cannot establish. This
harvest changes no skill and claims no new automated enforcement.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-maintainer-lanes,
2026-10-27; notes/moving-an-always-on-rule-into-a-skill-changes-when-it-fires.md.

The source reports one trim effort in
[awebai/oats-engineering#21](https://github.com/awebai/oats-engineering/pull/21),
with independent per-capability review finding five gaps and all being fixed
before handover. This harvest did not audit the old/new package text or
verify those repairs. The examples explain the failure mode; they neither
redefine maintainer lanes nor establish a measured failure rate for
instruction condensation.
