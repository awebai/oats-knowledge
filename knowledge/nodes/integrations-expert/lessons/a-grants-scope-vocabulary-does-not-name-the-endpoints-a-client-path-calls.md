---
type: Lesson
title: A grant's scope vocabulary does not name the endpoints a client path calls, so rehearse each path, not each scope
description: A session grant holding every scope the mint offers still had an encrypted mail send refused as outside grant scope, because the encrypted path first performs a conversations listing that no listed scope covers while the plaintext path never calls it; rehearse every operation an instance will perform through the grant, per path and per direction, and trace a refusal to the request that returned it before concluding anything about the grant.
tags: [lesson, integrations, messaging, grants, scopes, e2ee, rehearsal]
timestamp: 2026-09-25
---

Learned 2026-09-25 by the integrations maintainer during the encrypted leg of
the hosted rehearsal of resident-identity session grants, on a grant attached
to its custody service.

# What happened

The grant carried every scope the mint's help enumerates, including mail
send. Plaintext mail through it was delivered and verified at the receiver.
Encrypted chat worked in both directions: an encrypted chat to the resident
arrived decrypted through custody, and an encrypted chat reply was sent. An
encrypted mail reply was refused with "outside grant scope".

Tracing the request showed the refusal did not come from the send. The
encrypted mail path first performs a conversations listing to resolve the
reply, and that listing is what the service refused; the plaintext path
never makes that call, and no scope in the vocabulary names it, so no scope
choice at mint time could have avoided the refusal.

# Rule

- **A scope list is not a capability list.** Rehearse every operation an
  instance will perform through the grant, per path (plain, encrypted) and
  per direction (send, receive), and label the evidence that way. A passing
  plaintext send says nothing about the encrypted path, and a passing
  encrypted chat says nothing about encrypted mail.
- **Trace a scope refusal to the exact request before concluding anything
  about the grant.** The failing call may be a lookup the visible operation
  depends on; report the endpoint and request id to the service owner, who
  decides whether the scope rule or the client path is wrong.
- **Never widen scopes or fall back to plaintext to get past a refusal** in
  a rehearsal. A widened grant hides the defect; a plaintext fallback
  reports an encrypted path as working when it is not.

# Why

The grant model gives an instance a scoped, short-lived credential and keeps
the resident's keys on the custody host. The scopes are what the human
consented to; the endpoints a client path touches are an implementation
detail that changes between paths and releases. Only the receiving side's
evidence, gathered per path, shows whether the consented operations actually
work ([read a message's verification at the message level](/nodes/integrations-expert/lessons/read-a-messages-verification-at-the-message-level-not-the-listing.md)),
and only a trace shows which request a refusal belongs to.

# Consequences

- The integration's rehearsal evidence plan lists each path and direction
  as its own line item, with the request that proved or refused it.
- The custody attachment that makes a grant sign and decrypt
  ([a grant home's custody block](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md))
  is necessary for the encrypted paths and not sufficient: attachment gets
  the client to the service, and the service's per-endpoint scope rule
  still decides.
