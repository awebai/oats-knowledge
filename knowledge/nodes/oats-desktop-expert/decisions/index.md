# Decisions

Product and security decisions with their rationale and rejected alternatives. Each names its acceptance date; supersession is recorded in place.

* [One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md) - Desktop owns operator-product succession while the installed compatible CLI remains authoritative for OATS mutations.
* [The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md) - Because Desktop's backend can type into live agent terminals, it binds loopback only, guards Host on every request and Origin on every command-running route, and treats remote use as the operator's own SSH forward; polling over push transport was a deliberate deferral.
* [Agent-centered navigation makes the action target legible](agent-centered-navigation.md) - A stable roster and one authoritative inspection flow keep artifacts contextual and launch intent explicit.
* [Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md) - Exact-source terminal viewers preserve native interaction without taking ownership of durable sessions or silently switching agents.
* [Workspace admission is privileged and transactional](privileged-workspace-admission.md) - Validated suggestions or a privileged picker admit workspaces only after identity, readiness and rollback authority are established.
* [Editor groups own layout and close succession](editor-group-layout-ownership.md) - Persistent groups preserve ordered work and focus better than temporary per-tab split slots or unrelated global recency.
