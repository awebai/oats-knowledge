# Decisions

Accepted operator positions — where custody and the workspace definition live — with rationale and rejected alternatives.

* [A resident's custody is a host fact: one custody host per resident, one custody per resident across teams, custody services co-located and fail-closed](resident-custody-is-a-host-fact.md) - Multi-machine custody layout for grant-served residents: assign residents to hosts first, one custody directory per resident regardless of teams, custody services live and die with the spawn host, and host loss means unavailable — never stale, never served elsewhere.
* [If any workspace member is private, host the workspace definition in a dedicated private repository that is not itself a public member](private-member-requires-a-private-workspace-host.md) - The definition enumerates every member, so its host is a disclosure decision; mixed public/private membership needs a dedicated private host, chosen before the first sync.
