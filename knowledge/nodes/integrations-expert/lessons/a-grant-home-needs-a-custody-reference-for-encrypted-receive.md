---
type: Lesson
title: A grant home needs a custody reference for encrypted receive, and a grant rehearsal reads the inbox through the grant
description: A session-grant home written by the messaging CLI's mint holds only the grant record and its signing key, and encrypted receive through the grant looks for an encryption reference in that home naming the custody socket; without it the instance can send and identify itself but cannot decrypt, so rehearsal evidence is labelled per path and every grant rehearsal reads the inbox through the grant, where receive-side gaps surface.
tags: [lesson, integrations, messaging, grants, custody, e2ee, rehearsal]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations maintainer during the first hosted
rehearsal of resident-identity session grants against the deployed messaging
service.

# What happened

Every plaintext path proved out end to end: custody readiness with the
grant-status endpoint ready, a typed not-found from the authenticated status
route, a grant minted through the integration's preflight, a mail delivered
through the grant, the identity reported through the grant, a reply received
through the grant, and the grant revoked on retire. Reading the instance's
inbox through the grant printed one warning: encrypted decryption
unavailable, because the grant home has no custody reference (an encryption
file the client expects beside the grant record, naming the custody socket).
The custody service was running with encryption ready and both encrypted
operations advertised; the client simply had no path to it from the grant
home, and the mint command offers no flag to record one.

# Rule

- **Custody readiness is not grant readiness for receive.** The preflight
  proves the custody service can sign and unwrap; it does not prove the
  grant home can reach it. Who writes the custody reference into the grant
  home (the mint, a setup step, or the integration's spawn hook) is the
  messaging service's call and is open at the time of writing; until it is
  answered, the integration does not report encrypted receive through a
  grant as ready.
- **Evidence is labelled per path.** Plaintext send, identity and revoke
  proven is not encrypted receive proven. A rehearsal report that says
  "grants work" without reading the inbox through the grant has not
  exercised receive at all.
- **Reading the inbox through the grant home is part of every grant
  rehearsal.** It is read-only, cheap, and the one step where receive-side
  gaps surface; the send-side steps cannot reveal them.

# Why

The grant model separates the resident's root keys (custody host only) from
a short-lived, scoped grant the instance holds
([resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)).
Sending needs only the grant's signing key; decrypting needs the custody
service, so the grant home must know where custody is. A gap on that edge
is invisible from the sender's side and from readiness, and only a receive
attempt through the grant shows it.

# Consequences

- The integration's readiness answer ([the kernel's provider readiness check wire](/nodes/integrations-expert/references/the-kernels-provider-readiness-check-wire.md))
  reports encrypted receive as a warning, never as ready, while the custody
  reference question is open.
- The same discipline applies to the token-free admission and personal-team
  work ([personal workspace teams and token-free admission](/nodes/integrations-expert/decisions/personal-workspace-teams-and-token-free-admission.md)):
  each new identity path gets a receive-side check in its rehearsal, not
  only a send.
