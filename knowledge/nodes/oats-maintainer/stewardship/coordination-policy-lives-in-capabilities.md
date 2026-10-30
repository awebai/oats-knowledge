---
type: Decision
title: Coordination policy lives in capabilities, not in the kernel or oats.core
description: Review keeps coordination policy in composed capabilities; OATS delegates finished-child cleanup to parents and parentless-lead cleanup to the lead, reserving human-facing lifecycle messages for required decisions, approvals or input.
tags: [stewardship, coordination, capabilities, instructions, retirement]
timestamp: 2026-10-30
---
**Owner: oats-maintainer. Update-on-change: whoever changes this coordination
boundary records the new decision and its rationale here.**

# Decision and rationale

The source reports product-owner direction on 2026-10-27 applying the
capability boundary to automatic retirement as well as shared-work flags.
The kernel and `oats.core` supply and neutrally describe mechanisms; the
team's composed capabilities decide when its agents use them. For OATS's
engineering process, guidance about when a parent retires finished children
belongs in `oats.engineering`, not in `oats.core` or kernel instructions.

This is not a flag-specific exception. Putting a team's coordination policy
in generally composed operating instructions imposes that process on souls
that never selected it. Keeping the mechanism neutral lets teams compose
different processes without teaching contradictory rules in the common layer.
It applies the existing
[kernel/capability responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
the [shared-work decision](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
remains the canonical home of that flag's semantics and engineering convention.

# Review consequence

When a change adds guidance about **when** to act to a kernel block or
`oats.core`, distinguish a mechanism's requirements from a coordination
policy. Move the latter to the capability that owns the process. Core may
need an authority clarification so a composed capability can authorize the
action alongside a task or the human, but that clarification must not teach
the capability's policy itself or independently authorize an action.

The rejected retirement design placed a mandatory parent-retirement rule in
the core inject and a checklist defining finished work in `oats-operate`.
Moving only the checklist out would leave the policy in the wrong layer.
Neutral documentation of the retire mechanism is not the rejected policy;
this decision does not remove lifecycle operations or their safety requirements.

The operating review belongs in the maintainer's `direction-gate` skill.
Structural composition tests should check which capability owns a protocol;
semantic neutrality still needs review, as the
[composed-text lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
explains. This harvest changes no skill and claims no new enforcement.

# OATS delegates finished-worker retirement (2026-10-27)

The source reports that the release lane's human directed this division of
responsibility and directly confirmed it to the source maintainer that day:

- Experts retire their own developers once the developer's work has merged.
- A lane maintainer retires its own child experts once their effort is done
  and its PRs have merged; the parentless case follows the explicit
  2026-10-28 supersession below.
- Neither waits for a new human request for each such retirement.

The reason is operational ownership, not eagerness to delete instances:
waiting for the human to initiate each cleanup had left finished workers
running. The retirement/resume incident made that backlog more visible but
is not the basis of the delegation. The maintainer closes its own lane's
finished effort rather than making routine cleanup another human queue.

This is OATS's engineering policy, not a universal rule for all souls or
permission over unrelated instances. It adds the delegation to the existing
capability-placement decision without moving policy into the kernel or
`oats.core`. Operational conditions and the cleanup procedure belong in the
composed engineering/maintainer guidance (`keep-it-clean`), not in a second
checklist here. The applicable lifecycle, work-preservation and knowledge
capability requirements still apply; merged work does not waive a refusal.
This record does not establish that the policy has shipped into every home.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/retire-authority.md. Human acceptance and the reported
same-day use are source-reported, not independently audited correspondence.

## Human-spawned leads and standing maintainers

**Supersession, 2026-10-28.** The earlier, human-directed assignment recorded
on 2026-10-27 made the reporting lane's maintainer retire a finished lead
spawned directly by that lane's human, even without an OATS parent. That
assignment is superseded: in OATS's engineering process a finished lead with
no OATS parent sends its done line to the maintainer it reports to and then
retires itself. This covers both a directly human-started lead and a lead
spawned with an unrelated relation. A maintainer retires only its own
children, not a non-child lead merely because the lead reports to it.

The source reports direct product-owner acceptance on 2026-10-28 of this
self-retirement option on the source's recommendation. It reaches the same
no-human-cleanup outcome with one rule for parentless leads while preserving
the own-children-only boundary for retiring another instance. The rejected
alternative retained maintainer retirement of a non-child lead: it needed a
second retirement path and conflicted with that boundary. Leaving a finished
parentless lead waiting for the human is not the replacement policy.

Standing lane maintainers remain excluded: they are long-running lane owners,
not finished effort leads, and leave only under their own lane-leaving rules.
The supersession changes who performs finished-lead cleanup, not its
finished-work, lifecycle, preservation or knowledge gates. It grants no
power over unrelated instances and is not universal policy for every soul.
The procedure remains in composed engineering/maintainer guidance, not a
new core rule or a second operational checklist here.

Historical evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/maintainers-retire-finished-experts.md. The source attributed
the former bounded assignment to the release lane's human, relayed through
that lane; that acceptance record is retained, not silently rewritten.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-28;
notes/maintainers-retire-finished-experts.md.

This explicitly replaces a human-accepted assignment. Acceptance is
**source-reported (relay at
[awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28#issuecomment-6468930552))**,
checked at maintainer review on 2026-10-30. The relay sets this option against
the 2026-10-27 assignment, names that assignment as the same human's rule and
reports the human leaving the choice to the source's recommendation. It is the
source's report of that session, not the human's own record.

# Human communication is for required action (2026-10-28)

The source reports direct product-owner direction that routine spawning,
finished-worker cleanup and completion reporting should remain between
agents. A human should hear what they must decide, approve or provide, not
receive a progress report solely because they originally requested the
work. Done lines go to the parent agent, or for a parentless lead to its
reporting maintainer; reporting to a maintainer does not make that maintainer
its OATS parent or transfer the lead's self-retirement duty.

This extends the retirement rationale to the surrounding guidance: removing
per-retire permission requests is insufficient if routine requester notices
recreate the same human coordination queue. Review requester-facing language
for whether it asks for a real human action. Routine outcome and launched-lead
notices go to agent requesters; an actual need for a human to start a stopped
maintainer, deal with a new standing maintainer seat, or act on cross-lane
routing remains visible. The test is required action, not the label of the
notice. It neither suppresses failures needing human help nor removes
standing-maintainer lane-leaving rules.

Keep this policy separate from authority. The task, human or composed
capability must authorize a spawn; a capability-authorized helper does not
need a fresh human permission round solely because it is a spawn. Resolve
an unclear relation with the parent or task-giving agent before escalating
the remaining uncertainty to the human. Neutral core authority documentation
can support this without adopting OATS's communication policy.

This is not a never-wait mandate and does not override an explicit approval,
direction, safety or preservation gate. It does not change cross-side review
or hold rules, which remain governed by the
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md).
The review judgment belongs in the existing `direction-gate` skill and the
operational routing in composed engineering guidance, not a parallel
knowledge procedure; no new skill or enforcement is delivered here.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-28;
notes/maintainers-retire-finished-experts.md. The product-owner direction is
source-reported, not independently audited correspondence.

The source identifies merged changes in
[awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28),
[#29](https://github.com/awebai/oats-engineering/pull/29) and
[awebai/oats#1621](https://github.com/awebai/oats/pull/1621), but explicitly says
they were not yet released or deployed at proposal time. These are
source-reported implementation references, not this harvest's verification
of shipment or the instructions present in any home.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-27; notes/coordination-policy-lives-in-capabilities.md.

For the original 2026-10-27 capability-placement decision, the source
attributes the retirement direction to the product owner, relayed by the lead
during [awebai/oats#1580](https://github.com/awebai/oats/pull/1580), and
distinguishes it from the earlier shared-work direction. Acceptance is
source-reported, not independently audited here. At that earlier capture the
core change and engineering retirement change were not yet merged. The
2026-10-28 evidence above separately records the later source-reported state.
This records decisions and rejected designs, not a live shipment ledger, an
operational retirement checklist or permission to retire any particular
instance.
