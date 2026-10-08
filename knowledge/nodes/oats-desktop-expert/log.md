# oats-desktop-expert log

## 2026-10-08

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
