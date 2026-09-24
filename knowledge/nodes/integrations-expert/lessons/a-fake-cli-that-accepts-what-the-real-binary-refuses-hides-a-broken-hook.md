---
type: Lesson
title: A fake CLI that accepts what the real binary refuses hides a broken hook — a provider hook that drives an external CLI is accepted on a rehearsal, not on its unit tests
description: Unit tests with a fake command prove a hook against the fake's contract, not the tool's; the fake must model the real binary's refusals, resolution rules and output shape for the version it claims, and a hook that talks to an external CLI passes review only with a live-rehearsal record.
tags: [lesson, integrations, hooks, testing, fake-cli, rehearsal, acceptance]
timestamp: 2026-09-24
---

Learned 2026-09-23/24 across five review rounds of one messaging provider,
three of them opened by a live rehearsal on a real identity after every unit
suite was green. Owner of the standing rule: integrations-expert; the
maintainer's review protocol adopted the acceptance consequence the same day.

# Rule

1. **A fake models the real binary's refusals, not only its successes.** For
   the version it claims (state it in the test and in the PR), the fake
   rejects the flags and environment the real tool rejects, resolves inputs
   the way the real tool does (for example, from the working directory only),
   and prints output in the real shape (for example, a document indented
   across lines rather than one line). Every field a fake always populates is
   a branch the real tool can leave empty.
2. **A hook that drives an external CLI is accepted on a rehearsal against
   the real binary**, on a scratch deployment with a real (disposable)
   identity, before approval; the rehearsal record is part of the review, and
   the reviewer asks for it before reading the diff as evidence.
3. **When the rehearsal finds a refusal the fake accepted, fix the fake in the
   same round as the hook**, so the test models the contract that was just
   learned, and name the source of truth (the tool's policy file or
   documentation) in the test.

# Why

A green unit suite against a fake is a proof about the fake. In the rounds
that taught this, the fake accepted an explicit identity-home flag and an
environment variable that the real tool refuses for a whole command family;
it printed one-line JSON where the tool prints an indented document; and it
answered every revoke with success. The hook built on those assumptions was
correct against the tests and could not mint, parse or clean up against the
binary. None of it was visible until a spawn ran on a real identity.

The reviewer's general form of the defect is recorded in the maintainer's
protocol
([a test that agrees with the code is not evidence](/nodes/oats-expert/stewardship/review-protocol.md)):
a stub more generous than the real tool. This lesson is the provider-specific
instance and its remedy.

# What a fake must model, at minimum

- Refused flags and environment for the command family, with the tool's own
  error text, so the hook's diagnostics are exercised.
- Where the tool resolves its identity or configuration from (working
  directory, flag, environment) and the precedence between them.
- Output shape: multi-line documents, progress lines before the document,
  fields that may be absent.
- Failure modes the hook must compensate for: a command that partly succeeded
  (files written, no answer), a timeout whose effect is unknown.

# Consequences

- A provider PR that touches a hook calling an external tool carries a
  rehearsal record (what was spawned, on which identity, which live
  behaviours were exercised, what was cleaned up) or it is returned.
- The rehearsal is the operator's outsider stance applied to a provider:
  see [second-operator acceptance](/nodes/oats-expert/lessons/second-operator-acceptance.md)
  for the gate and its failure classes.
- Facts learned about the tool's behaviour are the package expert's; the
  discipline is this node's.

# Citations

- Legacy `agents/integrations-expert/soul/knowledge/lessons/fake-aw-must-model-real-refusals.md`
  (2026-09-23) and the maintainer's inbox notes
  `aw-grant-commands-resolve-the-identity-from-cwd-only` and
  `a-grant-signed-send-must-name-the-subject-as-sender` (2026-09-24), from
  which the tool facts were routed to the messaging package expert.
