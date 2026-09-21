---
type: Decision
title: Operating OATS is capability content; the reviewed list is the marketplace
description: Knowing how to operate OATS is repackaged as two official capabilities — an explicit, removable core declared on every soul at creation and a setup capability held by an onboarding-created setup expert — and the reviewed package list in the framework repository is the official marketplace, without a hosted registry.
tags: [distribution, capabilities, marketplace, onboarding, souls, kernel]
timestamp: 2026-09-20
---
# Decision

Decided 2026-09-20 with the human (oats-expert as maintainer); amended
2026-09-21 by the redesign lead for the setup expert's shape. Shipped in the
2026-09-20/21 wave; recorded here as **decided**, not pending.

# Context

Under Portable Souls every soul declares its capabilities and where they come
from. Yet the skills that teach an agent to *operate on OATS* were still
kernel-owned and appeared in every instance "by magic". That contradicted the
model twice: a soul's definition did not show that it received OATS
operational knowledge, so it could not be removed, replaced or reasoned about
on export/import; and setup knowledge had no carrier into a newly onboarded
workspace — it travelled with the installed kernel, not with a soul.

At the same time an official package list already existed as a mechanism
(the catalog the CLI resolves short names through), but nobody had stated
that this list is *what defines officialness*.

# What was decided

1. **Two official capabilities, shipped from the framework repository as a
   distribution package like any other.** `oats.core` carries day-to-day
   operation, soul discovery and the "you run on OATS" briefing. `oats.setup`
   carries configuration, packages and workspace adoption.
2. **`oats.core` is explicit, default, removable.** Soul-creation tooling
   writes it into the soul definition with its source, so the dependency is
   visible in the file. The kernel never adds it silently; a soul without it
   is a valid, deliberately OATS-unaware soul; users may remove or replace it.
3. **The kernel keeps only what describes the layout it itself creates**: the
   instance-boundary briefing, work-mode briefings and config-declared
   injections. Operational skills leave the kernel entirely.
4. **Onboarding creates and instantiates a setup expert** whose definition
   declares exactly core and setup. Amendment 2026-09-21 (redesign lead): it
   is a sixth published soul edition alongside the five experts, owns no
   knowledge node, and is provider-independent — knowledge, messaging and
   tasks default to none. From then on setup is a conversation with a soul
   that has the setup skills, not a wall of flags. No new bootstrap authority
   is introduced: the shipped prepare/approve/scaffold/start path remains the
   only path; onboarding chooses the first soul and its capabilities.
5. **The official marketplace is the reviewed package list in the framework
   repository.** Officialness is granted by a maintainer-reviewed PR to that
   list — for externally hosted packages too. That is the safety gate: the
   project controls what is called official even when it does not host the
   code. **Discoverable ≠ installed ≠ approved**: listing never grants trust,
   credentials or permission to run code; acquisition, locking and
   per-capability executable approval stay separate
   ([trust boundaries](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)).

# Rationale and rejected alternatives

- **Leaving operational skills ambient** — rejected: it hides a dependency
  and blocks export/import reasoning about what a soul knows.
- **Building a hosted registry** — rejected: when a shipped mechanism already
  exists, the decision is to **name and govern it**, not to build a parallel
  one (lesson recorded by the redesign lead 2026-09-20). Officialness is a
  review outcome, not a hosting arrangement.
- **Kernel-injected default with a per-soul opt-out** — rejected in favour of
  writing the dependency into the file, because an invisible default is the
  very defect being removed.

# Consequences

- Soul definitions become honest about how an agent knows OATS. A soul that
  declares its kind still gets policy from configuration
  ([kernel view](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)),
  but its OATS awareness is now declared, not assigned.
- Setup knowledge travels as a soul, so a new workspace gets a competent
  setup agent rather than a document.
- **Kernel releases and capability releases decouple**: the distribution
  package carries its own tag independent of the kernel tag, so capability
  content ships without a kernel cut (observed 2026-09-20). Pins and edition
  imports move with it under the
  [publication order](/nodes/oats-expert/stewardship/release-traps.md).
- The marketplace stops being an interim folder and becomes the governed list
  earlier direction anticipated. Desktop surfaces (marketplace view, soul
  creation showing the core dependency, onboarding flow) follow as parity
  work owned by the Desktop expert.

# Related

[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md);
[Durable specialization](/nodes/oats-expert/decisions/durable-specialization.md)
(package / capability / config / soul / instance model). The user-facing
onboarding judgement (what onboarding does and does not do) is the
oats-assistant node's to hold.

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/official-capabilities-oats-core-setup-and-marketplace.md` (2026-09-20) and delivery-log "name and govern" / decoupled-tag lessons (2026-09-20).
2. Framework `docs/official-marketplace.md` and the setup-expert edition in `docs/workspace-adoption.md`, [awebai/oats](https://github.com/awebai/oats).
