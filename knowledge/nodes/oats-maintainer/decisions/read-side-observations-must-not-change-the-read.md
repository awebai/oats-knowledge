---
type: Decision
title: Private observation writes must not change the read
description: A read command may retain kernel-private observations only without changing its answer, exit code or output, with atomic writes, fail-closed missing history, documented privacy and host-local ownership.
tags: [kernel, observation, command-semantics, privacy, locality]
timestamp: 2026-10-27
---
# Decision and rationale

The maintainer's 2026-10-27 coherence ruling permits a read command to keep
private observation history under strict conditions. The motivating case is
status retaining what the local kernel saw running so that a later recovery
sweep can distinguish a recent loss from old history. A present-tense read
alone cannot recover that past fact, but recording it must not make the read
less reliable or silently turn it into the recovery action.

This is a constrained permission, not a claim that every nominally read-only
command may write. All of these conditions hold together:

1. **The observation write never changes the read's answer, exit code or
   output.** A failed recording attempt must not turn a successful status
   read into failure, alter the returned fact or leak diagnostics into its
   output. The observation record is not a replacement source for the live
   answer.
2. **Writes are atomic.** Future consumers must not treat a partially
   replaced observation as valid history.
3. **Unreadable history counts as empty and fails toward not acting.** For
   recovery this means not automatically starting a home. Missing evidence
   is not permission to reconstruct a favorable past.
4. **The side effect and the record's private status are documented on the
   page that owns the command.** Private storage is not a hidden public
   contract for clients to read or maintain.
5. **Only the local kernel records.** A routed read is recorded by the
   kernel on the machine being read, not by the caller asserting a remote
   observation as its own local history.

The distinction is between remembering an observation and making a
lifecycle decision. In the [lost-session recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md#automatic-recovery-needs-the-kernels-own-recent-loss-evidence),
status can establish first-seen loss time without using up the sweep's
judgment. That concept owns the eligibility and age bounds; this one owns
why read-side persistence is admissible at all.

# Boundaries and enforcement

Keep recording failure isolated from the read result in the implementation,
and test answer, exit-code and output invariance under write failure,
unreadable history, atomic replacement and local versus routed reads.
These are elimination routes for a reviewer-only rule, not claims that this
harvest exercised them. The decision's durable value is the semantic and
ownership limit, not a competing private-file specification.

This permission does not weaken the kernel lesson that
[observing another agent's tree must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md):
writing a kernel-owned private observation is not permission to mutate the
observed repository or execute its helpers. Nor does it extend the separate
[preview-bound observation-reuse exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
to other writers. It changes neither the ownership of host facts nor the
requirement to leave unknown evidence unknown.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/session-resume-gate.md.

The source records this as its coherence ruling during the recovery design,
not as a direct human decision. The proposal and named note support the
conditions; the proposal explicitly requires documenting the record's
privacy. The related recovery agreement is identified in
[awebai/oats#1567](https://github.com/awebai/oats/issues/1567).
No private correspondence, implementation repository or live status behavior
was independently audited here. This preserves the rationale and review
boundary, not evidence that the implementation has shipped or passed tests.
