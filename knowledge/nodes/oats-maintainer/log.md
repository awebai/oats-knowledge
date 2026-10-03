# oats-maintainer log

## 2026-10-03

* **Update**: node moved from `nodes/oats-expert` to `nodes/oats-maintainer` and is owned by the new oats-maintainer soul (the OATS maintainer); the oats-expert soul stays the generalist expert, with a fresh [oats-expert](/nodes/oats-expert/index.md) node. Links across the base point here, and the node indexes that labelled the link `oats-expert` now label it `oats-maintainer`; the notes in this node are unchanged.

## 2026-10-01

* **Update**: knowledge-maintainer review of the harvest below: the paired-maintainers section names the human by role, as the rest of the base does, and its evidence moves verbatim under [review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md) `# Citations` (4, 5).
* **Harvest**: [Review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md) gains the human-directed maintainer pairing: cross-review and joint release planning, with the note's rationale of building in the second reader. The lone-gate fallback remains; unaccepted operating terms and instance-specific authority are not promoted. Evidence: OKF inputs c15a51880924deaff3fb01859f1c90b8aa09ad3a815c75af48410a708b5862c3 and 6fe3e66661e1fb9bcef9dd2a99d0d8c0f3ebcc7aa9882e1a1d6591edc1cb899c.

## 2026-09-28

* **Update**: imported 1 lesson from the legacy soul trees — [review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md) *Fresh eyes*: a vanished reviewer window with no wake event is triaged from the full message history and the session tail before it is called killed.
* **Update**: audit pass against main (the 0.30 line). Deleted the dated direction snapshot and the roadmap section (dated direction lives in the release notes). [The roster decision](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md) is now the one canonical roster (developer souls added, oats-assistant and the coordination souls dropped) and absorbs the 2026-09-24 roster amendment; other decisions link to it. Package approval, captured-path and `helperInjection` claims rewritten to main; residue, PR numbers and legacy hash citations collapsed to `Migrated from … @ 7838d3ca`. [Second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md) absorbs the operator node's outsider-verification method; review and release judgement cut to judgement, gaining lessons imported from the legacy stewardship ledgers (lockstep releases, lone-gate re-review, additive fields, removal sweeps, squash verification, gap classification). The notice-after-semicolon lesson merged into [report an outcome only from a read-back](/nodes/oats-maintainer/lessons/verify-the-remote-ref-after-every-scripted-push.md); log capped.

## 2026-09-25

* **Creation**: [check the PR's own check before an ACK](/nodes/oats-maintainer/lessons/check-the-pr-check-not-only-the-authors-local-run.md), from the oats.aweb 1.14.0 review.
* **Update**: current direction cites the package guide and configuration docs instead of the 0.25 rebuild guide the 0.26.0 legacy sweep removed.
* **Creation**: a notice sent after a semicolon reports a variable the broken chain never set, the mechanism behind a false merge notice; companion to [verify the remote ref after every scripted push](/nodes/oats-maintainer/lessons/verify-the-remote-ref-after-every-scripted-push.md).

## 2026-09-24

* **Update**: [Workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md), current direction, [the workspace definition is not a package](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md) and [official development dogfoods the workspace](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md) carry the human decision that removes package approval. Declaring a package is the trust decision; the lock keeps commit + integrity.
* **Update**: [Desktop parity lifecycle and policy](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md) §3 gains a supersession note for OATS 0.26.0: no `trusted` check or signature row, `enrolled` becomes `member`, `providers` is relayed verbatim.
* **Creation**: [A re-dated claim must be re-verified against the release it now names](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md), a review lesson from a provider release mirror.
* **Creation**: [Review a validator against every nullable field the wire spec names](/nodes/oats-maintainer/lessons/review-a-validator-against-every-nullable-field-the-wire-spec-names.md), a maintainer review lesson from a provider readiness-check cross-review.
* **Creation**: [A commit cherry-picked across a base change must be re-read as a diff against the new base](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md), promoted from the maintainer's notes.
* **Creation**: [Team as a first-class config entity](/nodes/oats-maintainer/decisions/team-as-config-entity.md), promoted from a local in-repo harvest.
* **Creation**: [Review the whole PR merge range for scope, not only the intended feature files](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md), promoted from a local in-repo harvest.
* **Creation**: [Search the whole repository before declaring a cited file missing](/nodes/oats-maintainer/lessons/search-the-whole-repository-before-declaring-a-cited-file-missing.md), promoted from a local in-repo harvest.
* **Creation**: [A test harness must reproduce a known-good baseline before any delta it reports means anything](/nodes/oats-maintainer/lessons/validate-the-harness-against-a-known-good-baseline.md), promoted from a local in-repo harvest.
* **Creation**: [Verify the remote ref after every scripted push before reporting a head](/nodes/oats-maintainer/lessons/verify-the-remote-ref-after-every-scripted-push.md), promoted from a local in-repo harvest.
* **Update**: [served identity](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md) — the provider's host-only declaration folds into its next minor, no patch; [review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md) — only a maintainer owning main pushes directly; a checkout-mode maintainer delivers by PR. (Second reviewer's post-merge read.)
* **Update**: [release traps](/nodes/oats-maintainer/stewardship/release-traps.md) — the bump PR has no checks by design; its merge gate is CLEAN + manifests-only diff.
* **Creation**: [Desktop parity: lifecycle and policy](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md) — five 2026-09-22 parity rulings by the redesign lead: Remove retains and re-homes work, recursive Stop, enrolment as admission, verified signatures only, enforced child-spawn policy, ADE-owned draft PR.
* **Creation**: [A forge connection is a workstation fact, not a capability](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md) — human direction 2026-09-22: forge sign-in is a per-machine Desktop Connection under the forge CLI's custody; the `oats.forge` capability draft is superseded; automatic PR becomes ADE-owned.
* **Creation**: [Workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md) — human acceptance 2026-09-23 with the 2026-09-23/24 refinement rounds: membership is trust, location never version, packages the only versioned source, full materialization, nothing installed, harnesses start normally; supersedes revision-pinned imports.
* **Creation**: [The served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md) — accepted 2026-09-24: the identity choice travels through the provider payload with no spawn flags; the kernel binds payloads and shows the served principal; the provider owns every identity rule.
