---
type: Decision
title: Operator bindings stay one flat map with declared per-provider ownership; providers ignore foreign keys
description: The operator's bindings remain one flat map, but a provider consumes only the keys it owns and ignores the rest; owned keys are declared in the manifest, ownership is unique and kernel-enforced, and a key owned by no selected provider is an operator declaration error named by key.
tags: [kernel, providers, operator-bindings, binding-wire, ownership, contract, second-operator, workspace-model]
timestamp: 2026-09-24
---
# Context

Decided 2026-09-21 by the redesign lead from the independent second-operator
gate; the human was informed because it fixes a contract rule and adds a
manifest field.

The kernel forwarded the operator's whole bindings map to every selected
provider, and nothing said who owned which key. One provider validated
*every* entry as a store locator; another required a key of its own from the
same object. With both selected, no input satisfied both: supplying the
messaging key made the knowledge slot refuse as an invalid binding; omitting
it left messaging needing configuration. The composition was unreachable
regardless of the operator's identity, and the error landed on the *innocent*
slot — attribution was accurate and pointed at the wrong place. The defect was
the namespace, not either provider: a shared flat input consumed by several
independent providers works only while each ignores what it does not own, and
nothing enforced that. Such a collision appears only when both providers are
exercised together, so each looks fine in isolation and in every single-
provider test.

# Decision

1. **Ownership, not nesting.** The bindings map stays flat, so recorded
   resolutions, fixtures and published readers keep working. A provider MUST
   consume only the keys it owns and MUST ignore every other key; validating
   a foreign key is a provider defect.
2. **Declared owned keys.** A provider manifest lists its owned operator keys,
   each either an exact name or a namespace claim written with a trailing dot,
   which owns every key under that prefix (needed because store aliases are
   soul- and operator-chosen and cannot be enumerated). No other pattern
   syntax. Two kinds of owned key are both honest: the fixed keys and
   namespaces the provider's code consumes regardless of source (declared),
   and addresses the *source* names and the provider consumes because the
   source requires them. The second kind is not declarable and is never
   guessed with a wildcard — it is already visible to the kernel as the
   provider's normalised requirement keys, so the kernel treats the **union**
   of the declaration and those requirement keys as owned.
3. **Ownership is unique and kernel-enforced.** Two selected providers
   claiming the same key or overlapping namespaces is refused at composition
   time with a typed problem naming both capabilities — a packaging defect,
   detectable the moment the capability set is known and not something an
   operator can fix. Last-writer-wins was rejected because it silently
   recreates the original bug.
4. **The kernel uses the declaration.** When present it forwards each
   provider only its owned keys (defence in depth), attributes a rejected key
   to the slot whose provider owns it, and reports a key owned by *no*
   selected provider as an operator declaration error that names the key —
   the only case where the kernel itself decides about a binding key.
   Providers without the declaration are treated as owning only what they
   consume; the kernel cannot filter for them.

Rollout was deliberately split: the provider ignore rule is the floor and
shipped first in provider releases; kernel forwarding, overlap refusal and
stray-key attribution needed their own regression matrix and followed
separately. The manifest field was shape-validated before it was enforced; a
published kernel is not recut for a field it does not yet enforce.

# Rejected

- Nesting bindings per slot: breaks every recorded document and published
  reader for a problem that ownership solves.
- Kernel-hardcoded key tables per provider: the kernel would encode provider
  semantics; the declaration belongs to the provider.

# Regression rule

Once the source that produced a diagnostic is fixed, that diagnostic is
irreproducible from main. A fixture for a provider reason must pin the
synthetic input that produces it (a workspace document *without* the required
policy), never a fresh checkout. Diagnose a suspected collision by ablation:
remove one key and watch which *other* component's verdict changes.

# Under workspace model v2: three homes, one bound payload

The flat map a provider receives is now a merge of three homes: soul level,
the host-local file, and spawn time. For messaging, the workspace's base
section and the soul team's section are added
([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
decisions 18 and 20). The ownership and validation rules above run unchanged
over the merged result. The kernel owes three things on top of them:
1. **Inspectable before bound.** The spawn preview shows exactly what each
   provider will receive.
2. **Bound when confirmed.** The confirmed spawn decision binds those merged
   payloads, so a settings-only change refuses a stale apply instead of
   launching with values nobody previewed
   ([served identity decision](/nodes/oats-expert/decisions/served-identity-is-a-messaging-layer-fact.md)).
3. **Host-only keys refused by the resolver.** A key a manifest declares
   host-only is refused in every committed or per-spawn layer. The hook sees
   one merged map with no provenance, so it cannot enforce where a value
   came from.

The reserved per-team key is kernel semantics: it is legal only at the top
level of the workspace's messaging section and is stripped before delivery.
Whether a provider honours what arrives is the provider's contract. The
kernel adds no environment shim for a provider that does not yet read it.

# Related

[Every preparation refusal is attributed and reasoned](/nodes/oats-kernel-expert/decisions/preparation-problems-are-attributed-and-reasoned.md);
[Kernel supplies provider-neutral messaging intent](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md);
[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/operator-bindings-ownership.md` (2026-09-21).
2. OATS rationale source `agents/oats-expert/soul/knowledge/lessons/shared-provider-input-namespace-misattribution.md` (2026-09-20).
3. Accepted decision [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), decisions 18 and 20; [served identity decision](/nodes/oats-expert/decisions/served-identity-is-a-messaging-layer-fact.md) (2026-09-24), kernel-mechanics clause; framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.2 operator-rebuild round" R5/R7 and "0.25.6" K1′/K1″.
