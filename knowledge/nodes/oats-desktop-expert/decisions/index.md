# Decisions

Product, design and security decisions with their rationale and rejected alternatives. Each names its acceptance date; supersession is recorded in place.

* [One standalone Desktop product, no hidden operational kernel](standalone-product-and-cli-authority.md) - The installed CLI is the model Desktop renders and the only way it changes a deployment.
* [Manual execution keeps CLI authority and requires an informed press](informed-manual-actions-match-cli-authority.md) - When a Desktop verb gains an execution effect, preserve the CLI's manual-action authority and map informed confirmation to the kernel's explicit intent flag rather than adding a trust gate.
* [Source-supplied prose is an attributed quote, not Desktop's voice](source-prose-is-an-attributed-quote.md) - Display prose from trigger sources, trigger files and capability manifests as visibly attributed text so untrusted words cannot impersonate Desktop's own explanation.
* [Shared Desktop code keeps one relative path in the repository and package](shared-code-keeps-one-relative-path.md) - Preserve one source and one relative import path for shared client code, avoiding stale generated copies while making packaging boundaries explicit and testable.
* [The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md) - Loopback-only bind with Host and Origin guards, because the backend types into agent terminals.
* [Agent-centered navigation makes the action target legible](agent-centered-navigation.md) - A stable roster and one authoritative inspection flow keep launch intent explicit.
* [Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md) - Exact-source viewers preserve native interaction without owning durable sessions.
* [Workspace admission is privileged and transactional](privileged-workspace-admission.md) - Workspaces are admitted only from validated sources, after identity and readiness are established.
* [The bundled server ends with its app owner, without interrupting CLI children](bundled-server-owner-lifetime.md) - An owner-only stdin pipe bounds the bundled server's lifetime across app crashes without claiming authority over another app's server or in-flight CLI work.
* [Spawn deadlines follow the confirmed preview, not the request lifetime](preview-bounded-spawn-outcomes.md) - A preview-derived deadline bounds long spawns while a short apply response and typed compensation outcomes prevent transport limits from becoming false failure or unsafe retry.
* [Editor groups own layout and close succession](editor-group-layout-ownership.md) - Persistent groups, not per-tab split slots, own ordered work and focus.
* [One design authority, a stated quality bar, and a native terminal](design-direction-and-quality-bar.md) - The expert owns UX and design direction and the developer implements it; the terminal keeps native geometry.
* [Calibrate terminal stroke weight per theme without changing cell geometry](per-theme-terminal-stroke-weight.md) - Theme-specific stroke weight matches the native terminal reference without changing cell geometry or adding a user setting.
* [Needs-input attention preserves liveness and roster recognition](needs-input-preserves-liveness-and-recognition.md) - A separate text-and-icon marker and collapsed-parent roll-up expose waiting agents without overloading liveness, reordering rows or displaying a stale elapsed time.
* [Identity marks show a two-letter abbreviation](two-letter-identity-marks.md) - One roster-independent rule gives every soul, capability and workspace two glyphs; mark stacks overlap by 1px so no letter hides.
* [A soul's page shows its own and its composed AGENTS.md](soul-instructions-own-and-composed.md) - The soul's part is set apart from every injected part; the composed text is an opt-in inspect field, and routed souls gate on the host's own reported features.
