---
type: Decision
title: Kernel supplies provider-neutral messaging intent; the capability owns identity, membership, transport and qualification
description: The kernel provides captured, validated messaging intent and invocation authority and retains only non-secret choices and credential references; the selected messaging capability resolves native identities, provisions teams, delivers and reports receipts, and that state never becomes an OATS user database.
tags: [kernel, messaging, capabilities, portable-souls, contract, qualification]
timestamp: 2026-09-16
---
# Rationale

Decided 2026-09-16 by the redesign lead within the human-authorised Portable
Souls completion; adoption facts added 2026-09-20/21 from the second-operator
gate. This refines the [kernel/capability split](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
for the messaging slot and complements the earlier
[runtime/messaging/viewer ownership decision](/nodes/oats-expert/decisions/runtime-messaging-viewer-ownership.md),
which it does not duplicate.

**Kernel responsibility.** Provide captured, validated intent and invocation
authority: deployment and resolution, source and instance identity, a qualified
workspace or explicit standalone context, the responsible-human reference, the
private floor and any explicit wider choices, the requested action or
lifecycle event, and prior opaque provider receipts. Preserve human ownership
for children and scheduled work. Use the existing provider-binding, messaging
choice, approval, resolver and manifest-owned command/hook contracts; version
any missing *generic* invocation field explicitly rather than invent a
provider-specific input. Retain non-secret choices and credential lookup
*references* — never credential values, and never a claim that mutable
membership or access is frozen. Keep readiness, action results and cleanup
obligations explicit.

**Capability responsibility.** Resolve native human and identity references
with native credential facilities; provision or reuse the correct private
team; reconcile requested wider membership; provide transport; report
provider-specific receipts and qualification evidence. These mechanisms and
any provider-owned mapping state belong to the capability and must not become
an OATS user database or a hosted control plane. Read-only checks never
provision; explicit setup or lifecycle actions may provision when their own
preconditions admit them, and admission to setup is not a claim of completed
enrollment. Idempotency, ambiguity refusals and cleanup custody are preserved;
readiness is established separately afterwards.

# Rejected

- Embedding the messaging provider's account, team or API logic in the kernel.
- A parallel OATS messaging subsystem.
- A unified permissions API: catalog visibility, live-instance visibility,
  contact and history are deliberately separate grants that need not share
  one native API. Verify the actual mechanism for each; contact is not
  permission to read history.

# Qualification discipline

- A missing field in one CLI response is not proof of a missing backend
  capability; investigate supported resolution, resources and APIs inside the
  adapter first and escalate only a concrete unavoidable gap.
- Never substitute an OS user, an agent alias or a guessed identity; the
  responsible human's identity is never inferred. A responsible-human
  reference is a captured *accountability claim* the code validates only by
  shape — convention, not enforcement; a verification step would be a separate
  decision (noted 2026-09-21).
- Fixture or configuration success is never a privacy claim.
- Being authenticated to a harness establishes nothing about a messaging
  principal ([native authentication](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)).

# Facts established at adoption (2026-09-20/21)

- The capability's readiness check qualifies only an explicit private team
  with session delivery on an input-capable harness. A strict-Pi print-mode
  primary cannot take session input and is reported as *needing
  configuration* — never silently downgraded to another delivery.
- The messaging capability requires the workspace to declare a per-human
  private-team policy and the soul a messaging declaration. When neither is
  published, the slot is unreachable by any operator input: a **source defect
  wearing a configuration error**. The tell is the phase — a failure while the
  provider *normalises* the declaration means the declaration was absent or
  malformed; a failure in its readiness *check* means the declaration was
  fine and the world is not ready. When a maintainer predicts a check-phase
  message and the run stops earlier, stop adding operator inputs and read what
  the source must declare. Report it as a source defect with the exact
  predicate that failed: "no operator input can resolve this" redirects the
  fix to the people who can make it.
- After the source fix, the legitimately operator-owned inputs were the
  responsible human and the wider-membership choice (which may be empty); the
  private team itself is a later check outcome, not an input.

# Related

[Every preparation refusal is attributed and reasoned](/nodes/oats-kernel-expert/decisions/preparation-problems-are-attributed-and-reasoned.md);
[Operator bindings stay one flat map with declared ownership](/nodes/oats-kernel-expert/decisions/operator-bindings-flat-map-declared-ownership.md);
[Configured scope is not messaging membership](/nodes/oats-kernel-expert/decisions/configured-team-boundary.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/messaging-capability-contract-boundary.md` (2026-09-16).
2. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/source-declaration-requirement-without-payload.md` (2026-09-20).
3. Redesign program board (2026-09-21), messaging stream and second-operator gate verdicts.
