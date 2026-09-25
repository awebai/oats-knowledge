---
type: Decision
title: The messaging integration's readiness reports the host wake daemon's version against the grant floor
description: Proposed for the integration's next minor release: because the host wake daemon is a long-running process whose version the PATH floor gate cannot see, readiness asks the daemon for its version through its status command and reports a wake-daemon-outdated problem, or a version-unknown warning while the status answer carries no version field; no process inspection.
tags: [decision, integrations, messaging, wake, readiness, grants, versioning]
timestamp: 2026-09-25
---

Status: proposed 2026-09-25 by the integrations lane, agreed in direction by
the framework lead (target: the integration's next minor release, not a patch
before the kernel tag). The exact field name waits on the messaging service.

# Context

The hosted grant rehearsal registered a grant identity home with the host's
wake daemon and never woke. The daemon's own log showed why: it never opened
an event stream for the home, reporting the grant layout as an uninitialized
directory on every retry. The daemon was an older client binary that a
service manager had started weeks earlier, before session grants existed;
the newer client on PATH, which the launch hook used to pass the release
floor, to mint the grant and to send through it, read the same home without
complaint. See
[a missing wake is diagnosed from the broker daemon's own log](/nodes/integrations-expert/lessons/a-missing-wake-is-diagnosed-from-the-broker-daemons-own-log.md).

The integration's floor gate checks the client on PATH. Nothing checks the
daemon, and its status command reports the daemon's pid but not its version.
An operator who upgrades the client and never restarts the daemon gets grant
homes that send, receive and decrypt but never wake, with no readiness
signal.

# Options

1. **Resolve the daemon's executable from its pid and run its version
   command.** Exact today, but platform-specific and fragile: the pid may
   belong to a service-manager wrapper, a runtime shim or a symlinked
   package cache, and each of those answers a different question.
2. **Ask the messaging service for a version (or minimum-features) field in
   the daemon's status answer, and have readiness compare it with the grant
   floor.** Exact, portable, and owned by the party that knows what the
   daemon can do. Costs a service release before the check can be exact.
3. **Do nothing; document the restart as an upgrade step.** Cheapest, and the
   kernel release notes carry the step; but the failure stays silent for
   every operator who misses the note.

# Decision

Option 2, with option 3's upgrade step in the meantime and an interim
warning:

- Readiness, when session grants are in use, reads the daemon's status
  answer. With a version field present it compares against the grant floor
  and reports a problem, `wake-daemon-outdated`, naming the running and
  required versions and the restart as the remedy.
- Until the field exists, the same check reports a warning, not a problem,
  `wake-daemon-version-unknown`, when the daemon is running and grants are in
  use. Whether to narrow that warning to daemons started before the PATH
  client was installed is weighed at implementation: it needs the daemon's
  start time and the client's install time, both platform-dependent, so the
  default is the plain warning.
- No process inspection: the check never resolves the pid's executable.
- The request to the service names both the field and the semantics it
  needs: the daemon's client version, or the minimum client version whose
  identity layouts it can stream.

# Consequences

- The release notes of the kernel's next major and of the integration's
  release carry the upgrade step: after upgrading the client, restart the
  host wake daemon.
- A grant rehearsal's wake leg records the daemon's pid, binary, version and
  start time, and is rerun after a daemon restart before any positive wake
  claim is written down.

# Update (2026-09-25, later the same day)

The messaging service inspected its released sources and ran an isolated
broker regression: **no published client release up to that date opened
event streams for grant homes at all**; the daemon's stream opener bypassed
the grant-aware selection path, so a daemon upgrade alone would not have
fixed the rehearsal's miss. The fix is on the service's main and a release
carrying it is planned, not published. Until it is published the upgrade
step names no version, and no positive wake claim is written.

The service's proposed status contract, pending its review, matches option
2: `daemon_version` and `daemon_commit`, omitted when absent, and
`daemon_version_state` with the values `reported`, `unknown` and
`not_running`. Readiness compares the floor only for `reported`; `unknown`
is the interim warning above (compatibility unproven, not a claim about any
specific old version, with the supported upgrade and restart as the
advice); `not_running` is its own problem when grants are in use. The wake
floor becomes a second exported constant beside the custody floor, set only
when the service publishes the release.

