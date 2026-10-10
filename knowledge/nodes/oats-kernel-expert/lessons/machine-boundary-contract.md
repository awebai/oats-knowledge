---
type: Lesson
title: The CLI as a machine boundary
description: Once a command has machine consumers, one stdout envelope with stable codes is the whole contract, exit status is part of the answer, explanatory surfaces must not depend on deployment state, a refusal names its cause on the first run, and a printed remedy is behaviour under test.
tags: [kernel, cli, contract, json, diagnostics, exit-status]
timestamp: 2026-09-22
---
# Lesson

Consolidated from CLI-contract reviews of 2026-07-24 → 2026-09-21. The
process boundary decision makes the CLI the only surface independent
consumers (Desktop, capability packages, other runtimes) may depend on. That
choice carries obligations the code cannot state about itself.

**Exactly one stdout envelope per run, with stable published codes.** The
guarantee is void unless the machine-aware boundary wraps the *whole* path —
dispatcher setup, trust checks, exceptions thrown before the normal report,
child processes that never start, and children's own stdout. Error codes are
contract: consumers depend on them, not on wording. The obligation the code
cannot state is its *scope*: a leak found in one command's dispatcher exists
in every command built the same way, so the elimination route is a
stdout-capture test that runs every command's failure paths under the
machine-readable mode and asserts one parseable envelope — not a per-command
fix. Where that test does not yet cover a command, the maintainer treats the
guarantee as unproven for it.

**Exit status is part of the answer.** Any state that blocks apply blocks
preview with the same exit contract; only side effects differ, and the full
plan travels in the error details so a nonzero result loses nothing.
Automation reads exit codes, so a preview that exits clean on a held state
turns "planned" into "ready". Printing a failure is not failing, output
filtering is not side-effect control, and a locked entry is an obligation, not
a comment.

**Anything whose job is to explain the tool must work when the deployment is
broken.** Help, version and diagnostics either bypass deployment resolution
entirely or turn resolution failures into findings — the doctor model. Routing
help through capability dispatch meant a single unreadable lock in the old
scope chain made help itself fail, invisibly in isolated fixtures and only on
a real machine whose home scope carried a superseded shape.

**A diagnostic that names a remedy is behaviour contract.** The refused
operation can be correct in every observable way while the sentence it prints
sends the operator into a loop, so the remedy text is under test like any
other behaviour and any "run X to fix this" is proven by running X. Remedies
also outlive the code that wrote them: a hint stored in a file keeps invoking
the old command shape after a new refusal narrows what that command accepts,
and the refusal's own tests cannot see stored strings — the review checks
every persisted remedy when a command's acceptance narrows.

**A refusal says what, not only where; one run instead of six.** On the
2026-09-21 second-operator gate three failures with three causes rendered as
one kernel template with the slot swapped: the operator saw *where* (slot,
capability, document key) but not *what*, and needed several runs plus the
adapter's source to learn a cause the provider had already made safe to
print. The acceptance criterion for any refusal path is that the operator
learns the cause on the first run. Every problem carries its attribution
(slot, capability, origin, the operator's document key) and a reason distinct
per cause; a bare unattributed refusal after selection is a kernel defect.
Free text from executable code still never becomes kernel prose: the kernel
relays a provider's answer as the provider's, marked as such (readiness
items), and invents none. A provider may declare its fixed refusal sentences
in its manifest (`binding.reasons`, bounded and validated); the kernel
matches nothing against them today.

**Identity keys are diagnostic vocabulary.** Every field that participates in
a comparison must be nameable by the refusals that use it and must protect
something; otherwise the message names the same target on both sides and the
key splits one operator-visible thing in two.

**A new mode is advertised before a consumer may call it** (2026-09-22). A
consumer talks to whatever CLI is installed, and an older CLI that ignores an
unknown flag runs the old command: `retire --plan` on it simply retires.
"Try it and see" is not detection for anything with side effects. So the
producer ships every new command or mode with a positive advertisement in
`oats version --json` (a `features[]` name, plus an API integer for a typed
payload), and consumers gate on the name, never on a version string or on
the call having worked; a missing feature makes the view unavailable, not
degraded to the old command. A destructive apply also carries the plan it was
shown: the kernel revalidates the plan revision (`E_PLAN_STALE`, fresh plan
attached, nothing done) and an idempotency key replays the recorded outcome
on retry. The Desktop engineer refused to wire removal until both existed;
shipping the semantics without the advertisement and the revision is not
shipping a GUI-safe verb.

# Related

[Retire exclusion belongs to a whole-run claim, not a plan or retry key](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md)
separates exclusion from plan freshness and replay of an already recorded
outcome; neither existing guard serializes an in-flight retirement.

[The viewer detach key is caller-chosen and has its own exit status](/nodes/oats-kernel-expert/decisions/viewer-detach-key-is-caller-chosen.md)
records why opting into a keyboard exit preserves old status meanings and
requires host feature detection even for a printed attach command.

[A raw-mode terminal child does not protect its wrapper's whole lifetime](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
explains how a terminal signal during setup or teardown can bypass cleanup
and replace the command's semantic exit status.

[Retire plan notes are bounded summaries, not the full fact record](/nodes/oats-kernel-expert/decisions/retire-plan-notes-are-bounded-summaries.md)
records why a summary-size repair preserves full facts without silently
extending the plan's JSON shape.

[A minimal process boundary avoids permanent private coupling](../decisions/minimal-process-boundary.md);
[A refusal that needs the old bytes is a pre-commit gate](refusal-belongs-before-commit.md);
[Kernel supplies provider-neutral messaging inputs](../decisions/messaging-capability-owns-provider-behaviour.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current capabilities.md, readiness check](https://github.com/awebai/oats/blob/main/docs/capabilities.md#readiness-check-bindingcheck)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (json-mode-cli-contract, json-envelope-dispatch-boundary, usage-must-not-resolve-deployment-state, dry-run-exit-status-contract, diagnostic-remedies-are-contracts, retry-hint-sites-travel-in-packs, identity-key-fields-shape-the-diagnostic, provider-problem-reasons-cross-the-wire).
2. Migrated from agents/oats-expert/soul/knowledge/lessons/consumers-gate-on-advertised-features-never-on-optimistic-invocation.md @ 7838d3ca.
