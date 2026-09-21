---
type: Decision
title: Every preparation refusal is attributed and carries a provider-declared fixed reason; free text never crosses
description: A provider's error message crosses the binding wire only when byte-equal to a fixed reason it declares in its manifest; every preparation problem names slot, capability, origins and the operator's document key; a bare unattributed refusal from preparation is a kernel defect.
tags: [kernel, providers, binding-wire, preparation, diagnostics, contract, second-operator]
timestamp: 2026-09-21
---
# Context

Decided 2026-09-21 by the redesign lead from the independent second-operator
gate; the human was informed because it amends a wire contract. Amended the
same day after a second publication exposed the readiness-check half.

The provider binding wire lets a provider return an error code and message.
The kernel's decoder deliberately dropped the message — "free text never
leaves the provider boundary" — and the preparation layer substituted one
template naming capability, slot and phase. Meanwhile the messaging provider
had already restricted its own messages to a fixed list of safe reasons, and
the knowledge provider was doing the same. On the gate, three failures with
three different causes rendered as one template with the slot swapped. The
operator could see *where* (slot, capability, document pointer, integrity) but
not *what*, and needed several runs plus reading adapter source to learn a
one-line cause the provider had already made safe. The kernel was discarding a
message the provider had already bounded.

# Decision

1. **Whitelisted reasons cross the wire.** A provider's error message is
   accepted only when byte-equal to one of the fixed reasons it declares in
   its manifest — a bounded list (bounded count and length, printable, no
   interpolation markers, never operator values or paths). Anything else is
   dropped exactly as before and the kernel template is used. The security
   boundary is unchanged *in kind*: only provider-declared constant strings
   pass. An invalid declaration refuses; it never falls back.
2. **Problems are attributed and surfaced.** Every preparation problem carries
   slot, capability, origins, the operator's document key and the reason (the
   template as fallback); the CLI prints them. The kernel names a missing item
   only where *it* knows it (a missing binding interface: id, version, slot);
   naming a provider's own setting is the provider's job through its reasons.
3. **A reason per cause, not one code.** Every problem a provider returns from
   its readiness check carries a fixed reason distinct per cause, chosen so
   the operator knows which document or setting to change. Codes remain the
   contract; reasons make them actionable. Added after a readiness check
   folded at least four distinct causes into one code and a second
   publication still could not tell which.
4. **No bare refusal from preparation.** After selection, every refusal is a
   problem with a slot or capability, or it is a kernel defect. Two offenders
   were found on the gate: the helper-policy refusal and the
   runtime-requirement refusal. The latter also treated an "only if installed"
   version floor as a hard block on the captured path — a floor that applies
   only when the package happens to be present must never block a launch in
   which it is absent, and a genuinely required uninstalled package must be
   named with its capability and remedy, not templated identically.

Acceptance criterion for any refusal path, accepted from the operator: **one
run instead of six** — the operator learns the cause on the first run.

# Rejected

- Raw passthrough of the provider's message: free text from executable code
  into operator output. The original refusal was right; the mistake was
  refusing *everything*, including bounded constants.
- Kernel-hardcoded messages per provider: the kernel would encode provider
  semantics and break the neutrality rule. A reviewed per-capability fallback
  list bundled with the kernel exists only for providers that have not yet
  declared the field; it is not a shim that lets manifests skip the
  declaration.

# Compatibility rule learned

A **closed manifest validator makes every new manifest field a hard floor
bump** for every provider that declares it: earlier kernels reject the whole
manifest at load, not merely in preparation. Therefore ship the kernel that
reads the field first; providers that declare it floor on that kernel; a
provider release is never published with a field its floor kernel cannot load.
Ordering follows: kernel tag, then provider releases, then catalog and edition
pins, then the independent re-run.

# Immutability corollary

A retained resolution captured and approved an exact provider artifact, and
captured execution runs exactly that artifact. Re-probing an old resolution
after a provider fix must therefore still show the old behaviour — that is
immutability working, not a failed fix. Acceptance of a provider fix requires
*new* resolutions prepared from the same request shapes with only the
provider source moved, keeping the old ones as before-evidence.

# Related

[Operator bindings stay one flat map with declared ownership](/nodes/oats-kernel-expert/decisions/operator-bindings-flat-map-declared-ownership.md);
[Kernel supplies provider-neutral messaging intent](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md);
[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md);
[Hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/provider-problem-reasons-cross-the-wire.md` (2026-09-21, with same-day amendment).
2. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/captured-launch-ignores-ifinstalled-and-refuses-bare.md` (2026-09-21; the rule only — the code fix was assigned to the next kernel patch at that date, not shipped).
3. Redesign program board (2026-09-21), second-operator publication entry: immutability corollary and acceptance plan.
