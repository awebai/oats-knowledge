# Decisions

Product, design and security decisions with their rationale and rejected alternatives. Each names its acceptance date; supersession is recorded in place.

* [One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md) - The installed CLI is the model Desktop renders and the only way it changes a deployment.
* [The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md) - Loopback-only bind with Host and Origin guards, because the backend types into agent terminals.
* [Agent-centered navigation makes the action target legible](agent-centered-navigation.md) - A stable roster and one authoritative inspection flow keep launch intent explicit.
* [Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md) - Exact-source viewers preserve native interaction without owning durable sessions.
* [Workspace admission is privileged and transactional](privileged-workspace-admission.md) - Workspaces are admitted only from validated sources, after identity and readiness are established.
* [Editor groups own layout and close succession](editor-group-layout-ownership.md) - Persistent groups, not per-tab split slots, own ordered work and focus.
* [One design authority, a stated quality bar, and a native terminal](design-direction-and-quality-bar.md) - The expert owns UX and design direction and the developer implements it; the terminal keeps native geometry.
* [Calibrate terminal stroke weight per theme without changing cell geometry](per-theme-terminal-stroke-weight.md) - Theme-specific stroke weight matches the native terminal reference without changing cell geometry or adding a user setting.
* [Needs-input attention preserves liveness and roster recognition](needs-input-preserves-liveness-and-recognition.md) - A separate text-and-icon marker and collapsed-parent roll-up expose waiting agents without overloading liveness, reordering rows or displaying a stale elapsed time.
