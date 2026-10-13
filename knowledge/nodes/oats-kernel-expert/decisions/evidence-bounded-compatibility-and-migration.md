---
type: Decision
title: Compatibility follows supported adoption, not every intermediate format
description: Supported adoption bounds compatibility, unrepresentable migrations refuse, manifest floors retain the narrow non-required-hook exception from 0.49.0, and pre-upgrade checks are proven on outgoing releases.
tags: [kernel, compatibility, migration, locks, packages, manifests]
timestamp: 2026-10-13
---
# Rationale

Founder rulings of 2026-07-29 during the materialization redesign. An
intermediate implementation does not automatically become a permanent
compatibility obligation. Establish supported adoption before adding another
version, reader and migration subsystem; an unadopted transitional format is
revised in place rather than versioned, while genuinely supported historical
inputs are retained.

This is not permission to abandon published commitments because no local
consumer is visible. Reader compatibility and current authoring rules differ:
accepting an immutable legacy artifact does not endorse emitting that shape
today. Before choosing a discriminator for "old format", enumerate the actual
published artifacts it must accept. A field that is *optional* in the old
format cannot discriminate it; only a field that is *impossible* there can.
The intuitive "legacy spelling present ⇒ legacy" test would have stranded the
one immutable published package the compatibility existed to serve.

**A migration cannot invent a home for state its destination cannot
represent.** The founder chose whole-scope refusal over converting around
retained entries or creating a residue container. When a format has no place
to put something, the operation that would leave it behind refuses; never
claim an entry was retained unless the result can still resolve it. The
workspace model applied this in its strongest form (0.25.0): no converter and
no dual-schema reader; the previous kernel line keeps running its deployments
and an operator rebuilds on the new model
([pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)).
A lock written by 0.26.0 is unreadable by an earlier kernel, so every kernel
of a deployment moves together; the refusal (`E_LOCK_SCHEMA`) is the honest
outcome, never a repair.

**Historical rule (2026-09-21): a closed manifest validator makes every new
manifest field a hard floor bump.** Earlier kernels reject the whole manifest
at load, not just the new feature. Ship the kernel that reads the field first; providers
that declare it floor on that kernel; never publish a provider release with a
field its floor kernel cannot load. The mirror image governs removal: a field
the kernel stops using is kept in the schema as tolerated-and-ignored
(`helperInjection`, hook `inputs` since 0.26.0), because deleting it would
reject every manifest that still carries it.

**Partly superseded, 2026-10-08:**
[Unknown hook events are forward-tolerant unless required](forward-tolerant-hook-events.md)
introduces one exception from OATS 0.49.0: a non-required hook event name may
be unknown without rejecting the capability. Declaration validation stays
strict. Other new manifest fields and unknown required events still need a
kernel that supports them. Pre-0.49.0 kernels still reject every unknown
event, so provider floors and upgrading every composing host before adoption
remain necessary; this is not retroactive compatibility.

**A kernel upgrade is separable from a provider floor** (2026-09-19). A
release note that pins a new provider version invites the reading that
upgrading the kernel means adopting that provider. The pin is the pairing the
release was *qualified with*; the provider's floor is a statement about the
provider, not an upper bound on older ones; what a deployment runs is what
its lock pins. Whether the kernel can move alone is decided by every pinned
capability's declared `compatibility.oats` range and by any separately
versioned consumer with its own kernel band (a Desktop client's band usually
bites first). Separating them turns one blocked all-or-nothing migration into
a cheap reversible step plus a deliberate one.

# Upgrade instructions share the compatibility boundary

**A check before an upgrade must run on the version being left** (lesson
reported 2026-10-12–13). When a kernel change turns a previously silent
condition into a refusal, distinguish the operator's before-upgrade check
from the after-upgrade diagnostic. The latter may use the new diagnostic;
the former must use only commands and output available on the supported
releases being left. Run the actual pre-upgrade check on those released
binaries with both affected and unaffected fixtures. Reading the new code,
or merely finding the old output field in source, is not execution evidence.

The source reports that the initial upgrade guidance for the launch-key
refusal pointed at `oats doctor`, although the diagnostic for unmatched keys
was itself part of the change. The released doctor could therefore appear
clean precisely where the upgrade would introduce a refusal. The replacement
kept the new doctor as the after-upgrade step and supplied a before-upgrade
comparison in operator language plus a script using already-released output.
The named note reports running that script against released 0.51.0 and
0.52.0 kernels with matching and non-matching keys [3]. These are
source-reported results, not runs reproduced by this harvest.

The rejected alternatives in this case were a backport release solely to
supply the check, and guidance that required upgrading before the operator
could discover the problem. The former adds an intermediate release to what
should be a check of existing deployments; the latter defeats the purpose
of a before-upgrade check. This is not a general prohibition on backports.

**Elimination route:** keep the concrete published check executable and test
it against the supported outgoing release binaries, asserting both affected
and unaffected outcomes. Such release-documentation regression coverage can
catch the wrong diagnostic or output assumption; this lesson preserves why
the old-release side belongs in that test matrix. It does not claim that an
automated gate has shipped or replace the kernel's own refusal tests.

# Related

[A partial catalog remains an answer in both CLI forms](partial-catalog-remains-an-answer.md)
applies this compatibility boundary to diagnostic visibility: exposing more
problems does not by itself authorize a stream or exit-status migration.

[A refusal that needs the old bytes is a pre-commit gate](../lessons/refusal-belongs-before-commit.md);
[Pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md).

# Current contracts

- [Current packages.md, lock v3](https://github.com/awebai/oats/blob/main/docs/packages.md#lock-v3)
- [Current capabilities.md, manifest](https://github.com/awebai/oats/blob/main/docs/capabilities.md#manifest)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge, agents/dev-coordinator/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (mixed-scope-migration-refuses-whole, replace-unadopted-transitional-formats-in-place, legacy-capability-root-discriminator, guided-official-migration-shape, kernel-upgrade-separable-from-provider-floor, provider-problem-reasons-cross-the-wire).
2. [OATS 0.26.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md).
3. The proposal and named note attribute the upgrade-guidance correction to
   [awebai/oats#989](https://github.com/awebai/oats/issues/989), comment
   6133085132, on 2026-10-12, and the released-version runs to 2026-10-13.
   The proposal additionally identifies
   [awebai/oats#1020](https://github.com/awebai/oats/pull/1020) as the review
   context. Maintainer agreement and test outcomes are source-reported; this
   harvest did not independently audit those reviews, release tags or runs.
4. Verified by the knowledge maintainer at review of the harvest on
   2026-10-13. On awebai/oats#989 the release-lane decision of 2026-10-12
   asked for a notes step that ran `oats doctor` before upgrading; the kernel
   lead's specification answered that the 0.52 doctor cannot report these
   keys and proposed a check from output the released kernels already give;
   and comment 6133085132 accepts that correction. The first wording was
   therefore corrected at the specification stage and never reached
   published notes. The accepted wording makes the after-upgrade doctor run
   the upgrade step and offers the before-upgrade check as one sentence in
   the operator's words, with the script after it. awebai/oats#1020 merged
   on 2026-10-13 with both maintainer sides approving the head that merged;
   its release-notes entry carries that wording and names 0.51.0 and 0.52.0
   for the script. The threads record a trial of the script on 0.51.0 and a
   check that the output field has that form at both release tags, the kind
   of evidence this lesson calls insufficient. The 0.52.0 run, the affected
   and unaffected fixtures and both rejected alternatives appear in neither
   thread and rest on the source's note alone, which this review did not
   read.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/forward-tolerant-hook-events.md (partial supersession only).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/upgrade-check-runs-on-the-released-version.md (upgrade-check refinement only).
