# oats-kernel-expert

Kernel-to-capability contract rationale: why the kernel is shaped as it is,
what was decided and rejected, and what was discovered the hard way. Formal
contracts stay in the repository's docs and schemas; this node explains the
judgment behind them.

## Sections

* [Decisions](decisions/index.md) - Accepted kernel contracts with their rationale, rejected alternatives and explicit supersessions.
* [Lessons](lessons/index.md) - Hard-won constraints on transactions, containment, composition, hooks and the CLI boundary.
* [References](references/index.md) - Dated, version-bound third-party facts the kernel's decisions rest on.

## Start here

* [Keep kernel responsibilities generic and capability runtimes complete](decisions/kernel-and-capability-responsibility.md) - Native lifecycle and exact OATS-managed composition belong to the kernel while replaceable capabilities own concrete runtime behavior; since 2026-09-18 exclusive runtime visibility is claimed only for Pi's strict profile and credentials are never OATS-managed.
* [Soul declares identity and intrinsic requirements, config assigns deployment policy](decisions/soul-declares-kind-config-assigns-policy.md) - A soul carries what it is and what it intrinsically needs (kind, source-complete capability requirements, defaults, knowledge interests); scoped deployment configuration assigns bindings, settings, targets and policy; manifests and packages never carry deployment targets.
* [Integrity, origin and consent are different proofs](decisions/trust-approval-and-consent-boundaries.md) - Contained reproducible bytes, consistent provenance and explicit executable or host-install consent answer distinct trust questions.
* [Local configuration remains authored policy](decisions/local-policy-is-not-package-policy.md) - Explicit adoption and synchronization preserve local authorship rather than allowing package updates to rewrite policy at a distance.
* [A minimal process boundary avoids permanent private coupling](decisions/minimal-process-boundary.md) - A structured public CLI lets independent consumers evolve without turning each private kernel function into a permanent API.
* [Separate operational home from granted work authority](decisions/home-work-authority.md) - Keeping lifecycle identity outside disposable work prevents work topology from silently becoming operational or knowledge authority.
* [Strict curriculum is a Pi-profile claim; Claude Code and Codex launch natively with opt-in bypass only](decisions/native-launch-strict-pi-only.md) - OATS builds the complete resolved instance home for every harness but claims exclusive visibility only where a profile enforces it; Claude Code and Codex keep native context, settings and permission behaviour, with bypass flags added solely on an explicit user opt-in.
* [Harness authentication is native and user-managed; OATS never handles credentials](decisions/harness-native-authentication.md) - Users authenticate their harness through its own mechanisms and OATS launches it in that native authenticated context; OATS never parses, copies, stores or wraps credentials, never imposes an API-key-only subset, and never swaps HOME or profiles to make isolation evidence pass.
* [Every preparation refusal is attributed and carries a provider-declared fixed reason; free text never crosses](decisions/preparation-problems-are-attributed-and-reasoned.md) - A provider's error message crosses the binding wire only when byte-equal to a fixed reason it declares in its manifest; every preparation problem names slot, capability, origins and the operator's document key; a bare unattributed refusal from preparation is a kernel defect.
* [Kernel-composed instructions are executable surface and may assert only what every instance has](lessons/kernel-composed-text-is-executable-surface.md) - Instructions win over code because they are what the agent acts on; shared text states the invariant and defers the variable part, composed blocks are a set, and anything a capability supplies belongs in that capability's own injection.
* [A refusal that needs the old bytes is a pre-commit gate, never a post-hoc rollback](lessons/refusal-belongs-before-commit.md) - Any policy decision that would need the pre-operation state to recover must run inside the transaction while that state is still live; "do it, then undo it" is safe only when the undo is a pure inverse.
