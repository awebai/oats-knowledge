---
type: Lesson
title: The CLI as a machine boundary
description: Once a command has machine consumers, one stdout envelope with stable codes is the whole contract, exit status is part of the answer, explanatory surfaces must not depend on deployment state, and a printed remedy is behaviour under test.
tags: [kernel, cli, contract, json, diagnostics, exit-status]
timestamp: 2026-09-22
---
# Lesson

Consolidated from CLI-contract reviews of 2026-07-24 → 2026-09-05 (cli-dev
lessons, accepted by the kernel maintainer); elimination routes added
2026-09-22. The
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
help through capability dispatch meant a single unreadable ancestor lock made
help itself fail, invisibly in isolated fixtures and only on a real machine
whose home scope carried a superseded shape.

**A diagnostic that names a remedy is behaviour contract.** The refused
operation can be correct in every observable way while the sentence it prints
sends the operator into a loop, so the remedy text is under test like any
other behaviour and any "run X to fix this" is proven by running X. Remedies
also outlive the code that wrote them: a hint stored in a file keeps invoking
the old command shape after a new refusal narrows what that command accepts,
and the refusal's own tests cannot see stored strings — the review checks
every persisted remedy when a command's acceptance narrows.

**Identity keys are diagnostic vocabulary.** Every field that participates in
a comparison must be nameable by the refusals that use it and must protect
something; otherwise the message names the same target on both sides and the
key splits one operator-visible thing in two.

# Related

[A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md).

# Citations

1. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/json-mode-cli-contract.md` (2026-07-24; SHA-256 `7517c0a7d71c4adb03cb7281e926025cb76a37424297eaca01f86d0a6073113a`) and `json-envelope-dispatch-boundary.md` (2026-07-26; SHA-256 `611060550c9af22aed4aea4d44b86991450df81114a58ccb8c992ebc56db0709`).
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/usage-must-not-resolve-deployment-state.md` (2026-07-29); SHA-256 `29783f6ba56bbbef4530f1be5248778d01047cdee4100f179d374058e5e7fcea`.
3. OATS rationale sources `agents/cli-dev/soul/knowledge/lessons/dry-run-exit-status-contract.md` (2026-07-28), `diagnostic-remedies-are-contracts.md` (2026-07-29), `retry-hint-sites-travel-in-packs.md` and `identity-key-fields-shape-the-diagnostic.md` (2026-09-05), `reconciliation-truthfulness-fixes.md` (2026-07-26), `runtime-contract-not-resolution-internals.md` (2026-07-27), principle only.
