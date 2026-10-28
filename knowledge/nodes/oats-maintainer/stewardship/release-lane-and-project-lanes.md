---
type: Decision
title: One release lane does the final review, merge and tags; project lanes are defined by their own maintainers
description: One release lane owns final review, merge and tags; maintainers define project lanes without sign-off, route package follow-ups by the lane map rather than by who opened the PR, and hand approved heads to the release lane.
tags: [stewardship, lanes, release, review, process, multi-human]
timestamp: 2026-10-28
---
**Owner: oats-maintainer. Update-on-change: whoever changes the lane map's
rules, the routing judgment, the release lane's ownership or the
second-reader rule revises this concept in the same change.** The lane map
itself lives in the repository with the release lane, not here.

# Decision

Decided by the release lane's human on 2026-10-26 on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103), relayed by
the release lane, after a new maintainer on a third human's machine asked
for a lane.

- **One release lane.** It does the final review, the merge and every tag,
  and keeps the lane map. The default branch is protected by this one
  final-review gate.
- **Every other lane is a project lane.** A maintainer defines one by adding
  its line to the map (name, label `lane:<name>`, what it covers, its
  maintainers, its human) and labelling its PRs. No sign-off is needed; a
  human may launch maintainers into it.
- **Inside its lane** the maintainer launches work, reviews, and gets each PR
  its one second reader; at the approved head it hands the PR to the release
  lane.
- Contracts are still decided before they are built, whatever the lane.
  Earlier lanes keep their recorded arrangements until their humans change
  them.

# Why

The earlier lane model made every new human's side a decision of the release
lane's human: a new maintainer asked the release lane which lane was its own,
and a third human joining with their own machine and goals had to wait for a
lane assignment by hand. What protects the default branch is the single
final-review gate, not centralising who defines the project lanes above it.
Any deployment that composes `oats.maintainer` with several humans meets the
same situation.

# Route package follow-ups by repository ownership (2026-10-28)

Opening a package-repository PR as part of a project effort does not make
that effort's lane the owner of subsequent work on the PR. Before launching
a follow-up lead, check the repository's lane in the current map and that
lane's open efforts. Route the follow-up to its maintainer; if an effort
already covers it, hand over the PR, its head and the requested work rather
than launching a second lead.

The source reports that package-repository work belonged to `lane:setup`
on 2026-10-28. Two lanes nevertheless assigned leads to the same package PR
because one lane's earlier effort had opened it. The overlap required a
handoff and withdrawal of the duplicate effort. The lesson is to resolve
ownership **before launch**, not to synchronize two implementations after
they have started. The lane map remains authoritative for assignments;
this dated example is not a permanent package-to-lane roster.

This applies the existing inside-your-lane boundary; it changes neither
who may define a project lane nor the release lane's final gate. The
[cross-workstream delivery lesson](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#independence-needs-write-surfaces-not-titles-2026-09-20)
owns the broader requirement for explicit write surfaces and an accountable
integration lead. Here the additional judgment is that PR authorship is not
routing authority. Keep the map as one source of assignment; lane-aware
launch checks could prevent duplicate allocation. Until such enforcement
exists, the check belongs in the maintainer's launch and handoff guidance,
not a second roster or a kernel-wide coordination policy. No new enforcement
or skill change is claimed here.

# What this supersedes and what it keeps

Supersedes the rule that a new maintainer asks the release lane (the keeper
of the map) which lane is its own, as recorded in the lane model on
awebai/oats#1103 and in the repository's lane documentation. At the time of
recording, the knowledge base held no such sentence: the pending lane-owned
review refinement in
[how the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md)
records one accountable maintainer per lane and one second reader per PR,
and this decision **refines, not removes,** both: one second reader per PR
and release ownership by the release lane are unchanged.
[Release judgement](/nodes/oats-maintainer/stewardship/release-traps.md)
remains the release lane's.

# Citations

Evidence: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer,
2026-10-26; notes/project-lanes-defined-by-maintainers.md. The source reports
the human's words relayed by the release lane in a comment on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103) and the first
project lane defined by its own maintainer the same day. Acceptance and the
map edit are source-reported, not independently verified by this harvest.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-28; notes/package-repo-work-routes-to-lane-setup.md. The source
identifies [awebai/oats-okf#113](https://github.com/awebai/oats-okf/pull/113)
as the overlap and [awebai/oats#1566](https://github.com/awebai/oats/issues/1566)
as the lane map. The assignment, overlap and handoff are source-reported;
this harvest did not audit the map or private correspondence, and does not
claim fresh human acceptance, implementation or release.
