# Decisions

Positions and rationale on packaging, installer ownership, launcher input, checkpoint wakes and messaging-provider behavior; each concept states its acceptance limits.

* [An idle waiter's checkpoint wake belongs to the waiter](checkpoint-wake-belongs-to-the-waiter.md) - A waiter-owned kernel job supplies an external checkpoint without depending on harness timers or messaging, but does not prove a child stalled or guarantee timely delivery.

* [Installers start from existing tools and preserve their ownership](installers-preserve-existing-tools-and-state.md) - An OATS installer reuses suitable existing tools, installs only missing ones, upgrades only its own installs, and preserves identities and configuration for adoption rather than replacement.
* [A launcher's prompt is the person's session input, not agent mail](launcher-prompts-use-the-persons-session-input.md) - Deliver an explicitly entered launcher prompt through kernel session input rather than reclassifying it as agent mail, with no automatic retry and an attach path that preserves uncertainty.
* [Official package repositories separate the payload root from tooling](official-package-repositories-separate-the-payload-root-from-tooling.md) - One hashed payload root per repository, tooling and the expert's soul outside it, and every manifest resource resolved inside it.
* [The messaging integration's readiness reports the host wake daemon's version](the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md) - Readiness reads the daemon's own status answer against the client floor, with no process inspection; a missing wake is diagnosed from the daemon's log.
* [A workspace has a default team; there is no personal team](a-workspace-has-a-default-team-there-is-no-personal-team.md) - Instances live in the workspace's default team and join others explicitly; creating a team is the owner's act outside OATS.
* [Teams in the messaging provider: default team, explicit join and leave](teams-in-the-messaging-provider-default-team-explicit-join.md) - Soul labels make teams eligible, joins are explicit and idempotent, and each joined team is a further local identity revoked at retire.
* [Superseded — enrolling a workspace's team through a human login on the host](workspace-team-enrollment-by-human-login-superseded.md) - Superseded 2026-09-26 by the default-team decision; kept as the record of what was agreed and why it was withdrawn.
