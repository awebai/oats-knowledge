---
type: Roadmap
title: Current OATS direction
description: Dated priorities — Git workspaces and Portable Souls first, then centralised per-soul knowledge with the five experts, then Desktop parity — with official capabilities (oats.core, oats.setup) and a reviewed official marketplace as the distribution model; nothing here claims a deployment has adopted what is published.
tags: [roadmap, direction, priorities]
timestamp: 2026-09-21
---
# Ownership and freshness

**Owner: oats-expert. Last verified: 2026-09-21.** This is a planning
snapshot, not a delivery ledger. **Update-on-change rule:** whoever merges,
releases, returns, discards, or learns that reality changed updates this
concept in the same session through knowledge review, revises the date and
appends the reason to the node log; entries that stop being true are
**pruned, not accumulated**. The operational cross-stream ledger (what is on
main, in flight, blocked, by whom) lives with the framework repository, not
here. Recheck the baseline before using this snapshot to claim current
support.

# Published baseline (2026-09-21)

OATS **0.24.4** (kernel, runtime adapter, Desktop) and the standalone knowledge
capability **2.1.2** and messaging capability **1.11.2** are published, both
requiring OATS ≥0.24.4; the framework repository publishes the distribution
package **oats.framework 1.1.3** exporting `oats.core`, `oats.setup` and the
optional `oats.knowledge-theory`. Publication does not establish that any
deployment has upgraded, activated a capability, approved an artifact or
completed its knowledge cutover.

# Accepted order of work

1. **Git workspaces and Portable Souls for the OATS repositories themselves.**
   The framework repository hosts the shared workspace definition and exports
   source-complete soul editions; every official capability repository
   publishes a reciprocal member index; the workspace pins reviewed source
   revisions ([dogfooding decision](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md)).
   Membership is discovery, not activation. **State (2026-09-21):** an
   independent operator on a fresh machine, holding none of the authoring
   state, reached, resolved, approved and **published an executable
   resolution** from the public definition alone — the phase's exit gate
   for publication. Open: a launch-bearing resolution is still refused by a
   kernel defect (assigned to the next kernel patch), and the knowledge
   readiness probe refuses without a distinguishable reason (assigned to the
   next knowledge-capability patch). Every remaining item is named and owned;
   none is operator input.
2. **Centralised per-soul knowledge and the five experts.** Expertise lives in
   a public knowledge repository, one canonical home per concept, owned by one
   of five persistent experts (oats-expert, oats-kernel-expert,
   oats-desktop-expert, market-research-expert, oats-assistant) per the
   [domain-expert rebuild](/nodes/oats-expert/decisions/domain-expert-rebuild.md)
   and [source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).
   Accepted knowledge is the reviewed default branch; learning arrives as
   PRs. **State (2026-09-21):** the repository is public and its first
   reviewed seed is merged; the full legacy-bundle audit is in progress.
   Still required before cutover: a fresh-reader proof (a new instance
   answers from the accepted base) and a PR-only learning proof; only then
   is in-soul legacy knowledge decommissioned. **Gate judgement (redesign
   lead, 2026-09-20):** classify each apparent gap as already-supported,
   documentation drift, provider behaviour, deployment setup, or a genuinely
   missing generic seam *before* adding fields or authority; a created soul,
   a valid source declaration or a merged knowledge PR is not accepted
   learning — the proof is a fresh instance obtaining the learning through
   the supported reader ("do not seed the answer and call that learning");
   decommissioning old writers is a separate evidence-backed step, not a side
   effect of copying concepts; automatic speciation, redirects, cloning and
   co-located profiles are deliberately **not** prerequisites
   ([flexible knowledge](/nodes/oats-expert/decisions/flexible-knowledge-and-situated-instances.md)).
3. **Desktop parity** against the accepted redesign, including the official
   marketplace view, soul creation that shows a soul's declared capabilities,
   and the onboarding flow. Desktop owns product judgment under its
   [product/CLI-authority decision](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md).
   **State (2026-09-21):** not started; the Desktop server has no
   soul-creation endpoint, so these are new features, not wiring.

# Distribution model

Decided 2026-09-20 — see
[official capabilities and the reviewed marketplace](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md)
and [workspace definition versus package](/nodes/oats-expert/decisions/workspace-definition-is-not-a-package.md).

- Knowing how to *operate* OATS is capability content, not kernel magic:
  `oats.core` (day-to-day operation and soul discovery) is written explicitly
  into every soul definition at creation and can be removed by the user;
  `oats.setup` (workspace adoption, configuration, packages) is held by an
  onboarding-created setup expert and by any soul an operator adds it to. The
  kernel keeps only the briefings that describe the layout it itself creates.
- The **official marketplace** is the reviewed package list in the framework
  repository. Listing by maintainer-reviewed PR is what makes a package
  official — for external packages too. Discoverable is not installed;
  installed is not approved.

# Standing cautions

- Keep execution, reviewed delivery, fresh-reader consumption and learning as
  [separate evidence](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md);
  a helper completing a task is not proof that a persistent expert learned.
- Rollout is [fresh-install-first](/nodes/oats-expert/decisions/fresh-install-first-rollout.md):
  historical migration is parked, never destructive, and both native backends
  are part of acceptance.
- Alternative knowledge providers remain options under the accepted
  [optional reference theory](/nodes/oats-expert/decisions/optional-reference-theory.md);
  the default is not imposed on every capability.
- market-research-expert owns dated, attributable investigation before any
  comparison or positioning claim is promoted; unknown is not absent.
- Provider readiness is reported, never assumed: a released capability that
  lacks an interface the new infrastructure requires is a gap to fix, not a
  requirement to drop. The 2026-09 adoption runs found the same family of
  defect four times — a contract adopted by one provider but not its siblings
  — so every cross-provider contract change is checked against **every**
  injecting or binding capability before publication
  ([second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md)).
- Refusals must name their cause. A typed status without a distinguishable
  reason, key or origin costs an outside operator several runs and an ablation
  table to localise; "one run instead of six" is the acceptance criterion for
  any new refusal path.

# Citations

1. Accepted human direction, 2026-09-20: workspace-first order, centralised
   knowledge with five experts second, Desktop parity third; kernel skills as
   official capabilities with an explicit removable `oats.core` default; the
   reviewed catalog as the official marketplace.
2. Framework program board `docs/design/2026-09-20-redesign-program-board.md`
   (last update 2026-09-21) and adoption guide `docs/workspace-adoption.md` in
   [awebai/oats](https://github.com/awebai/oats); second-operator gate runs
   recorded there.
3. [OATS v0.24.4](https://github.com/awebai/oats/releases/tag/v0.24.4),
   [OKF v2.1.2](https://github.com/awebai/oats-okf/releases/tag/v2.1.2),
   aweb v1.11.2 and the `oats-framework/v1.1.3` tag in awebai/oats.
