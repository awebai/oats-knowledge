---
type: Lesson
title: A fake CLI that accepts what the real binary refuses hides a broken hook — a provider that drives an external CLI is accepted on the whole lifecycle against the published binary
description: Fakes model the released tool's refusals and outputs; acceptance needs the whole lifecycle on the published binary, one version floor, and explicit control of the binary and state the rehearsal actually exercises.
tags: [lesson, integrations, hooks, testing, fake-cli, rehearsal, acceptance, versioning]
timestamp: 2026-10-12
---

Learned 2026-09-23/24 across five review rounds of one messaging provider,
three of them opened by a live rehearsal on a real identity after every unit
suite was green, and confirmed on 2026-09-25 when a provider release minted
joined-team identities with a command the real CLI refuses under an external
identity home.

# Rule

1. **A fake models the real binary's refusals, not only its successes.** For
   the version it claims (state it in the test and in the PR), the fake
   rejects the flags and environment the real tool rejects, resolves inputs
   the way the real tool does, and prints output in the real shape. Every
   field a fake always populates is a branch the real tool can leave empty.
2. **Read the tool's admission surface, not only the diff.** When the tool
   admits only an exact allowlist of commands under a mode (the messaging CLI
   under an external identity home), find every command the provider runs in
   that mode on the allowlist in the released source at the floor version; if
   it is absent, use the admitted alternative the refusal names, or change the
   floor. Keep one real-binary test per such command that proves admission:
   the failure must be about the input, never about the policy.
3. **The gate is the feature's whole lifecycle** (for a membership: join,
   send, read, leave) run against the published binary on a scratch
   deployment with a disposable identity, with its isolation limits made
   explicit (see the scratch-deployment boundary below). An admitted first
   command is not an operable identity: when a tool fix names one command, ask
   the tool's owner for the whole path before building on it. Run such gates
   only where the human designates, leave residue for the tool's owner to
   inspect, and report exact command/error pairs; never improvise cleanup
   through admin commands.
4. **The floor is the version where every step works, and it has one
   exported source.** The runtime gate, the readiness remedy and any docs
   example a test pins import the same constant (oats.aweb 1.16.1: `AW_MIN` in
   its binding-wire module, one floor for the client, custody attachment and
   the host wake daemon). Two literals drift the moment a placeholder floor
   becomes a published one.
5. **The rehearsal controls which binary runs.** State the release a fixture
   needs and put that binary first on PATH or call it by absolute path; a
   package's `node_modules/.bin` shim can shadow it. Record the version output
   in the rehearsal log. Install test-only tools into a prefix outside the
   repository: `npm install --prefix <repo>` saves them into the package's
   manifest and lock, and a capability must ship no dependency closure.
6. **When the rehearsal finds a refusal the fake accepted, fix the fake in the
   same round as the hook**, naming the tool's source of truth in the test.

# Scratch-deployment boundary

**Before choosing a scratch deployment to prove a line, ask which state the
command reads.** Relocating a deployment isolates only the state actually
placed or redirected there. It does not by itself isolate a per-user service,
machine-managed settings, inherited `PATH`, or a running daemon. Read the
selected release's state lookup, not only its command usage, before choosing
the rehearsal environment.

The source's 2026-10-12 report corrected its earlier assumption that a scratch
deployment could show only a missing scheduler. Another lead's probes instead
observed an installed, active scheduler across three published kernel versions,
despite isolating the deployment and registry. The source did not run those
scheduler probes itself. The durable finding is the mistaken isolation
assumption, not a claim about where every version stores a scheduler unit.

A rehearsal record names the branch actually exercised and the branch left
unrun. Reading installed status proves neither the missing-state branch nor a
fresh installation. An operator-only step needs the operator's run; otherwise
state that it was inspected in source, not executed. Do not replace missing
real-binary evidence with a fake or infer permission to change the host just
to manufacture the other branch.

Where supported state control can make both branches reproducible, put that
control in real-binary regression tests. That is the elimination route for a
specific coverage gap; the review judgment is to expose any remaining limit
rather than equate a temporary directory with a clean host. This refines the
rehearsal gate, not the operator's separate
[configuration-placement judgment](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

# Why

A green unit suite against a fake is a proof about the fake: in the rounds
that taught this, the fake accepted flags and environment the tool refuses,
printed one-line JSON where the tool prints an indented document, answered
every revoke with success, and admitted a command the tool's identity-home
policy refused. The reviewer's general form of the defect is in the
maintainer's protocol
([a test that agrees with the code is not evidence](/nodes/oats-maintainer/stewardship/review-protocol.md));
the rehearsal is the outsider stance applied to a provider
([second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).

For timeout and interruption coverage, the related
[hang-with-child lesson](/nodes/integrations-expert/lessons/a-fake-that-hangs-must-have-a-child.md)
explains why the fake must also model descendants and why every caller needs
its own cleanup evidence.

# Consequences

- A provider PR that touches a hook calling an external tool carries a
  rehearsal record (what was spawned, on which identity and binary, which live
  behaviours were exercised, what was cleaned up) or it is returned.
- A reviewer checks `git diff package.json package-lock.json` on every
  provider release.
- Facts learned about the tool's behaviour are the package expert's
  ([oats-aweb-expert](/nodes/oats-aweb-expert/index.md)); the discipline is
  this node's.

# Citations

- Evidence: OKF proposal from integrations-expert/integrations-expert-developer-skill-lines, 2026-10-12; notes/a-scratch-deployment-does-not-isolate-host-state.md. Scheduler results are source-reported observations from another lead, not independently reproduced by the source or this harvest.
- Migrated from agents/integrations-expert/soul/knowledge @ dade3270.
- Migrated from agents/oats-expert/soul/knowledge/inbox @ 26f2caef (the tool facts went to the messaging package expert).
