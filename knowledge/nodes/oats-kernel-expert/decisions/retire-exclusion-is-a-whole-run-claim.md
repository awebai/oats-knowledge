---
type: Decision
title: Retire exclusion belongs to a whole-run claim, not a plan or retry key
description: A per-home claim covers every retire apply path and its authoritative reads, separating exclusion from plan freshness and outcome replay while refusing contention without a force bypass.
tags: [kernel, lifecycle, retire, concurrency, fail-closed]
timestamp: 2026-10-10
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

# Boundaries and related decisions

This is retirement-against-retirement exclusion, not a claim that every
lifecycle command or roster reader participates. Nor does a dead holder
prove its hook children stopped. Cross-command coordination and surviving
hooks were explicitly left for separate decisions; this record supplies no
takeover policy for them.

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

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-exclusive, 2026-10-10; notes/863-decision-retire-claim-shape.md; notes/863-evidence-retire-has-no-exclusion.md; notes/863-consumers-of-the-busy-refusal.md.

1. The proposal and decision note attribute the decision, all-forms authoritative-read requirement, handoff exception and accepted response changes to the review of [awebai/oats#871](https://github.com/awebai/oats/pull/871), reported merged on 2026-10-10. The note's final as-merged account takes precedence over its earlier handover account. Maintainer-instance attribution is not inferred human acceptance; this harvest did not audit the implementation or approval history.
2. The evidence note reports gate-established overlap while investigating [awebai/oats#863](https://github.com/awebai/oats/issues/863), and explicitly corrects the earlier unqualified plan-revision claim with the launched-home case. The harvest did not rerun the reproductions.
3. The consumers note reports Desktop's before-effect interpretation of the busy code and host-side execution of remote retirement. Its renderer inventory and separately scoped diagnostic defect are not adopted as kernel knowledge.
