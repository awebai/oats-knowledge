---
type: Lesson
title: A global instance identity leaves a permanent registry address behind, so per-spawn global identities need a retire verb or a bounded pool
description: On the messaging service's published CLI a global identity can hold several team memberships and retire can revoke them all, but releasing the claimed address needs the namespace controller's own key (a customer-controlled namespace), which a hosted root does not hold, so minting one global identity per spawn under a hosted namespace accumulates addresses and makes instance names non-reusable; settle a hosted retire path or keep instances local before defaulting to global.
tags: [messaging, identity, teams, retire, registry]
timestamp: 2026-09-25
---

**Observed.** Designing multi-team membership for instances: a team-scoped
(local) identity is one team by construction, since joining refuses an
occupied identity directory; a global identity joins further teams from a
member-global invite. Retirement, on the published client, revokes every
membership through the team-authorized removal path, and the client's own
workspace delete points global identities there. Address deletion exists
(`aw id namespace delete-address`, certificates revoked first, the did:aw
history stays append-only) but only under the LOCAL namespace controller's
key, which a hosted personal root does not hold; so under a hosted namespace
the did:aw and its address stay registered after every membership is gone.
A later source read also showed that hosted teams refuse member-global
invites, and that a grant home carries one team id: a global identity's
many memberships do not make one grant home switch teams.

**Rules.**
- Before defaulting a provider to global identities per spawn, know what the
  registry keeps after retirement, who holds the authority to release it, and
  whether the hosted invite route exists at all; read the service's source or
  ask its owner, never infer from a flag's name. Do not discover this after a
  thousand spawns.
- Verify a credential's team selection separately from an identity's
  memberships: an identity may belong to several teams while its session
  credential names one.
- The kernel contract for teams does not depend on the answer: the
  reconcile operation and the per-label payload work with either identity
  model; only the provider's default scope does.
