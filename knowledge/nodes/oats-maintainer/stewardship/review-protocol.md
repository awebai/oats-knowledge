---
type: Lesson
title: How the OATS project ships and reviews
description: The maintainer's four gates bind verdicts to content; lane-owned state and one second reader per PR avoid duplicated review, unchanged deltas carry verdicts with fresh integration evidence, and lone-gate windows still get a second reader.
tags: [stewardship, review, pull-requests, process]
timestamp: 2026-10-14
---
**Owner: oats-maintainer (the PR gate). Update-on-change: whoever changes the
review skill, the repository gate or the delivery flow revises this concept in
the same change.** The review procedure itself is the `pr-review` skill; this
concept holds the judgement behind it.

# The flow (decided with the founder 2026-07-21)

Contributed work — from helper instances, package maintainers or outside
contributors — reaches `main` **only through pull requests**. The maintainer
commits its own stewardship directly, because the gate exists to review
contributed work, not to slow stewardship; framework behaviour changes still
go to the human first. Only a maintainer that **owns `main`** pushes
directly; a checkout-mode maintainer whose local `main` is never pushed
delivers by pull request. The knowledge base is the one stewardship surface
that moved to PR-only learning
([external knowledge custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md));
a later decision extending PR-only elsewhere must name this paragraph as
superseded. Enforcement is discipline plus the gate, not git hooks.

Before trusting repository-resident state, establish the tree's position
against the remote — a shared checkout serves a coherent, possibly stale
picture ([a shared checkout serves a stale soul](/nodes/oats-operator-expert/lessons/shared-checkout-serves-a-stale-soul.md)).

# Four gates, direction first

Maintainer review has **four gates**, in order: product direction against
recorded decisions; correctness (the gate re-run, never the author's report of
it); security through the trust-boundary lens (injection, secrets, path
containment on user-named lookups, supply chain, authorisation);
mergeability. Direction is checked first because it is cheapest and because a
green, secure, mergeable PR in the wrong direction is still returned. When the
human redirects a slice, the amendment is recorded in the design record
**before** the review, so the direction gate reviews against what was asked,
not against a frame the human has since changed.

# Fresh eyes

Every substantive commit gets a **fresh, ephemeral reviewer**: diff-only, no
kept state, reporting by message and retiring after the verdict. The first
multi-agent run (2026-07-21) showed why: reviewers that kept report files or
tracked state stalled, and stalled reviewers led developers to review their
own code, losing the fresh-eyes property. A reviewer that vanishes mid-turn
is replaced by a **new** reviewer on the same commit, never resumed. But a
vanished window with no wake event is not proof it vanished mid-turn
(2026-07-23): a reviewer that finished, mailed its verdict and retired looks
identical when the channel failed to wake the spawner. Check the full message
history, not only the unread inbox, and the session tail (a clean send and
self-retire versus an abrupt cut-off) before calling it killed; a verdict
found there is a channel fault to report, not a reason to re-review. Reviewer
notes reach knowledge only through their own reviewed change. A reviewer is a
soul like any other, spawned fresh per verdict — capabilities no longer
declare agents on main (a manifest `agents:` is refused), so a reviewer ships
as a package or member soul.

# Bind every verdict to content

A verdict names the **exact SHA and non-merge commit count**; an approval is
bound to content, never to a branch name. Immediately before merging, compare
the PR head, the remote ref and the check run's head SHA, and merge with a
guard on the full approved object id — a handback is final only when
reviewer-driven commits are settled, because even a test-only nit moves the
head past the green run. When told "still broken", the first triage is SHA
drift, not a missing fix. Review the **whole merge range**
([merge-range scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md));
a verification command supplied by the party being verified bounds the answer
to what they included. After a squash, prove the landed patch equals the
approved one (compare patches, not trees, when main moved in between), and
prove a fix reached main by ancestry before telling its author it landed — a
commit "in the PR" can be orphaned by the squash. Where the platform refuses
an author's own approval, the verdict is still recorded durably on the PR.

## Carry verdicts only with proof of an unchanged delta (2026-10-13)

This replaces the earlier rule here requiring the approver's confirmation
after every rebase of an approved head. The source reports human and
both-side acceptance of the replacement [6]. Repeatedly rebinding an
unchanged patch creates review rounds without a new independent judgment;
content identity and integration evidence are the gates, not another message.

The merging maintainer brings the branch up to date using the forge's update
operation: merge the default branch into it, never force-push it. Both
verdicts carry only when the PR's own diff is unchanged and CI is green on
the updated head. If the owner rebases instead, both verdicts carry when
every commit is `=` in `git range-diff` and CI is green on the new head;
anything other than `=` returns to both readers. Record the old and new
heads and the evidence on the PR: this is a content-bound carry, not approval
of any future head on the branch.

When the default branch has moved since the head's CI ran, first run on a
trial merge the test files changed or added by the PR and by what merged
since its base. No shared file and a clean textual merge do not prove the
combination: a test and the behavior it reads can change in separate files
[6]. The head guard and the integration check answer different questions.

This decision does not assume a merge queue. Where one exists, enqueue the
approved head instead; a queue is the repository-level route for enforcing
CI on the combination. The operating procedure belongs in the
`oats.maintainer` `pr-review` skill, not in a second checklist here [7].

# Delegating implementation

When an expert delegates to several helpers communicating asynchronously, most
coordination rounds are spent on *crossed* state. Every message states the
exact head it refers to, what of the recipient's work is already merged, and
exactly one next action; stale references are reconciled against git, not
re-litigated. Once a branch is PR-ready, declare a **hard freeze**: only
blocker-class defects get commits. A green gate on a stale base tests the
wrong product — check whether `main` moved before each round. Behavioural
conflicts return to the implementer who owns the logic; only mechanical,
append-only unions are the maintainer's. Distinguish environment failures
from PR defects before returning.

# A lone gate gets a second reader (2026-09-27)

Locally the gate is the affected suites; the sharded CI run is the gate of
record, and defects found after merge are fixed forward. That speed has a
price when one lead gates alone: schedule a second maintainer's re-review of
every window a single lead gated. The first such re-review, of a few days of
lead-only merges, found two security defects (an argv flag injection and an
arbitrary file write); its findings landed as follow-ups, never reverts.

## Paired maintainers cross-review and plan releases together (2026-10-01)

**Operating terms superseded by the 2026-10-13 lane decision below; the
second-reader rationale and joint release planning remain.**

The human directed the participating maintainers to review one another's work
and plan releases together [4]. The maintainer's recorded rationale is to
build the second reader into the pairing from the start, rather than routinely
needing an after-the-fact review of lone-gate windows [5]. This adds a paired working
arrangement; it does not remove the lone-gate fallback or relax head-bound
review. The direction records how the pair coordinates, not a standing grant
of merge or release authority to future instances.

## Peer maintainers own lanes; each PR gets one second reader (2026-10-13)

The source reports a human-accepted refinement, agreed by both maintainer
sides [6]: each peer holds a lane whose review, merge and tracking have one
accountable maintainer. A lane is a division of existing responsibility, not
a new grant of merge or release authority. Every PR gets **one second
reader**, not a read from every peer. Ask once, at the head the lane's
maintainer approved; a PR authored by that maintainer goes to the second
reader without waiting for its author's approval. Where another side already
reads every PR, peers on the same side do not add reads of one another's PRs.
Contract changes still need both sides' agreement before implementation.

The forge is the one copy of a PR's state; a maintainer's state holds only
its own lane. Peer messages are limited to a second-read request, its
verdict, a hold on work in flight, the release plan, and a lane hand-over.
There is no routine notice before or after a merge or tag. Joint release
planning remains; duplicating each event does not make it joint planning.

This supersedes the all-peers, parallel-review practice and repeated
verdict-rebinding associated with the earlier pairing. Experience with that
practice produced duplicate PR tracking, repeated rebases and per-event mail
without a new independent read. The choice keeps the second pair of eyes
while removing those costs, rather than weakening review to save messages.
The lone-gate fallback above is unchanged; content changes still return to
both readers under the carry rule. The operating detail belongs in the
`oats.maintainer` `cross-review-peer` and `pr-review` skills [7].

# A test that agrees with the code is not evidence (consolidated 2026-09-06)

The recurring defect in this repository's review history is a test that agrees
with the code instead of the requirement. Named forms: a fake more generous
than the real tool; a non-execution assertion with no positive control; a
restore test whose fixture fails before the code under test; a killed mutant
one layer below the reported bug; an assertion message claiming an ordering
the expression does not check; a source-text regex loosened until it matches;
an assertion on a one-way call's return instead of its effect at the far end;
a guard no removal mutant can kill because another layer already guarantees
it. The maintainer therefore asks of every fail-closed change: what else would
fail if the measuring apparatus were dead; does the positive branch of the new
gate fire in a test; was the base already red; when expected and actual share
a computation, what independent quantity is measured.

Scope corollaries: a test per layer is not a test of the seam — ask what
object the caller actually holds across a process boundary; a finding names
where it was noticed, not its extent — check the same predicate on every
surface; a refusal added at one entry point is probed at every entry point an
operator or the Desktop uses. A **removal** is complete only when no text
composed into agents still teaches the removed thing: generate the sweep from
the refusal table itself, across skills, injects and package skills, not from
the nouns one PR happened to touch (a sweep in 2026-09 found published skills
still teaching a dozen verbs refused since 0.25.0). Kernel fail-closed
guarantees are proven only by their first real capability user
([kernel view](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md)).

# Green gates do not lift a hold (2026-09-19)

Mergeability, diff fidelity and a green suite answer "does it apply and run";
none answers **"is this content permitted to land"**. Permission lives in
prose — holds in design documents, decision records, scope boundaries — so a
held change can pass every gate buried in the ancestry of a long merge while
the reviewer's attention is correctly on the small net diff. Before landing
ancestry you did not write, search the project's prose for holds and check
**both ancestry and content** (an ordinary merge preserves the held commit's
identity; cherry-picks and rebases need a patch-id comparison, which still
misses a reimplementation). "Merge everything" scopes the *work*; it does not
clear a hold the speaker may not know exists. A breach is repaired
**forward-only** to the last approved state, the disposition says the held
commit remains an ancestor and whether it is permitted is a separate question,
and a hold is never lifted retrospectively to unblock the work its breach
created. Once a breach is shared state, its disposition belongs to whoever set
the hold.

# Compatibility and contract changes

A runtime alias is incomplete until the public schema validates
representative *pre-migration* artifacts; the maintainer returns any
compatibility or migration PR without fixture tests of legacy artifacts
against the current schema. When a ruling replaces a transitional model, every
sentence describing the old behaviour is re-verified
([clean-contract precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)).

An **additive field on a closed-shape contract is breaking** for every strict
consumer already released: make the consumer tolerant first, then ship the
producer; a wire rename between a provider and a strict consumer lands
consumer-first, in one release. When a consumer's review finds a trust gap in
its producer, fix the producer and keep the consumer's guard as defence in
depth. A stand-in producer proves only the shapes we assumed: before shipping a
contract change, recapture the consumer's fixtures from the real producer.

# Knowledge PRs

Strict validation proves structure, not truth. Validate the knowledge tree
from its **root** (per-node runs report cross-node links as broken) and read
validator **counts, not exit status** — an aggregate that exits zero over a
producer's warnings is a gate defect to fix, and until every gate is known to
fail on them, the reviewer reads the counts. Knowledge PRs get a **semantic
read** of changed and linked concepts: does each describe the final design, or
clearly mark history as superseded with a link? If a new concept claims
another captures the design, open that target in the PR head. A knowledge
change that alters security or identity guidance gets the security gate too,
because it changes operator behaviour. Append-only logs and pure-addition
index entries may be unioned by the maintainer, verifying every link on the
merged tree; duplicate concepts or competing rewrites return to the owning
expert. Errors in knowledge *inputs* are fixed at the source before judgement,
or an inaccuracy is accepted with full provenance and becomes harder to
dislodge than the original.

# Related

[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[Release judgement for the tag-driven lane](/nodes/oats-maintainer/stewardship/release-traps.md);
[Cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/dev-team-and-review-flow`, 2026-07-21/27, and the 2026-07 review lessons), with lessons from agents/dev-coordinator, agents/docs-expert, agents/oats-coordinator and agents/cli-dev knowledge @ 7838d3ca (crossed mail, stale base, reviewer deaths, schema-migration aliases, review routing, the testing-honesty family).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log, 2026-09-24 → 2026-09-27: squash orphan and patch verification, head-bound ACKs, human redirection recorded before review, removal sweeps and every-entry-point probes, the lone-gate re-review, additive fields and consumer-first renames, producer trust gaps, stand-in providers, one-way-call assertions, security review of knowledge changes).
3. Migrated from agents/oats-expert/soul/knowledge/lessons/window-gone-completed-vs-killed-triage.md @ 7838d3ca.
4. Harvested 2026-10-01 (paired maintainers). OKF input c15a51880924deaff3fb01859f1c90b8aa09ad3a815c75af48410a708b5862c3 (turns t1:e06654b04457084a49aa064a418ef9a08d6f2e8fd0c0090c1c0edc683f99b78a).
5. Harvested 2026-10-01 (paired maintainers). OKF input 6fe3e66661e1fb9bcef9dd2a99d0d8c0f3ebcc7aa9882e1a1d6591edc1cb899c (note maintainer-pairing-agreement.md; second-reader rationale only, not the still-proposed operating terms).
6. Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-lfx, 2026-10-14; notes/a-human-gate-gets-a-time.md; notes/merge-rule-base-moved.md. The proposal reports human and both-side acceptance on 2026-10-13 in [awebai/oats#1103](https://github.com/awebai/oats/issues/1103), proposal comment 6150614496 and answers 6150639181, 6150651275, 6150667299, 6150671879. The first note records the lane decision and rejected duplicated tracking/notices; the second explains why changed test files, not file overlap alone, determine integration evidence. Its earlier rebase-and-reconfirmation procedure is historical evidence, not an additional current rule. Acceptance references are source-reported, not independently verified by this harvest.
7. The proposal reports the replacement procedure shipped in [awebai/oats-engineering#14](https://github.com/awebai/oats-engineering/pull/14), oats.engineering 1.10.0 at 944470be, and mirrored/pinned in [awebai/oats#1119](https://github.com/awebai/oats/pull/1119) at 9a3ae4b2. The recorded source composition confirms oats.engineering 1.10.0 at 944470be71a96299ae4a1cfb7df0fba94a592899; this harvest did not inspect the source's copied skills or independently verify the release/tag.
