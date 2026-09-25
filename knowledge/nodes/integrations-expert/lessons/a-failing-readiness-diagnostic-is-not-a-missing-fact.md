---
type: Lesson
title: A failing readiness diagnostic is not a missing fact until the source of truth has been read
description: When a client's health check contradicts a command's own success receipt, the discrepancy is reported and the authoritative source (the registry route, the service's endpoint) is read directly before anything is treated as missing; a live identity is never re-published or rotated to satisfy a check that may itself be the broken party, and a direct read still proves only readiness, not the functional path.
tags: [lesson, integrations, messaging, e2ee, diagnostics, registry]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations maintainer while preparing the
encrypted leg of a hosted rehearsal of resident-identity session grants.

# What happened

A publication command on a retained resident identity reported its
encryption-key assertion published to the registry and to the messaging
service, with the key material unchanged. The CLI's online health check
then reported that the registry held no such assertion, on the published
binary and on the reviewed candidate alike, and the CLI's own registry
resolve showed none. The service's coordinator saw the same result on a
second identity.

Reading the registry's public route for the identity's key directly
returned the assertion: same key id, same public key, the publish
operation recorded. The check was a client defect: one code path built its
resolution without the encryption-key field that the wire carried, while
the messaging path copied the field correctly. Nothing was missing.

# Rule

- **A diagnostic that contradicts a command's success receipt is a
  discrepancy to report, not an instruction to repeat the command.** Stop,
  leave the identity untouched, and read the authoritative source directly
  before deciding anything is absent.
- **Never rotate or re-publish key material on a live identity to satisfy
  a failing check.** The check may be the broken party; rotation is the one
  action that cannot be undone, and repeated publishes create the noise the
  next reader has to explain.
- **A direct read proves readiness, not function.** The encrypted send,
  receive and unwrap through the real path remain the proof, exactly as a
  custody service's readiness is not a grant's attachment
  ([a grant home's custody block is what makes a grant sign and decrypt](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md)).

# Why

Health checks and resolvers are consumers of the same wire as the feature,
but they are separate code and drift separately. The operator node records
the same shape for verification flags: a channel's verdict is the channel's,
and the CLI fetch is the authoritative comparison
([a channel's verified flag is the channel's verdict, not the sender's](/nodes/oats-operator-expert/lessons/a-channel-verification-flag-is-the-channels-verdict-not-the-senders.md)).
The cost of believing a broken diagnostic is asymmetric: a false "missing"
invites a destructive fix, while a false "present" is caught by the
functional test that follows anyway.

# Consequences

- Rehearsal runbooks name the authoritative read for each readiness fact
  beside the CLI check, so a disagreement between the two is a finding
  about the client, routed to its owner with the exact request and
  response.
- Any command that would write to a live identity (publish, rotate,
  re-register) runs at most once per authorization and reports its receipt
  and the direct read-back together.
