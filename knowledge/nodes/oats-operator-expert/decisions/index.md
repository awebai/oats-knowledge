# Decisions

Operator decisions on onboarding acceptance, custody, workspace hosting, unattended credentials and disposable trials, with rationale and rejected alternatives.

* [Onboarding passes on the newcomer's experience](onboarding-passes-on-the-newcomers-experience.md) - Judge onboarding through the newcomer's real entry path and plain-language experience, with agents doing permitted routine commands; passing command predicates alone is insufficient.

* [Disposable trials prefer local messaging over throwaway hosted accounts](disposable-trials-prefer-local-messaging.md) - Prefer a local rootless messaging stack when teardown must remove trial service state, reserving hosted trials for explicitly needed hosted-build behavior.

* [Host Git credentials must work for unattended agents](host-git-credentials-must-work-unattended.md) - Design the host account's shared Git credentials for unattended use, explicitly accepting the key-protection trade-off while minimizing token authority and preserving the person's sign-off responsibility.
* [A resident's custody is a host fact](resident-custody-is-a-host-fact.md) - One custody host per resident, declared in that host's local file, shared across teams, with custody services co-located and failing closed.
* [If any workspace member is private, host the workspace definition in a dedicated private repository](private-member-requires-a-private-workspace-host.md) - The definition names every member, so its host is a disclosure decision made before the first sync.
