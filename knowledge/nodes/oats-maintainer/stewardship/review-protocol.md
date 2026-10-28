---
type: Lesson
title: How the OATS project ships and reviews
description: Maintainer review binds verdicts to content and issue-recorded contract decisions, preserves same-area integration evidence, requires timely and safely obtained verification, uses fresh and second readers, checks hand-written release claims, and judges tests against requirements rather than implementations.
tags: [stewardship, review, pull-requests, process]
timestamp: 2026-10-28
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

For instructions about when agents coordinate or retire children, apply the
[capability-owned coordination policy boundary](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md):
neutral mechanism documentation does not make core the owner of team policy.

## A declared deferral still needs the decision's permission

When a PR openly leaves part of a decided rule for a later PR, read the
original decision before accepting the split. If that decision does not
permit the staging, return the PR or have the same deciders agree the split
first. An explicit deferral in a PR description is not itself a decision
amendment.

The source reports approving a staged change that retained an old start
kill deadline, then a second reader finding that the decision covered starts
as well as apply. The description made the omission visible but also made it
look intentional; checking implementation against that description missed
the actual direction constraint. This refines the direction-first gate,
not the authority to change a decision. Put the decision and any authorized
split in the review evidence; the operating check belongs in the existing
`direction-gate` skill rather than in a competing implementation plan.

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
commit "in the PR" can be orphaned by the squash. A rebase that moves an
approved head needs the approver's confirmation that the PR's own delta is
unchanged. Where the platform refuses an author's own approval, the verdict
is still recorded durably on the PR.

# A batch window preserves same-area integration evidence

The source reports a same-area merge rule agreed by both maintainer sides
on 2026-10-10 and a 2026-10-14 batch that violated it: a PR whose base moved
through a same-area merge must be brought up to date and CI-green on that
combination before it merges. Same area includes shared files and the same
lane's code and tests, even when they share no file. A shared docs page or
workflow counts too. A clean textual merge cannot prove this integration,
and a guard on the approved head does not guard the base.

The narrow release-notes exception is a clean merge where the next version's
aggregate notes file is the only shared file. It does not exempt two PRs
correcting the same per-change entry file. Nor does absence of shared files
establish that changes are unrelated: one PR can change a sentence in the
producer while another adds a test that expects its old wording.

Updating approved PRs onto one common main and running CI in parallel can
save redundant rounds. It does not freeze main for the later merges. Before
each merge in the batch, compare the PR with what has already landed, by
changed files and by code/test dependency. Same-area changes need another
update and CI run; independent changes need no serial CI round merely because
they belong to the batch. Watch main's CI on every merge commit and stop the
batch at the first red. This makes failures attributable and avoids feeding
a broken base into every lane's queue.

In the reported batch, two individually green client/Desktop PRs shared no
file but disagreed on the withheld-text wording. Main went red after the
second merge and stayed red until a fix-forward. The successful parallel
update round did not establish that the successive combinations were green.

This is an integration-evidence requirement, not a new rule for carrying
review verdicts across an update or choosing merge-update versus rebase.
It also grants no file-nonoverlap shortcut around affected-test checks.
The structural elimination route is a merge queue that verifies each
prospective combination; without that enforcement, the residual judgment
belongs in `pr-review`. A local trial merge can reveal a bad combination,
but does not replace the same-area updated-head CI requirement.

## Trial-merge test selection must respect the operator-host boundary (2026-10-28)

Before running a trial merge on an operator host, inspect the selected test
files for real-process signalling or use of real tmux or `oats tui`. Exclude
such files from the local run, even when they are among the PR's changed
tests or the tests changed by intervening merges. For a PR needing those
checks, bring the branch up to date and obtain the integration evidence in
CI on a disposable runner instead. Pure file-reading and fake-terminal
tests remain eligible locally when they have no such real effects; a name
filter does not make a mixed module inert.

The source reports that this routine review step selected a TUI signal test
on 2026-10-28 and killed the user's systemd manager and its agents, followed
by an operator-directed hold on those local runs. Private HOME,
OATS_HOME_DIR and TMUX_TMPDIR did not contain the signal. The
[signal-test containment lesson](/nodes/oats-desktop-expert/lessons/signal-tests-must-contain-regressed-cleanup.md)
owns the reparenting rationale, runner/namespace boundary and cleanup proof;
this refinement puts that boundary at the maintainer's test-selection point,
not in a second reproduction recipe. Separate isolated reproduction remains
subject to that lesson and the operator's restrictions.

This qualifies local trial evidence; it does not waive affected-test
coverage, same-area updated-head CI or existing review-verdict rules. A
passing inert subset cannot stand in for the omitted integration checks.
Enforce effect separation and containment in the test-launch harness and CI;
until then, the selection and CI-routing check belongs in the existing
`pr-review` skill. No skill or harness enforcement is claimed delivered here.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-28; notes/local-test-runs-can-kill-the-host.md.

The incident and operator hold are source-reported; this harvest did not
rerun the tests or independently audit
[awebai/oats#1615](https://github.com/awebai/oats/issues/1615).

# Evidence outside PR CI belongs before hand-over

The source reports a review starting with an affected macOS path still unrun,
with that run deferred to the merge gate. The subsequent run failed nine of
ten tests and hung on the last. It was not a pass, and the investigation later
traced fixture isolation to a runtime-version difference rather than the
platform first suspected. Reviewing first would have bound a verdict to a
head whose required evidence could still force it to change.

Require results for the affected path before accepting the owner's hand-over,
not merely a promise to obtain them before merge. This includes affected
Desktop suites or platform-specific paths absent from PR CI. A stand-in can
qualify logic but not the real service manager's behavior it models.

The exception is evidence that cannot change the code under review, such as a
later artifact signature. Nor does this require every neighboring test to
pass regardless of an established baseline failure: the source records a
bounded exception where the platform-dependent function ran, the larger test
file failed identically on main, the limit was disclosed in hand-over and
verdict, and the test problem had an owner. A baseline failure is not evidence
for or against the change; establish it rather than asserting it.

The structural route is a targeted runner for paths omitted from ordinary
PR CI, with platform-provided run identity and exact head evidence. The note
reports that such a manually triggered macOS runner was added; a clean runner
still cannot prove isolation against a live host service it does not have.
Keep that limit explicit rather than replacing the missing real-world check
with a green simulated one. This refines evidence timing, not the authority
to merge or the paired-maintainer arrangement below.

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

## A brief that may lead to live terminal checks carries their safety gate

A maintainer's brief that may lead to a real-terminal check must point the
lead to the existing
[bounded live-terminal verification lesson](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#a-passing-live-terminal-check-can-still-exhaust-the-host)
and make satisfying it part of the assignment, rather than leaving safety
implicit in a request for live evidence. That concept owns the bounds and
harness teardown requirements; a second checklist here would drift. The
briefing hook belongs in `launch-work`, while enforced containment belongs
in the verification harness.

When a capture runs away, ask its owner or the human to end it. A permission
refusal is not permission to find a different route to the same kill.
Requiring live evidence or bounding a check grants neither permission to run
an otherwise forbidden experiment nor authority over unrelated processes.

# A lone gate gets a second reader (2026-09-27)

Locally the gate is the affected suites; the sharded CI run is the gate of
record, and defects found after merge are fixed forward. That speed has a
price when one lead gates alone: schedule a second maintainer's re-review of
every window a single lead gated. The first such re-review, of a few days of
lead-only merges, found two security defects (an argv flag injection and an
arbitrary file write); its findings landed as follow-ups, never reverts.

## Paired maintainers cross-review and plan releases together (2026-10-01)

The human directed the participating maintainers to review one another's work
and plan releases together [4]. The maintainer's recorded rationale is to
build the second reader into the pairing from the start, rather than routinely
needing an after-the-fact review of lone-gate windows [5]. This adds a paired working
arrangement; it does not remove the lone-gate fallback or relax head-bound
review. The direction records how the pair coordinates, not a standing grant
of merge or release authority to future instances.

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

## Contract agreement stays on the issue through implementation (2026-10-28)

The source reports a useful practice across three product-contract cases:
keep the proposal, both sides' answers and later amendments on the issue,
so the implementation review can check what was built against what was
actually decided. Mail directs the other side to that record; it is not a
parallel decision record. The existing requirement to decide contracts
before building them remains the authority boundary, not a new claim here.

When a lead finds a contract question, stop the affected build and bring
options to the lane maintainer. The maintainer's direction gate compares
them with accepted decisions. Its issue proposal explains the client-visible
change, alternatives, a recommendation with its decision basis, and the
consequence for existing deployments: either why no action is needed or
what must change. Do not assume every contract change is deployment-neutral.
The other side's explicit answer and build conditions belong on that issue
before building; carry references to both positions and those conditions
into the lead's brief and PR review evidence. Inform the release lane when
the bilateral decision is settled, not through a duplicate negotiation.

A narrowing discovered during implementation still belongs on the issue
before the PR if it changes the decided text. Fewer affected cases do not
make it invisible to the other decider. Posting an amendment is not itself
acceptance: the existing
[decision-amendment gate](/nodes/oats-maintainer/stewardship/review-protocol.md#a-declared-deferral-still-needs-the-decisions-permission)
continues to apply. This keeps a review from comparing the code only with
the author's revised PR description while missing the agreed conditions.

The reported compatibility judgment was to keep an existing error answer
that clients already match rather than rename it merely for consistency
inside the larger change. In the lifecycle-start case, the source reports
keeping `E_SESSION_START_BUSY`, including the agreed starter-versus-starter
scope, rather than relabelling those cases `E_LIFECYCLE_BUSY`. The spelling
cleanup offered no compensating benefit for breaking client matching. This
is an application of the
[published-commitment boundary](/nodes/oats-maintainer/decisions/clean-contract-precedent.md#the-precedent-is-bounded),
not a universal ban on an explicitly decided migration, a new error-code
specification or permission to apply the pre-adoption removal rule to
supported clients. Contract fixtures should enforce the preserved answer.

**Limits:** these are three source-reported cases on 2026-10-27–28, with
prompt replies, not a proven protocol for an absent or disagreeing side.
One side's positions were posted by its lane maintainer; the source
expressly says the human had not ruled on that representation. Record the
practice without turning non-objection into human acceptance or granting
future maintainers authority to decide on a human's behalf. Routine launch
autonomy is not that delegation.

The operating route is the existing maintainer `direction-gate` and review
guidance. Prefer one linked issue record and review evidence requiring the
agreed conditions; regression tests can enforce contract answers, but cannot
supply the missing decision authority. No skill change or automated gate is
claimed here.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-10-28; notes/contract-decisions-between-the-two-sides.md. The source
identifies [session resume](https://github.com/awebai/oats/issues/1567#issuecomment-6439924216),
[start's proposal](https://github.com/awebai/oats/issues/1602#issuecomment-6476048759),
[answer with conditions](https://github.com/awebai/oats/issues/1602#issuecomment-6477039652)
and [narrowing](https://github.com/awebai/oats/issues/1602#issuecomment-6477132396),
and the [roster proposal](https://github.com/awebai/oats/issues/1628#issuecomment-6476678220)
and [answer](https://github.com/awebai/oats/issues/1628#issuecomment-6477040132).
Those are evidence locators from the source, not independently audited
agreement, implementation, test or release receipts.

## Package-private formats become shared contracts at the reader boundary (2026-10-27)

A format written and read only within one package may evolve inside its
lane, provided legacy input keeps its existing behavior: unambiguous old
input still works, while ambiguous old input refuses with an error naming
the fix. Package-private does not mean compatibility-free. Review who reads
the format rather than escalating every file-format edit or treating every
unlisted format as private.

Once another package or the kernel reads it, its change is a shared contract
decided by both maintainer sides. A change that needs a new kernel field or
hook variable crosses that boundary too, even if the package still owns the
file. This classifies the format dependency; it does not waive an independent
shared-behaviour direction decision or weaken published compatibility promises.

The source's precedent is the `Source:` line in an oats.okf proposal. The
lane permitted an explicit incarnation while preserving the legacy line's
unambiguous acceptance and ambiguous refusal, reusing incarnation data the
kernel already published rather than requiring a new kernel contract.
The point is the private reader/writer boundary and compatibility judgment,
not a second specification of the harvest format.

Legacy-input and ambiguity fixtures should enforce the promised behavior;
the maintainer's `direction-gate` skill owns the remaining judgment about
readers and cross-side agreement. This does not invoke the
[pre-adoption removal precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)
as permission to break a package's supported old inputs.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-27; notes/reused-name-harvest-gate.md.

The source records its lane ruling on
[awebai/oats-okf#83](https://github.com/awebai/oats-okf/issues/83), identifying
comment 6441169785, and reports its application in
[#111](https://github.com/awebai/oats-okf/pull/111) with the other side's
second read. These are source-reported decision and review references, not
an independently audited implementation, test result or release receipt.

# Release-prep second reads check hand-written claims (2026-10-28)

Keep the mechanical checks that release entries were preserved and mirror
payloads match their tags, but do not treat those checks as proof of the
release's prose. The introduction, Upgrade section and provider entries
written without a per-change entry need a semantic read against the doc or
code that owns each claim. Spend the independent reader's attention there,
not only on text the release tooling carried forward unchanged. The
[provider mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
owns the parity check; it is not a new procedure here.

The source reports several release-prep reads in which verbatim-entry and
tree-id checks found no issue, while hand-written text needed correction.
One Upgrade sentence incorrectly implied that upgrading a stopped home
also started its session. Checking the owning lifecycle documentation
exposed that conflation. The lesson is to verify the sentence's behavioral
claim, not to preserve another copy of the upgrade command sequence.

Automate entry preservation and mirror parity, and reduce duplicated
behavioral instructions by linking to their authoritative documentation.
The remaining editorial judgment belongs in the release-prep second-read
guidance. This is not permission to skip generated material, weaken release
gates or assume all errors occur in hand-written text; the small reported
sample establishes a useful review focus, not a general defect rate.

Evidence: OKF proposal from oats-maintainer/pepe-lfx-maintainer, 2026-10-28; notes/release-prep-second-read-checks-the-hand-written-parts.md.

The proposal identifies reads of awebai/oats#1606, #1619, #1623 and #1622 on
2026-10-27–28; the note specifically describes #1606 and the Upgrade claim
in [#1623](https://github.com/awebai/oats/pull/1623), reported corrected at
`ae2fa39e`. Review findings and the correction are source-reported, not
independently audited implementation or release receipts.

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
[One release lane, project lanes defined by their maintainers](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md);
[Cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/dev-team-and-review-flow`, 2026-07-21/27, and the 2026-07 review lessons), with lessons from agents/dev-coordinator, agents/docs-expert, agents/oats-coordinator and agents/cli-dev knowledge @ 7838d3ca (crossed mail, stale base, reviewer deaths, schema-migration aliases, review routing, the testing-honesty family).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log, 2026-09-24 → 2026-09-27: squash orphan and patch verification, head-bound ACKs, human redirection recorded before review, removal sweeps and every-entry-point probes, the lone-gate re-review, additive fields and consumer-first renames, producer trust gaps, stand-in providers, one-way-call assertions, security review of knowledge changes).
3. Migrated from agents/oats-expert/soul/knowledge/lessons/window-gone-completed-vs-killed-triage.md @ 7838d3ca.
4. Harvested 2026-10-01 (paired maintainers). OKF input c15a51880924deaff3fb01859f1c90b8aa09ad3a815c75af48410a708b5862c3 (turns t1:e06654b04457084a49aa064a418ef9a08d6f2e8fd0c0090c1c0edc683f99b78a).
5. Harvested 2026-10-01 (paired maintainers). OKF input 6fe3e66661e1fb9bcef9dd2a99d0d8c0f3ebcc7aa9882e1a1d6591edc1cb899c (note maintainer-pairing-agreement.md; second-reader rationale only, not the still-proposed operating terms).

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/a-path-ci-does-not-run-is-run-before-the-hand-over.md.

The note dates the initial [awebai/oats#1000](https://github.com/awebai/oats/pull/1000)
incident to 2026-10-12, rather than the proposal's 2026-10-13, and records later
qualifications for [#1056](https://github.com/awebai/oats/issues/1056) and
[#1102](https://github.com/awebai/oats/pull/1102). Runs, causes and accepted
exceptions are source-reported; this harvest did not reproduce or independently
audit them.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-lfx, 2026-10-14; notes/a-batch-window-keeps-the-same-area-rule.md; notes/merge-rule-base-moved.md; notes/merge-on-old-base-run-the-combination.md; notes/a-pr-that-defers-part-of-a-decided-rule-cites-the-split.md; notes/a-real-terminal-check-is-bounded-and-cleans-up.md.

The source reports the batch failure in
[awebai/oats#1151](https://github.com/awebai/oats/pull/1151) with
[#1155](https://github.com/awebai/oats/pull/1155), fixed forward by
[#1203](https://github.com/awebai/oats/pull/1203); the unauthorized staging in
[#1164](https://github.com/awebai/oats/pull/1164) against the decision in
[#855](https://github.com/awebai/oats/issues/855); and the terminal-capture
incident during [#1193](https://github.com/awebai/oats/issues/1193). Agreement,
CI results and incidents are source-reported, not independently audited by
this harvest. The base-moved note's later qualifications are not reduced to
the proposal's earlier head-guard/clean-merge-only path for unrelated files.
