---
type: Decision
title: The served identity is a messaging-layer fact the kernel binds and shows, never kernel vocabulary
description: A per-spawn choice between an instance-lifetime messaging identity and serving a durable resident through a grant travels through the existing provider payload with no new spawn flags; the kernel binds every provider fact in the spawn decision and shows the served principal on the roster, while the messaging capability owns every identity rule.
tags: [identity, messaging, provider-payload, spawn, kernel-boundary, desktop]
timestamp: 2026-09-24
---
# Decision

Proposed 2026-09-23 by the redesign lead in answer to a request from the OSS
coordinator, and **accepted 2026-09-24** by the lead under the human's
delegated release and decision authority. The request: every instance
creation should offer a messaging-identity choice — **local**, an
instance-lifetime identity with no durable address, minted at spawn and gone
at retire (the default); or **global**, where the instance *serves* a durable
resident identity that already exists, through a time- and scope-bounded
grant, so its mail and chat carry the resident's address.

The messaging capability had already recorded that "global at spawn" must
mean *serve a resident through a grant*, never *mint a new global identity
per instance*. That reading is adopted: the kernel never learns what a grant
is. It refines the kernel/capability split for messaging
([kernel supplies provider-neutral intent; the capability owns identity](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md))
and follows from the earlier ownership decision that the messaging capability,
not the kernel, owns identity
([runtime, messaging and viewers have separate owners](/nodes/oats-expert/decisions/runtime-messaging-viewer-ownership.md)).

# Options considered

1. **Kernel spawn flags for identity and resident**, sugar over the provider
   payload plus an identity field in the bound spawn decision. Clear UX, but it
   puts a messaging-layer vocabulary on the kernel's forever-surface and every
   future messaging provider inherits it whether or not it has residents.
2. **No new flags; bind the payload.** The choice is expressed through the
   existing repeatable per-capability provider payload. The kernel binds the
   merged per-module payloads a spawn actually applied into the spawn decision,
   so a confirmed apply covers *every* provider fact, identity included, and
   the roster and inspection copy a documented messaging-layer meta key through
   without interpreting it.
3. **Desktop-only choice, kernel unchanged.** The Desktop forwards provider
   pairs; nothing binds them in the decision and nothing shows the served
   identity afterwards — the roster stays blind to who an instance acts as.

# Accepted: option 2

The vocabulary placement is the decision. "Identity", "resident" and "grant"
are words of the messaging layer; the kernel gains only provider-neutral
seams and never a CLI grammar for them.

- **No identity or resident spawn flags.** The Desktop shows an *Identity*
  select and a *Resident* field, prefilled from the spawn preview, and forwards
  them as provider pairs; its argument allowlist gains one generic provider
  rule, not identity-named rules.
- **The roster shows the served principal.** Status and inspection copy a
  documented messaging-layer meta key, `identity`, emitted by whichever
  capability is bound to the messaging layer, rendered as "acts as *address*
  via grant, expires *t*" or "alias *a* on *team*". Its shape is a
  messaging-layer contract in the integrations guide, so any messaging provider
  may emit it. This is "the principal this instance serves" — distinct from
  the soul, and compatible with a later definition-level design of principal
  references, delegations and assignments, which remains a separate decision.
- **The provider owns every identity rule**: resolving a resident, refusing a
  global mode without one, revoking a grant whose team differs from the
  payload's and failing the spawn with nothing kept, revoking and
  deregistering at retire, and reporting a failed revoke as a failure with the
  TTL note.

Kernel mechanics, one line each — rationale and current shape live in the
kernel node and the repository:

- The bound spawn decision carries the merged per-module provider payloads,
  an exact echo of what the hook received (see kernel node).
- Launch-hook meta is persisted into the instance's capability meta, because a
  provider that renews a grant at every start would otherwise leave retire
  revoking the *original* grant while the live one runs to its TTL; a
  documented hook return being dropped is a contract defect, so this shipped
  ahead of acceptance (see kernel node).
- A manifest may mark a settings key **host-only**; the resolver refuses it in
  every committed or per-spawn layer and admits it only from the host-local
  file. The resolver is the only place this can be enforced — the hook
  receives one merged payload without provenance — and the motivating case is
  a resident-to-custody map that a committed workspace file must never be able
  to point a spawn at (see kernel node).

# Consequences

- The kernel grows two provider-neutral fields, one manifest attribute and one
  persistence fix; no CLI grammar grows.
- A confirmed Desktop apply binds provider facts for the first time; before,
  they were covered only through the resolution revision.
- An older kernel without the per-spawn payload is unaffected: the same keys
  work through capability settings.
- Sequence: the provider half does not wait on the kernel (it emits the meta
  key regardless); the kernel half lands after acceptance; the Desktop follows
  when its lane resumes.

# Status

Accepted 2026-09-24. Provider half published after a live rehearsal; kernel
half complete in the same week — launch-meta persistence as a defect fix in
one 0.25 patch, then bound payloads, host-only keys and roster display in
the next, advertised to the Desktop as a reported **feature** rather than a
version number. Decided the same day: the provider does **not** ship a patch
to declare its resident map host-only — that declaration and a duplicate
deregistration fix fold into its next minor re-land, because a bundled
provider lands with its tag and catalog pin, never ahead of them. Still open:
the Desktop's Identity select as provider pairs. Which shipped version of the messaging capability honours
which part is that package expert's fact, not this record's.

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/served-identity-is-a-messaging-layer-fact.md` (2026-09-23, amended and accepted 2026-09-24).
2. Framework `docs/integrations.md` (messaging-layer `identity` meta key) and `docs/capability-manifest.schema.json` (host-only settings attribute), [awebai/oats](https://github.com/awebai/oats); kernel half landed in 0.25.5 (PR #111, launch-meta persistence) and 0.25.6 (PR #118, `served-identity` feature).
