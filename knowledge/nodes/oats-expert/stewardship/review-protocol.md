---
type: Lesson
title: How the OATS project ships and reviews
description: Contributed work reaches main only through PRs judged by the maintainer's four gates against exact heads; reviewers are fresh and ephemeral, tests must agree with the requirement rather than the code, and knowledge PRs get a semantic read.
tags: [stewardship, review, pull-requests, process]
timestamp: 2026-09-22
---
**Owner: oats-expert (the PR gate). Origin 2026-07-21; consolidated 2026-09-06; extended 2026-09-21; trimmed of test mechanics 2026-09-22.
Update-on-change: whoever changes the review skill, the repository gate, or
the delivery flow revises this concept in the same change.**

# The flow (decided with the founder 2026-07-21)

Contributed work — from helper instances, package maintainers or outside
contributors — reaches `main` **only through pull requests**. The maintainer
soul commits its own stewardship directly, because the gate exists to review
contributed work, not to slow stewardship; framework behaviour changes still go
to the human first. This 2026-07-21 rule stands; the knowledge base itself is
the one stewardship surface that moved to PR-only learning (custody decision,
[external knowledge custody](/nodes/oats-expert/decisions/external-knowledge-custody.md)),
and a later decision that extends PR-only to other stewardship commits must
name this paragraph as superseded. Enforcement is discipline plus the
maintainer gate, not git hooks, consistent with OATS not being a sandbox.

# Orient on a verified tree before trusting what it says (2026-09-19)

Repository-resident state read through a **shared** checkout is nobody's to
keep current and reports nothing about its own staleness: every concept
parses, the validator passes, and an old timestamp is indistinguishable from
one that simply has not needed changing. A stewardship or roadmap concept is
the worst case — an old copy reads as a confident statement about the present.
Establish the tree's position against the remote (fetch-only, which changes
no branch, index or file) before reading it for content; in a shared checkout
report the gap rather than fast-forwarding another owner's tree. Under
external custody the same rule applies to any repository-resident state a
maintainer relies on; the knowledge capability's consult-first instruction is
the real home of the reading discipline.

Maintainer review has **four gates**, in order: product direction against
recorded decisions; correctness (the full local gate re-run, never the
author's report of it); security through the trust-boundary lens (injection,
secrets, path containment on user-named filesystem lookups, supply chain,
authorisation); mergeability. Direction is checked first because it is
cheapest and because a green, secure, mergeable PR in the wrong direction is
still returned.

# Fresh eyes

Every substantive commit gets a **fresh, ephemeral reviewer**: diff-only, no
kept state, reporting by message and retiring after the verdict. The first
multi-agent run (2026-07-21) showed why the protocol is narrow: reviewers that
kept report files or tracked state stalled, and stalled reviewers led
developers to review and patch their own code, losing the fresh-eyes property.
A reviewer that stops cleanly mid-turn with a vanished terminal was killed
externally, not crashed — check delayed messages, then spawn a **new** reviewer
on the same commit; never resume the dead one. Reviewer notes reach knowledge
only through their own reviewed change, never a side channel. Capability-defined
service agents such as reviewers are deliberately read-only souls with fresh
identity per spawn.

# Bind every verdict to content

A verdict names the **exact SHA and non-merge commit count**; an approval is
bound to content, never to a branch name. Immediately before merging, compare
the PR head, the remote ref and the check run's head SHA, and merge with an
expected-head guard — a handback is final only when reviewer-driven merges are
settled, because even a test-only nit fix moves the head past the green run.
Handoffs name branch **and** current tip with a check that resolves by branch
name; when told "still broken", the first triage is SHA drift, not a missing
fix. Review the **whole merge range**, not the PR body: unrelated stewardship
or knowledge commits ride along on developer branches and must land through
their own path first. A verification command supplied by the party being
verified bounds the answer to what they included — re-derive the path set from
the review. Re-merge `main` and re-check mergeability right before handback;
same-area PRs landing on the same day re-conflict each other. Landing reviewed
commits that sit above unreviewed ones requires a diff-identity proof and a
recount of the residual range at the next landing. Where the hosting platform
refuses a reviewer's own approval (one identity for author and gate), the
verdict is still recorded durably on the PR — the binding to SHA and count is
what matters, not the approval button.

# Delegating implementation

When an expert delegates to several helpers communicating asynchronously, most
coordination rounds are spent on *crossed* state. Every message states the
exact head it refers to, what of the recipient's work is already merged, and
exactly one next action; stale references are reconciled against git, not
re-litigated. Once a branch is PR-ready, declare a **hard freeze**: only
blocker-class defects get commits, everything else becomes follow-up. A green
gate on a stale base tests the wrong product — check whether `main` moved
before each review round and before opening the PR. Behavioural conflicts
return to the implementer who owns the logic; only mechanical, append-only
unions are the maintainer's. Distinguish environment failures (missing
dependencies, missing installed capabilities in a scratch worktree) from PR
defects before returning. Injections for the few commands agents must run
need exact invocations; making a skill available is not enough.

# A test that agrees with the code is not evidence (consolidated 2026-09-06)

The recurring defect in this repository's review history is a test that agrees
with the code instead of the requirement. Named forms: a fake more generous
than the real tool (every field a stub always populates is a branch the real
system can leave empty); a non-execution assertion with no positive control on
the same fixture; a restore test whose fixture fails before the code under
test; a killed mutant one layer below the reported bug; an assertion message
claiming an ordering the expression does not check; a source-text regex
loosened until it matches; a guard no removal mutant can kill because another
layer already guarantees it (name gaps you cannot test rather than writing a
test that cannot fail). The maintainer therefore asks of every fail-closed
change: what else would fail if the measuring apparatus were dead; does the
positive branch of the new gate fire in a test; was the base already red
before this commit; when expected and actual share a computation, what
independent quantity is measured. Two review-scope corollaries: a test per
layer is not a test of the seam — ask what object the caller actually holds
across a process boundary; and a finding names where it was noticed, not its
extent — check the same predicate on every surface before accepting the fix.
An option that exists because a reviewer proved a bug is part of the fix.
Kernel fail-closed guarantees are proven only by their first real capability
user, and the published schema must not accept what the runtime refuses
([kernel view](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md)).
The test-writing techniques that answer these questions belong to the
`pr-review` skill and the developers' own testing skills, not here.

# Green gates do not lift a hold (2026-09-19)

Mergeability, diff fidelity and a green suite answer "does it apply and run";
none answers **"is this content permitted to land"**. Permission lives in
prose — holds in design documents, decision records, scope boundaries — so a
held change can pass every gate buried in the ancestry of a long merge while
the reviewer's attention is correctly on the small net diff. Before landing
ancestry you did not write: search the project's own prose for holds on what
you are landing; check **both ancestry and content** — an ordinary merge
preserves the held commit's identity, so an ancestry check works and is
skipped only because nobody named the commit, while cherry-picks, rebases and
reimplementations need a patch-id comparison, which catches normalised text
but not a reimplementation. "Merge everything" scopes the *work*; it does
not clear a hold the speaker may not know exists. A breach is repaired
**forward-only** to the last approved postimages, and the recorded disposition
must say two things the commit does not imply: the held commit remains an
ancestor, and whether it is now permitted is a separate question routed
through ordinary review. Never lift a hold retrospectively to unblock the work
its breach created — that launders a mistake into a policy change. Once a
breach is shared state, its disposition belongs to whoever set the hold; do
not force-push, rewrite or unilaterally revert.

# Compatibility and migration claims need proof

The maintainer's application of the kernel rule that the published schema must
not accept what the runtime refuses
([owning lesson](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md)):
a runtime alias is incomplete until the public schema validates representative
*pre-migration* artifacts, because loader acceptance alone makes the documented
promise false with green tests. The maintainer returns any compatibility or
migration PR that lacks fixture tests of legacy artifacts against the current
schema.
When a ruling replaces a transitional model, every sentence describing the old
behaviour is re-verified, and diagnostics an engine owner called "not final
contract" are not documented as contract
([clean-contract precedent](/nodes/oats-expert/decisions/clean-contract-precedent.md)).

# Knowledge PRs

Strict OKF validation proves structure, not truth. Validate the knowledge
tree from its **root**, never one node in isolation — per-node runs report
cross-node links as broken — and re-read roadmap-type concepts against the
current published baseline before accepting a harvest, since strict validation
cannot see staleness (2026-09-21). Knowledge PRs get a
**semantic read** of changed and linked concepts: does each describe the final
converged design, or clearly mark history as superseded with a link? If a new
concept claims another captures the design, open that target in the PR head.
Append-only logs and pure-addition index/link entries conflict mechanically and
the maintainer may union them, verifying every link resolves on the merged
tree; duplicate concepts, competing rewrites or divergent descriptions are
editorial judgment over the node and return to an instance of the owning
expert. Errors found in knowledge *inputs* are fixed at the source before
judgment and delivery, or an inaccuracy is accepted with full provenance and
becomes harder to dislodge than the original. Read validator **counts, not
exit status**: an aggregate gate exited zero while a bundle carried producer
warnings (2026-07-26). The lesson is architectural — an aggregate must fail on
any producer's warnings, and a gate that does not is a gate defect to fix, not
a review habit to compensate for — but until every gate in the path is known
to do so, the reviewer reads the counts.

# Related

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md);
[Release judgement for the tag-driven lane](/nodes/oats-expert/stewardship/release-traps.md);
[Cross-workstream delivery](/nodes/oats-expert/stewardship/multi-workstream-delivery.md).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/dev-team-and-review-flow.md` (2026-07-21/27) and lessons `multi-dev-run-failure-modes` (07-21), `final-handback-requires-settled-reviewer-merges` (07-24), `harvest-cherrypick-parent-state` (07-25), `pr-review-knowledge-consistency-after-branch-union` (07-25), `pr-branch-merge-range-scope` (07-26), `pr-return-staleness-fast-capability-cadence` (07-22), `pr-review-same-account-and-worktree-branch-delete` (07-22), `scratch-worktree-pr-gate-environment` (07-22), `strict-okf-zero-exit-can-have-warnings` (07-26), `instance-name-filesystem-containment`.
2. Legacy `agents/dev-coordinator/soul/knowledge/lessons/` `crossed-mail-coordination`, `stale-base-drift-merged-review`, `reviewer-deaths-tmux-prefix-targets`, `concurrent-harvest-conflicts-one-soul` (07-23), `fix-note-errors-before-harvest` (07-22).
3. Legacy `agents/docs-expert/soul/knowledge/lessons/review-handoffs-branch-tip-defer-harvest.md` (07-29), `schema-migration-aliases-must-validate.md` (07-11).
4. Legacy `agents/oats-coordinator/soul/knowledge/review-routing.md` (2026-09-05).
5. Legacy `agents/cli-dev/soul/knowledge/lessons/` testing-honesty family (2026-07-26 → 2026-09-06): `generous-stub-fail-closed-open-gate`, `positive-control-proves-a-non-execution-test`, `unreachable-guards-cannot-be-mutation-verified`, `mutation-killed-but-measuring-the-wrong-layer`, `assertion-message-claimed-an-unchecked-ordering`, `source-text-assertions-drift-silently-red`, `review-verify-claimed-path-set`, `finding-fixed-on-one-surface-only`, `gate-must-read-the-value-the-caller-holds`, `recording-a-disambiguator-is-not-passing-it`, `tighten-a-reader-against-its-writer`, `api-swap-regression-fix-mechanisms`, `pre-commit-gate-beats-post-hoc-rollback`, `whitelist-normalizer-drops-new-probe-fields`, `required-hook-guarantee-first-user`.
