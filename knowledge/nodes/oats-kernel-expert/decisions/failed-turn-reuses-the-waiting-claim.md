---
type: Decision
title: A failed turn reuses the waiting claim, not a new reason or activity state
description: Report a terminal provider error through the harness adapter's own attention claim because a message conveys the failure without extending the closed reason enum or overwriting the agent's claim.
tags: [kernel, harnesses, attention, activity, contract]
timestamp: 2026-10-30
---
# Decision and rationale

The source selected the existing waiting-claim path for a model turn that
ends in a provider error after the harness finishes retrying. The harness
adapter reports an attention claim with a failure message, using its own
producer, and clears that claim when the harness begins the next turn.
This is source-selected design, not a claim of human acceptance or released
behavior.

The need is to expose a turn that needs someone to intervene, not to add a
new kind of activity or establish whether a process is alive. A message can
explain the failure within the existing attention reason. Producer-scoped
clearing keeps the adapter from erasing the agent's independently raised
claim: an automatic reporter must not take ownership of a question the
agent still needs answered.

# Rejected alternatives

- **Add a `failed` reason.** The reason set is a closed enum. Extending it
  creates a contract change without supplying behavior the attention claim
  and message cannot express. Revisit that choice only for a distinct
  semantic need, not merely a different diagnosis string.
- **Represent failure as working/idle activity.** A request for intervention
  is a separate observation. Keep the
  [producer-reported activity decision](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)
  intact rather than making failure another activity state.
- **Report every failed attempt.** In the reported pi investigation,
  `agent_end` preceded retries, so it could raise attention for a transient
  error that the same turn recovered from. The
  [harness-boundary lesson](/nodes/oats-kernel-expert/lessons/failed-turn-boundaries-differ-by-harness.md)
  owns the observed events and their limits.
- **Fill the Codex hook gap by reading rollout files.** The source rejected
  that inferred substitute for a producer report. A missing failure event
  is a coverage limit, not permission to infer the answer from a transcript.

This specializes the existing reported-fact boundary; it does not redefine
cross-domain activity policy or the Desktop's separate
[attention and liveness design](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md).
Neither canonical decision is superseded.

# Enforcement and evidence

Keep the selected behavior in the adapter and existing claim writer rather
than relying on a remembered procedure. Regression coverage should distinguish
a terminal error from retry recovery, prove that a new turn clears only the
adapter's producer, and preserve an independently raised agent claim. These
are enforcement targets, not tests run by this harvest. Cancellation and
reload ordering have additional evidence limits in the linked lesson.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/failed-turn-claim-reuses-waiting.md; notes/failed-turn-signal-per-harness.md.

The source identifies [awebai/oats#1667](https://github.com/awebai/oats/issues/1667)
and [PR #1669](https://github.com/awebai/oats/pull/1669). The choice and rejected
alternatives rely on the captured proposal and notes; this harvest did not
inspect implementation, rerun probes or verify shipment. The source's
point-in-time statement that the activity implementation was not on main is
not retained as ongoing state or as a permanent reason to prefer this path.
