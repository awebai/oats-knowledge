---
type: Decision
title: One release lane does the final review, merge and tags; project lanes are defined by their own maintainers
description: One release lane owns final review, merge and tags; maintainers define project lanes without sign-off, launch, review and name one second reader inside them, route package follow-ups by the lane map rather than by who opened the PR, and hand approved heads to the release lane.
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

# One product lane replaces separate kernel and Desktop lanes (2026-10-28)

The source reports that the release lane's human chose `lane:product` on
2026-10-28, replacing `lane:kernel` and `lane:desktop`, with one maintainer
per human for the combined area instead of one per former lane; further
capacity for open-feature load is the map's overflow seat. The choice joins
kernel/CLI work with its Desktop, TUI and shared-client consumers, including the
Omarchy integration. The current lane map owns the exact coverage and
staffing; this is the decision record, not another roster.

The source's rationale is that contract and client changes repeatedly cross
that boundary: separate lanes require repeated cross-lane second reads,
whereas one maintainer can carry the contract and its consumers together.
This explanation, and the counterfactual of keeping two lanes with a kernel
reader on contract-touching Desktop PRs, are **the source maintainer's
interpretation**, not separately evidenced human reasoning or an explicitly
human-rejected alternative.

This supersedes the two-lane split, not its recorded release arrangement.
The source reports that the combined lane retains the earlier lanes'
permission to merge only after release-lane sign-off, with the release lane
as second reader; Omarchy tags also stay with the release lane. This is the
existing-arrangements qualification above, not new independent merge or tag
authority for every project lane. Adding maintainers for workload creates
no further release authority; this record does not decide the separate
overflow-seat operating terms.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-28; notes/product-lane-replaces-kernel-and-desktop.md. The source
attributes the choice to the release lane's human, relayed by that lane,
and identifies the [lane map](https://github.com/awebai/oats/issues/1566)
and [soul-list update](https://github.com/awebai/oats/pull/1624). Acceptance,
the preserved arrangement and those updates are source-reported, not
independently audited correspondence or implementation receipts.

Verified by the knowledge maintainer at review on 2026-10-28: the lane map on
[awebai/oats#1566](https://github.com/awebai/oats/issues/1566) records
`lane:product` opened on 2026-10-28 on a human's recorded word, replacing
`lane:kernel` and `lane:desktop`, merging once the release lane has signed
off at that head, with the release lane's maintainer as second reader
and awebai/oats-omarchy tags staying with the release lane; the
[soul-list update](https://github.com/awebai/oats/pull/1624) is merged. The
human's choice is therefore publicly recorded, not only source-reported. It
changes an earlier lane's arrangement, which the 2026-10-26 decision above
leaves to the humans; that decision itself is unchanged, not superseded. The
rationale paragraph above remains the source's interpretation.

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

This is a maintainer lesson from source-reported experience, not part of
the human-accepted 2026-10-26 decision above. It applies that decision's
inside-your-lane boundary; it changes neither who may define a project lane
nor the release lane's final gate. The
[cross-workstream delivery lesson](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#independence-needs-write-surfaces-not-titles-2026-09-20)
owns the broader requirement for explicit write surfaces and an accountable
integration lead. Here the additional judgment is that PR authorship is not
routing authority. Keep the map as one source of assignment; lane-aware
launch checks could prevent duplicate allocation. Until such enforcement
exists, the check belongs in the maintainer's launch and handoff guidance,
not a second roster or a kernel-wide coordination policy. No new enforcement
or skill change is claimed here.

# Record changed lane practice on the map in the same session (2026-10-28)

When an authorized change alters who merges, where a lane's PRs come from
or who supplies its second read, record it on the canonical lane map in the
same session, through the map's owner and existing review path. A private
working log is not enough: successors and authors of maintainer guidance
use the map, so an unrecorded change can be replaced by the old rule when
that guidance is refreshed. Preserve a dated reference to the decision and
its scope, not a verbatim copy of private correspondence.

The source reports that a changed merge arrangement was logged privately
on 2026-10-19 but omitted from the map. On 2026-10-27, both a soul draft and
a map draft repeated the old arrangement; a second read caught it. The
lesson is the publication gap, not the historical lane assignment. It
neither authorizes a new arrangement nor changes the release lane's map,
merge or tag authority.

Prefer guidance that points to the map over duplicated operating rules;
where a copy is necessary, make reconciliation with the canonical decision
part of the guidance change. A map-update check belongs in maintainer
handoff and policy-change guidance. Semantic agreement still needs review;
no automated freshness check or skill change is claimed here.

Evidence: OKF proposal from oats-maintainer/pepe-lfx-maintainer, 2026-10-28; notes/lanes-release-and-projects.md.

The dates, omission and later correction are source-reported from one
incident. This harvest did not inspect private logs or correspondence and
does not certify the underlying arrangement as current policy.

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
