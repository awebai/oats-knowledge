---
type: Decision
title: One release lane does the final review, merge and tags; project lanes are defined by their own maintainers
description: Besides the single release lane, every lane is a project lane that a maintainer defines on the lane map when its human's work needs it, with no sign-off; inside it the maintainer launches, reviews and names one second reader, and hands approved heads to the release lane.
tags: [stewardship, lanes, release, review, process, multi-human]
timestamp: 2026-10-26
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
