# Stewardship

Owned, dated process knowledge: how the OATS project ships. Each concept names
its owner and its update-on-change rule.

* [How the OATS project ships and reviews](review-protocol.md) - Contributed work reaches main only through PRs judged by the maintainer's four gates against exact heads; reviewers are fresh and ephemeral, tests must agree with the requirement rather than the code, and knowledge PRs get a semantic read.
* [Release judgement for the tag-driven lane](release-traps.md) - Publication is irreversible and idempotent per version, so it runs before fragile housekeeping, is never re-tagged, and is proven only on the installed artifact from outside the checkout; official capability pins follow published tags in the same change, every version literal is a release step, a pin that can lag names its lag, and the runnerless lane is first-class.
* [Cross-workstream delivery: freeze the contract first, adopt then adapt, prove the merge](multi-workstream-delivery.md) - When sibling workstreams block on a shared contract, ship the frozen contract as its own first commit, adopt sibling-owned suites wholesale before re-applying marked adaptations, and prove auto-merges preserved both deltas.
