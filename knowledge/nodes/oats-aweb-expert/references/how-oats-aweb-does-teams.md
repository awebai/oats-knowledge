---
type: Reference
title: How oats.aweb does teams (1.14.0)
description: The package facts of the first workspace-model-only release: eligible teams arrive through the environment only (the check stdin stays strict), every instance is minted into the personal team, wider teams are joined by an explicit spawn setting or the teams/join/leave verbs and home operations, each joined team is a further local identity beside the primary that sends with an identity-home selector and receives by polling, joined-team state lives in a provider-owned file mirrored through hook meta, a failed leave keeps the credential, an unmapped primary label falls back to the personal team with a warning, and readiness reports the teams and the host wake daemon's version.
tags: [oats.aweb, teams, readiness, provider-state, wake, identity]
timestamp: 2026-09-25
---

Facts of release 1.14.0, the first floored at kernel 0.26.0 (the classic
team-scope path is gone; an older kernel's environment is refused with one
fixed message in spawn, setup and the readiness check). The design it
implements is
[teams in the messaging provider](/nodes/integrations-expert/decisions/teams-in-the-messaging-provider-personal-by-default-explicit-join.md);
the custody attachment of resident grants is unchanged from
[the 1.13.1 attachment reference](/nodes/oats-aweb-expert/references/how-a-grant-home-is-attached-to-custody.md).

# Schema

1. **Teams reach the provider through the environment only**: `OATS_TEAMS`
   (the eligible teams, one entry per soul label with its mapped team id and
   payload), `OATS_TEAMS_SOURCE` (`live` or `recorded`) and
   `OATS_TEAM_LABELS`, in every hook, command and readiness check. The
   binding-check stdin decoder stays strict; the only new setting it accepts
   is `join`.
2. **Every instance is minted into the personal team**: `settings.oats.aweb.team`
   when the host or workspace sets it, else the root's active team (the
   person's default team, the stand-in until a per-workspace personal team
   exists). A soul's labels, the primary included, never choose the mint
   target: a mapped primary label is eligible like every other label. An
   unmapped primary label is not a refusal: spawn warns `team-unmapped` and
   readiness stays ready with the same warning.
3. **Wider teams are explicit**: the spawn setting `join` (comma-separated
   eligible labels, checked before anything is minted), and the commands
   `oats aweb teams`, `oats aweb join --labels …`, `oats aweb leave
   --labels …`, also declared as home operations keyed `teams`, `join`,
   `leave` (the kernel addresses them as `messaging:teams|join|leave`; kind
   action; one required arg `labels`). `eligible` lists every mapped label
   with its joined flag; `personal` is separate and never in `eligible`. A
   label outside the eligible set is `E_TEAM_NOT_ELIGIBLE`; leaving the
   personal team is `E_TEAM_PERSONAL`. Global (resident-grant) mode refuses
   `join`.
4. **One local identity per joined team**, minted like the primary (the
   root's local invite for that team, then the join in
   `<home>/.aweb-identity-<label>`). Sending as that team is the client's
   identity-home selector; receiving is by polling in this release
   (`receive: "poll"` on every joined entry), and the inject says so.
5. **Provider-owned state**: the joined-team list lives in
   `<home>/.oats-aweb/teams.json` (owner-only permissions); the commands
   write it, the launch and retire hooks read it beside the kernel-fed meta,
   and every hook output mirrors it in `meta`; the kernel's record is a
   copy, never the source.
6. **Lifecycle**: the launch hook leaves a joined team that is no longer
   eligible only when `OATS_TEAMS_SOURCE=live`, and warns `teams-unverified`
   otherwise; retire leaves every joined team, a retained seat's retire
   included; a leave whose remote
   self-delete fails keeps the identity home and the state entry and reports
   the failure, so the deletion can be retried.
7. **Readiness** answers a `teams` block (personal, primary, eligible with
   joined flags, joined with identity home and receive mode, unmapped) with
   a `joined-team-poll-only` warning per joined team, and, when delivery is
   `session`, the host wake daemon's state against `WAKE_STREAM_MIN`
   (1.36.5): `wake-daemon-outdated` and `wake-daemon-not-running` are
   problems, `wake-daemon-version-unknown` a warning.
