---
type: Decision
title: Harnesses launch natively; OATS contributes the resolved home but claims exclusive visibility for none
description: OATS builds the complete resolved instance home for every harness and records what it supplied, but since 2026-09-23 claims exclusive visibility for no harness: Claude Code, Codex and Pi keep native context, discovery, settings and permission behaviour, with bypass flags added solely on an explicit user opt-in.
tags: [kernel, runtime, harnesses, claude-code, codex, pi, curriculum, permissions, supersession, workspace-model]
timestamp: 2026-09-23
---
# Rationale

Accepted by the human 2026-09-18, on the redesign lead's proposal. This
**narrows the 2026-07-26 strict-curriculum decision**, which had set an
exclusive OATS-only visible context as the universal target for every harness.
That target was achievable in Pi through its selected strict profile, and only
approximated elsewhere through setting-source exclusion and ancestor-file
suppression that were fragile, version-bound and hostile to the harness's own
users (see the [isolation facts](/nodes/oats-kernel-expert/references/claude-code-isolation-facts.md)).

**Claude Code and Codex are launched normally.** Their native context and skill
discovery, settings, plugins, profiles, tools and authentication behaviour are
preserved. Additional native context inside those harnesses is expected, not a
failed isolation check.

**OATS still builds the complete resolved instance home.** Native launch does
not mean an empty or minimal home, omitted capabilities or skipped
resolution, approval or hooks. Selected skills, capabilities and their
resources, composed instructions (canonical instructions plus the harness
alias), task, metadata, work placement and lifecycle wiring are all supplied
through the ordinary instance files and briefing. The human explicitly
reaffirmed this. OATS records and validates the composition it supplied; that
is provenance of the OATS-managed subset, not a claim that everything visible
inside the harness came from OATS.

**Permission bypass is explicit opt-in.** With no user opt-in, native
permission, approval, sandbox and trust behaviour stays in force; OATS never
adds the harnesses' skip-permissions or "yolo" modes, equivalent
sandbox-disabling options or automatic trust overrides on its own. An explicit
launch choice or user-configured opt-in may request the existing bypass
behaviour. An unattended or background launch is not consent; a missing setting
is not "true"; an explicit false is preserved. Selecting ordinary launch is not
permission to rewrite existing user configuration or frozen execution records.
Omitting bypass flags leaves native user settings in force and repairs nothing
— the [native authentication boundary](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
applies to every harness.

# Rejected

- Suppressing native discovery, replacing HOME or profile directories, or
  building a Pi-like isolation adapter for Claude Code or Codex merely to
  obtain exclusivity.
- Making Pi installed or selected a prerequisite for launching the other
  harnesses.

# Consequences

- Pi's selected strict profile is unchanged; strict resource loading is scoped
  to the Pi adapter.
- The universal claim is about OATS-managed composition: *OATS supplies the
  instructions and skills selected for each role and its active capabilities;
  native visibility follows the chosen harness's policy* (positioning
  amendment, 2026-09-18). Never advertise OATS-only visible context for every
  harness. "No skill noise" describes the OATS-managed selection universally
  and exclusive visibility only where a profile enforces it.
- Adapter tests verify the policy selected for *that* runtime, not Pi's policy
  on all. Unit or scaffold-only checks do not claim live model or complete
  captured-harvesting parity across runtimes; a Pi-first implementation slice
  is not Claude Code or Codex qualification.
- Canonical composition, source integrity, captured runtime and model
  selection, helper edges, execution admission and history custody keep their
  existing contracts. Native coexistence does not authorise a current-config
  fallback, another model, secret handling or implicit runtime-package
  installation.

# Amendment 2026-09-23: native launch extends to Pi

Workspace model v2 (accepted by the human 2026-09-23, decision 22) extends
this decision to Pi and to skills. OATS is a skill contributor, not a skill
sandbox. Every launch the new kernel performs, for module homes and
previous-line homes alike, works the same way; there is no per-home posture
switch:
- The harness starts in the instance home with its own discovery intact.
- Composed skills are copied into the home's skills directory.
- Composed instructions are appended.
- Model and provider pins stay.

Ambient-skill exclusion at launch is removed. The consequence above that
"Pi's selected strict profile is unchanged" is **superseded**, and no harness
now carries an exclusive-visibility claim. Within the composed set, a
duplicate skill name is a spawn error that names both capabilities. Between
a composed skill and an ambient one, the harness's own precedence decides,
and the spawn preview lists composed names so a clash is visible.

The retired Pi route was also less tight than it looked (Pi 0.80.10,
verified 2026-07-27). Skills contributed by an extension's resource-discovery
hook survive a no-skills flag, so real exclusivity also required disabling
extensions. That removed the extension that wakes a Pi session on incoming
mail. Do not rebuild exclusivity as a kernel invariant. A profile that wants
it is a harness or capability choice.

# Related

[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
[Harness authentication is native and user-managed](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md);
[Verified Claude Code launch and isolation facts](/nodes/oats-kernel-expert/references/claude-code-isolation-facts.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/claude-codex-native-launch.md` (accepted 2026-09-18).
2. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/strict-instance-curriculum.md` (2026-07-26, narrowed 2026-09-18).
3. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/provider-agnostic-specialization-and-curated-context.md`, "Runtime-scoped skill-curation claim" (2026-09-18).
4. Accepted decision [workspace model v2](/nodes/oats-expert/decisions/workspace-model-v2.md), decision 22 (2026-09-23), and framework `docs/design/2026-09-23-workspace-module-contracts.md`, "0.25.1 fix round" L7.
5. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/pi-strict-launch-requires-no-extensions.md` and `pi-strict-launch-blocked-on-runtime-extensions.md` (2026-07-27), extension-discovery fact only.
