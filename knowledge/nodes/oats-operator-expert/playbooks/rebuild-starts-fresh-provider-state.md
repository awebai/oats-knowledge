---
type: Playbook
title: A rebuilt deployment gets fresh provider state; the old state directory is frozen custody, and any owner or custody pin must identify a soul by durable identity, never by path
description: "Under the workspace model a soul's on-disk location is a per-commit cache that never equals the previous deployment's path, so a rebuild must start its knowledge provider on a fresh state directory and treat the old one as read-only custody. The durable invariant to verify is that owner pins name a soul as <repo-key>#<soul> and survive a member commit, sync and re-spawn unchanged."
tags: [playbook, operator, rebuild, provider-state, custody, owner-pin, knowledge, workspace-model]
timestamp: 2026-09-24
---

Judgement formed 2026-09-23 by the OSS coordinator (fresh state, frozen
custody) during the first outsider run of the rebuild guide, and confirmed
2026-09-24 when the owner-pin fix passed outsider verification on the
published kernel/provider combination.

# Rule

When you rebuild a deployment under the workspace model:

1. **Give the rebuild a fresh provider state directory.** If the machine's
   bindings file names the old state root, give it a fresh bindings file too.
   Verify in the spawn preview that the merged provider settings point at the
   *new* directory before the first spawn creates anything.
2. **Freeze the previous deployment's state directory as custody.** It is
   read-only: inspect it, keep it for history, never edit it, and never
   re-point it at the new soul locations. It is authority to preserve, not
   garbage to clean — the same posture as
   [preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).
3. **Do not fear knowledge loss.** Accepted knowledge lives in the knowledge
   bases, not in per-deployment provider state. A fresh state directory
   restarts registration bookkeeping, not the corpus.
4. **While a provider pins owners by filesystem path**, treat one state
   directory per (deployment, soul-commit) as the safe unit, and plan member
   commits of knowledge-owning souls deliberately instead of letting them
   drift under a running deployment.
5. **Once providers pin by identity**, confirm the durable invariant on the
   published combination: every owner or custody pin identifies a soul as
   `<repo-key>#<soul>`, never as a path, and a second spawn after a member
   commit plus sync keeps the same owner with the pin file unchanged.

# Why

The workspace model fetches a soul from its member repository at the confirmed
commit into a per-commit cache directory inside the deployment, and links the
instance's soul view to *that commit's* directory. Two things follow. The
realpath of a soul under a rebuilt deployment never equals the path the
previous deployment recorded, and it changes whenever the member moves. A
provider that recorded owner identity as a path at first registration is
therefore correct for exactly one deployment at exactly one commit.

The frozen-custody posture exists because the old state directory is the only
evidence of what the previous deployment registered, scheduled and retired.
Re-pointing it at new soul paths destroys that evidence and, worse, produces a
directory that half-describes two deployments. Read-only custody costs
nothing and keeps the history inspectable; the sibling decision
[resident custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)
applies the same reasoning to identity directories.

# What goes wrong

- **Reusing the old state directory** refuses the first spawn of every
  knowledge-owning soul: the provider sees the same owner id resolving to a
  different path and fails closed. The operator reads this as a broken
  rebuild when it is a stale pin.
- **A path-based pin looks correct until the first member commit.** The
  rebuild spawns cleanly, work proceeds, then a routine member commit moves
  the soul to a new cache directory and the next spawn of the same soul is
  refused. A one-spawn test proves nothing; only *commit → sync → re-spawn*
  proves the pin.
- **"Fixing" the pin by editing the old state directory** converts custody
  into an unreviewable mutation and hides the real defect, which is the
  provider's choice of pin key.
- **Accepting the identity fix on a mixed pair** — new kernel with old
  provider or the reverse — proves nothing about what deployments will
  install. The kernel half publishes the soul identity; the provider half
  must read it; the outsider verification in
  [outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md)
  is the acceptance, and it runs on the published combination only.

# Consequences

- Rebuild checklists carry a "fresh provider state, old state frozen" step
  placed *before* the first spawn, with the preview as the check; the
  messaging root is placed right after it
  ([messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md)).
- Member commits of knowledge-owning souls are sequenced, not incidental,
  while any deployed provider still pins by path; see
  [cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md).
- Retiring an instance from a rebuilt deployment should leave no orphaned
  provider schedule behind; an old state directory that accumulates dead rows
  is a sign that retirement is not settling, not a cleanup chore.
- Whether a given state setting is a host fact for the local file or belongs
  elsewhere follows
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

# Routed

- Pin semantics, state-file keys and inspection commands belong to the
  knowledge package expert.
- The per-commit soul cache layout and the soul-identity field belong to the
  kernel node. This playbook owns only the operator ordering and the
  acceptance invariant.

# Citations

- Rebuild guide, rationale of the fresh-state step (`docs/rebuild-to-v2.md`,
  §7b).
- Delivery log, outsider rebuild findings and the owner-pin verifications
  (entries dated 2026-09-23 and 2026-09-24; kernel 0.25.3/0.25.5 with
  oats.okf 2.1.4 as the published pair).
