---
type: Decision
title: Retire exclusion belongs to a whole-run claim, not a plan or retry key
description: A whole-run lifecycle claim separates exclusion from freshness and replay; extending it to starts preserves existing contention answers and keeps restart's stop and relaunch in one critical section.
tags: [kernel, lifecycle, retire, resume, start, concurrency, fail-closed]
timestamp: 2026-10-30
---
# Decision

The retire review of 2026-10-10 chose one per-home claim for the entire
retirement operation. The source attributes the choice and subsequent review
conditions to `oats-maintainer-pepe`, and reports the implementation merged in
awebai/oats#871 [1]. This records the decision and its reasons, not independent
verification of approval or release status.

**Exclusion, freshness and replay answer different questions.** The claim
establishes who may retire. A plan revision establishes whether the caller's
reviewed facts still hold, but only the claim holder can make that comparison
authoritatively. An idempotency key replays an outcome that has already been
recorded; it is not protection against another apply still running.

# Why the claim spans the whole operation

Put acquisition in the common retirement operation, not just the CLI entry
point: plain apply, guarded apply, deferred self-retire completion and the
host-side remote route all owe the same exclusion guarantee. Resolve the home
again after acquisition. Read every fact that will drive an effect while
holding the claim: the home, plan, children and extra trees, for every form of
retire. Pre-claim reads may locate the claim or replay a recorded outcome;
they must not supply the state retirement acts on.

Moving only the comparison under the claim is insufficient. Another retire
can stop the session, fail and release between a pre-claim plan read and
acquisition. Comparing the caller's revision with that earlier read can then
accept state that no longer exists. The chosen answer order under the claim
is: home gone, pending self-retire, stale plan, then retirement. Freshness is
not a substitute for first settling exclusion.

The gate-controlled reproductions explain why the previous guards were not
enough [2]. Plain applies and guarded applies with either identical or
different keys overlapped, running hooks and creating recovery copies twice.
The later correction matters: on a never-launched home the plan revision did
not move during the first run; on a launched home stopping the session made
an old plan stale, but reconfirming the fresh plan still allowed overlap.
Neither a first stale-plan refusal nor a retry key proves serialization.

# Reuse the claim without weakening it

Reuse the lifecycle claim protocol already used by worktree operations,
rather than introduce another locking mechanism. It identifies the holder
by PID and start token, distinguishes alive, gone and unknown, and serializes
takeover of a dead holder. The short read-modify-write directory lock was
rejected because it cannot reclaim a dead owner: killing a long retirement
would strand all subsequent attempts.

Keep the claim beside the home, never inside it. The home's bytes are the
object retirement observes, copies and removes; an internal claim would
change that object and disappear with it. Leave the shared claims directory
in place: removing it when apparently empty races another retirement
creating a claim there. This is deliberate residue, not a cleanup omission.

**Refuse ordinary contention immediately with `E_LIFECYCLE_BUSY`, before any
effect.** Existing consumers interpret that code as refusal before work,
so stopping sessions or children, copying and hooks must all remain behind
the gate [3]. Retirement can be long; the protocol's short wait does not
establish that an unrelated retirement will finish. There is one deliberate
exception: the deferred self-retire completion briefly waits for its own
live scheduler to release the claim. Without that bounded handoff, process
startup timing decides whether the scheduled completion succeeds.

A scheduled completion also occupies the pending window before it acquires
the claim. Its marker identifies the completion by PID and start token, so a
holder established as gone does not permanently block retry. The accepted
caller-visible costs are that a repeated self-retire reports already
scheduled only before completion starts, then busy, and a repeated
self-retire that keeps its directory reports busy in the pending window.

`--force` does not bypass the claim, including unknown holder liveness.
Reusing the spawn-in-progress force escape was explicitly rejected here:
every retirement that proceeds must hold a claim, and force must not expand
from accepting hook debt into permission for concurrent destructive work.
An unreadable-holder refusal instead identifies the claim needing operator
attention and a by-hand verification/recovery route. It is not permission
to remove a claim whose holder has not been established safe to displace.

# Refinement: automatic resume joins the whole-run claim

The 2026-10-27 proposal extends this decision to `session start --resume`:
a resume takes the same lifecycle claim, as a `resume` holder, for its whole
start [5][6]. Read the owed retirement, partial upgrade and whether the session
is still lost under that claim. A sweep's earlier status read is only a
prefilter; it is not atomic with the start that follows.

The source reports that a sweep on OATS 0.69.1 resumed homes during
retirement. Two gaps combined: retirement's own window termination omitted
the intentional-stop record, and the automatic starter acted beside the
lifecycle claim instead of inside it. The claim closes the live overlap;
[recording stop intent before termination](/nodes/oats-kernel-expert/decisions/stop-intent-recording-is-before-termination-and-best-effort.md)
addresses the separate classification gap.

**Skip a home held by a lifecycle act, or with a retirement owed; do not
refuse its loss as a recovery verdict.** A refusal is recorded, judged and
counted against the recovery loop guard. A lifecycle act decides the home's
next state itself, so contention is not evidence that recovery has failed.
This is an automatic-sweep exception to refusal-shaped contention, not a
change to retirement's before-effect refusal or permission to bypass a claim.

Rejected alternatives explain the span:

- A read-only claim check, as used by worktree add, leaves time for retirement
  to begin after the check and before the resumed window exists.
- A separate resume lock creates two locks whose acquisition must be ordered.
- Claiming only window creation complicates a start lasting seconds without
  buying enough to justify a smaller critical section. A retire arriving
  during resume may instead receive the existing busy refusal and be retried
  after resume releases the claim.
- Extending that change to ordinary starts was rejected as outside the resume
  bug: those are explicit acts, not the automatic recovery being coordinated.
  The later start refinement below explicitly supersedes this scope limit.

The prevention route is shared claim acquisition and authoritative reads in
the start path, with regression cases for a sweep during a held retire,
between retirement's stop and removal, and a retire arriving during resume.
The source reports these races fail with the fix reverted; this harvest did
not execute them. The policy deciding which losses qualify remains in the
[maintainer-owned recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md),
not in a competing sweep-side eligibility rule.

# Refinement: every session start joins without renaming contention answers

The 2026-10-30 proposal extends the claim to ordinary `session start`,
`session restart` and scheduled starts, using one holder verb, `start` [7][8].
Resume retains `resume`. Spawn's first launch remains outside this addition,
because retirement already handles a spawn in progress. This explicitly
supersedes the resume change's ordinary-start exclusion, not its rationale
for rejecting a read-only retirement check.

**Restart holds one claim across both stop and relaunch.** Releasing after
stop and acquiring again for launch would admit a retire into the gap. A
separate `restart` holder was considered but not selected: restart is a start
for this exclusion boundary, so a second value adds no useful distinction.
Release on every returning exit, including failed launch; a crashed holder
still needs the existing stale-holder recovery, not a promise that cleanup
always ran. Scheduled starts and the sweep record lifecycle-claim contention
as a skip, release the scheduling slot where applicable, and do not enter an
immediate retry loop. Contention does not establish a failed recovery.

**Changing the exclusion mechanism is not a reason to rename answers clients
already match.** Both maintainer sides agreed to retain `E_SESSION_START_BUSY`
for two concurrent starts. The subsequent build direction preserves every
existing start-lock pair: a start or restart beside a start, restart or resume,
and a resume beside a start or restart, including unreadable holder liveness,
keeps `E_SESSION_START_BUSY`. Resume beside resume keeps `E_LIFECYCLE_BUSY`.
The latter narrowing is recorded as source-selected direction, not bilateral
acceptance: the cited follow-up comments contain the proposing side's
amendment and precision, not the other side's answer [7]. The
[issue-recorded agreement gate](/nodes/oats-maintainer/stewardship/review-protocol.md#contract-agreement-stays-on-the-issue-through-implementation-2026-10-28)
remains unchanged; tests and a PR description cannot supply missing agreement.

The compatibility rule here concerns existing contention pairs, not an
assertion that every start refusal in every path is unchanged. Other lifecycle
acts meeting a new start holder refuse before effects. The source reports that
older kernels interpret the unknown `start` holder as retirement: conservative
before-effect refusal remains, but diagnostic equivalence across kernel
versions does not. Keep current pair tables in the repository contract rather
than a second complete table here.

The enforcement route is shared whole-start acquisition with one restart
critical section and release-on-exit, plus interleaving, failed-launch and
existing-answer regression tests. Claiming the canonical home also requires
[binding the requested spelling to receipt authority](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md#canonical-resolution-must-not-replace-requested-home-authority),
not silently choosing whichever home a link reaches. The source reports
review and mutation-sensitive tests; this harvest did not run them. As of
2026-10-30, the implementation remained open [8][9]. The kernel owner should
update this direction's status when it changes; it is not a shipped guarantee.

# Boundaries and related decisions

[A retire revision binds reviewed facts, not selected exceptions](/nodes/oats-kernel-expert/decisions/retire-revision-binds-reviewed-facts.md)
refines which reviewed facts freshness covers and why exception lists were
rejected. It preserves the distinction between exclusion, freshness and replay.

The original 2026-10-10 decision covered retirement against retirement and
left cross-command coordination for later decisions. The dated resume
refinement above explicitly extends that scope: the source reports stop and
upgrade already sharing the claim, and chooses that same claim for resume.
It does not establish that every lifecycle command or roster reader
participates. Ordinary start remained outside the resume change; the dated
start refinement above supersedes that limit as chosen direction. The
2026-10-27 account also left failed-restart classification open.
The [2026-10-28 restart refinement](/nodes/oats-kernel-expert/decisions/stop-intent-recording-is-before-termination-and-best-effort.md#refinement-restart-records-intent-before-its-stop)
addresses that separate gap through stop recording, with explicit write-failure
and refused-stop limits; it does not extend lifecycle-claim coverage. Nor does
a dead holder prove its hook children stopped. No new takeover policy is supplied.

[Verified recovery does not prove that a home stays removed](/nodes/oats-kernel-expert/lessons/verified-recovery-does-not-prove-home-removal.md)
adds historical stop-retire overlap evidence for this boundary: work
preservation and late-writer cleanup need separate proofs. The resume
refinement is not proof that every late-writer or surviving-hook case in
that lesson has been eliminated.

The [process-identity lesson](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md)
keeps the distinct unreaped-holder limitation and its elimination route.
In particular, matching PID/start identity is not proof of ability to act,
and an exited but unreaped completion need not yet be classified gone.

This applies the recoverable-refusal rationale of
[record-store locks](/nodes/oats-kernel-expert/decisions/record-lock-liveness-tradeoff.md)
without replacing that decision's bounded age fallback or waiting policy.
It applies the [all-path recovery guarantee](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md)
and qualifies the replay/freshness discussion in the
[CLI machine-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
without changing the existing plan or replay obligations.

# Citations

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-30; notes/start-claim-keeps-start-busy.md. This extends start coverage and preserves the compatibility rationale; it does not establish human acceptance or shipped behavior.

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-28; notes/1601-restart-records-before-termination.md. This updates the failed-restart boundary by reference to its canonical stop-intent decision; the source reported the repair still under review, not shipped.

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert, 2026-10-27; notes/decision-resume-takes-the-lifecycle-claim.md; notes/decision-retire-stop-record-is-best-effort.md.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-exclusive, 2026-10-10; notes/863-decision-retire-claim-shape.md; notes/863-evidence-retire-has-no-exclusion.md; notes/863-consumers-of-the-busy-refusal.md.

1. The proposal and decision note attribute the decision, all-forms authoritative-read requirement, handoff exception and accepted response changes to the review of [awebai/oats#871](https://github.com/awebai/oats/pull/871), reported merged on 2026-10-10. The note's final as-merged account takes precedence over its earlier handover account. Maintainer-instance attribution is not inferred human acceptance; this harvest did not audit the implementation or approval history.
2. The evidence note reports gate-established overlap while investigating [awebai/oats#863](https://github.com/awebai/oats/issues/863), and explicitly corrects the earlier unqualified plan-revision claim with the launched-home case. The harvest did not rerun the reproductions.
3. The consumers note reports Desktop's before-effect interpretation of the busy code and host-side execution of remote retirement. Its renderer inventory and separately scoped diagnostic defect are not adopted as kernel knowledge.
4. Verified by the knowledge maintainer at review of the harvest on 2026-10-10. [awebai/oats#871](https://github.com/awebai/oats/pull/871) merged on 2026-10-10 and closed awebai/oats#863. Its description and the two maintainer verdicts on it, both approving the head that merged, state the claim taken in the common retire operation for every apply form, every acted-on read made under it, the answer order, the immediate `E_LIFECYCLE_BUSY` refusal before any effect, no `--force` bypass, the completion's single wait for its own scheduler, the two changed answers and the claims directory left in place by design. awebai/oats#864, #865, #866, #870 and #874 were open at that review. The rejected directory lock, the rejected reuse of the spawn force escape and the reason for not waiting are not stated there; they rest on the source notes, which were not read at review. The verdicts are maintainer-instance records, not evidence of human acceptance, and no release was checked.
5. The 2026-10-27 proposal and named notes report the mid-retire resume observation, whole-start claim choice, rejected alternatives, skip rationale and residual limits. The proposal identifies [awebai/oats#1599](https://github.com/awebai/oats/pull/1599) as the repair and reports reviewed, green-CI handover with mutation-sensitive race tests. Those are source-reported evidence, not an implementation audit, test rerun, shipment receipt or independently established human acceptance by this harvest.
6. Checked by the knowledge maintainer at review on 2026-10-27: [awebai/oats#1599](https://github.com/awebai/oats/pull/1599) (part of awebai/oats#1559) was open, not merged. Its description states the whole-start `resume` claim, the re-reads under it, the `lifecycle-busy` skip that is never judged or counted against the loop guard, ordinary Start and Restart unchanged, and the three named race cases. It reports green CI and revert-sensitive tests; the maintainer did not rerun them. Until that PR merges and ships, treat this refinement as the chosen direction, not released behaviour.
7. Read on 2026-10-30: the [first-side proposal](https://github.com/awebai/oats/issues/1602#issuecomment-6476048759) and [other-side answer](https://github.com/awebai/oats/issues/1602#issuecomment-6477039652), both dated 2026-10-28, support whole-start coverage, unchanged two-start contention and the three build conditions. The [narrowing](https://github.com/awebai/oats/issues/1602#issuecomment-6477132396) and [precision](https://github.com/awebai/oats/issues/1602#issuecomment-6477180797) preserve the remaining start-lock pairs and resume/resume distinction. These are maintainer-instance records, not independently established human acceptance; the cited narrowing has no answering acceptance. This agrees with the evidence correction in [knowledge harvest #206](https://github.com/awebai/oats-knowledge/pull/206), rather than superseding its agreement gate.
8. [awebai/oats#1657](https://github.com/awebai/oats/pull/1657) was open and unmerged at `040ae659df10` when read on 2026-10-30. Its description corroborates the selected start holder, restart span, skips, legacy contention answers and older-kernel refusal. It also records a link/retained-cleanup resume refusal-order exception, so the compatibility slogan is not promoted as universal output equivalence. Implementation, CI and mutation results remain source-reported, not independently audited or rerun.
9. Checked by the knowledge maintainer at review on 2026-10-30: the lane maintainer's [RETURN](https://github.com/awebai/oats/pull/1657#issuecomment-6521130845) of that same head, posted seconds before this harvest was committed, reports the three build conditions and the narrowing met and one blocking problem outside the contention pairs: an existing directory that is no home now takes the claim, leaving claim state beside it, and where that write fails its refusal changes from `E_RUNTIME_ENDPOINT_UNKNOWN` to `E_LIFECYCLE_FAILED`. The fix it asks for keeps such a directory out of the claim. So the head cited in [8] was not accepted, and this case is a further reason the compatibility rule stays limited to contention pairs. The report was not reproduced at this review, and it does not say what finally ships. On awebai/oats#1602 the other side had still not answered the narrowing.
