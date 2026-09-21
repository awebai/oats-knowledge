---
type: Lesson
title: Verification judgment for Desktop's privileged surfaces
description: Security and race guards on the loopback server, IPC proxy, file viewers and terminal attach are proven only by driving the real boundary and failing when the guard is removed; review loops end when findings turn into test-strength findings; packaged GUI launches are never verification on an operator's machine.
tags: [desktop, verification, security, review, testing-judgment, operator-safety]
timestamp: 2026-07-25
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
   adding speculative assertions. The operator ruled a five-round loop
   "overboard" when it became testing tests (2026-07-24). Consumer-parity
   evidence — the published artifact behaving correctly — is a better
   late-slice confidence source than more unit tests.

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
- Electron's `before-quit` does not fire on signals; a child server leaks on
  a plain kill unless the shutdown path is wired to signal handlers.

# Elimination route

The individual traps here have already become tests and harness structure in
the repository; that is where they belong. What stays knowledge is the
judgment: which evidence counts, when a review loop is over, and what may not
be run on a human's machine.

# Related

[The loopback interface is Desktop's trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md);
[Workspace admission is privileged and transactional](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md);
[Async completion must still own the user's intent](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md);
[Terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md).

# Citations

1. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/behavioral-security-regressions.md`; SHA-256 `7a367ce2d8057f5513f4a3ee7e1043d910d9a619a7197afe1c901365e5fd9265`.
2. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/race-guard-tests-overlap-generations.md`; SHA-256 `8fd224ee4019939198b58897d8391f437a7f7ab90b9f3eb114c3a20fb0d1234e`.
3. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/regression-tests-bug-layer.md`; SHA-256 `ba4a06c7eb7434c17d27c6d5441ca2f142fc48f67ac1017861f0fde7fa736a5a`.
4. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/review-loop-scope-ratchet.md` (operator ruling 2026-07-24); SHA-256 `1622ceb4610631d4ac7819dad326f17669bc81994b26f6e171cb21b45bf22ade`.
5. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/no-packaged-gui-launches-local.md`; SHA-256 `cbf4ac7cbedfb273219c5bfa4e064504070b4d8e94ff8f21c1c3527b36fe85a8`.
6. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/electron-smoke-process-group-reaping.md`; SHA-256 `2992933665450a4fa9566c85e6d5060ba9c61edc7f2fde25ee06e53e39623abd`.
7. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/electron-headless-verification.md`; SHA-256 `fc26148aea9fc312a208e6607be7717b2a96239518b4250ff500da30fe36ec27`.
8. OATS rationale source `agents/oats-desktop-engineer/soul/knowledge/lessons/pkill-scoping-discipline.md`; SHA-256 `fd8e6a55acf1c98b13ddacb8c3d8bdc1eb25c9ba5e5b287088f504da9bb5bed9`.
