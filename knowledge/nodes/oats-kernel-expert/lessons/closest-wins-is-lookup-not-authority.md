---
type: Lesson
title: Closest-wins merged views answer "what is active here", never provenance or mutation authority
description: Config and lock chains merge closest-wins per identity independently, which is correct for resolving what applies and wrong for asking which scope provides a row or which rows a command may touch.
tags: [kernel, config, locks, scopes, provenance, nested-scopes]
timestamp: 2026-07-29
---
# Lesson

Established 2026-07-29 after a nested-scope defect, with earlier init-time
cases from 2026-07-26/29. Configuration and lock chains merge outermost to
innermost with closest-wins *per identity independently*. That is the right
rule for "which capability or setting applies here". It is the wrong rule for
two other questions that look similar:

- **Provenance** — which package provides a given capability row. Resolved
  through the merged view, a workspace pin and a repository pin of the same
  package pair a capability row with a package row from a scope that never
  exported it, reporting the wrong version and the wrong origin. The provider
  must be resolved inside the row's own lock level.
- **Mutation authority** — which rows a mutating command may approve or
  remove. A package identity resolves to exactly one scope, the closest that
  locks it, and only that scope's rows are the command's to touch. Filtering the
  merged view by package and writing the result into one target lock silently
  moves authority across scopes.

Nested scopes with version skew are normal in a team workspace — an outer
workspace pin and an inner repository pin of the same package is an ordinary
case — so fixtures that lock one identity at one level prove nothing about
this class.

The chain is also blind by construction to any scope that has no configuration
file yet: mid-initialisation, or a lock-only scope. Chain readers see
config-bearing levels; a scope that is about to exist is invisible to them.
Initialisation-adjacent logic therefore reads the target scope's own on-disk
state directly rather than through chain readers, or it will look for the store
and lock it is creating in the wrong place.

# Related

[Configured scope is not messaging membership](/nodes/oats-kernel-expert/decisions/configured-team-boundary.md);
[Local configuration remains authored policy](/nodes/oats-kernel-expert/decisions/local-policy-is-not-package-policy.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/decisions/provider-rows-resolve-at-their-own-lock-level.md` (2026-07-29); SHA-256 `4d97863c0e3289cd5e904f9370487d43d415266306ae675bd5d0323b94ed4233`.
2. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/final-package-lifecycle-transaction-invariants.md`, `classic-init-own-scope-capability-store.md`, `init-acquires-before-config-exists.md`, `init-lock-visibility-package-twin.md` (2026-07-26 → 2026-07-29), principle only.
