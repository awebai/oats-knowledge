---
type: Lesson
title: Engineering layer neutrality needs package-side checks
description: A provider-specific instruction can pass engineering-package CI yet fail the later OATS mirror gate, so review preserves layer-neutral wording until the package enforces that boundary itself.
tags: [review, capabilities, composition, ci, release]
timestamp: 2026-10-28
---
# A green package check can miss a downstream instruction constraint

The source reports a maintainer coherence rule for `oats.engineering`:
expert, developer, code-review and maintainer guidance must compose with
any knowledge or messaging layer, including none. Their injects and skills
therefore defer harvest and communication duties to the selected layer;
they do not prescribe a particular provider's command. Core OATS operations
are not excluded by this rule.

The reason is composition, not vocabulary preference. Putting a knowledge
provider's inspection command inside the definition of finished work makes
that provider an undeclared prerequisite for an otherwise general role.
The [capability-owned coordination decision](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
keeps team policy out of neutral core mechanisms; this lesson addresses the
other boundary, where the selected engineering policy must still avoid
assuming a different optional layer's implementation.

On 2026-10-28 the source reports that OATS's `test/capabilities.test.mjs`
checked this neutrality against the engineering mirrors, while the package's
own CI and validation did not. A finished-work instruction naming
`oats okf status` passed package review and reached engineering 1.17.0, but
broke 0.69.4 release preparation and required a package patch. Green package
CI therefore was not evidence that the later mirror-and-pin gate would pass.
This is a dated coverage gap, not a permanent inventory of either CI system.

# Prevention first; review as the temporary guard

Prefer one layer-owned definition and layer-neutral references to it rather
than an engineering copy of a provider-specific procedure. Carry the
neutrality check into engineering's own validation/CI, or run the relevant
OATS mirror check against the candidate before its package release. Verify
current coverage before relying on the dated gap. These are elimination
routes, not enforcement delivered by this lesson.

Until that boundary is covered at the package gate, review the engineering
injects and skills for provider commands. The source's concrete guard is to
search for `\baw\b` and `\boats okf\b`, return offending instructions for
correction, and phrase the duty in terms of what the selected knowledge or
messaging layer requires. This is a bounded temporary review check, not a
new universal command ban or proof that those two patterns catch every
provider assumption. Residual judgment belongs in the maintainer's existing
review guidance, not a permanently separate release checklist.

The generalist's [cross-capability composed review](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md)
owns planning the wider read and routing contradictions. This lesson adds
the package-versus-consumer enforcement gap; it does not duplicate that
planning rule or redefine [release ordering](/nodes/oats-maintainer/stewardship/release-traps.md).

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-28; notes/engineering-capabilities-name-no-layer-command.md.

The source identifies [awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28)
as the introduction and [#32](https://github.com/awebai/oats-engineering/pull/32)
as the 1.17.2 correction. The ruling, CI coverage, release-prep failure and
repair are source-reported; this harvest did not inspect those repositories
or reproduce their checks. No new test, skill edit, release or deployed-home
update is claimed here.
