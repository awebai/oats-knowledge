---
type: Decision
title: The onboarding redesign has one reviewer on Pepe's side, the release lane
description: For the onboarding redesign only, Juan's side decides the design and the release lane alone reviews for Pepe's side, returning changes that are too complicated, too slow or contrary to direction while preserving bilateral contract agreement before build.
tags: [stewardship, onboarding, review, delegation, contracts]
timestamp: 2026-10-30
---
**Owner: oats-maintainer. Update-on-change: whoever changes this effort's
review delegation records the supersession here and on the canonical lane
map or brief in the same change.** This is a bounded decision, not a second
lane roster.

# Decision

On 2026-10-30, Pepe refined the review arrangement for the
[onboarding redesign](https://github.com/awebai/oats/issues/1665):

- **Juan's side decides the design**, including the aweb portion. This is
  responsibility for making the work correct and easy to use, not merely
  implementing a design supplied by Pepe's area lanes.
- **The release lane is the only reviewer on Pepe's side.** Every PR of
  this effort comes there at an exact head with green CI, including PRs
  touching `lane:product` or `lane:setup`. Those area lanes do not supply
  an additional read; the delegation permits these PRs to merge without
  that read. It does not remove review on Juan's side or give a project
  lane independent final merge authority.
- **The release verdict is APPROVE or RETURN.** Excessive complexity or
  slowness is a reason to return the change, as is conflict with direction
  or architecture. Correctness remains part of review; delegated design
  does not make the release lane's verdict automatic.
- **Both sides still decide a new OATS contract before it is built.** The
  release lane's published interpretation of the direction is that it
  alone represents Pepe's side in that agreement, replacing the earlier
  participation of `lane:product`. This is the source maintainer's stated
  reading of the human direction, not a separately quoted human decision
  on each contract. It does not establish that any particular contract has
  already been agreed.

This applies **only to this onboarding effort, until Pepe says otherwise**.
The lane map's arrangement for other `lane:juan` PRs is unchanged. The
source's rationale for recording the refinement is that a successor reading
only the earlier map would request redundant area-lane reads and miss the
explicit complexity and speed grounds for returning a change.

# Supersession and preserved boundaries

This supersedes only the reviewer assignments in the earlier
[onboarding delegation](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30):
area-lane review on Pepe's side, and release-plus-product participation on
that side in contract decisions. The old concept marks those terms as
superseded and retains the original acceptance history. The general
[one-second-reader rationale](/nodes/oats-maintainer/stewardship/review-protocol.md#peer-maintainers-own-lanes-each-pr-gets-one-second-reader-2026-10-13)
and bilateral contract-before-build boundary are not removed.

The existing onboarding-only release delegation remains: the release lane
tags and deploys this work as it lands after approval, without asking Pepe
again each time. That authority and its acceptance history remain in the
[earlier delegation](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30),
not a new general release grant here. Every other kernel tag still needs
his direct go, and every other deploy his word. Head-bound review, CI and
the usual verification gates remain.

The architectural review bar remains
[optional, provider-neutral human attribution with no-human compatibility](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md),
with onboarding skills and flows matching the design. Earlier accepted
product-lane comments on this effort's specifications still bind the PRs;
removing that lane from the review queue does not erase its accepted
constraints. No particular aweb design choice, harvester removal or other
supersession of human-accepted direction is authorized by this delegation
alone.

# Acceptance and evidence limits

Acceptance is **source-reported**: Pepe, directly in the release lane's
session on 2026-10-30. The source cites the later direction excluding other
maintainers on his side and assigning the release lane the sign-off/return
and deployment responsibility. This is the same human whose earlier
effort-specific delegation is being refined.

The [release lane's relay](https://github.com/awebai/oats/issues/1665#issuecomment-6528565610)
was read during harvest on 2026-10-30. It exists under `josep-reyero` and
presents itself as the release lane reporting Pepe's direct words, followed
by the lane's interpretation. It confirms the claimed sole-reader routing,
design responsibility, return grounds, contract-participant interpretation
and continued release responsibility. Record this as **source-reported
(relay at that comment)**, not verified human authorship. The private
session was not inspected. This harvest certifies neither a settled
bilateral contract nor implementation, release or deployment.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-30; notes/onboarding-redesign-juans-side-builds.md.
