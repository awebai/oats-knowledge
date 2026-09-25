---
type: Roadmap
title: Current OATS direction
description: Dated priorities on the 0.25 line — workspace model v2 published, centralised per-soul knowledge for the amended roster (five experts plus the operator expert, the integrations expert and six package experts) in progress as Phase D, then Desktop parity as a native build on the kernel's JSON — with official capabilities (oats.core, oats.setup) and the reviewed official marketplace as the distribution model; nothing here claims a deployment has adopted what is published.
tags: [roadmap, direction, priorities]
timestamp: 2026-09-24
---
> **Amended 2026-09-24 (human decision): package approval is removed.**
> Declaring a package in the workspace's `packages:` IS the trust decision.
> There's no per-version executable approval: `oats sync` has no approve
> step, the lock carries no `approved` record, and there's no
> `E_PACKAGE_UNAPPROVED` (OATS 0.26.0). The lock still pins commit +
> integrity, and `oats sync` refuses drift (`E_PACKAGE_INTEGRITY`). Read any
> mention below of approving package executables as the 0.25 design, not
> current behaviour. See
> [integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Ownership and freshness

**Owner: oats-expert. Last verified: 2026-09-24.** This is a planning
snapshot, not a delivery ledger. **Update-on-change rule:** whoever merges,
releases, returns, discards, or learns that reality changed updates this
concept in the same session through knowledge review, revises the date and
appends the reason to the node log; entries that stop being true are
**pruned, not accumulated**. The operational cross-stream ledger (what is on
main, in flight, blocked, by whom) lives with the framework repository, not
here. Recheck the baseline before using this snapshot to claim current
support.

# Published baseline

**2026-09-24 (supersedes the 0.24.4 baseline of 2026-09-21).** The published
line is **OATS 0.25** — the kernel, runtime adapter and Desktop built for
[workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md),
accepted by the human on 2026-09-23 and shipped as 0.25.0 with fix rounds
through the following days (a team review round, then an operator-rebuild
round on a real two-team deployment). What that means for anyone reading an
older snapshot:

- The classic per-deployment configuration file (`oats-config.yaml`) and the
  installed-capability tier are **gone**, together with the `init` / `use` /
  `install` / `restore` verbs. A soul says *where* each capability comes from
  (a member repository or a package), never which version; the workspace pins
  package versions; every capability is copied whole into the instance at
  spawn; nothing is installed.
- **No migration.** A 0.24.x kernel keeps spawning 0.24.x deployments
  indefinitely; the 0.25 line reads only v2 files and ships a written rebuild
  guide. The guide is a contract the kernel honours: where the guide promised
  behaviour the kernel lacked, the kernel changed.
- The standalone knowledge and messaging capabilities publish on their own
  lines and are pinned in the official catalog per 0.25 patch; consult the
  catalog, not this snapshot, for the current pins.

Publication does not establish that any deployment has rebuilt, approved a
package or completed its knowledge cutover.

# Accepted order of work

1. **Git workspaces and Portable Souls for the OATS repositories themselves.**
   **Superseded in model, kept in intent (2026-09-23).** The revision-pinned
   import model that this item was gated on (reciprocal member index, pinned
   reviewed source revisions, exported soul editions) is replaced by
   workspace model v2: reciprocal membership is the whole trust decision for
   member capabilities, a member is always its latest state, and a team that
   wants frozen capabilities publishes them as a package. The dogfooding
   principle stands ([official development dogfoods the workspace](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md)):
   every repository of the OATS workspace is converted to the v2 format —
   the kernel reads nothing else — and the framework's own repositories are
   the first real workspace. A repository may be a member **and** a package
   publisher without the two roles collapsing: what it exports as member
   capabilities runs at latest state; what it publishes as a package is
   versioned, locked and approved per version. **State (2026-09-24):** the
   0.25 line is published and an outside operator has rebuilt a real
   two-team deployment from the guide alone; the findings of that round
   are folded into the kernel and the guide (workspace model v2, "operator
   rebuild round"). The second-operator gate of 2026-09-21 remains the
   acceptance pattern for every further published definition.
2. **Centralised per-soul knowledge for the amended roster — Phase D, in
   progress.** Expertise lives in a public knowledge repository, one canonical
   home per concept, owned by a persistent expert per the
   [domain-expert rebuild](/nodes/oats-expert/decisions/domain-expert-rebuild.md)
   and [source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).
   Accepted knowledge is the reviewed default branch; learning arrives as
   PRs. **Roster (amended 2026-09-24 by the lead and the OSS coordinator
   under the human's delegation; supersedes the five-expert roster of
   2026-09-21):** oats-expert, oats-kernel-expert, oats-desktop-expert,
   oats-assistant, market-research-expert, plus **oats-operator-expert**
   (the former non-owning setup expert, now owning the deployment
   operator node), **integrations-expert** (cross-package provider
   integration, owning a node), and **six package experts** — one member
   soul per official package repository (knowledge, messaging, two tracker
   integrations, authoring, development), each the natural owner of its
   package's contract, binding, skills and release; two of them sit on
   cross-project seams their charters name. Developer roles stay ephemeral
   and declare the expert node their lessons promote to; release
   stewardship is a Playbook here, not a soul. **State (2026-09-24):** the
   knowledge repository is public with its reviewed seed; Phase D slice 1
   migrates each live legacy bundle into its roster node under the strict
   two-part test (could the repository have taught it; is it still true and
   universal), one reviewed PR per node, and seeds the two new nodes
   alongside; per-soul knowledge merges are frozen until then. Still
   required before cutover: a fresh-reader proof (a new instance answers
   from the accepted base) and a PR-only learning proof; only then is
   in-soul legacy knowledge decommissioned, and never while a live instance
   still links it. **Gate judgement (redesign lead, 2026-09-20, unchanged):**
   classify each apparent gap as already-supported, documentation drift,
   provider behaviour, deployment setup, or a genuinely missing generic seam
   *before* adding fields or authority; a created soul, a valid declaration
   or a merged knowledge PR is not accepted learning — the proof is a fresh
   instance obtaining the learning through the supported reader ("do not
   seed the answer and call that learning"); decommissioning old writers is a
   separate evidence-backed step; automatic speciation, redirects, cloning
   and co-located profiles are deliberately **not** prerequisites
   ([flexible knowledge](/nodes/oats-expert/decisions/flexible-knowledge-and-situated-instances.md)).
3. **Desktop parity as a native build for the 0.25 line.** **Decided by the
   human 2026-09-24 ("not adapt — natively built for it"); supersedes the
   2026-09-21 framing of parity as new features on the 0.24 deployment
   model.** The Desktop shipped against 0.24 deriving the roster itself from
   deployment files; under v2 the kernel computes the roster, drift and
   served identity, so **the kernel's JSON is the Desktop's model**: every
   shown fact comes from the kernel's status, inspect, workspace-status,
   spawn-preview, readiness, version and sync outputs; the Desktop parses no
   deployment file; every mutation is a kernel verb (spawn through the
   preview-then-confirmed-apply protocol); UI capabilities are gated by the
   kernel's reported **features, not versions**. The Desktop's 0.24 readers
   are removed, not extended, and it gains v2 concepts it never had — a
   workspace header, a sync/approval sheet, an onboarding flow. **A missing
   fact is kernel work**, never a Desktop-side parser: gaps Phase F finds
   become lead-lane kernel PRs. There is no 0.24 maintenance line — nobody
   runs 0.24, and a line for zero users is cost without benefit. Acceptance:
   the lead builds a fresh v2 deployment from a fixture using only the
   Desktop, and every shown fact equals the kernel's JSON. Desktop owns
   product judgment under its
   [product/CLI-authority decision](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md).
   **State (2026-09-24):** Phase F planned in six slices (deployment model
   on kernel JSON → onboarding and sync/approval → spawn dialog on the v2
   preview → instance card and roster on v2 facts → the redesign frames →
   version/doctor pane and the compatibility floor); the engineer learns v2
   first on a hand-built deployment.

# Distribution model

Decided 2026-09-20, confirmed under v2 on 2026-09-23 — see
[official capabilities and the reviewed marketplace](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md)
and [workspace definition versus package](/nodes/oats-expert/decisions/workspace-definition-is-not-a-package.md).

- Knowing how to *operate* OATS is capability content, not kernel magic:
  `oats.core` (day-to-day operation and soul discovery) is the kernel's
  default on every soul — including a soul spawned from a member whose
  workspace cannot be read — resolved as a package through the operator's
  lock, and any mention of it in the soul (including `off`) replaces the
  default; `oats.setup` (workspace adoption, configuration, packages) is
  held by the operator expert and by any soul an operator adds it to. Both
  are **rewritten, not patched, for v2** (human, 2026-09-23) and their
  skills are snapshot-tested against the shipped CLI so they cannot drift
  from the commands. The kernel keeps only the briefings that describe the
  layout it itself creates; once `oats.core` is resolved, its briefing
  replaces the kernel's legacy block.
- The **official marketplace stays**: the reviewed package list in the
  framework repository is the only way a package becomes pinnable by id;
  a package outside it is written as an explicit Git reference. Listing by
  maintainer-reviewed PR is what makes a package official — for external
  packages too. Discoverable is not installed; installed is not approved —
  and under v2 nothing is installed at all: a package is a place to fetch
  from with a version attached, approved once per version in the lock and
  re-verified at spawn.

# Standing cautions

- Keep execution, reviewed delivery, fresh-reader consumption and learning as
  [separate evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md);
  a helper completing a task is not proof that a persistent expert learned.
- Rollout is [fresh-install-first](/nodes/oats-expert/decisions/fresh-install-first-rollout.md):
  the 0.25 line made this literal — no converter, no dual-schema reader; an
  operator rebuilds when ready, and a rebuilt deployment starts fresh
  provider state while the old one is frozen custody.
- Alternative knowledge providers remain options under the accepted
  [optional reference theory](/nodes/oats-expert/decisions/optional-reference-theory.md);
  the default is not imposed on every capability.
- market-research-expert owns dated, attributable investigation before any
  comparison or positioning claim is promoted; unknown is not absent.
- Provider readiness is reported, never assumed: a released capability that
  lacks an interface the new infrastructure requires is a gap to fix, not a
  requirement to drop. The 2026-09 adoption runs found the same family of
  defect four times — a contract adopted by one provider but not its siblings
  — and the 2026-09-24 rebuild round found its cousin: a kernel that
  faithfully delivers a per-team payload to a provider that does not yet read
  it. The kernel does not add a shim to compensate; the provider grows its
  own contract and the guide says plainly what each published version
  honours. Every cross-provider contract change is checked against **every**
  injecting or binding capability before publication
  ([second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md)).
- Refusals must name their cause. A typed status without a distinguishable
  reason, key or origin costs an outside operator several runs and an ablation
  table to localise; "one run instead of six" is the acceptance criterion for
  any new refusal path. Under v2 this extends to access: an unreadable half
  of the membership handshake is *unconfirmed*, never a half-success, and a
  network failure is never silently downgraded to the standalone view.

# Citations

1. Accepted human direction, 2026-09-20: workspace-first order, centralised
   knowledge with five experts second, Desktop parity third; kernel skills as
   official capabilities with an explicit removable `oats.core` default; the
   reviewed catalog as the official marketplace.
2. Accepted human direction, 2026-09-23: workspace model v2 (clean v2, no
   migration, the framework's own repositories converted first, `oats.core`
   and `oats.setup` rewritten) — [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md);
   design record `docs/design/2026-09-23-simplified-workspace-model.md` and
   contracts `docs/design/2026-09-23-workspace-module-contracts.md` in
   [awebai/oats](https://github.com/awebai/oats).
3. Accepted human direction, 2026-09-24: the Desktop is built natively for
   v2 on the kernel's JSON, no 0.24 maintenance line — Phase F boundary
   `docs/design/2026-09-24-desktop-phase-f-boundary.md` in awebai/oats.
4. Roster amendment, 2026-09-24 (lead and OSS coordinator under the human's
   delegation): operator expert and integrations expert own nodes; six
   package experts; developers declare a promotion target; release
   stewardship is a Playbook.
5. Framework program board `docs/design/2026-09-20-redesign-program-board.md`
   and package guide `docs/packages.md` ("Declaring packages") and `docs/configuration.md` in awebai/oats (the 0.25 rebuild guide `docs/rebuild-to-v2.md` was removed by the 0.26.0 legacy sweep); second-operator
   gate runs and the operator-rebuild round recorded there.
6. [OATS v0.24.4](https://github.com/awebai/oats/releases/tag/v0.24.4) (the
   superseded 2026-09-21 baseline) and the 0.25.x release tags in awebai/oats.
