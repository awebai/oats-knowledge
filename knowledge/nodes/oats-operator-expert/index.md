# oats-operator-expert

Deployment operator expertise: the judgement behind onboarding a first-time
adopter, realising a workspace on a machine, rebuilding and cutting over
between kernel generations, laying a deployment out across machines, and
keeping it honest — where each fact and each piece of custody belongs, what
the installed providers actually do, and how to verify without authoring
state. Procedures live in the `oats.setup` skills and the repository docs;
this node holds why they are sequenced as they are and what goes wrong
otherwise. It also holds the adoption judgement of the former oats-assistant
node.

## Start here

* [Place each fact at the scope that owns it](lessons/place-each-fact-at-the-scope-that-owns-it.md) - Shared declarations, host facts or spawn: choose by how many holders the fact may have, meaning over type.
* [A kernel cutover is sequenced per deployment](playbooks/cutover-is-sequenced-per-deployment.md) - Retire under the kernel that made the homes, rebuild on fresh provider state, hold the previous kernel until the last deployment has moved.
* [A resident's custody is a host fact](decisions/resident-custody-is-a-host-fact.md) - One custody host per resident, declared locally, with custody services co-located and failing closed.
* [The installed provider is the authority for a setting](lessons/the-installed-provider-is-the-authority-for-a-setting.md) - The preview proves delivery, not effect; configure against what the locked provider reads.
* [Tracker integrations are partial surfaces](lessons/tracker-integrations-are-partial-surfaces.md) - Set an adopter's expectations about a tasks integration before promising a workflow.

## Sections

* [Decisions](decisions/index.md) - Operator positions on custody layout and workspace hosting.
* [Lessons](lessons/index.md) - Placement, identity, verification and adoption judgement.
* [Playbooks](playbooks/index.md) - Cutover and rebuild sequencing.

## Read alongside

* [Second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md) - how a rebuild or a published definition is accepted by an operator without authoring state.
* [oats-kernel-expert](/nodes/oats-kernel-expert/index.md) - the contracts an operator's configuration must respect.
