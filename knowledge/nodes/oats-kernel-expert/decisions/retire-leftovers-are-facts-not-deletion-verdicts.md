---
type: Decision
title: Retirement leftovers are reported as facts, not deletion verdicts
description: Commit reachability cannot establish preservation of uncommitted work, so leftover listings report bounded facts rather than declaring recovery copies or retained worktrees redundant or safe to delete.
tags: [kernel, retire, recovery, diagnostics, contract, preservation]
timestamp: 2026-10-09
---
# Decision and rationale

The 2026-10-08/09 retirement review chose factual reporting for recovery
copies and retained worktrees, not labels such as "unique", "redundant" or
"safe to delete" [1]. A retention decision is not a later disposal verdict.

Commit reachability answers a bounded question: whether commits are reachable
from refs in the source repository. It does not establish that uncommitted
or untracked contents have been preserved elsewhere. A listing can report
reachability and the uncommitted classes it knows about; combining them into
"redundant" discards the distinction on which preservation depends. Nor does
the existence of a recovery copy prove that no other copy of its bytes exists.

This matters beyond wording. A future disposal operation that trusts the
listing's conclusion would turn a partial observation into permission to
delete work. Keep the facts and their limits visible rather than exporting
such a conclusion. This is a specific application of
[preserving recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md),
not a new deletion authorization.

# Why the information belongs in diagnostics

The source reports that both maintainers agreed to documentation and
`oats doctor` information lines during stabilization [1]. The placement was
chosen for its semantics and compatibility, not because every existing
output collection was interchangeable:

- **Information, not warnings.** A leftover is not itself a fault. The
  information collection was already free text, whereas the warnings
  collection had a documented shape for hook events.
- **Not the retirement plan.** A plan concerns the instance being retired;
  these leftovers belong to already-retired instances. Adding them would
  change a Desktop-facing contract as well as mix two subjects.
- **Not a new status payload in this change.** Status rows with a new JSON
  key were treated as a new surface and deferred, rather than smuggled into
  the stabilization repair.

These are the reasons for the reviewed scope, not a permanent prohibition on
an explicitly reviewed future status or disposal interface. The proposal's
disposal guards were not accepted and are not a disposal contract here.
Current output shapes and inspection/restoration steps belong in the
[repository's lifecycle documentation](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md),
not in a second operational recipe.

# Unknown is an honest observation

The listing must not execute a repository-selected program merely to make
its answer look complete. The source identifies declining Git status where
content filters are configured, and declining reads of submodule worktrees,
as applications of that boundary [1]. Report the affected fact as unknown
and explain why rather than weakening the observer to obtain a value.

The general helper-free observation policy, its Git-version limits and the
separate retirement-baseline constraint remain in
[Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md).
This decision neither replaces those policies nor certifies every listing
implementation as inert.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-09; notes/decision-retire-leftovers-facts-not-conclusions.md and notes/plan-703.md.

1. The proposal and decision note supply the decision, rejected placements and source-attributed agreement by both maintainers during the 2026-10-08/09 review of [awebai/oats#703](https://github.com/awebai/oats/issues/703), with documentation in [#813](https://github.com/awebai/oats/pull/813) and doctor information in [#836](https://github.com/awebai/oats/pull/836). The plan note supplies the earlier alternatives; its example still used a "unique" label, which the later decision explicitly rejects. The harvest did not inspect acceptance messages or independently audit implementation or merge history; the attribution is not proof of human acceptance. No current issue state or approval of the deferred disposal plan is inferred.
