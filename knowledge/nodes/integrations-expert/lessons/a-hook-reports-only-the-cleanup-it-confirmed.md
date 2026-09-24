---
type: Lesson
title: A hook reports only the cleanup it confirmed — compensation returns meta for a retry and re-checks an uncertain effect before claiming it
description: Lifecycle hooks that create external state must, on failure, revoke what they can, say exactly what they confirmed, keep the identifiers in meta so the kernel's compensation can retry, and after a timeout re-check the external state rather than report success or failure by guess.
tags: [lesson, integrations, hooks, compensation, retire, external-state, truthfulness]
timestamp: 2026-09-24
---

Learned 2026-09-24 in a live rehearsal: a recovery path reported "revoked"
for a revoke that had thrown, and the credential stayed active on the server
for eight minutes until a human revoked it.

# Rule

1. **Emit meta before failing.** A spawn hook that created anything external
   (an identity, a grant, a registration) puts its identifiers in meta even
   when it exits nonzero; the kernel feeds that meta to the retire hook as
   compensation.
2. **Claim only confirmed effects.** "Revoked" is said inside the branch where
   the revoke returned success; a failed revoke says "revoke failed: reason"
   and keeps the meta.
3. **An uncertain effect is re-checked, not guessed.** After a timeout or a
   "may have applied" error, query the external state and report what it
   says; treat a confirmed prior revocation as success.
4. **Compensation is idempotent from both ends.** The hook's own recovery and
   the kernel's later retire may both revoke; the second attempt must be
   harmless, and the hook must tolerate the server's "already done" answer.

# Why

Compensation runs in the worst conditions: a partial success, a slow network,
a process the kernel is about to tear down. A message written for the happy
path ("revoked it") becomes a lie exactly when it matters, and a stranded
credential that the record says is gone is the hardest kind to find. The
kernel side of the same principle is
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md):
do not destroy or declare gone what has not been confirmed gone.

# What goes wrong

- A retire that removes the home before the external record is confirmed
  retired strands the record without the key that could have retired it.
- A recovery message claims success; the operator's cleanup list is wrong.
- A revoke that timed out is retried as if it had failed, or reported as if
  it had succeeded, when only a read of the server can tell.

# Consequences

- Tests cover the failure branches of compensation: revoke fails, revoke
  times out then a status read says revoked, mint wrote files but printed no
  answer.
- The kernel's retire retry must be able to re-run a hook it owes; a home
  whose compensation was incomplete is retained, not deleted.

# Citations

- Maintainer review of oats PR #107 rounds 3 and 4 (2026-09-24) and the
  kernel quarantine-retry fix shipped in the same week.
