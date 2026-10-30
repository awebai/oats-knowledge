---
type: Lesson
title: Failed-turn boundaries differ by harness and must be qualified live
description: Pi attempt completion, Claude's fire-and-forget failure hook and Codex's missing failure hooks impose different reporting limits, so qualify finality and hook effects against the actual harness lifecycle.
tags: [kernel, harnesses, pi, claude, codex, testing, knowledge-debt]
timestamp: 2026-10-30
---
# The apparent end of a turn is not a portable signal

Before adding a turn-failure emitter, establish which event means retries
are over, how cancellation differs from failure, and whether the hook has
time to produce its effect. A success-path hook or an event named "end"
does not establish any of those properties. This matters to the
[waiting-claim decision](/nodes/oats-kernel-expert/decisions/failed-turn-reuses-the-waiting-claim.md):
a transient error must not become an intervention request, and missing
instrumentation must not be presented as successful coverage.

The source reports the following investigation on **2026-10-30**, using
**pi 1.3.0, Claude Code 2.1.308 and Codex 0.160.0** with a loopback provider
returning 400, 422 and 503 responses. This is a version-scoped finding, not a
claim that every response code was exercised on every harness or that later
versions preserve the behavior.

# Reported runtime observations

- **Pi: attempt completion precedes retry completion.** `agent_end` fired
  with an error stop reason per failed attempt, before automatic retry.
  `agent_settled` provided the boundary after retries ended; a 503 followed
  by a successful response settled cleanly. Reporting from `agent_end`
  would therefore signal failures the harness was still recovering from.
- **Claude: failure has a different hook and a different effect lifetime.**
  `StopFailure` replaced `Stop` after Claude's own retries. The failure hook
  was fire-and-forget: the source's one-shot `claude -p` exited before a
  Node-calling hook finished its write, whereas the long-lived session
  allowed the write to land. A one-shot probe alone is not evidence that
  this hook's effect works in an interactive session, nor does its missing
  write prove the hook never fired. Qualify the effect in a live session.
- **Codex: success-hook coverage did not cover provider failure.** On the
  reported 422 trial, neither `Stop` nor `notify` fired, although both fired
  on success with hook trust satisfied. An emitter limited to these hooks
  therefore could not observe that failure. Do not generalize this to all
  Codex integrations or every future release. The note names app-server
  `TurnError` as a possible distinct surface, but supplies no live acceptance
  of an OATS reporter using it.

# Review-derived pi boundaries, not live reproductions

The proposal explicitly distinguishes two further findings derived from
adversarial review of pi's source, **neither run live**:

- An abort during retry backoff can settle with `aborted: true` without a
  later `agent_end` replacing the saved error. Looking only at the saved
  stop reason can misreport cancellation as failure; the settled abort flag
  must invalidate that error.
- `/reload` replaces the extension runtime and loses its in-memory state.
  The reporter cannot infer the persisted claim's absence from fresh memory.
  The source's proposed remedy combines a first-run clear with draining
  pending writes at the awaited `session_shutdown` boundary, so an old set
  cannot arrive after the new clear. This is a source-reported ordering
  argument, not a demonstrated reload-race fix.

# Elimination route and revisit condition

The durable fix is lifecycle-aware adapter code plus regression coverage,
not a permanent manual checklist. Exercise terminal failure, retry then
success, cancellation during backoff, and reload with pending claim writes.
For Claude, assert the persisted hook effect in a bounded long-lived session,
not only hook invocation or one-shot process output. For Codex, retain a
success control when checking the failure gap so disabled or untrusted hooks
cannot masquerade as a missing event.

Use version-qualified real-runtime tests to check the model's assumptions;
the existing [real-pi CI lesson](/nodes/oats-kernel-expert/lessons/real-pi-opening-races-need-an-executed-ci-gate.md)
owns the distinction between a test file and an executed gate. Until those
cases are enforced, the emitter's uncovered cases are knowledge debt. This
harvest asserts no completed test coverage. Requalify these findings when a
harness changes its lifecycle; a new producer event can remove a coverage
limit, but absence of one does not authorize rollout inference.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/failed-turn-signal-per-harness.md; notes/failed-turn-claim-reuses-waiting.md.

The source identifies [awebai/oats#1667](https://github.com/awebai/oats/issues/1667)
and [PR #1669](https://github.com/awebai/oats/pull/1669). All runtime results,
source-review findings and proposed remedies above are source-reported from
the captured evidence. This harvest did not run a harness, inspect its source,
audit tests or establish implementation, release or human acceptance.
