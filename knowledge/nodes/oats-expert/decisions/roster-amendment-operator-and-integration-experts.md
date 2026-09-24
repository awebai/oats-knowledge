---
type: Decision
title: "Roster amendment: an operator expert and an integration expert own nodes; developers declare a promotion target"
description: The 2026-09-24 amendment to the five-expert roster adds a deployment operator node and a cross-package provider-integration node, keeps release stewardship a Playbook rather than a soul, requires every ephemeral developer role to declare the expert node its lessons promote to, refines the promotion test to keep recipes that encode external-system judgement, and names cross-project seams as read-only cross-base reads.
tags: [decision, roster, knowledge, centralisation, operator, integration, seams, promotion]
timestamp: 2026-09-24
---
# Decision

Accepted 2026-09-24 by the redesign lead together with the OSS coordinator,
under authority the human delegated to them ("use your best judgement and
reach a decision together"). It **amends** the roster fixed on 2026-09-21
(the five-expert decision: `oats-expert`, `oats-kernel-expert`,
`oats-desktop-expert`, `oats-assistant`, `market-research-expert`, plus a
setup expert that owned no knowledge; developer roles ephemeral and
node-less), and thereby amends the "owns no node" clause of
[Expert domains replace implementation job titles](/nodes/oats-expert/decisions/domain-expert-rebuild.md)
and of
[Operating OATS is capability content](/nodes/oats-expert/decisions/official-capabilities-and-reviewed-marketplace.md).
The five-expert decision otherwise stands: the roster is reviewed experts,
knowledge lives centrally, the base never teaches the code.

# Context

Before the package-expert phase of the knowledge rebuild, the human asked the
lead to consult the OSS coordinator — the role that had operated a two-team
deployment through a full rebuild round, run provider work through developer
children, and verified every release — with the knowledge theory laid out in
full, so the recommendation would land against the theory or push back on
it. The recommendation was anchored, point by point, in that week's
operating experience.

# What was decided

1. **A deployment operator expert owns a real node.** Rebuilding a deployment
   surfaced ten disagreements between the guide and the kernel; consolidating
   credentials across machines, placing a messaging root where the hook
   looks, keeping knowledge state outside every work tree, pinning owners by
   soul id, treating custody directories as host facts, and sequencing a
   cutover are none of them derivable from the repository, all universal
   once names are stripped — and **unowned**: overall stewardship is a log
   of what happened, not operator knowledge, and the setup expert owned
   nothing by decision. The setup expert becomes **`oats-operator-expert`**
   and owns the [operator node](/nodes/oats-operator-expert/index.md):
   rebuild/onboarding rationale, migration judgement, multi-machine layout,
   cutover sequencing, the outsider-verification method. The ownership test
   passes because every onboarding exercises it. Lead's disposition: accept;
   this is the node the operating side most needs and the one that rotted
   for lack of an owner ("a node without a soul to keep it honest rots" is
   the argument *for* it, not against it).
2. **A cross-package provider-integration expert owns a real node.** Five
   review rounds on one provider, three of them from a live rehearsal,
   produced integration discipline that is neither kernel internals nor one
   package's facts: rehearse before approving; what a live acceptance must
   cover; how compensation must report; a hook never takes a locator from the
   ambient environment because the operator may be another instance. Folding
   it into the kernel expert puts integration judgement with kernel
   internals; folding it into a package expert loses the cross-package part.
   **`integrations-expert`** owns the
   [integration node](/nodes/integrations-expert/index.md); package experts
   own their package's FACTS and read it. Lead's disposition: accept.
3. **Release stewardship is a role, not a node.** Release authority is
   authority plus a procedure; that is a Playbook in this node's stewardship
   area, read by whoever holds the authority — see
   [Release judgement for the tag-driven lane](/nodes/oats-expert/stewardship/release-traps.md).
   A release/steward soul is **rejected**.
4. **Developers hold no node — kept, with a routing rule the theory lacked.**
   Node-less developers worked only because that week's developers were
   spawned from an expert soul. A developer role spawned from a package has
   an ephemeral spawning soul, so "promoted into an expert node or not at
   all" resolved to "not at all" for exactly the roles that learn the most.
   Rule: **every developer role declares its promotion target** — the expert
   node whose domain it works in — in its soul definition, and the harvester
   delivers there as a proposal the owning expert reviews. Accepted as a
   soul-definition field and a harvester delivery rule.
5. **Cross-project seams are named and read, not re-derived.** A program
   larger than one package (the messaging identity/custody program is the
   example) keeps its expert on its own side; the corresponding package
   expert must READ that node, and the other project must read the operator
   and integration nodes. Otherwise the two rosters re-derive each other's
   decisions — three rounds of identity design in one week re-derived a
   model written down six weeks earlier
   ([the cross-base consult corollary](/nodes/oats-expert/decisions/optional-reference-theory.md)).
   A node in another project's base is read through a **read-only store
   reference across bases**; the two package experts sitting on such seams
   (messaging, knowledge framework) name the seam in their charters, or they
   own less than their title says.

# Theory refinement

The 2026-09-21 reject list dropped "command/test recipes" wholesale. The
coordinator's pushback — the acceptance sequence for a grant-serving hook is
a recipe AND the expertise — is accepted as a refinement of the two-part
promotion test: **keep a recipe when it encodes judgement about an external
system's behaviour that a competent engineer reading the code still gets
wrong; reject it when the code says the same thing.**

# Roster after the amendment

`oats-expert`, `oats-kernel-expert`, `oats-desktop-expert`,
`oats-operator-expert` (renamed from the setup expert; owns the operator
node), `integrations-expert` (owns the integration node), `oats-assistant`,
`market-research-expert`, plus the package experts, each owning its
package's facts and reading the integration node
([official development dogfoods the workspace](/nodes/oats-expert/decisions/official-development-dogfoods-the-workspace.md)
records the six package experts). Developer roles remain ephemeral and each
declares its promotion target. Both new nodes are seeded from harvested
operating material plus the operator and integration concepts the bundle
migration surfaces; the amendment changes nothing about the migration's
start.

# Related

[Expert domains replace implementation job titles](/nodes/oats-expert/decisions/domain-expert-rebuild.md);
[Centralised per-soul knowledge is the default](/nodes/oats-expert/decisions/flexible-knowledge-and-situated-instances.md);
[Second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md);
[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/roster-amendment-operator-and-integration-experts.md` (2026-09-24, redesign lead with the OSS coordinator under delegated authority).
2. Legacy `agents/oats-expert/soul/knowledge/decisions/five-souls-are-the-roster-knowledge-centralised.md` (2026-09-21), the roster this amends.
