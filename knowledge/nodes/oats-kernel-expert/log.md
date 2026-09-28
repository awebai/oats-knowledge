# oats-kernel-expert log

## 2026-09-28

* **Update**: audit pass against main (0.30 line). Captured path (removed in 0.26.0) and the classic cascade, install, config templates and package approval (removed in 0.25/0.26) are no longer presented as current. Rewritten: [kernel-and-capability-responsibility](decisions/kernel-and-capability-responsibility.md) (helperInjection recorded as tolerated-and-ignored), [soul-declares-kind-config-assigns-policy](decisions/soul-declares-kind-config-assigns-policy.md) (absorbs the removal rationale of config templates, the flat operator bindings map and closest-wins provenance), [trust-approval-and-consent-boundaries](decisions/trust-approval-and-consent-boundaries.md), [messaging-capability-owns-provider-behaviour](decisions/messaging-capability-owns-provider-behaviour.md), [contained-capability-lifetime](decisions/contained-capability-lifetime.md), [evidence-bounded-compatibility-and-migration](decisions/evidence-bounded-compatibility-and-migration.md) (absorbs the closed-validator floor rule), [harness-native-authentication](decisions/harness-native-authentication.md), [home-work-authority](decisions/home-work-authority.md). `native-launch-strict-pi-only` renamed to [harness-native-launch](decisions/harness-native-launch.md) (Pi starts natively too since workspace model v2; absorbs the Claude Code isolation facts). Merged and deleted: `preparation-problems-are-attributed-and-reasoned` (into [machine-boundary-contract](lessons/machine-boundary-contract.md)), `external-witness-for-captured-session-identity` (into [resolved-object-not-referring-string](lessons/resolved-object-not-referring-string.md)), `operator-bindings-flat-map-declared-ownership`, `local-policy-is-not-package-policy`, `closest-wins-is-lookup-not-authority`, `references/claude-code-isolation-facts`; the References section is gone. Provenance citations collapsed to one line per concept; team content (`configured-team-boundary`) left for the team-model pass.

## 2026-09-24

* **Update**: [Integrity, origin and consent are different proofs](decisions/trust-approval-and-consent-boundaries.md) amended by the human decision that removes package approval: declaring a package is the trust decision.

## 2026-09-22

* **Fix**: the Claude Code isolation facts were recorded as superseded for Claude Code and Codex by the 2026-09-18 native-launch decision.
* **Update**: [kernel-and-capability-responsibility](decisions/kernel-and-capability-responsibility.md) recorded the strict-curriculum supersession chain and the harness-native-authentication clause.
* **Update**: [soul-declares-kind-config-assigns-policy](decisions/soul-declares-kind-config-assigns-policy.md) retitled for the Portable Souls amendment (soul declares intrinsic requirements).
* **Update**: duplicate rework: [evidence-bounded-compatibility-and-migration](decisions/evidence-bounded-compatibility-and-migration.md) is the single home of the all-or-nothing-per-scope ruling; option injection is owned by [hook-and-error-channels-disclose](lessons/hook-and-error-channels-disclose.md); [resolved-object-not-referring-string](lessons/resolved-object-not-referring-string.md) records the Desktop's independent convergence.
* **Fix**: log normalised to newest-first; section indexes renamed.

## 2026-09-21

* **Harvest**: gap-fill pass over the `oats-expert` soul re-assessment; six new Decisions, five merges.
* **Creation**: native launch, native authentication, attributed preparation refusals, operator bindings ownership, messaging boundary and external session witness decisions (the last four since merged or removed, 2026-09-28).
* **Update**: [kernel-and-capability-responsibility](decisions/kernel-and-capability-responsibility.md), [configured-team-boundary](decisions/configured-team-boundary.md), [evidence-bounded-compatibility-and-migration](decisions/evidence-bounded-compatibility-and-migration.md), [preserve-authority-until-cleanup-is-proven](decisions/preserve-authority-until-cleanup-is-proven.md) and [home-work-authority](decisions/home-work-authority.md) extended with 2026-09-16 → 2026-09-21 rulings.
* **Harvest**: synthesis pass over the assessor proposals for `cli-dev`, `oats-expert`, `integrations-expert` and `dev-coordinator`; node grew from 11 to 20 concepts, each with tags and its original timestamp.
* **Creation**: six lessons consolidated from cli-dev rewrites: [refusal-belongs-before-commit](lessons/refusal-belongs-before-commit.md), [resolved-object-not-referring-string](lessons/resolved-object-not-referring-string.md), [kernel-composed-text-is-executable-surface](lessons/kernel-composed-text-is-executable-surface.md), [hook-and-error-channels-disclose](lessons/hook-and-error-channels-disclose.md), [machine-boundary-contract](lessons/machine-boundary-contract.md), [fail-closed-mechanism-proven-by-first-user](lessons/fail-closed-mechanism-proven-by-first-user.md).
* **Update**: [bounded-live-lineage](decisions/bounded-live-lineage.md), [contained-capability-lifetime](decisions/contained-capability-lifetime.md), [trust-approval-and-consent-boundaries](decisions/trust-approval-and-consent-boundaries.md), [minimal-process-boundary](decisions/minimal-process-boundary.md), [preserve-authority-until-cleanup-is-proven](decisions/preserve-authority-until-cleanup-is-proven.md) and [record-lock-liveness-tradeoff](decisions/record-lock-liveness-tradeoff.md) extended from the legacy soul trees.

## 2026-09-13

* **Creation**: curated rationale prepared for independent review.
* **Fix**: [kernel-and-capability-responsibility](decisions/kernel-and-capability-responsibility.md) recorded the founder amendment of 2026-07-27.
