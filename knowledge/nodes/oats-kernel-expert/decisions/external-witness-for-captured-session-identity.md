---
type: Decision
title: A promised replacement guarantee needs an external identity witness, not a path
description: When captured execution promises to reject replacement of the original native session directory, a canonical path or an in-directory marker cannot back that promise; a narrowly versioned kernel-owned witness retained outside the protected root, bound to the incarnation, is required and must advertise its complete enforcement chain.
tags: [kernel, custody, sessions, runtime, identity, portable-souls]
timestamp: 2026-09-19
---
# Context

Accepted by the human 2026-09-18 after independent review returned the
initial captured-host proposal; descriptor lesson added 2026-09-19 during
implementation review. The proposal promised to reject replacement of the
original native session directory, but existing authority retained only
canonical *paths*. A path can name a different real directory after deletion
and recreation, or after replacement. The existing recorder could attribute an
explicitly injected session directory to a launch; that is not proof that the
same filesystem object remains there across starts. A marker placed inside the
directory is not an independent witness either, because replacement replaces
the marker. A proposal cannot claim stronger protection while forbidding every
durable witness change that would make the claim true.

# Options and decision

1. **Keep path attribution only** and drop the replacement promise. Rejected
   for a captured host: acceptable only if honestly documented as the weaker
   guarantee, and never by calling path equality object-identity validation.
2. **Add a narrowly versioned witness in existing kernel custody** — chosen.
   Retain non-secret directory identity *outside* the protected root, bound to
   the existing incarnation and admitted native action, under existing trusted
   custody, with no second store or identity system.
3. **Redesign the native record engine or all backends.** Rejected as the
   default: any unavoidable extra surface is identified and approved
   separately rather than expanding scope silently.

Rules that follow from the choice:

- Prefer an existing index, pending receipt or session receipt; version the
  changed shape explicitly; reuse an existing directory-identity codec rather
  than inventing competing path or root-resolution authority.
- Create the witness exclusively after admission; observe and persist it
  before any dependent native effect; validate it at *every* managed boundary
  that relies on the stronger guarantee.
- On missing proof, partial creation, unknown outcome, replay or restart:
  **hold**. Never recreate, claim ownership by path, copy a marker into a
  replacement, duplicate dispatch or silently repair custody. Missing claimed
  evidence holds rather than becoming fresh history.
- Keep legacy path-only receipts literal; never backfill them into stronger
  evidence and never let old readers silently accept an unsupported shape.
  Enumerating surviving files cannot establish completeness after a receipt
  disappears.
- The witness is **evidence, not permission**: not a new native session
  identifier, and silent about credentials, SDK installation or accounts
  ([native authentication](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)).
  A same-process retry counter advancing is not a replacement identity or
  permission to borrow another process's proof.

# Consequences

**A version constant advertises the complete chain.** The record-version
constant must advertise the *complete* enforcement chain — write, discovery,
snapshot/read, capture/append and traversal — not writer support alone. No
fallback to the earlier version, silent backfill or marker-only implementation
qualifies. The maintainer kept one advertisement rather than adding
self-reported constants to every internal module: the libraries ship
together, and extra self-reports establish nothing; source review and
behavioural checks must cover every dependent read and append boundary.
Do not claim protection that only some dependent paths enforce.

**Before-read protection concerns the opened descriptor, not only its path**
(2026-09-19). A temporary ancestor redirect during open can leave a foreign
descriptor even when the named path is normal again. Bind the descriptor to
the witnessed, physically contained named source *before* reading; a later
exception or refusal to append cannot undo a foreign read already performed.
The same holds for authority and completion documents: an earlier stat and a
post-read root check do not establish which opened file supplied the bytes.

This decision approves the session-directory identity witness only. It does
not implement or approve otherwise unfinished retirement and recovery paths,
interactive or plugin profiles, private-provider authority, or publication.

# Related

[Identity and location belong to the resolved object, never to the string that named it](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md);
[Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md);
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/captured-session-storage-identity.md` (accepted 2026-09-18, amended 2026-09-19).
