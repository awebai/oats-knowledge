# oats-desktop-expert

Desktop product/interaction rationale, design-inspiration genealogy, accessibility, integration limitations and verification judgment. Implementation lives in the repository; this node records why Desktop is shaped as it is, what was rejected, and what was discovered the hard way.

## Sections

* [Decisions](decisions/index.md) - Product and security decisions with rationale, dates and rejected alternatives.
* [Lessons](lessons/index.md) - Discoveries, integration limitations and verification judgment.

## Start here

* [One standalone Desktop product, no hidden operational kernel](decisions/standalone-product-and-cli-authority.md) - Desktop owns operator-product succession while the installed compatible CLI remains authoritative for OATS mutations.
* [The loopback interface is Desktop's trust boundary](decisions/loopback-trust-boundary-and-transport-simplicity.md) - Because Desktop's backend can type into live agent terminals, it binds loopback only, guards Host on every request and Origin on every command-running route, and treats remote use as the operator's own SSH forward; polling over push transport was a deliberate deferral.
* [Agent-centered navigation makes the action target legible](decisions/agent-centered-navigation.md) - A stable roster and one authoritative inspection flow keep artifacts contextual and launch intent explicit.
* [Terminal tabs are viewers, not session owners](decisions/terminal-viewers-not-session-owners.md) - Exact-source terminal viewers preserve native interaction without taking ownership of durable sessions or silently switching agents.
* [Workspace admission is privileged and transactional](decisions/privileged-workspace-admission.md) - Validated suggestions or a privileged picker admit workspaces only after identity, readiness and rollback authority are established.
* [Editor groups own layout and close succession](decisions/editor-group-layout-ownership.md) - Persistent groups preserve ordered work and focus better than temporary per-tab split slots or unrelated global recency.
* [Identity and relationships must stay legible under ambiguity](lessons/identity-and-relationship-legibility.md) - Qualified identity and full-roster ambiguity checks preserve agents without inventing relationships from filtered views.
* [Keyboard policy follows actions and user intent](lessons/keyboard-focus-and-action-ownership.md) - Focus intent, effective bindings and event ownership must agree without consuming native terminal or control input.
* [Async completion must still own the user's intent](lessons/asynchronous-intent-and-truthful-outcomes.md) - Background work must preserve drafts and distinguish creation, visibility, readiness and task success without targeting replacement context.
* [Browser-owned state and accessibility under repaint](lessons/browser-owned-state-and-accessibility-under-repaint.md) - Rebuilding DOM while the browser owns state inside it breaks copy, typing and keyboard containment; declared modality is not containment.
* [Accessibility is proven on effective colours, not token pairs](lessons/effective-contrast-over-token-pairs.md) - A passing token-pair check can ship failing text; the bar is an inventory of every shipped foreground against every surface.
* [Verification judgment for Desktop's privileged surfaces](lessons/verification-judgment-for-privileged-surfaces.md) - Guards are proven by driving the real boundary and failing when removed; review loops end at test-strength findings; no packaged GUI launches on an operator's machine.
* [macOS installers — what ad-hoc signing fixes and what it cannot](lessons/macos-adhoc-signing-decision.md) - Complete ad-hoc signing fixes "damaged" bundles without credentials; only Developer ID plus notarization removes the warning.

Cross-node reads: the process-boundary and bounded-lineage rationale live in [oats-kernel-expert](/nodes/oats-kernel-expert/index.md); cross-domain direction in [oats-expert](/nodes/oats-expert/index.md).
