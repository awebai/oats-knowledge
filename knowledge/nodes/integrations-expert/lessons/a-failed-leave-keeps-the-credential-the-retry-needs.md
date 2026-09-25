---
type: Lesson
title: A failed leave keeps the credential the retry needs; delete the local key only after the remote membership is gone
description: When a provider removes an external membership it created, deleting the local identity home before the remote deletion is confirmed makes the failure unretryable and orphans a remote row whose key is gone; on failure keep the identity home and the provider's record, report a warning or a nonzero outcome, and let the next retire or leave retry with the key still in hand.
tags: [integrations, cleanup, lifecycle, identity, teams]
timestamp: 2026-09-25
---

**Observed.** Joined-team identities live in a per-team identity home
under the instance, and leaving a team is the remote self-delete run
through that identity followed by removing the home and the provider's
record. Ordering the removal first would have destroyed the only key that
can perform the self-delete whenever the remote call failed.

**Rules.**
- Order: remote deletion confirmed, then local credential removed, then the
  provider record dropped. Never the reverse.
- On failure keep both the identity home and the record, and surface it
  (a warning in the operation output, a nonzero result for the verb), so an
  operator or the next lifecycle boundary can retry.
- Retire runs the same leave per joined team before releasing the primary
  identity, and reports the memberships it could not leave rather than
  hiding them behind a clean exit.
