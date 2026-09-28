---
type: Lesson
title: A CLI decision made in two layers, or copied per command, drifts
description: When dispatch, help, routing or flag parsing decide the same thing in two places or by naming commands, the copy that is narrower or older wins silently; route coarsely, refuse precisely, pin mirrors with a test and make fallbacks structural.
tags: [kernel, cli, dispatch, guards, flags, servers, review]
timestamp: 2026-09-06
---
# Lesson

Learned in CLI reviews of 2026-07-24 → 2026-09-06. The CLI decides routing,
help, remote targets and flag values in more than one layer, and each time a
decision was written twice, or once per command, the copies disagreed without
any test noticing.

**One predicate, one layer.** An outer dispatch allowlist and the handler's
refusal once tested the same predicate: `okf … --server` was routed only for
`harvest`, so the handler's "harvest only" refusal was unreachable and every
other `okf` subcommand with `--server` fell through and ran *locally*, with the
flag handed to the capability as a stray argument. Whichever copy is narrower
wins; the other is dead or fails open. Route on the coarse namespace and
refuse precisely in the handler, where the diagnostic can be written well. The
check: for each shape a guard rejects, ask what the CLI does if the guard is
deleted; "runs something else silently" means the guard sits in the wrong
layer.

**A hand-copied mirror needs a pin.** The set that stops `--help` from
executing a builtin is a hand-maintained copy of the dispatch chain, and no
test ties the two. A new command added to the chain but not to the set gets
the side-effecting `--help` back, invisibly at the call site. Both sides are
literals in one file, so a set-equality test is cheap; until it exists, review
every new dispatch branch for its entry.

**A preamble that branches per command strands the next route.** "Consult the
saved route before the registry" is structural for session routes (the
snapshot short-circuits the registry lookup) but was written for command
routes by naming the commands that get it. A new route whose own branch was
correct still failed on exactly the removed-registration case the module
exists to survive, because the registry lookup above it had already thrown.
For any function whose preamble branches on the command, enumerate the
commands and ask which preamble each new one inherits; the fix is the
unconditional structural form, not another name in the list.

**A value flag's boolean fallback travels.** The shared flag reader returns
`true` when the next token is another flag, so `--task --purpose x` once
carried a boolean into spawn and crashed after the home was created, leaving
a half-scaffolded instance. Every value-carrying flag reads through a helper
that refuses a missing value, and the kernel type-checks what it receives
before any side effect.

# Related

[The CLI as a machine boundary](machine-boundary-contract.md);
[A refusal that needs the old bytes is a pre-commit gate](refusal-belongs-before-commit.md);
[Identity and location belong to the resolved object](resolved-object-not-referring-string.md).

# Current contracts

- [Current servers.md](https://github.com/awebai/oats/blob/main/docs/servers.md)
- [Current oats.mjs](https://github.com/awebai/oats/blob/main/bin/oats.mjs)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge/lessons/dispatch-allowlist-strands-its-own-guard.md, help-allowlist-mirrors-the-dispatch-chain.md, snapshot-before-registry-is-per-command.md and task-flag-boolean-crash.md @ 7838d3ca.
