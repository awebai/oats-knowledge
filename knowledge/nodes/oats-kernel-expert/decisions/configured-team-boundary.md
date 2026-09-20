---
type: Decision
title: Configured scope is not messaging membership
description: A declared configuration boundary establishes team scope independently of ambient messaging identity.
---
# Rationale

A team must not change because a command found a different messaging workspace. Declaring the boundary in configuration makes ownership and discovery explainable without depending on whichever provider identity happens to be active.

The accepted design preferred the configured directory scope over a second manually maintained repository registry. That avoids two lists drifting apart; it does not imply arbitrary-depth discovery or membership on a remote messaging server.

Configuration scope and provider membership answer different questions. A local roster is not proof of cross-host liveness, and a provider certificate is not permission to reinterpret the configured deployment boundary. Resolve those questions through their own supported tools; keep lookup algorithms and provider setup recipes in current documentation.

# Related

[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md).

# Current contracts

- [Current configuration.md](https://github.com/awebai/oats/blob/main/docs/configuration.md)
- [Current integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md)

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/team-as-config-entity.md`; SHA-256 `4fc3986d0823561662afd5a1f62dd6fbb79e1243696e3232503f59c374d6c288`.
