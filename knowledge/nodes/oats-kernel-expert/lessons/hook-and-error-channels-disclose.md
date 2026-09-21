---
type: Lesson
title: Hook failures and error messages are output channels
description: Argument vectors remove injection, not disclosure; a credential-bearing command rebuilds its failure path without its arguments, a command that mints a secret needs output suppression, and success output is untrusted input.
tags: [kernel, hooks, security, secrets, capabilities, logging]
timestamp: 2026-07-27
---
# Lesson

Learned 2026-07-27 when a required spawn hook's failure text carried a
still-valid invite token into every operator log and the Desktop. Switching a
subprocess call from a shell string to an argument vector removes the
*injection* class and is worth doing — it does nothing about *disclosure*. A
subprocess failure carries its full argument list into its error, and a
required hook's fatal message is deliberately loud: it reaches every operator
log, the Desktop, and any human debugging the spawn, none of whom are
necessarily authorised to hold what the arguments held. Nor does an argument
vector prevent *option* injection: a value that crossed a trust boundary and
begins with a dash is still a flag to the program invoked.

**Any command whose arguments include a credential rebuilds its failure path
from scratch**: program, exit status, scrubbed diagnostics — never the
arguments. The caller is the only party that knows which argument was
sensitive, so the caller says so, and scrubs the tool's own echo of what it
rejected.

**Redaction is for secrets you know; suppression is for secrets you cannot
know.** Naming the secret works for the command that *spends* it. It cannot
work for the command that *mints* one: when creation fails after the fresh
secret was already printed, the caller has no value to scrub because the value
is precisely what it never received — and a structured-parse error quotes its
input, which *is* the credential. Credential-minting commands therefore run in
a mode that discards the child's output entirely, with status plus fixed
context as the whole diagnosis.

**The success path is a channel too.** Hardening every failure path still left
a token printable on a clean exit, because a reply field was copied straight
into the instance's durable metadata and briefing. Treat a command's output as
untrusted input, not as data already owned: validate each field as a plausible
value of its own kind, reject anything carrying a secret you hold, and fall
back to the value *you* requested — which you always know, because you asked
for it. That last point makes the check free of judgement calls.

Whatever a failing operation held, its exception holds too. Kernel↔capability
hook contracts inherit this: the kernel prints and stores hook failures by
design, so the disclosure discipline belongs on the capability side of the
boundary, and the kernel must not assume hook output is safe to persist.

# Related

[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md);
[A fail-closed guarantee is proven by its first real user](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md).

# Citations

1. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/execfile-error-secret-disclosure.md` (2026-07-27); SHA-256 `5b81ec03a873489c9b8b5fdce4773586b341c52331e5e71ad711b8b50d26c7c5`.
2. OATS rationale source `agents/cli-dev/soul/knowledge/lessons/public-refs-are-option-injection-vectors.md` (2026-07-28), option-injection sentence only; SHA-256 `fd161c4df5e551eeaaa9635100cc2528cb221fc725773a0c14c08e5ed672fbf3`.
