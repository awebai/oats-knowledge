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

**Seeding in progress (Phase D slice 1).** First concepts come from the
2026-09-23/24 provider review rounds (attributed) and from the
integrations-expert legacy bundle's harvested lessons.

