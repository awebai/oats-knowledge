---
type: Lesson
title: Configure against what the installed provider reads, not the grammar the kernel accepts or previews — and keep declared intent the provider does not yet honour
description: A setting has effect only if the installed provider's reader consumes it; the kernel's payload model and spawn preview are a writer's view that can carry no-op keys. Verify by observing provider behaviour, let the provider's own declared settings outrank guide text, and keep declared per-team intent in the workspace file while obtaining the effect by placement.
tags: [lesson, operator, provider, settings, versions, verification, workspace, messaging, knowledge]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23 by the OSS coordinator while correcting the
rebuild guide from intended grammar to what shipped provider versions read.

# Rule

The authority for what a setting *does* is the reader inside the installed
provider — not the kernel that composes the payload, not the spawn preview
that displays it, and not the guide that describes it. Before relying on a
key, confirm that the provider version your deployment actually resolves
consumes it. When guide text and the provider's own declared settings
disagree, the provider's declaration wins.

# Why

A deployment is assembled from independently versioned parts: a kernel and
the provider packages the workspace pins. The kernel's payload model
routinely runs ahead of what a shipped provider reads. The kernel will merge
a key, forward it opaquely, print it in the preview and record it in the
instance record — and the provider may still ignore it, refuse it as unknown,
or read its settings from a file of its own that the payload never touches.
Three shapes appeared in one rebuild round:

- A per-team block was kernel-merged, delivered and previewed, and the
  installed messaging provider did not read the key at all — it decided the
  team by which root it found on disk.
- A knowledge payload grammar shown in the guide was consumed by no shipped
  provider; the provider read its declaration from a file beside the soul and
  refused every unknown payload key.
- A guide claim about kernel behaviour shipped with no consumer of the field
  it described — schema validation of examples does not check that anything
  reads them.

None of this is visible from the writer's side. The preview is honest about
what the kernel *sent*; it cannot know what the provider *reads*. Guides are
written toward the intended grammar and can run ahead of shipped providers
for a release or more.

# What goes wrong

An operator who configures from the preview believes a setting is in force
because it appears in the merged payload. The provider silently does
something else: an instance mints into the wrong team, a soul is registered
against a default the operator thought was overridden, or a spawn hook
refuses the whole instance for a key the guide told them to write. Nothing
in the kernel refuses a key the provider ignores — refusal, where it exists,
belongs to the provider and arrives only at spawn.

The mirror failure: an operator who trusts a guide over the provider's own
declared settings list "fixes" a working deployment toward a grammar nothing
reads, and loses the effect they had.

# Consequences

- **Check the pair, not the part.** Every deployment resolves a specific
  kernel with specific provider commits. Confirm the installed provider's
  declared settings list before writing a key; treat the preview as evidence
  of delivery, never of effect.
- **Verify by behaviour.** After a spawn, look at what the provider did —
  which team it minted into, which owner it pinned, which state root it
  wrote — not at what the composed payload said. This is the observation the
  [outsider verification playbook](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md)
  exercises on a fresh rig.
- **Keep declared intent that the provider does not yet honour.** Where the
  kernel delivers a per-team intent the installed provider ignores, leave the
  declared block in the workspace file. It documents intent, the kernel
  already honours it, and the next provider release picks it up without a
  workspace edit. Obtain the effect meanwhile through placement — see
  [messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md).
- **Do not invent keys.** A provider that refuses unknown keys is doing you a
  favour; a provider that ignores them is not. In neither case does writing a
  key the reader does not know produce the effect.
- **Placement still matters.** Knowing what a setting does is the first half;
  where it belongs is the second — see
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

# Routed

- Which keys a given provider version honours is that package expert's fact.
- The developer discipline of rehearsing a kernel-plus-provider pair before
  approving a release belongs to the integrations node.
- Why the kernel forwards payloads opaquely is kernel rationale.

# Citations

- Delivery log excerpt (2026-09-23/24 entries; first outsider rebuild run,
  findings R1–R10; "provider capabilities lag the kernel's payload model —
  write what the shipped provider version actually reads"; published
  combination verification kernel 0.25.5 + oats.okf 2.1.4 + oats.aweb 1.12.0).
- Rebuild guide `docs/rebuild-to-v2.md` (§4 box on what the knowledge
  provider reads versus earlier guide drafts; §8b on the per-team block being
  "kernel-merged and delivered, but a NO-OP" for the installed messaging
  provider and "keep the per-team block in the workspace file anyway").
