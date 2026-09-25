---
type: Lesson
title: Manifest operation keys are unqualified names; the kernel adds the layer to form the address
description: A capability manifest keys its operations by local name (teams, join, leave) and the kernel forms the address as <layer>:<name>; a key that already carries the layer fails schema validation, answers E_OPERATION_UNKNOWN at the qualified address and reads as unsupported to a GUI that matches on the bare name, so keep manifest keys bare and keep the vendored schema's key pattern aligned with the kernel's rather than loosening it.
tags: [integrations, manifests, operations, capabilities, schema]
timestamp: 2026-09-25
---

**Observed.** The first cut of the teams verbs declared the home operations
as `messaging:teams`, `messaging:join`, `messaging:leave`. The manifest
schema's key pattern refused them, the kernel could not find them at the
address it formed, and the GUI, which looks for `op.name === "teams"`,
showed the operations as unsupported.

**Rules.**
- Key operations by their local name; the layer comes from the manifest's
  own layer field and the kernel composes `<layer>:<name>`.
- Documentation names both forms deliberately: the key in the manifest,
  the address in the CLI and the GUI.
- Keep the schema guard on operation keys (`^[a-z][a-z0-9-]*$`) identical to
  the kernel's and never loosen a vendored schema to accept a key that
  smuggles the layer in.
