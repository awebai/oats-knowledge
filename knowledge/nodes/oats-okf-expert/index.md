# oats-okf-expert

Knowledge package expert (`oats.okf`, repository `oats-okf`). Owns the FACTS of the knowledge provider at each published version: what its binding reads from the merged payload and from the soul's knowledge declaration, how it pins owners and stores state, what its spawn/retire hooks and harvester do and refuse, and how base descriptors, bindings and node ownership behave in practice. Package experts own their package's facts and nothing cross-package: cross-package provider-integration judgement is read from [integrations-expert](/nodes/integrations-expert/index.md), and cross-package architecture stays with [oats-expert](/nodes/oats-expert/index.md). Charter set by the 2026-09-24 [roster amendment](/nodes/oats-expert/decisions/roster-amendment-operator-and-integration-experts.md) and workspace model v2's rule that every package repository carries a member soul that is its expert ([workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), point 25).

**Seam:** the theory of what counts as knowledge (the two-part test, the reject list, promotion) is not this node's — it lives in [oats-expert](/nodes/oats-expert/index.md) (see [optional reference theory](/nodes/oats-expert/decisions/optional-reference-theory.md)); this node records how the package implements and enforces it, and reads the theory rather than restating it.

**Chartered, not yet seeded (Phase D slice 3).** The owning soul is the package repository's member soul of the same name.

## Decisions

* [Decisions](decisions/index.md) - Accepted positions on how the knowledge package behaves.
