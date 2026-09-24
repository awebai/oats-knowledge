---
type: Reference
title: The kernel's provider readiness check wire (OATS 0.26.0)
description: What the kernel sends a bound provider's binding check on the workspace model, the exact answer it decodes, the four statuses and how they are relayed, and the rules a provider's check must follow to be read as pass or fail rather than unknown.
tags: [reference, integrations, readiness, providers, wire, kernel]
timestamp: 2026-09-24
---

The kernel's readiness view on the workspace model (OATS 0.26.0) carries a
`providers` check: for every provider bound to the subject it runs that
provider's manifest `binding.check` and relays the answer verbatim. The
messaging integration's release 1.13.0 is the first provider that implements
it. This is the contract as shipped; a provider that departs from it is
reported as unknown, never as ready.

# What the kernel runs

- The manifest's `binding.check` command, as `node <module>/<script> <args>`,
  with the working directory set to the module's directory in the verified
  module store.
- Per-check timeout: the smaller of 30 seconds and what remains of a 60
  second budget for all providers of one subject; on timeout the process is
  killed with SIGKILL and the item is unknown. Once the budget is spent,
  remaining checks are not run and report `time-budget-exhausted`.

# What the provider receives

stdin, one JSON line:

```json
{"schemaVersion": 1, "phase": "check", "slot": "<layer>", "capability": "<id>",
 "settings": {"...": "the merged provider payload"},
 "input": {"context": {"kind": "workspace", "workspace": "<workspace key>",
                       "deployment": "<absolute deployment dir>", "soul": "<soul name>",
                       "team": "<team label or null>", "instance": "<name or null>",
                       "home": "<absolute home or null>"},
           "action": {"kind": "readiness"}}}
```

- A **soul subject** has `instance` and `home` null: the question is whether a
  spawn of that soul would be configured. A **home subject** has both set:
  the spawned identity exists.
- `team` is the soul's team label and is null for a soul without one. It is
  a label, not a team id; the provider resolves the id from its own settings
  and the team environment below.
- No captured binding is present in this shape. A provider that also serves
  the captured (pre-workspace) wire keeps that path unchanged and branches on
  `input.context.kind === "workspace"` with no `input.binding`.

Environment: every ambient `OATS_`, `OAS_` and `PI_` variable is stripped,
then the kernel sets `OATS_TEAM_SCOPE`, `OATS_TEAM_ID`, `OATS_TEAM_LABEL`,
`OATS_WORKSPACE_NAME`, `OATS_WORKSPACE_KEY`, `OATS_CAPABILITY`,
`OATS_SETTINGS` (the same payload), `OATS_CLI_BIN`, `OATS_WORKSPACE` (the
deployment directory), `OATS_AGENT`, `OATS_SOUL` when the soul directory is
known, and `OATS_INSTANCE` plus `OATS_INSTANCE_HOME` for a home subject.

# What the kernel decodes

The answer is the **only** JSON document on stdout, with exit status 0:

```json
{"schemaVersion": 1, "phase": "check", "slot": "<layer>", "capability": "<id>",
 "ok": true,
 "result": {"status": "ready",
            "problems": [{"code": "<code>", "message": "<sentence>"}],
            "warnings": [{"code": "<code>", "message": "<sentence>"}]}}
```

- The envelope keys are exact and `schemaVersion`, `phase`, `slot` and
  `capability` must echo the request. A second document, trailing bytes,
  prose on stdout, or a non-zero exit make the item unknown.
- `result` holds only `status`, `problems` and `warnings`. `status` is one of
  `ready` (relayed as pass), `needs-configuration` (fail),
  `authorization-required` (fail; reserved for a step the human must
  perform, such as a login), `unavailable` (unknown).
- `ready` with a non-empty `problems` list is refused as malformed.
- `warnings` is optional; absent means `[]`; each entry is validated as
  strictly as a problem; a warning never changes the status, so ready with
  warnings is still pass.
- `{"ok": false, "error": {"code": "...", "message": "..."}}` is relayed as
  unknown with that code and message.
- Problem codes are free strings; the kernel does not check them against the
  manifest's `binding.reasons`, which are prose for the captured wire.

# Rules for a provider's check

- **Read-only.** The check never writes, mints, starts, stops or deregisters
  anything, and never touches an instance's credential home. It answers from
  the merged settings plus host facts it can read (a directory, a config
  file, a local status probe).
- **Answer what the spawn hook would do.** The root and team resolution, and
  every remedy sentence, come from the same rule the spawn hook uses; a
  readiness verdict that disagrees with spawn sends the operator to the wrong
  fix (see
  [integration guidance names only verbs the target CLI exposes](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md)).
- **Stay inside the timeout.** Any external probe the check makes gets its
  own cap well under 30 seconds, so a hung tool yields a typed problem rather
  than a killed process.
- **Nullable means nullable.** Validate `team`, `instance` and `home` as
  string-or-null; a validator that refuses null turns the common single-team
  setup into unknown (see
  [review a validator against every nullable field the wire spec names](/nodes/oats-expert/lessons/review-a-validator-against-every-nullable-field-the-wire-spec-names.md)).
- **Nothing else on stdout.** Diagnostics go to stderr; the JSON line is the
  whole of stdout.
