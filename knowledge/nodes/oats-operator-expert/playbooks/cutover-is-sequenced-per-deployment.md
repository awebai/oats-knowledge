---
type: Playbook
title: "A kernel cutover is sequenced per deployment, not per machine: hold the previous kernel until the last deployment you care about is rebuilt, and decide per old home whether the new launcher may touch it"
description: When a new kernel generation reads only its own schema and shares no files with the previous one, nothing forces the move, so the operator orders the cutover deployment by deployment rather than upgrading a machine wholesale. The trap is launch semantics — a newer launcher can change how it starts the harness even for homes whose files it refuses — so every old home the new kernel might launch needs a deliberate hold-or-accept decision.
tags: [playbook, operator, cutover, migration, kernel-generation, launcher, sequencing, custody]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23 by the OSS coordinator while operating a real
two-team cutover.

# Rule

When a kernel generation is a clean break — it reads only the new schema,
refuses the old files by name, and shares no state with its predecessor — the
cutover is **sequenced per deployment**:

1. Keep the previous kernel installed until the **last deployment you still
   care about** has been rebuilt on the new one. Do not upgrade a machine
   wholesale because "the new version is out".
2. Before installing the new kernel on a host, list every old home that host
   could still launch through it (spawn, session start or restart, scheduled
   runs). For **each** such home decide: hold the old kernel for it, or accept
   the new launch semantics after checking the spawn preview's composed skill
   list for clashes.
3. Order retirements against directory moves: identities that must be retired
   from inside their homes retire **before** the home or its repository moves
   (see [self-custodial identities retire from inside the home](/nodes/oats-operator-expert/lessons/self-custodial-identity-retires-from-inside-the-home.md)).
4. Treat the previous deployment's provider state as **frozen custody** — read
   for history, never re-pointed at the rebuilt deployment (see
   [rebuild starts fresh provider state](/nodes/oats-operator-expert/playbooks/rebuild-starts-fresh-provider-state.md)).

# Why

A clean v2 (see [the workspace model decision](/nodes/oats-expert/decisions/workspace-model-v2.md))
was chosen over a converter or dual-schema reader. The consequence for the
operator is that two generations **coexist indefinitely**: the old kernel keeps
spawning old deployments; the new one fails closed on old files. Nothing in
either generation pushes the operator forward, and nothing prevents a half-moved
state from persisting for months. The order therefore is not given by the tools;
it is the operator's decision, and "per deployment" is the only unit at which
the decision is complete — a deployment is rebuilt or it is not, whereas a
machine hosts several deployments at different stages.

The reason step 2 exists is an interaction **neither generation's documentation
states as a warning**. The new kernel's rule that harnesses start with their own
skill and context discovery intact is a property of the *launcher*, not of the
new files. A newer launcher that still carries the old compose path will happily
launch an old-style home — and start it the new way. Isolation an operator
relied on (hiding machine-level or repository-level skills from an instance)
disappears silently the moment the newer binary performs the launch, even though
that same binary would refuse to *rebuild* the home. The rationale for the
launcher rule belongs to the kernel node's native-launch decision; the
operator's job is to know that the rule reaches old homes and to decide for
each one.

# What goes wrong

- **Wholesale upgrade.** The operator replaces the kernel on a host, a session
  restart of an old home succeeds, and the instance now sees an ambient skill
  set it was never meant to see — with a possible name clash against its own
  capability skills. Nothing errors; the preview would have shown the composed
  list, but nobody looked because the home "was not being migrated".
- **Retiring after the move.** A self-custodial identity whose home directory
  has already been relocated cannot be retired cleanly from inside it; the
  seat lingers as an orphan in the team.
- **Reusing provider state.** Pointing the rebuilt deployment at the previous
  state root trips owner pins at the first spawn of every knowledge-owning
  soul, and tempts an edit to "fix" custody that should stay read-only.
- **Rebuilding by machine, not by deployment.** One deployment ends up half on
  each generation across two hosts, and outsider verification (see
  [outsider verification of a rebuild](/nodes/oats-operator-expert/playbooks/outsider-verification-of-a-rebuild.md))
  can no longer state which kernel produced which instance.

# Consequences

- The cutover plan is a list of deployments with, for each, the hosts it lives
  on, the old homes those hosts might still launch, and the hold-or-accept
  decision per home.
- "Both kernels installed" is a normal intermediate state, not a smell; the
  smell is having no written order of which deployment moves next.
- The previous deployment's custody directories survive the cutover untouched
  and are named in the plan as such.
- Before the per-machine work starts, the shared workspace file must already be
  settled — fact placement precedes cutover; see
  [place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md).

# Citations

- `docs/rebuild-to-v2.md` — §0 "0.24.x keeps working" (coexistence, launcher
  semantics for classic homes), §7b (frozen custody), §8 (retained seats).
