---
type: Decision
title: Explain a technical model with an overview and a closed developer disclosure
description: Lead with one plain user-facing sentence and place developer-only mechanisms in a native disclosure, sharing state meanings with the visible rows rather than maintaining a second explanation.
tags: [desktop, explanation, progressive-disclosure, accessibility, design]
timestamp: 2026-10-15
---
# Decision

For a screen whose underlying model needs detail mainly for developers,
start with an **Overview** containing one plain sentence in user terms.
Place the mechanism, diagram and detailed state explanations in a native
`<details>` disclosure labelled **For developers**, closed by default.

The source reports product-owner approval on 2026-10-14 for this pattern in
Setup. Its overview identifies what the host repository defines—the
workspace, its members and its packages—without first teaching reciprocal
membership links. The links and the meanings of member states remain
available in the disclosure. This records how to explain that model, not a
second specification of workspace membership.

# Why this form was chosen

The product owner wanted an explanation of the host and its links, then
asked for it to be shorter and less technical. The earlier multi-paragraph
opening buried the useful summary under the mechanism. The screen serves
people running the workspace, not only those wiring repositories together.

The accepted tradeoff keeps the purpose immediately legible and puts the
mechanism one deliberate interaction away rather than deleting it. Native
disclosure semantics supply the keyboard and accessibility foundation
without introducing another custom interaction. That choice does not itself
prove the complete screen's accessibility: the existing
[quality and live-verification bar](design-direction-and-quality-bar.md)
still applies.

# One meaning for the explanation and the rows

Detailed state explanations and row labels draw from one shared source of
state meanings. Duplicating the vocabulary in explanatory copy would let
help text contradict the chips it is meant to explain. Keep the common
meaning in code; do not store a second table of current state words here.
Shared data and composition-level checks are the enforcement route for
agreement between the two surfaces.

This is progressive disclosure of developer detail, not permission to hide
operational warnings or the row's state. It also does not replace the
separate [shared-reader wording and attribution decision](shared-readers-separate-client-terms-and-kernel-prose.md),
which governs client terms and the speaker of transported prose.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-teams-design, 2026-10-15; notes/teams-setup-design-direction.md.

The proposal and note report product-owner acceptance on 2026-10-14 after
successive shorter, less technical mock revisions, and implementation in
[awebai/oats#1191](https://github.com/awebai/oats/pull/1191). The proposal also
reports the shared state vocabulary. Acceptance, shipment and that
implementation detail are source-reported; this harvest did not inspect
the code or reproduce the accessibility behavior.
