---
type: Lesson
title: Verification judgment for Desktop's privileged surfaces
description: Security and race guards on the loopback server, IPC proxy, file viewers and terminal attach are proven only by driving the real boundary and failing when the guard is removed; review loops end when findings turn into test-strength findings; packaged GUI launches are never verification on an operator's machine, and selecting tests by name or file never isolates their native effects.
tags: [desktop, verification, security, review, testing-judgment, operator-safety, node-test, native-effects]
timestamp: 2026-10-08
---
# Lesson

Desktop's privileged surfaces — the loopback server, the main-process fetch
proxy, the guarded file viewers and terminal attach — repeatedly passed green
suites while the guard under test was inverted, unreachable or bypassed. In
every case the test had asserted a source string, or exercised a helper,
rather than the composition that carried the bug. Learned across review
rounds 2026-07-22 … 2026-07-25.

# The bar the expert holds reviewers to

1. **Drive the real boundary.** A guard is proven by a forged request
   arriving at the guarded surface and being refused with nothing crossing to
   the upstream side. Browser-grade `fetch` silently strips forbidden headers
   such as Host, so hostile cases must be sent raw; otherwise the "attack"
   arrives clean and a 403 assertion fails against a legitimate 200.
2. **Fail when the guard is removed.** Before a regression is accepted, the
   fix is mutated out — the guard, the ordering, the generation comparison —
   and the test must go red. A race test that survives its own guard's
   removal tests nothing; three security regressions once stayed green under
   reversion before this check was required. A race regression in particular
   needs two genuinely overlapping generations resolved out of order, not a
   sequence of settled requests.
3. **Test the layer that had the bug.** When a finding says "X happens in the
   wrong order in the composition root", a test of the helper it calls proves
   the helper, not the misordering. Code that cannot be extracted into a
   testable unit is where ordering bugs keep hiding; extraction is part of the
   fix, and the entry point should shrink to bindings so trivial that
   reverting them breaks an import.
4. **The scope ratchet.** Once a review round yields only test-strength
   findings (a test that does not fail under reversion, a fixture that does
   not actually hang), the loop has reached its natural end. Fix minimally,
   rescope re-review explicitly to product correctness and security, and stop
   adding speculative assertions. The operator stopped a five-round loop as
   excessive once it had become testing the tests (2026-07-24). Consumer-parity
   evidence — the published artifact behaving correctly — is a better
   late-slice confidence source than more unit tests.

# Source-slicing tests are part of a main-process change

Learned 2026-10-08: developer review and expert verification both missed a
failure that CI caught when a `main.mjs` block gained a new dependency.
Some tests slice the Electron entry point as text and execute blocks in
`node:vm` with hand-built contexts. A newly referenced symbol can be absent
from that context, making the block throw and the test fail far from the
change; helper-module tests do not exercise that seam.

This is verification debt, not a preferred testing architecture. The first
elimination route is point 3 above: extract logic into importable modules
and shrink `main.mjs` to bindings. Until that seam is eliminated, every
`main.mjs` change must inventory the tests that read and execute its source,
include them in local verification, and have the expert check that coverage.
Discover the current readers rather than preserving a fixed file list or
count in knowledge. The isolation rules below still apply: required coverage
is not permission to run native effects on the operator's machine.

# Operator-machine safety is part of verification judgment

Two separate incidents (2026-07-24) hung an operator's laptop with dozens of
packaged Desktop processes: a headless parity driver whose cleanup missed
detached descendants, and an orphaned smoke runner whose apps kept respawning
their bundled servers faster than one-shot kills. Process-group reaping is a
CI-harness requirement, not a licence to launch locally. The standing rule:

- Never launch the packaged GUI app from an agent session on an operator
  machine, headless or offscreen included. Packaged launch smoke belongs in
  CI on throwaway runners. Local evidence is static artifact checks, the
  loopback server run directly under plain Node, or at most one app instance
  the operator launches and closes.
- Never kill by application or process name machine-wide; scope destructive
  cleanup to an exact PID, an owned path, or an exact anchored multiplexer
  target. A terminal viewer only ever detaches its own client. A fix on main
  does not protect a stale worktree still running the old code.
- Quit callbacks and signal handlers cannot establish child-server lifetime
  across crashes or SIGKILL. The 2026-10-08
  [owner-lifetime decision](../decisions/bundled-server-owner-lifetime.md)
  replaces this lesson's earlier signal-handler remedy. Its no-child-signal
  rule governs application shutdown; scoped process-group reaping in a
  throwaway CI harness is a different authority, not an app cleanup strategy.

# Selecting tests is not isolating their effects

Learned 2026-09-24 during terminal-ownership qualification. Desktop's suites
mix inert cases with live multiplexer and PTY cases, so which tests run is an
operator-safety question. The Node test runner matches `--test-name-pattern`
against the full test name, ancestors included, not the short label a
reporter prints. A negative-lookahead filter meant as "everything except the
live tmux cases" therefore selected and ran them, a PTY test among them. The
green result and a log named "pure" proved neither what ran nor that nothing
native happened.

- **A name pattern is a positive allowlist, not an exclusion.** Exclusion uses
  the runner's explicit skip pattern. Neither flag is an authorization or
  effect-isolation boundary, just as pinned file globs bound discovery but
  not the effects inside a file they select.
- **Isolation precedes execution.** If native work is forbidden, a mixed
  module is not loaded against real process and PTY dependencies at all. The
  elimination route is separate inert entrypoints with injected effects, with
  native cases confined to authorised CI or operator-owned acceptance jobs. A
  pre-dispatch tripwire may supplement it, but only if it covers direct,
  synchronous and promisified process calls. Live multiplexer tests run
  against an isolated server socket, never the operator's own server.
- **Read the actual selection before calling a run inert.** Check the
  reporter's selected names and counts. Checking afterwards is an audit, not
  prevention; it cannot undo a side effect.
- **On an unexpected native case, stop and report.** Preserve the truthful
  output. Do not re-run to explain the filter, and do not clean up
  speculatively. A similar session name or a present key table is not
  evidence of test residue, and establishing provenance and current use
  belongs to an authorised owner. Attribute any inspection of operator state
  to whoever actually made it. Closing the incident does not make the run a
  native acceptance of the reviewed head.

# A surface ships — or leaves — at the shell

Learned 2026-07-22 … 2026-07-25. A fully tested view was unreachable because
the production shell kept its own navigation list and special-cased the
route; module tests could not see it. A view is delivered only when a
shell-level test proves a user can reach it: the rail reads one importable
navigation manifest, every entry loads a mount-exporting module, and the
shared renderer harness is checked by enumerating every shipped view rather
than a hand-kept list, so the next view fails until it is wired. Removal is
the same property inverted. A removed or rolled-back surface leaves tendrils
in route families, harness tabs, styles, docs, every test root and the
user-facing recovery copy (one fallback still sent users to the view the same
change deleted), so a removal is an inventory, pinned by absence tests that
also assert one kept surface so they cannot pass on an empty scan, and the
reachability suite is inverted rather than deleted.

# Elimination route

Individual traps belong in tests and harness structure in the repository;
many here already have that protection. The source-slicing seam remains
explicit debt until entry-point logic is importable. What stays knowledge
is the judgment: which evidence counts, when a review loop is over, and what
may not be run on a human's machine.

# Related

[The loopback interface is Desktop's trust boundary](../decisions/loopback-trust-boundary-and-transport-simplicity.md);
[Workspace admission is privileged and transactional](../decisions/privileged-workspace-admission.md);
[Async completion must still own the user's intent](asynchronous-intent-and-truthful-outcomes.md);
[Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md).

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/shell-nav-reachability-manifest.md, shared-renderer-harness-enumeration-test.md, dormant-surface-removal-inventory.md, scope-rollback-absence-pins.md and agents/oats-expert/soul/knowledge/lessons/surface-removal-inventory-user-guidance.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/main-mjs-source-tests.md; notes/698-server-owner-lifeline.md. The source records the missed VM-context dependency and CI failure in [awebai/oats#806](https://github.com/awebai/oats/pull/806); this harvest did not rerun the suite.
