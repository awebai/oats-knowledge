# oats-desktop-expert log

## 2026-10-09

* **Harvest**: added [Informed manual actions](decisions/informed-manual-actions-match-cli-authority.md), applying CLI authority to capability-source Test: informed one-run intent, not a Desktop-only automation-trust gate. Preserved the rejected hidden/one-click/probing alternatives and the reason to raise execution effects as a kernel contract question.
* **Harvest**: added [Attributed source prose](decisions/source-prose-is-an-attributed-quote.md), distinguishing safe text from apparent product endorsement and preserving visible/accessibility attribution plus the older-state reason for a Desktop filter. Existing privileged-window input rules remain unchanged.
* **Harvest**: added [Coupled Desktop/kernel landings](lessons/coupled-kernel-and-desktop-landings.md), preserving the consumer-specific dual-tree evidence and reason to hold a producer that would make Desktop wrong. General release authority remains in maintainer stewardship; a notes-only rebase's range-diff does not waive head-bound approval.
* **Harvest**: extended [Truthful async outcomes](lessons/asynchronous-intent-and-truthful-outcomes.md) with precise no-execution conditions, ordinary recorded-state reads and reuse of an existing truthful stale-page outcome instead of result-retention state. The original effect-conditioned lifecycle guidance from harvest #64 remains; the new section supplies distinct review counterexamples and transport-level elimination routes.

* **Harvest**: added [Shared-code packaging](decisions/shared-code-keeps-one-relative-path.md), preserving the expert's spike decision, rejected copy/symlink/bundle/dependency alternatives, expanded release guards and asar-only fallback. The spike was closed unmerged; no shipped extraction, human acceptance or change to product succession is claimed.
* **Harvest**: refined [Verification judgment](lessons/verification-judgment-for-privileged-surfaces.md#linux-can-exercise-the-packaged-shell-in-ci) with the source-reported single Linux packaged-shell launch under xvfb, its static-graph-only evidence and the permanent CI-gate elimination route. This narrows the source's earlier static-only assumption, not the operator-machine safety rule; macOS, the AppImage launcher and on-demand views remain unproven.

## 2026-10-08

* **Harvest**: added [Preview-bounded spawn outcomes](decisions/preview-bounded-spawn-outcomes.md), preserving the confirmed-preview deadline, transport-owned interruption, bounded response, scoped concurrency and typed compensation rationale with rejected alternatives. It complements bundled-server lifetime without promising broker recovery after server death.
* **Harvest**: merged additive-field parity into [Verification judgment](lessons/verification-judgment-for-privileged-surfaces.md): parser acceptance is not display or safe action availability; composition-level regressions are the elimination route, not a fixed map of projection functions.
* **Harvest**: extended [Truthful async outcomes](lessons/asynchronous-intent-and-truthful-outcomes.md) to conditional lifecycle confirmations: the interrupted-spawn branch-cleanup counterexample motivates shared effect wording and effect/no-effect regressions across plan and warning surfaces. Existing intent and single-flight rules are unchanged.
* **Harvest**: added [Bundled-server owner lifetime](decisions/bundled-server-owner-lifetime.md), preserving the owner-only pipe rationale, rejected polling/replacement alternatives and the no-child-signal rollback constraint; linked it from [Workspace admission](decisions/privileged-workspace-admission.md) without changing the foreign-server prohibition. The source reports maintainer approval and probes; the harvest did not repeat them.
* **Harvest**: merged the accepted terminal-count decision into [Terminal viewers](decisions/terminal-viewers-not-session-owners.md): removal requires a bound on reconnect attempts in flight, and the cited Linux measurements justify neither an arbitrary lower cap nor universal capacity claims.
* **Harvest**: refined [Verification judgment](lessons/verification-judgment-for-privileged-surfaces.md) with the missed source-slicing test seam, importable-module elimination route and interim coverage requirement; native-effect isolation still applies.
* **Fix**: replaced the verification lesson's signal-handler remedy with a pointer to the crash-safe owner-lifetime decision; signal handlers cannot cover SIGKILL. This does not supersede the operator-machine safety rule or authorize application-level process-group cleanup.
* **Update**: added [Identity marks show a two-letter abbreviation](decisions/two-letter-identity-marks.md) (awebai/oats#768), with the rejected roster-relative, colour-only and declared-mark alternatives and the 1px stack consequence.
* **Update**: added [A soul's page shows its own and its composed AGENTS.md](decisions/soul-instructions-own-and-composed.md) (awebai/oats#751, #768, #792, #795, #797): why the composed text is an opt-in field of `inspect --soul`, and why routed souls needed the host to report its own features.
* **Update**: added [An idle child may be an undelivered wake](lessons/idle-child-may-be-an-undelivered-wake.md), the coordinator's side of a wedged broker registration, linking the integrations and maintainer concepts that own delivery instead of duplicating them. Written by the expert from its own instance notes (harvest was off for that instance), at the maintainer's request.

## 2026-10-03

* **Harvest**: added [Needs-input attention preserves liveness and roster recognition](decisions/needs-input-preserves-liveness-and-recognition.md), preserving the source expert's marker, collapsed-parent and fixed-label rationale and rejected dot-recolouring, row-reordering and visible-age alternatives. The note is the design evidence; the captured records contain startup material and the opening brief, not later verification or acceptance. Existing design, accessibility and CLI-authority decisions are not superseded.
* **Harvest**: added [Per-theme terminal stroke weight](decisions/per-theme-terminal-stroke-weight.md), preserving the rationale for theme-specific calibration and the rejected global-weight, setting, renderer and contrast alternatives; no native-geometry decision is superseded.
* **Harvest**: added [Terminal weight polarity and platform scope](lessons/terminal-weight-polarity-and-platform-scope.md), merging the source's macOS Retina measurements and their platform limitation into one lesson; no Linux, Windows or low-density match is claimed.
* **Update**: linked the calibration from [Design direction and quality bar](decisions/design-direction-and-quality-bar.md) without changing its native-cell-geometry rule. The harvest relies on the three source notes; the two captured record windows contain startup material, not the later experiments or review.

## 2026-09-29

* **Update**: this node now covers Desktop UX and design (the designer soul was removed; awebai/oats#311). Added [One design authority, a stated quality bar, and a native terminal](decisions/design-direction-and-quality-bar.md): the expert owns design direction and the developer implements it, the quality bar, and the terminal-geometry reversal of the Redesign v3 typography (awebai/oats#307).
* **Update**: [Async completion](lessons/asynchronous-intent-and-truthful-outcomes.md) gains single-flight side-effecting pipelines enforced at the handler. A second gap check of the legacy `ux-designer` base found everything else already carried or deliberately dropped.

## 2026-09-28

* **Update**: imported 14 lessons from the legacy soul trees — each re-verified against main: close-before-mount-settles into [Async completion](lessons/asynchronous-intent-and-truthful-outcomes.md); off-request-path collection and lower-trust snapshot producers into [The loopback interface](decisions/loopback-trust-boundary-and-transport-simplicity.md); bracketed paste into [Terminal tabs are viewers](decisions/terminal-viewers-not-session-owners.md); request-carried workspace scope into [Identity and relationships](lessons/identity-and-relationship-legibility.md); shifted-punctuation chords into [Keyboard policy](lessons/keyboard-focus-and-action-ownership.md); shell reachability and removal inventories into [Verification judgment](lessons/verification-judgment-for-privileged-surfaces.md).
* **Update**: audit pass — [One standalone Desktop product](decisions/standalone-product-and-cli-authority.md) rewritten for Desktop Phase F (the kernel is the model; every deployment fact from kernel JSON, every change a kernel verb, features gated on `features[]`, remove-don't-wrap; forge connection as a workstation fact); [Workspace admission](decisions/privileged-workspace-admission.md) drops sibling-root discovery and records existence-only admission; [Agent-centered navigation](decisions/agent-centered-navigation.md) describes the switcher as moving between deployments; superseded design links repointed to HISTORY permalinks; SHA-256 provenance lists collapsed to one `Migrated from … @ 7838d3ca` line; in-node links made relative; indexes shortened; log capped.

## 2026-09-24

* **Update**: [Verification judgment for Desktop's privileged surfaces](lessons/verification-judgment-for-privileged-surfaces.md) gains "Selecting tests is not isolating their effects" (full-name matching of test-name patterns, isolation before execution, stop-and-report on unexpected native cases).
* **Update**: [The loopback interface is Desktop's trust boundary](decisions/loopback-trust-boundary-and-transport-simplicity.md) gains "workspace-derived strings are hostile input inside the privileged window".
* **Update**: re-assessment of the legacy Desktop-engineer bundle against this node: most concepts already covered, four folded into the two concepts above, five routed to the kernel and oats-expert nodes, the rest dropped (code maps, delivery residue, superseded surfaces, traps now carried by tests). No new concepts.

## 2026-09-22

* **Update**: [Agent-centered navigation](decisions/agent-centered-navigation.md) — the workspace-switcher grounding no longer cites the superseded non-Git team-scope shape; it points at the dogfooding decision.
* **Fix**: dating and attribution added to [Editor groups](decisions/editor-group-layout-ownership.md), [Keyboard policy](lessons/keyboard-focus-and-action-ownership.md), [Async completion](lessons/asynchronous-intent-and-truthful-outcomes.md) and [Identity and relationships](lessons/identity-and-relationship-legibility.md), from the legacy source timestamps.
* **Update**: [Workspace admission](decisions/privileged-workspace-admission.md) states that its canonicalise-once rule is a Desktop finding, independent of the kernel's resolved-object lesson, and links it.
* **Fix**: log normalised newest-first; section indexes renamed; cross-node reads use base-rooted links.

## 2026-09-21

* **Harvest**: legacy-bundle synthesis of `oats-desktop-engineer` and `ux-designer`. Added [The loopback interface is Desktop's trust boundary](decisions/loopback-trust-boundary-and-transport-simplicity.md), [Verification judgment for Desktop's privileged surfaces](lessons/verification-judgment-for-privileged-surfaces.md), [macOS installers](lessons/macos-adhoc-signing-decision.md), [Browser-owned state and accessibility under repaint](lessons/browser-owned-state-and-accessibility-under-repaint.md) and [Accessibility is proven on effective colours](lessons/effective-contrast-over-token-pairs.md).
* **Update**: [Terminal tabs are viewers](decisions/terminal-viewers-not-session-owners.md) gains the one-input-surface acceptance (2026-07-22), the deferred messaging sidebar and an integration-limitations section.
* **Update**: [One standalone Desktop product](decisions/standalone-product-and-cli-authority.md) dates the acceptance (2026-07-24) and adds tolerant observation, advisory model input and empty-task semantics.
* **Update**: [Agent-centered navigation](decisions/agent-centered-navigation.md) adds workspace-scoped artifact tabs, return-to-prior-stage and the workspace switcher; dates the 2026-09-07 supersession of selection-opens-spawn.
* **Update**: [Workspace admission](decisions/privileged-workspace-admission.md) adds immutable admitted roots and validated workspace-derived candidates, and viewer survival across server replacement.
* **Update**: [Identity and relationships](lessons/identity-and-relationship-legibility.md) adds degrade-to-forest, qualified-identity tie-breaking and category-labels-are-not-cluster-names.
* **Update**: every concept carries `tags` and its original decision/lesson `timestamp`; section indexes added.
* **Deprecation**: superseded legacy claims not carried: browser-panel/chat/diff/Jira views, tmux as the sole terminal seam, the per-tab pending-slot split model, the kernel-bridge transition narrative, pre-portable-souls layouts, selection-opens-spawn, and version/PR/release ledger facts.

## 2026-09-13

* **Creation**: curated rationale prepared for independent review.
* **Fix**: [Editor group ownership](decisions/editor-group-layout-ownership.md) separates layout ownership from workspace restoration.
* **Update**: editorial donor-exclusion commentary removed from [Desktop CLI authority](decisions/standalone-product-and-cli-authority.md).
