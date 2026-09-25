---
type: Lesson
title: Read a message's verification at the message level, not from a listing, and let the receiver's verdict decide
description: The messaging client's conversation listing and its single-message read can disagree on one message's verification status; the message read carries the envelope (sender key, stable id, signature), so it is the sender-side evidence, and only the receiver's status is acceptance evidence for a custody-signed send.
tags: [lesson, integrations, messaging, grants, verification, rehearsal]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations maintainer during the corrected
hosted rehearsal of resident-identity session grants, on the first send
through a grant home attached to its custody service.

# What happened

The conversation listing, read through the grant home, showed the new
custody-signed message as an identity mismatch, while the earlier unattached
send in the same conversation showed as unverified. Read at the message
level, the same message showed a verified signature with a stale continuity
refresh, and its envelope named the resident's custody signing key as the
sender with the resident's stable id: exactly what the custody attachment
was meant to produce
([a grant home's custody block is what makes a grant sign and decrypt](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md)).

One client, one message, two verdicts. The listing's path resolves keys
differently from the message read, and the same client release carried a
known resolver defect on the encryption-key side
([a failing readiness diagnostic is not a missing fact](/nodes/integrations-expert/lessons/a-failing-readiness-diagnostic-is-not-a-missing-fact.md)).
The same lesson holds on the receiving side of a push channel, whose flag is
the channel's own verdict
([a channel verification flag is the channel's verdict, not the sender's](/nodes/oats-operator-expert/lessons/a-channel-verification-flag-is-the-channels-verdict-not-the-senders.md)).

# Rule

- **Cite verification from the single-message read**, with the envelope's
  sender key and stable id, never from a listing. A listing is navigation;
  the message read is the evidence.
- **The sender-side status is evidence about the envelope, not acceptance.**
  Acceptance of a custody-signed send is the receiver's verification status
  of that message id, reported by the receiver, and the rehearsal report
  quotes it as such.
- **When two client views disagree, report both verbatim** with the message
  id to the service owner as a client defect, and keep the identity
  untouched; a disagreement between views is never a reason to rotate,
  re-mint or re-send.

# Why

A grant rehearsal exists to prove that the receiver sees a verified sender,
which no sender-side view can establish. The sender-side read is still
needed, because it is the only place the envelope's sender key and stable id
are visible before the receiver answers, and it is what distinguishes an
attached grant (resident as sender) from an unattached one (unverified). A
listing adds nothing to either question and, as here, can contradict both.
