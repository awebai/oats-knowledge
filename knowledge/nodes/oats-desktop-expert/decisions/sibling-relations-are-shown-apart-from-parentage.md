---
type: Decision
title: Explicit sibling links are shown on both ends and apart from parentage
description: Show only direct explicit sibling links on both endpoints, using words in the palette and a separate meaningful dotted line in the sidebar so siblinghood cannot be mistaken for parentage.
tags: [desktop, siblings, lineage, roster, accessibility, rejected-alternatives]
timestamp: 2026-10-16
---
# Decision and rationale

The source records a 2026-10-16 design decision: show a sibling relation
without inventing lineage or making the operator decipher a mark shared with
parentage. It reports a human-owner request, relayed by the lane maintainer,
to separate the sidebar's sibling and parent-child lines; the detailed design
was delegated to the Desktop expert and accepted through maintainer review
and merge. That is source-reported direction and delegated design acceptance,
not independently verified human approval of every detail.

# Explicit links, not inferred sibling sets

Show siblinghood only for the kernel's explicit `siblingInstance` link,
resolved by identity over the row's own deployment's full roster. Apply the
existing [identity and ambiguity rule](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md)
before filtering; a narrower visible list must not manufacture an edge.
Show a resolved direct link on **both endpoints**, not only on the row that
stores the link. The operator should read the same relation from either end.

Reject two ways of claiming more than the kernel established:

- **Spawn-time `relation`/`relativeTo` as current relations.** Retirement can
  splice live lineage while the spawn record still names a retired instance.
  Historical spawning intent is not the current graph.
- **Transitive sibling closure.** C linked to B and B linked to A does not
  warrant showing C and A as siblings. Show each row's direct links, not a
  derived all-to-all family.

Co-children already read as peers through the same parent label and
indentation. Do not add a list of sibling names to every child: it states
parentage twice and grows to N−1 names per row. The explicit sibling cue
serves the root-to-root link that parentage does not express. This is a
Desktop reading of [bounded live lineage](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md),
not a change to the kernel's relationship or retirement policy.

# One relation, distinct visual and accessible readings

Keep siblings on the same column and indent children. Preserve that meaning
across the two views without forcing the same drawing into each:

- **Sidebar:** the dotted sibling link joins the dots on their column; the
  solid parent-child lineage runs separately to its right. A shared column
  lets a solid line stand in for a dotted one and hides which relation is
  being shown. Separation is semantic, not merely a cosmetic offset.
- **Palette:** use visible words such as “sibling of …” beside the name,
  with the equivalent relation read once by assistive technology. The palette
  has no connectors; adding a connector glyph or relying on colour is not
  its relationship language. Keep sibling wording in one shared client home
  so views do not acquire competing readings. This applies the existing
  [shared-reader wording boundary](/nodes/oats-desktop-expert/decisions/shared-readers-separate-client-terms-and-kernel-prose.md),
  not a second general wording policy.

Once separated, the dotted sidebar line is the only sibling graphic on its
column. Treat it as **meaningful**, meeting WCAG 1.4.11's 3:1 contrast against
every row fill it crosses, including selection and themed surfaces. The solid
lineage can remain decorative **because indentation independently conveys
parentage**. Decorative status follows redundant meaning, not the fact that
something is drawn as a line. A future redesign that removes the redundant
cue must revisit that judgment.

Apply the [effective-colour inventory](/nodes/oats-desktop-expert/lessons/effective-contrast-over-token-pairs.md)
rather than treating a token-pair check as proof. Pixel offsets, stroke
construction and colour constants belong in the repository. Shared-reader
regressions should preserve direct-link symmetry and ambiguity refusal;
rendering/accessibility checks should preserve distinct cues, one spoken
relation and contrast on every effective fill. Those checks enforce the
choice; this record preserves why it was chosen, without claiming they were
run by the harvest.

This adds concrete sibling-display rationale to the existing no-colour-only
rule. It does not supersede [name-ordered roster recognition](/nodes/oats-desktop-expert/decisions/roster-name-order-preserves-recognition.md)
or the palette's separate recency behavior.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-palette-siblings, 2026-10-16; notes/palette-sibling-design.md; notes/sidebar-sibling-line-own-column.md.

The source identifies [awebai/oats#1312](https://github.com/awebai/oats/issues/1312)
and comment 6214880493 for the design, [PR #1313](https://github.com/awebai/oats/pull/1313)
(`a01d723d`) for the palette and [PR #1316](https://github.com/awebai/oats/pull/1316)
(`b591ff93`) for the sidebar. Request, acceptance and merge references remain
source-reported. The sidebar note reports static-page checks with real CSS,
not Electron; this harvest did not audit those changes or establish live
assistive-technology behavior.
