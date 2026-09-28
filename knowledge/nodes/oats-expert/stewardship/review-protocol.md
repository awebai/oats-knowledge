---
type: Lesson
title: How the OATS project ships and reviews
description: Contributed work reaches main only through PRs judged by the maintainer's four gates against exact heads; reviewers are fresh, tests must agree with the requirement rather than the code, a lone gate gets a second reader, and knowledge PRs get a semantic read.
tags: [stewardship, review, pull-requests, process]
timestamp: 2026-09-22
---
**Owner: oats-expert (the PR gate). Update-on-change: whoever changes the
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
([external knowledge custody](/nodes/oats-expert/decisions/external-knowledge-custody.md));
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
([merge-range scope](/nodes/oats-expert/lessons/pr-branch-merge-range-scope.md));
a verification command supplied by the party being verified bounds the answer
to what they included. After a squash, prove the landed patch equals the
approved one (compare patches, not trees, when main moved in between), and
prove a fix reached main by ancestry before telling its author it landed — a
commit "in the PR" can be orphaned by the squash. A rebase that moves an
approved head needs the approver's confirmation that the PR's own delta is
unchanged. Where the platform refuses an author's own approval, the verdict
is still recorded durably on the PR.

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
([clean-contract precedent](/nodes/oats-expert/decisions/clean-contract-precedent.md)).

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

[External knowledge needs source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md);
[Release judgement for the tag-driven lane](/nodes/oats-expert/stewardship/release-traps.md);
[Cross-workstream delivery](/nodes/oats-expert/stewardship/multi-workstream-delivery.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/dev-team-and-review-flow`, 2026-07-21/27, and the 2026-07 review lessons), with lessons from agents/dev-coordinator, agents/docs-expert, agents/oats-coordinator and agents/cli-dev knowledge @ 7838d3ca (crossed mail, stale base, reviewer deaths, schema-migration aliases, review routing, the testing-honesty family).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log, 2026-09-24 → 2026-09-27: squash orphan and patch verification, head-bound ACKs, human redirection recorded before review, removal sweeps and every-entry-point probes, the lone-gate re-review, additive fields and consumer-first renames, producer trust gaps, stand-in providers, one-way-call assertions, security review of knowledge changes).
3. Migrated from agents/oats-expert/soul/knowledge/lessons/window-gone-completed-vs-killed-triage.md @ 7838d3ca.
