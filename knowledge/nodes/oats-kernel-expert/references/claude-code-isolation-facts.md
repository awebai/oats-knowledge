---
type: Reference
title: Verified Claude Code launch and isolation facts
description: Version-bound third-party facts (Claude Code 2.1.220, verified 2026-07-27) that informed the 2026-07 strict Claude launch; that launch policy was superseded for Claude Code and Codex by the 2026-09-18 native-launch decision, and only the authentication fact still grounds a live decision.
tags: [claude-code, runtime, isolation, skills, auth, third-party, version-bound, superseded]
timestamp: 2026-09-18
---
# Scope and currency

**Superseded use.** These facts informed the founder's 2026-07-27
setting-source-exclusion launch for Claude Code — the strict-curriculum
target of 2026-07-26 applied to that harness. On **2026-09-18 the human
superseded that launch policy for Claude Code and Codex**: both now
[launch natively with opt-in bypass only](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md),
and exclusive OATS-only visibility is claimed for no harness since 2026-09-23. Nothing below
describes how the Claude launch is shaped today, and none of it is a reason to
rebuild an isolation adapter: per-instance config homes, setting-source
exclusion and a session-only plugin route were *all* options of the strict
route, and the strict route itself was the thing retired.

The Reference is kept for two reasons only. The authentication fact is the
evidence behind the live [native authentication boundary](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
(2026-09-18). The rest records *why the strict route was fragile* — auth bound
to the config home, no fail-closed project-source exclusion, no control over
ancestor skills, plugin namespacing that broke literal skill references — so
the rejection is defensible without re-running the 2026-07 probes.

Verified 2026-07-27 against **Claude Code 2.1.220** with canaries at user,
project and ancestor skill directories, project and ancestor instruction files,
and several installed plugins, using the runtime's own debug output as the
oracle — never the model's self-report. **Version-bound: re-verify before
relying on any item**, and record the version you verified against.

# Facts (Claude Code 2.1.220, 2026-07-27)

- **Authentication state is bound to the config directory.** An isolated
  per-instance config home therefore forces copying credentials into the
  instance. This is the fact the native-authentication boundary rests on.
- **Setting-source exclusion removes user, project and ancestor skills, plugins
  and both instruction files while keeping authentication**, built-in tools, an
  explicitly supplied settings file and explicitly selected plugin directories.
  Restoring only the project source re-admits *ancestor* skills and instruction
  files — it is not fail-closed. Excluded ancestor settings files are still
  watched though not loaded.
- **The bare mode silently changes the auth model** to API-key-only. The safe
  mode isolates equivalently but also removes plugins.
- **There is no extra-skills-directory flag**; an exact composed skill set can
  only be presented as a session-only plugin, and plugin skills are namespaced
  `plugin:skill`, which breaks literal `/skill-name` references in instructions.
- **A system-prompt-file flag exists but is absent from help output.** Probe
  such flags by invocation, not by help-string match.
- **Project skill discovery is bounded at the repository root**, not the home
  or filesystem root, and **no supported control restricts ancestor project
  skills**, although ancestor instruction files can be excluded through a
  supported setting. Same-named precedence is enterprise > personal > project,
  any of which overrides a bundled skill.
- **Upstream resolves local settings through worktrees to the main checkout**,
  independently confirming OATS's choice of the canonical checkout as the
  identity anchor.

# Founder ruling, 2026-07-27 (historical; part of the superseded strict route)

Under the strict route, loading a repository's root project skills was
accepted when no clean workaround existed, recorded in instance provenance so
the deviation was auditable rather than silent, and a spawn was never rejected
in a repository that legitimately carried such files — that would have been a
mainstream-compatibility failure, not isolation. The 2026-09-18 decision makes
this moot for Claude Code and Codex: native context inside those harnesses is
expected, not a deviation to record. The mainstream-compatibility principle
itself survives in that decision.

# Related

[Keep kernel responsibilities generic and capability runtimes complete](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
[Strict curriculum is a Pi-profile claim](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md);
[Identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/claude-strict-launch-setting-sources.md` (2026-07-27); SHA-256 `31d76cf01e77b0e58f8275ee168c7422d184cda727e584576c4c25871afe690c`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/references/claude-project-skill-discovery-root-bound.md` (2026-07-27); SHA-256 `1b524e44ee6b3a7c44efc82615426e63fb87c9782265042aab3d09274c1ab0f7`.
