# oats-aweb-expert

Messaging package expert (`oats.aweb`, repository `oats-aweb`). Owns the FACTS of the messaging provider at each published version: which payload keys it honours (team, delivery, identity modes), where its spawn hook looks for an aweb root, how it mints, retains and retires identities, and what its grant-backed resident mode requires of the kernel and the host. Package experts own their package's facts and nothing cross-package: cross-package provider-integration judgement is read from [integrations-expert](/nodes/integrations-expert/index.md), and cross-package architecture stays with [oats-maintainer](/nodes/oats-maintainer/index.md). Charter set by [the OATS soul roster](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md) and workspace model v2's rule that every package repository carries a member soul that is its expert ([workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md), point 25).

**Seam:** the messaging protocol's own identity, custody and team model is decided on the protocol side, in node `aweb-protocol-expert` of the aweb project's base (read-only store reference across bases). This node reads it and records only how the OATS package applies it — so the two rosters do not re-derive each other's decisions ([the OATS soul roster](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md)).

The node records the package's facts as of the release the framework pins (oats.aweb 1.16.1, mirrored in the framework's `capabilities/oats-aweb`); a concept names the release it was verified against.

## Sections

* [References](references/index.md) - How the package applies the protocol's identity and custody model at each release.
