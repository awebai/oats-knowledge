---
type: Decision
title: Name-ordered rosters preserve recognition across state changes
description: Order roster bundles by their first root rather than liveness or member count, so starts, stops and a first child do not reprioritize the agents the operator is tracking.
tags: [desktop, roster, ordering, lineage, recognition]
timestamp: 2026-10-15
---
# Decision and rationale

The source records a 2026-10-15 product decision prompted by a bundle jumping
to the top when its root gained its first child. The human owner requested
stable row order and delegated the start/stop ordering choice; the lead
recommended name order. Preserve the operator's recognition of agents across
refreshes instead of continually promoting whichever bundle looks most active.
The detailed ordering is the source-reported delegated design, not a claim
that the human personally specified every sorting rule.

- **Names, not liveness, order the roster.** Order roots and siblings by
  instance name, with a deterministic identity tie-breaker for equal names.
  The existing [qualified-identity rule](../lessons/identity-and-relationship-legibility.md)
  remains authoritative for views spanning roots, workspaces or hosts.
- **Place a bundle by its first root.** Keep bundles and single instances in
  one ordered sequence. Do not rank a bundle by its best-ranked member or
  put all multi-member clusters before all singles. A run of consecutive
  singles forms one independent group in place; that grouping must not move
  them to a separate end of the list.
- **Show state on the row, not by reprioritizing it.** A start or stop changes
  liveness presentation, not sort priority. Gaining or losing a child must
  not promote or demote the surviving bundle merely because its membership
  count changed. Adding or removing rows naturally changes the displayed
  tree; this is not a promise of fixed pixel positions through insertion,
  removal or expansion.

# Rejected alternatives and scope

The source explicitly replaces the earlier running-first roster choice:
putting active agents first gathered current work at the top, but every
start and stop moved rows. Multi-member-first grouping had a separate
failure: the first child changed its root's category and jumped the bundle
ahead of single instances. Name order and root-based placement address both
without concealing liveness or lineage.

This decision governs the shared roster order used by the Desktop sidebar,
command palette and terminal list. It does **not** erase the palette's
accepted [Recent group and previous-agent selection](agent-centered-navigation.md#recency-belongs-in-the-instance-palette-not-the-roster):
base roster/tree order is distinct from that explicit recency view. The
proposal does not establish a supersession of palette recency. The two
unclustered pickers explicitly excluded by the source are also outside this
decision; it is not a universal ban on running-first selection controls.

The [needs-input decision](needs-input-preserves-liveness-and-recognition.md)
already rejects reordering by urgency. This extends that recognition
rationale to liveness and bundle membership without duplicating its marker
or roll-up design. A future roster sort that restores state-driven movement
is a product decision to take to the human owner, not a harmless default.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/roster-orders-by-name.md.

The source identifies [awebai/oats#1262](https://github.com/awebai/oats/issues/1262)
and comment 6196531154 for the request, delegation and recommendation; it
identifies [#1083](https://github.com/awebai/oats/issues/1083) as the earlier
running-first choice and [PR #1271](https://github.com/awebai/oats/pull/1271)
(`e8ad4026`) as the implementation. These are source-reported decision and
shipment references, not independently audited acceptance or test receipts.
