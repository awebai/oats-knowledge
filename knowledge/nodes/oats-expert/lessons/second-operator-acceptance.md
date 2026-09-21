---
type: Lesson
title: Second-operator acceptance — what the gate is for, how to read its failures, and the contract-siblings rule
description: An independent operator holding none of the authoring state is the acceptance gate for published definitions; its value is the absence of that state, its exit criterion is "every remaining item is named and owned", its failures fall into four owner-distinct classes, and its recurring finding — a contract adopted by one provider but not its siblings — is prevented by a same-release adoption rule.
tags: [acceptance, second-operator, diagnostics, packaging, contracts, verification]
timestamp: 2026-09-21
---
Learned 2026-09-20/21 by the redesign lead from an independent operator on a
fresh machine, during the first published wave of the workspace and Portable
Souls redesign. Owner of the standing criteria: oats-expert.

# What the gate is for

Proving that a published definition works for somebody who has never seen it
is worth far more from a machine that holds **none of the authoring state**.
The value comes from the absence of that state, so the run must not acquire
it and must not disturb what the machine already runs. The judgement that
follows (the mechanical steps belong in an acceptance skill):

- Install the exact published version **locally in a throwaway directory**,
  never by upgrading or reconfiguring the machine's working install — a global
  upgrade changes the owner's environment, mixes their configuration into the
  observations and makes the result unreproducible.
- Check for ambient configuration the tool could inherit before starting; an
  inherited setting silently invalidates "fresh".
- Preserve the directory so every later run is a **repeat of the same tree**,
  and the retained raw output is the evidence.
- Record what was **not** touched as explicitly as what was; the reader cannot
  infer "the live deployment was never modified".
- The exit criterion is not "it works" but **"every remaining item is named
  and belongs to an owner"** — and none of them is disguised operator input.
  This is a standing acceptance criterion for published waves.

# Four failure classes, four owners

Layered configuration makes very different failures look identical, and all of
them render as "needs configuration". Classify before reporting:

1. **Operator input** — an account, a team, a responsible human. Legitimately
   the operator's; never guessed and never substituted. A deliberately
   **synthetic** value may be supplied to probe past it, and must be labelled
   as synthetic in the result.
2. **Source defect** — a provider is required by the definition but the
   definition (or its workspace container) carries no declaration block for
   that provider to normalise. **The tell is the phase**: providers normalise
   a declaration before they check readiness; a failure in normalise means the
   declaration was absent, a failure in check means the world is not ready.
   When the author predicts a check-phase message and the run stops earlier,
   stop adding operator inputs and read what normalise requires. Count the
   published definitions carrying the block: zero across all of them is not a
   configuration problem. Report "no operator input can resolve this" with
   the exact predicate — far stronger than "still needs configuration".
3. **Packaging defect** — a contract adopted by one provider and not its
   siblings (below).
4. **Kernel defect** — a bare refusal with no attribution to a slot or
   capability. Any refusal after selection that cannot say *where* is a
   kernel defect by definition, whatever its wording.

# Methods that turn complaints into findings

- **Diff the output for a plausible input against a deliberately invalid
  one.** "The message is unhelpful" is an opinion the author can discount;
  byte-identical output for a correct and a garbage input is a fact about the
  interface. State the readings you cannot separate from outside: identical
  output can mean the validator never examined the input because an earlier
  phase short-circuited — and an identical pair **can be correct output** when
  both inputs are refused for the same missing setting. Trace the provider
  phase before demanding that outputs differ; the fix is specificity and
  attribution, never manufactured inequality.
- **Compare the host's own determinations with each plugin's.** If the host's
  failures read specifically while two unrelated plugins fail with one
  templated sentence, the host is *discarding* messages at the boundary, not
  lacking them — a completely different fix from writing better host text.
  Confirm from the plugin source by naming the exact strings that never
  appear. A discarded diagnostic also hides the failure's class: a provider
  refusing over a missing source declaration reads, once wrapped, exactly like
  an operator who forgot a setting.
- **Ablate one key and watch which *other* component's verdict changes.** A
  component whose result depends on a key it does not own is reading input
  that is not its own. The failure appears only when both providers are
  exercised together, so per-provider tests never see it, and it can be a
  true deadlock — no input satisfies both. Report it as a namespace defect
  with both fixes named (scope the keys, or require ignoring foreign keys);
  the choice belongs to the owners, and a symptom-only report invites a patch
  to whichever provider complained
  ([kernel decision](/nodes/oats-kernel-expert/decisions/operator-bindings-flat-map-declared-ownership.md)).
- **Do not strip a declared requirement to isolate a phase** on an acceptance
  route: the result no longer tests the route anyone takes.
- **When repinning after a provider release, check the edition that
  exercises that provider**; the one that never does is the wrong sample.

# The contract-siblings rule

Finding of 2026-09-21: a manifest contract the kernel refuses on absence had
been adopted by the provider that motivated it and by none of its siblings.
Because every soul edition declared one sibling, **no edition could publish a
resolution** — and the gap sat behind an operator-owned requirement, so it was
invisible until the operator probed past that requirement with a synthetic
value. It was the fourth finding of the same family in one adoption wave; a
fifth followed in a readiness check that folded several causes into one code.

Rule (redesign lead, 2026-09-21; the human informed):

- **Any new manifest contract a kernel refuses on absence is adopted by the
  framework's own capabilities in the same release that introduces the
  refusal, and a packaging test enforces it.** The framework's packages are
  the first that must pass the contracts they impose.
- **Before publishing any cross-provider contract change, check every
  injecting or binding capability**, not only the one that motivated it.
- Its code route is a release-time check (adopted 2026-09-21); this lesson stays
  because the *sweep* is judgement the test cannot perform for contracts not
  yet written.

# Related

[Adoption evidence and approved scope](/nodes/oats-expert/lessons/adoption-evidence-and-approved-scope.md);
[Fresh-install-first rollout](/nodes/oats-expert/decisions/fresh-install-first-rollout.md);
[Current OATS direction](/nodes/oats-expert/roadmap/current-direction.md).

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/lessons/` `diagnostic-diff-invalid-input`, `plugin-diagnostic-wrapper-discarded-message`, `shared-provider-input-namespace-misattribution`, `source-declaration-requirement-without-payload` (2026-09-20); `playbooks/local-cli-fresh-operator-acceptance` (2026-09-20); `decisions/helper-injection-policy-on-every-injecting-capability` (2026-09-21); delivery-log "identical pair can be correct" lesson (2026-09-21).
2. Framework program board second-operator entries and release notes for the 2026-09-21 wave, [awebai/oats](https://github.com/awebai/oats).
