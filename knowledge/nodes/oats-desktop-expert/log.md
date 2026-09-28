# oats-desktop-expert log

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
