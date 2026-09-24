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

* [Keep kernel responsibilities generic and capability runtimes complete](decisions/kernel-and-capability-responsibility.md) - Native lifecycle and exact OATS-managed composition belong to the kernel while replaceable capabilities own concrete runtime behavior; since 2026-09-23 no harness carries an exclusive-visibility claim, the official core is a visible, suppressible kernel default, and credentials are never OATS-managed.
* [Soul declares identity and intrinsic requirements, config assigns deployment policy](decisions/soul-declares-kind-config-assigns-policy.md) - A soul carries what it is and what it intrinsically needs — kind, capability references that name a location but never a version, defaults and knowledge interests; versions live only in workspace package pins and the lock; deployment policy lives in the workspace, the host-local file and spawn time; manifests and packages never carry deployment targets.
* [A running instance's soul is an immutable per-commit copy, so soul identity and soul content travel separately](decisions/per-commit-soul-content-durable-soul-identity.md) - Under workspace model v2 a soul is fetched per member commit into a directory the kernel never changes or removes and each instance links its own commit; because that makes a soul's resolved path change with every member commit, the kernel hands every lifecycle consumer a durable soul identity (repository key plus soul name) separately from the content location, and a consumer that keys durable state on the path is a defect.
* [Integrity, origin and consent are different proofs](decisions/trust-approval-and-consent-boundaries.md) - Contained reproducible bytes, consistent provenance and explicit executable or host-install consent answer distinct trust questions; under workspace model v2 membership is the trust for member capabilities and a package's per-version approval is re-verified at spawn.
* [Local configuration remains authored policy](decisions/local-policy-is-not-package-policy.md) - Explicit adoption and synchronization preserve local authorship rather than allowing package updates to rewrite policy at a distance.
* [A minimal process boundary avoids permanent private coupling](decisions/minimal-process-boundary.md) - A structured public CLI lets independent consumers evolve without turning each private kernel function into a permanent API.
* [Separate operational home from granted work authority](decisions/home-work-authority.md) - Keeping lifecycle identity outside disposable work prevents work topology from silently becoming operational or knowledge authority.
* [Harnesses launch natively; OATS contributes the resolved home but claims exclusive visibility for none](decisions/native-launch-strict-pi-only.md) - OATS builds the complete resolved instance home for every harness and records what it supplied, but since 2026-09-23 claims exclusive visibility for no harness: Claude Code, Codex and Pi keep native context, discovery, settings and permission behaviour, with bypass flags added solely on an explicit user opt-in.
* [Harness authentication is native and user-managed; OATS never handles credentials](decisions/harness-native-authentication.md) - Users authenticate their harness through its own mechanisms and OATS launches it in that native authenticated context; OATS never parses, copies, stores or wraps credentials, never imposes an API-key-only subset, and never swaps HOME or profiles to make isolation evidence pass.
* [Every preparation refusal is attributed and carries a provider-declared fixed reason; free text never crosses](decisions/preparation-problems-are-attributed-and-reasoned.md) - A provider's error message crosses the binding wire only when byte-equal to a fixed reason it declares in its manifest; every preparation problem names slot, capability, origins and the operator's document key; a bare unattributed refusal from preparation is a kernel defect.
* [Kernel-composed instructions are executable surface and may assert only what every instance has](lessons/kernel-composed-text-is-executable-surface.md) - Instructions win over code because they are what the agent acts on; shared text states the invariant and defers the variable part, composed blocks are a set, and anything a capability supplies belongs in that capability's own injection.
* [A refusal that needs the old bytes is a pre-commit gate, never a post-hoc rollback](lessons/refusal-belongs-before-commit.md) - Any policy decision that would need the pre-operation state to recover must run inside the transaction while that state is still live; "do it, then undo it" is safe only when the undo is a pure inverse.
