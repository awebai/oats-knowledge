---
type: Lesson
title: A hook reports only the cleanup it confirmed, and keeps the credential a retry needs
description: Hooks and provider verbs that create or remove external state emit meta before failing, claim only confirmed effects, re-check an uncertain effect instead of guessing, keep compensation idempotent, and delete a local credential only after the remote record it controls is confirmed gone.
tags: [lesson, integrations, hooks, compensation, retire, external-state, truthfulness]
timestamp: 2026-09-24
---

Learned 2026-09-24 in a live rehearsal: a recovery path reported "revoked"
for a revoke that had thrown, and the credential stayed active on the server
for eight minutes until a human revoked it. The same shape reappeared on
2026-09-25 in a provider's team-leave verb, which removed the local identity
home before the remote self-delete was confirmed.

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
5. **Remote first, local key last.** Removing an external membership or
   identity runs in this order: remote deletion confirmed, then the local
   credential removed, then the provider's record dropped. On failure keep
   both the credential and the record, surface it (a warning, a nonzero
   verb), and let the next retire or leave retry with the key still in hand.
   Retire reports the memberships it could not leave rather than hiding them
   behind a clean exit.

# Why

Compensation runs in the worst conditions: a partial success, a slow network,
a process the kernel is about to tear down. A message written for the happy
path ("revoked it") becomes a lie exactly when it matters, and a stranded
credential that the record says is gone is the hardest kind to find. Deleting
the local key first is the same lie in structural form: the remote record
survives with no key that can remove it. The kernel side of the same
principle is
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

# Consequences

- Tests cover the failure branches of compensation: revoke fails, revoke
  times out then a status read says revoked, mint wrote files but printed no
  answer, remote leave fails and the identity home survives.
- The kernel's retire retry must be able to re-run a hook it owes; a home
  whose compensation was incomplete is retained, not deleted.
