---
type: Decision
title: Proven unmatched launch pins refuse fall-through; unchecked pins stay visible
description: An unmatched host launch pin blocks launches that would fall through, but incomplete discovery cannot prove a mismatch and must remain visibly unchecked.
tags: [kernel, launch, configuration, discovery, diagnostics]
timestamp: 2026-10-13
---
# Decision and rationale

The source reports this decision accepted in the 2026-10-12 launch-pin
review, with the missing-discovery-record rule settled on 2026-10-13 [1, 2].
A host's `souls.launch` pin expresses where a soul should run. If the kernel
can establish that a key names no offered soul, it must not silently fall
through to a different launch choice.

**Refuse the fall-through launches, not an inferred intended soul.** A
proven unmatched key blocks every new launch for which neither a soul-specific
entry nor an explicitly named command-line launch decides the choice. This
includes fall-through to the machine wildcard, the soul's own launch
preference or the host default. A soul with its own entry, or a launch
explicitly named on the command line, is not blocked by this check. The
kernel cannot identify which soul the unmatched key was intended to pin,
so it cannot prove that an otherwise unpinned launch is unrelated [1].

**A warning was rejected.** By the time an operator reads it, the soul may
already be running on the account the pin was intended to avoid. Visibility
after launch is not enforcement of launch intent [1].

# Prove mismatch per key, not per discovery run

A key absent from the offered-soul list is not necessarily unmatched: the
source that could contain its soul might not have been read. Only a proven
mismatch justifies this refusal. Otherwise the key is **unchecked**: it
blocks nothing under this check, but doctor reports the uncertainty as
information rather than silently implying that the pin was validated [1].

The proof boundary follows the key's possible source:

- **Bare key:** an unconfirmed member or a skipped member/external soul
  leaves the key unchecked, because any of those sources could contain it.
- **Package-qualified key:** a declared but unlocked package, or a skipped
  soul in that package, leaves that package's key unchecked. An unrelated
  unreadable member does not invalidate this key's proof.
- **Standalone view of an unreadable workspace host:** every key remains
  unchecked; that view cannot establish the workspace's offered set.

A whole-discovery cleanliness gate was rejected. Discovery deliberately
skips unreadable sources and continues. Requiring the entire read to be
clean would let one unreadable member disable even the independent check
of a package-qualified key—the failure case that motivated the decision.
The accepted cost is narrower but real: one unconfirmed member prevents a
misspelled bare key from being refused. Reporting unchecked status makes
that limit visible; it does not remove it [1].

# Missing completeness evidence is not a clean read

A discovery carrying no record of skipped souls leaves **every key
unchecked**. A member listing without its skipped-soul record counts as
having skipped a soul, leaving bare keys unchecked [2].

Absence of a newly introduced completeness field cannot mean that nothing
was missed: producers predating the field omit it too. Treating omission as
an empty skipped set invents positive evidence about the workspace and can
turn an unestablished mismatch into a refusal. The rejected fail-closed
alternative would therefore violate the very condition that authorizes
this check: refusal requires a demonstrated mismatch [2].

This is an evidence rule, not a universal instruction to allow operations
on unknown inputs. In particular, it does not relax the separate
[recorded-process identity refusal](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md).
That operation requires proof before destructive recovery; this check
requires proof before classifying a launch pin as unmatched.

# Remedy and contract boundary

**Pin the intended soul first, then remove the unmatched key.** Removing
first ends the refusal while leaving the intended soul exposed to the same
fall-through the pin was meant to prevent [1]. This ordering is part of the
remedy's safety, not cosmetic diagnostic wording.

Adding tags to public discovery `problems` rows merely to carry this internal
distinction was also rejected: an internal evidence need does not justify
an incidental change to a public JSON contract [1]. The durable knowledge
is the proof obligation and the rejected alternatives, not a map of the
writer and reader functions. Enforcement belongs in the shared decision
and regression coverage for incomplete reads, absent records, unaffected
explicit choices and remedy ordering; a stored decision is not a substitute
for those checks.

# Related

[The host supplies host-only facts](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)
owns configuration placement, not this unmatched-pin policy.
[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
owns typed refusals and tested remedies.
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md)
owns refusal timing rather than the evidence that authorizes this one.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/unmatched-versus-unchecked.md; notes/unrecorded-read-is-unchecked.md.

1. The proposal attributes the refusal, scope and remedy decision to the maintainer on [awebai/oats#989, comment 6132760026](https://github.com/awebai/oats/issues/989#issuecomment-6132760026), dated 2026-10-12. The first named note supplies the per-key rationale and rejected public-row tagging, and reports acceptance of the contract in [comment 6133085132](https://github.com/awebai/oats/issues/989#issuecomment-6133085132). Warning rejection and remedy ordering are supplied by the proposal.
2. The second named note records the lead's missing-record decision after the [awebai/oats#1013 review, comment 6134144159](https://github.com/awebai/oats/pull/1013#issuecomment-6134144159). The proposal reports both maintainers' approval on 2026-10-13 in [awebai/oats#1020, comment 6135330102](https://github.com/awebai/oats/pull/1020#issuecomment-6135330102) and [comment 6135386118](https://github.com/awebai/oats/pull/1020#issuecomment-6135386118). These are source-reported acceptance references, not independently audited human acceptance, implementation or release evidence. No existing decision is superseded.
