# oats-kernel-expert

Kernel-to-capability contract rationale: why the kernel is shaped as it is,
what was decided and rejected, and what was discovered the hard way. Formal
contracts stay in the repository's docs and schemas; this node explains the
judgement behind them.

## Sections

* [Decisions](decisions/index.md) - Accepted kernel contracts with their rationale, rejected alternatives and explicit supersessions.
* [Lessons](lessons/index.md) - Hard-won constraints on transactions, containment, composition, hooks and the CLI boundary.

## Start here

* [Keep kernel responsibilities generic and capability runtimes complete](decisions/kernel-and-capability-responsibility.md) - The kernel resolves, copies and runs the lifecycle; capabilities own concrete behaviour.
* [Soul declares identity and where its capabilities come from; the workspace versions; the host supplies facts](decisions/soul-declares-kind-config-assigns-policy.md) - Where each fact lives under the workspace model, and what the removed cascade taught.
* [Integrity, origin and consent are different proofs](decisions/trust-approval-and-consent-boundaries.md) - Membership and declaration are trust; the lock is reproducibility; host installs need consent.
* [Harnesses start natively; OATS contributes skills and instructions and sandboxes nothing](decisions/harness-native-launch.md) - Why the strict curriculum was retired and what OATS still guarantees.
* [Kernel-composed instructions are executable surface](lessons/kernel-composed-text-is-executable-surface.md) - Text composed for every instance may assert only what every instance has.
* [A refusal that needs the old bytes is a pre-commit gate](lessons/refusal-belongs-before-commit.md) - Decide while the pre-operation state is still live.
