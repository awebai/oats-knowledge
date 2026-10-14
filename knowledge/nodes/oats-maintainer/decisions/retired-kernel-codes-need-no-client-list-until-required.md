---
type: Decision
title: Retired kernel codes need no client list until a removal requires one
description: A client may use a truthful generic rendering for retired kernel codes still in its accepted band, deferring a retired-code list until a concrete removal needs it.
tags: [compatibility, clients, review, error-codes]
timestamp: 2026-10-14
---
# Decision

The source reports agreement between the two maintainer sides on 2026-10-14
[1]: when the kernel stops emitting an error code that older kernels in a
client's accepted band still emit, the client may use its generic rendering
until the band's floor passes the removal, **provided that rendering remains
true and is not harmful**. Less specific is not necessarily incorrect.

Do not maintain a retired-kernel-code list in `packages/client` in advance of
need. Reconsider it when a concrete removal would leave a false or harmful
reading, not merely because the current kernel no longer emits a name.

# Why this choice matters

A kernel removal and a client's support obligation have different boundaries.
Removing a code from the current producer does not make it unreachable from
older producers the client still accepts. Conversely, preserving support does
not necessarily require preserving every specialized phrase.

The source's example is `E_ROSTER_BUDGET`, removed by awebai/oats#1118. It
reports that a 0.55.0 Desktop reading a 0.54.x CLI uses the generic
“Not reached (CODE)” rendering rather than “Timed out”. The row remains true;
the loss is specificity, not a false account of the outcome [1]. These
versions describe the decision's evidence, not a permanent support band.

The source also reports that restoring the literal code would fail the
client code-name test: the name was no longer emitted by the current kernel
[2]. That guard cannot by itself decide whether a fallback is truthful across
the accepted band. Code can show which strings remain; it cannot recover why
the less-specific reading was accepted or why extra compatibility machinery
was deferred.

# Rejected alternatives

- **A retired-code list now**, with removal versions accepted by the name
  test: machinery before a removal actually needs it.
- **Moving the client's floor to 0.55.0 for this case**: disproportionate to
  one row's wording. This is not a prohibition on future justified floor
  changes.

# Review consequence

Review a kernel PR that removes a code or sentence a client reads against the
client's **whole accepted band**, not just the current kernel. Ask whether
older supported outputs remain truthfully rendered. If the generic reading
is true and harmless, accept it. Otherwise preserve the needed reading and
decide the compatibility mechanism then, or prove the old answer unreachable.
This decision does not pre-approve a list's design or a band-floor change.

The enforcement route is client behavior coverage using supported old-kernel
outputs for the chosen rendering; a current-name check alone cannot cover
that seam. No new registry or regression coverage is claimed delivered here.

# Related

[Compatibility follows supported adoption](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md)
is the canonical broader rule, including separately versioned consumers'
bands. This decision records the maintainer's narrower tradeoff for retired
error-code rendering; it does not supersede that rule or the
[pre-adoption clean-contract precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md).

# Citations

1. The proposal and named note report agreement and closure as not planned
   in [awebai/oats#1122](https://github.com/awebai/oats/issues/1122) on
   2026-10-14, following
   [awebai/oats#1118](https://github.com/awebai/oats/pull/1118). Agreement,
   closure and the rendering example are source-reported, not independently
   audited by this harvest.
2. The proposal identifies `test/client-own-codes.test.mjs` at
   `6e9cf9be` and [awebai/oats#1047](https://github.com/awebai/oats/pull/1047).
   The test result is source-reported, not reproduced by this harvest.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-lfx, 2026-10-14; notes/a-retired-kernel-code-gets-no-client-list-until-needed.md.
