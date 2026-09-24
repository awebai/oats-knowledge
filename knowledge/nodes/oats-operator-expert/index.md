# oats-operator-expert

Deployment operator expertise — what it takes to set up, rebuild, migrate and
keep an OATS deployment honest across machines: the rationale behind
onboarding and the rebuild guide, migration judgement (what to keep, how to
stage, custody outside every work tree), multi-machine layout (per-host files,
resident identities, wake broker, custody service), cutover sequencing (which
instances retire before which step), and the outsider-verification method
(an independent operator holding none of the authoring state). Owned by the
soul users instantiate to set OATS up (formerly `oats-setup-expert`, which by
the 2026-09-21 decision owned nothing); charter set by the 2026-09-24 roster
amendment after the OSS coordinator's operating review showed this expertise
was real, universal, non-derivable from the repository — and unowned.

## Start here

* [Place each fact at the scope that owns it — organisation-wide in the workspace, host facts in the uncommitted local file, single-holder facts at spawn — and let meaning, not type, break ties](lessons/place-each-fact-at-the-scope-that-owns-it.md) - Three legal surfaces accept configuration facts; the docs say what each accepts, not which one a fact belongs to. Choose by blast radius: who else would this fact reach here?
* [Outsider verification of a rebuild](playbooks/outsider-verification-of-a-rebuild.md) - A rebuild guide is accepted only when an operator who did not write it reproduces the topology on a scratch rig against the published combination and verifies by positive enumeration through an ordered invariant list; anything less is a rehearsal.
* [A kernel cutover is sequenced per deployment, not per machine](playbooks/cutover-is-sequenced-per-deployment.md) - When two kernel generations share no files nothing forces the move; hold the previous kernel until the last deployment you care about is rebuilt, and decide per old home whether the new launcher may touch it.
* [A resident's custody is a host fact](decisions/resident-custody-is-a-host-fact.md) - Multi-machine custody layout for grant-served residents: assign residents to hosts first, one custody directory per resident regardless of teams, custody services live and die with the spawn host, and host loss means unavailable — never stale, never served elsewhere.
* [Configure against what the installed provider reads, not the grammar the kernel accepts or previews](lessons/the-installed-provider-is-the-authority-for-a-setting.md) - A setting takes effect only if the shipped provider's reader consumes it; the kernel's payload model and preview are a writer's view, so verify by provider behaviour, and keep declared per-team intent in the workspace file while obtaining the effect by placement.

## Sections

* [Decisions](decisions/index.md) - Accepted operator positions on custody layout and workspace hosting, with rationale and rejected alternatives.
* [Lessons](lessons/index.md) - Placement, identity and verification judgement learned operating deployments across machines.
* [Playbooks](playbooks/index.md) - Ordered operator procedures for rebuild, cutover and outsider acceptance.
