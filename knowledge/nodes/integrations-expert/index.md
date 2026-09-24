# integrations-expert

Cross-package provider integration — how a capability is built WITH a user
against the kernel's contracts, and how it is proven: the capability manifest
and hook contracts as judgement (what a spawn/launch/retire hook may return
and why; why a hook never trusts the ambient environment), the live-rehearsal
discipline (a provider hook that drives an external CLI is accepted on a
rehearsal against the real binary, not on unit tests against a fake; what a
fake must model — refusals and output shape, not just success), compensation
reporting (report only what was confirmed), and the cross-project seams a
provider sits on. The six package experts own their package's FACTS and read
this node. Charter set by the 2026-09-24 roster amendment after the oats.aweb
1.12 review rounds showed this discipline was cross-package, hard-won, and
had no owner.

## Start here

* [A fake CLI that accepts what the real binary refuses hides a broken hook](lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md) - A provider hook that drives an external CLI is accepted on a rehearsal against the real binary; the fake must model refusals and output shape for the version it claims.
* [A lifecycle hook never trusts the ambient environment](lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md) - Hooks inherit the invoker's process, and the invoker can be another instance; inputs come from the payload, persisted meta or the instance home.
* [A hook reports only the cleanup it confirmed](lessons/a-hook-reports-only-the-cleanup-it-confirmed.md) - Emit meta before failing, claim only confirmed effects, re-check uncertain ones, keep compensation idempotent.
* [What a messaging provider must do to serve a resident through grants](references/what-a-messaging-provider-must-do-to-serve-a-resident-through-grants.md) - The layer contract and the acceptance list behind the served-identity decision.

## Sections

* [Lessons](lessons/index.md) - Hook and testing discipline learned building providers against the kernel's contracts.
* [Decisions](decisions/index.md) - Accepted positions on how integrations are packaged.
* [References](references/index.md) - Layer contracts a provider must satisfy.

