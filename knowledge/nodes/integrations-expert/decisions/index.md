# Decisions

Accepted positions on how integrations are packaged and how the messaging provider behaves.

* [Official package repositories separate the payload root from tooling](official-package-repositories-separate-the-payload-root-from-tooling.md) - One hashed payload root per repository, tooling and the expert's soul outside it, and every manifest resource resolved inside it.
* [The messaging integration's readiness reports the host wake daemon's version](the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md) - Readiness reads the daemon's own status answer against the client floor, with no process inspection; a missing wake is diagnosed from the daemon's log.
* [A workspace has a default team; there is no personal team](a-workspace-has-a-default-team-there-is-no-personal-team.md) - Instances live in the workspace's default team and join others explicitly; creating a team is the owner's act outside OATS.
* [Teams in the messaging provider: default team, explicit join and leave](teams-in-the-messaging-provider-default-team-explicit-join.md) - Soul labels make teams eligible, joins are explicit and idempotent, and each joined team is a further local identity revoked at retire.
* [Superseded — enrolling a workspace's team through a human login on the host](workspace-team-enrollment-by-human-login-superseded.md) - Superseded 2026-09-26 by the default-team decision; kept as the record of what was agreed and why it was withdrawn.
