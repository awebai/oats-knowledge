---
type: Lesson
title: Spawn probe telemetry can masquerade as Git cost
description: Attribute synchronous child cost before optimizing Git, and keep the Claude telemetry opt-out local to the plugin probe because carrying it into a launch disables channels.
tags: [kernel, spawn, performance, profiling, claude-code, environment]
timestamp: 2026-10-15
---
# Finding

A sampled `spawnSync` self-time total does not identify the child responsible.
In the source's 2026-10-15 investigation, roughly 0.65–0.9 seconds had been
attributed to repeated Git calls into the remote cache. A child-process
timeline paired with a CPU profile aggregated by kernel caller instead put
627 of 647 milliseconds under the harness-package gate's
`claude plugin list --json` probe [1].

On that throwaway deployment with Claude Code 2.1.288, the source measured:

- Git cache calls at 1–22 milliseconds each. A long-lived `cat-file --batch`
  process's elapsed lifetime was not time spent doing Git work.
- The plugin probe at 610–770 milliseconds, falling to 200–207 milliseconds
  with `DISABLE_TELEMETRY=1`, with byte-identical output. The source attributed
  roughly 0.43 seconds to Claude's telemetry flush at exit.

The diagnostic lesson is to correlate child start/end timestamps with the
caller's profile before removing allegedly redundant work. Instrumenting
child-process calls distinguished a synchronous harness probe from Git;
sampling alone had not. These are source-reported measurements from one host
and one Claude version, not a spawn latency budget or a universal Git cost.
Re-measure when the harness changes.

# The optimization stops at the probe

The selected fix puts `DISABLE_TELEMETRY=1` on this probe alone. The same
investigation reports that Claude disables channels in a session whose launch
environment opts out of telemetry. Carrying the optimization into a launch
would therefore cut aweb channel delivery. Do not mutate a shared or launch
environment to speed up a read-only probe.

This is not a new [native-launch policy](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
or permission to override an operator's settings. It is a boundary on the
optimization's own environment override. Preserve the required-plugin gate;
one version's byte-identical listing does not establish equivalence for every
future Claude release. The source reports a regression asserting that the
pane environment does not receive the probe override. Probe-output checks and
launch-environment regressions are the enforcement route, not a standing
manual workaround.

# Alternatives rejected in this investigation

- **Cache the probe answer between preview and apply.** This widens the
  required-plugin gate's race window and silently extends what `--max-age`
  covers. The [preview-bound observation exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
  does not authorize caching this gate.
- **Overlap the probe with hooks or materialization.** This violates the
  [pre-commit refusal boundary](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md);
  faster work is not useful if a failing gate can run after effects begin.
- **Start the probe speculatively beside remote-reference discovery.** Its
  inputs come from resolution, and the remaining measured probe cost was
  only about 0.2 seconds after the telemetry cut.
- **Cache `ls-tree` by commit or enable Node's compile cache.** The targeted
  costs were small (`ls-tree` took 6–22 milliseconds; the compile-cache gain
  was about 30 milliseconds), while the compile cache added temporary-storage
  effects. These are
  workload-specific rejections, not permanent prohibitions on either cache.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-spawn-resolution-speed, 2026-10-15; notes/spawn-probe-cost-is-claude-telemetry-flush.md; notes/preview-bound-apply-may-reuse-observations.md.

1. The proposal and notes identify [awebai/oats#1246](https://github.com/awebai/oats/issues/1246)
   as the investigation and report the repair merged in
   [#1259](https://github.com/awebai/oats/pull/1259). Measurements, telemetry
   attribution, channel behavior, implementation and tests are source-reported;
   this harvest did not reproduce them or audit the implementation.
