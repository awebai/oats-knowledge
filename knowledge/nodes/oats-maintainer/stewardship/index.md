# Stewardship

How the OATS project ships: judgement only, each concept with an owner and an
update-on-change rule; procedures live in the oats-expert soul's skills.

* [How the OATS project ships and reviews](review-protocol.md) - Maintainer review binds verdicts to content and recorded decisions, preserves same-area integration evidence inside merge batches, requires timely, safely obtained verification, uses fresh and second readers, and judges tests against requirements rather than implementations.
* [One release lane does the final review, merge and tags; project lanes are defined by their own maintainers](release-lane-and-project-lanes.md) - Besides the single release lane, every lane is a project lane that a maintainer defines on the lane map when its human's work needs it, with no sign-off; inside it the maintainer launches, reviews and names one second reader, and hands approved heads to the release lane.
* [Release judgement for the tag-driven lane](release-traps.md) - Release judgment distinguishes publication from artifact availability, rehearses changed upgrade paths from released state, and treats source, tag, mirror and every form of version pin as one coordinated change.
* [Cross-workstream delivery: freeze the contract first, adopt then adapt, prove the merge](multi-workstream-delivery.md) - When sibling workstreams block on a shared contract, ship the frozen contract as its own first commit, adopt sibling-owned suites wholesale before re-applying marked adaptations, and prove auto-merges preserved both deltas; in a shared package that other lanes release, land a contract stage only with the stage that makes it useful, or revert it when the effort pauses.
