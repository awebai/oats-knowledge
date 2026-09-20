---
type: Roadmap
title: Current OATS direction
description: Dated priorities — Git workspaces and Portable Souls first, then centralised per-soul knowledge with the five experts, then Desktop parity — with official capabilities (oats.core, oats.setup) and a reviewed official marketplace as the distribution model; nothing here claims a deployment has adopted what is published.
timestamp: 2026-09-20
---
# Ownership and freshness

**Owner: oats-expert. Last verified: 2026-09-20.** This is a planning snapshot,
not a delivery ledger. When accepted human priorities or verified delivery
reality change, the owner must propose an update through knowledge PR review
in the same session, revise the date and append the reason to the node/base
logs. Recheck the baseline before using this snapshot to claim current support.

# Published baseline

OATS **0.24.1** (kernel, Pi adapter, Desktop) and standalone OKF **2.1.1** are
published; the framework repository also publishes the distribution package
**oats.framework 1.1.0** (tag `oats-framework/v1.1.0`) exporting the official
capabilities `oats.core`, `oats.setup` and the optional `oats.knowledge-theory`.
Publication does not establish that any deployment has upgraded, activated a
capability, approved an artifact or completed its knowledge cutover.

# Accepted order of work

1. **Git workspaces and Portable Souls for the OATS repositories themselves.**
   The framework repository hosts the shared development workspace definition
   and exports source-complete soul editions; every official capability
   repository publishes a reciprocal member index. Membership is discovery,
   not activation. A fresh operator deployment must complete the supported
   inspect → prepare → approve → scaffold → start path from that shared
   definition before the phase counts as adopted.
2. **Centralised per-soul knowledge and the five experts.** Expertise lives in
   this repository, one canonical home per concept, owned by one of five
   persistent experts (oats-expert, oats-kernel-expert, oats-desktop-expert,
   market-research-expert, oats-assistant) per the
   [domain-expert rebuild](/nodes/oats-expert/decisions/domain-expert-rebuild.md)
   and [source-independent custody](/nodes/oats-expert/decisions/external-knowledge-custody.md).
   Accepted knowledge is the reviewed default branch; learning arrives as PRs.
   Verify fresh readers before decommissioning old in-soul knowledge.
3. **Desktop parity** against the accepted redesign, including the official
   marketplace view and soul creation that shows a soul's declared
   capabilities. Desktop owns product judgment under its
   [product/CLI-authority decision](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md).

# Distribution model

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
- Alternative knowledge providers remain options under the accepted
  [optional reference theory](/nodes/oats-expert/optional-reference-theory.md);
  the default is not imposed on every capability.
- market-research-expert owns dated, attributable investigation before any
  comparison or positioning claim is promoted; unknown is not absent.
- Provider readiness is reported, never assumed: a released capability that
  lacks an interface the new infrastructure requires is a gap to fix, not a
  requirement to drop.

# Citations

1. Accepted human direction, 2026-09-20: workspace-first order, centralised
   knowledge with five experts second, Desktop parity third; kernel skills as
   official capabilities with an explicit removable `oats.core` default; the
   reviewed catalog as the official marketplace.
2. Framework decision record `agents/oats-expert/soul/knowledge/decisions/official-capabilities-oats-core-setup-and-marketplace.md`
   and adoption plan `docs/design/2026-09-20-workspace-and-portable-adoption-plan.md`
   in [awebai/oats](https://github.com/awebai/oats).
3. [OATS v0.24.1](https://github.com/awebai/oats/releases/tag/v0.24.1),
   [OKF v2.1.1](https://github.com/awebai/oats-okf/releases/tag/v2.1.1) and
   the `oats-framework/v1.1.0` tag in awebai/oats.
