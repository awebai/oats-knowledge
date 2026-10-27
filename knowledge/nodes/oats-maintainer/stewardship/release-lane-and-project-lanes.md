---
type: Decision
title: One release lane does the final review, merge and tags; project lanes are defined by their own maintainers
description: One release lane owns final review, merge and tags; maintainers define project lanes without sign-off and hand over approved heads, while child overflow seats add execution capacity without a second accountable authority.
tags: [stewardship, lanes, release, review, process, multi-human]
timestamp: 2026-10-27
---
**Owner: oats-maintainer. Update-on-change: whoever changes the lane map's
rules, the release lane's ownership or the second-reader rule revises this
concept in the same change.** The lane map itself lives in the repository
with the release lane, not here.

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

# Overflow adds capacity, not another authority (2026-10-27)

The source reports direct acceptance by the lane's human on 2026-10-27 of
help **as the lane maintainer's child**, after the other human's side
objected to an independent second maintainer. With more than five efforts
in flight, the lane maintainer can spawn an overflow seat:

- it is listed inside the parent's lane-map entry, with no entry of its own;
- it drives its assigned efforts through specs, developers and PRs up to
  hand-back;
- it has no merge, second-read, sign-off-request or contract-answer
  authority, and never spawns another overflow seat;
- its parent retires it like a finished child; it does not retire itself
  when idle.

One accountable maintainer per human per lane still holds. The parent keeps
those review and coordination responsibilities; this does **not** give a
project-lane parent the final merge or tag authority reserved above for the
release lane. The accepted cost is that review and merge load is not relieved:
this delegation relieves launching and tracking instead.

This refines the one-maintainer rule, not the release-lane boundary. The
rejected equal-authority second maintainer would split accountability and
conflict with the existing newcomer-stands-down and lane-split rules.
Idle self-retirement was also rejected: it was not part of the human's
request and would turn extra capacity into a separate lifecycle authority.
The operating terms belong in the lane map and maintainer skills, not a
second roster here.

The source's later overflow note records the child-form acceptance; the
scope-gate note still contains the earlier objection and pending-decision
stage. At proposal time the amended map bullet and skill text were not yet
edited or merged. This records the reported decision and its rationale,
not completed implementation or a release.

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

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/overflow-maintainer-is-a-child.md;
notes/injection-effort-scope-gate.md. The source reports the human's direct
acceptance of the child form and the other side's agreement to that form of
the [lane-map amendment](https://github.com/awebai/oats/issues/1566).
This harvest did not independently audit that acceptance or the amendment.
