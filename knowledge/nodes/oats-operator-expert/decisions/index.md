# Decisions

Accepted operator positions on where custody and the workspace definition live, with rationale and rejected alternatives.

* [A resident's custody is a host fact](resident-custody-is-a-host-fact.md) - One custody host per resident, declared in that host's local file, shared across teams, with custody services co-located and failing closed.
* [If any workspace member is private, host the workspace definition in a dedicated private repository](private-member-requires-a-private-workspace-host.md) - The definition names every member, so its host is a disclosure decision made before the first sync.
