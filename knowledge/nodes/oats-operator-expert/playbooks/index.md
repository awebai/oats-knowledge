# Playbooks

Operator sequencing judgement; the command procedures live in the `oats.setup` skills.

* [A kernel cutover is sequenced per deployment](cutover-is-sequenced-per-deployment.md) - Retire under the kernel that made the homes, rebuild on fresh provider state with the old state frozen, and hold the previous kernel until the last deployment has moved.
