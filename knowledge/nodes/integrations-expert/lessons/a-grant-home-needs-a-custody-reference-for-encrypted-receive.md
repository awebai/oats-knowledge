---
type: Lesson
title: A grant home's custody block is what makes a grant sign and decrypt, and the mint leaves it empty
description: The grant record a messaging CLI mints carries a custody block (socket path, service id, version) that the client's plain-message signer and decryptor both read; the mint writes none of it, so a fresh grant home sends unverified and cannot decrypt even with a ready custody service, and a grant rehearsal must read the receiver's verification and the inbox through the grant, not delivery alone.
tags: [lesson, integrations, messaging, grants, custody, e2ee, rehearsal]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the integrations maintainer during the first hosted
rehearsal of resident-identity session grants against the deployed messaging
service, corrected the same day against the service's released source.

# What happened

Custody readiness reported the service running with the team ready, the
grant-status endpoint ready, both keys ready and every signing and
encryption operation advertised. The integration's preflight passed, a
grant was minted from the resident's custody home, a mail sent through the
grant was delivered, identity through the grant was reported, a reply was
received through the grant, and retire revoked the grant on the service.

Two facts said the rehearsal was not what it looked like. The receiver
reported the probe's mail as unverified. Reading the inbox through the grant
warned that encrypted decryption was unavailable because the grant home had
no custody socket, naming an encryption file that does not exist.

The released source explains both. The grant record has a custody block
with a socket path, a service id and a version; the client installs its
plain-message signer from that socket path and reaches the custody service
for decryption through the same reference. The mint writes none of those
fields, and the CLI has no flag to set them. So a fresh grant home signs
nothing through custody: the service still delivers, but the recipient sees
an unverified sender, and receive cannot decrypt. The warning's file name is
a diagnostic defect, not the contract.

# Rule

- **Custody readiness is not grant readiness.** The preflight proves the
  custody service can sign and unwrap; it does not prove the grant home is
  attached to it. A grant home without its custody block is a
  delivery-only identity, and the integration must not call it ready.
- **Who fills the block is one owner's decision, agreed before anyone
  writes.** Either the mint fills it from the resident root it runs in, or
  the integration's spawn hook writes it after the mint from the preflight's
  verified socket path and service id, atomically and owner-only. Two
  writers of one schema is the outcome to refuse. At the time of writing
  the service's CLI owner holds that decision.
- **Acceptance evidence is the receiver's verification, not delivery.** A
  rehearsal report reads the recipient's verification status of the mail
  sent through the grant, reads the inbox through the grant, and labels
  each path separately: delivery, custody-signed plaintext, encrypted
  receive. "Delivered" alone proves routing.

# Why

The grant model keeps the resident's root keys on the custody host and gives
the instance a short-lived, scoped grant
([resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)).
Everything that must be signed or decrypted as the resident goes back to the
custody service over its socket, and the grant home is the only place the
instance can learn where that socket is. A gap on that edge is invisible
from the sender's side and from readiness; only the receiver's verification
and a receive attempt through the grant show it.

# Consequences

- The integration's readiness answer
  ([the kernel's provider readiness check wire](/nodes/integrations-expert/references/the-kernels-provider-readiness-check-wire.md))
  reports a grant whose home lacks the custody block as needs-configuration,
  never ready, once the writer is decided; until then the rehearsal
  evidence stays labelled delivery-only.
- The same discipline applies to the token-free admission and personal-team
  work ([personal workspace teams and token-free admission](/nodes/integrations-expert/decisions/personal-workspace-teams-and-token-free-admission.md)):
  a verb that exists is not a verb that is proven end to end until the
  receiving side's evidence is read.
