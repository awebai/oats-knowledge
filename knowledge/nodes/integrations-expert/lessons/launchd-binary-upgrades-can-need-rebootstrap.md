---
type: Lesson
title: Binary replacement can require re-bootstrapping a launchd job
description: A reported post-upgrade launchd refusal recovered with bootout and bootstrap rather than kickstart, so provider upgrade handling must distinguish a loaded job from a runnable service.
tags: [integrations, launchd, services, upgrades, acceptance]
timestamp: 2026-11-04
---
# An unchanged job can stop being runnable

The source reports a macOS field failure after an upgrade to aw 1.36.54
replaced the native executable. The wake broker's loaded launchd job would
not run: `launchctl print` reported exit 78 (EX_CONFIG) and the diagnostic
`needs LWCR update`. `launchctl kickstart -k` left it down; removing the job
with `launchctl bootout` and loading its plist again with
`launchctl bootstrap` restored service.

This is **source-reported**, relayed from a host operator rather than
reproduced by the proposer or this harvest. The exact macOS version was not
established. The source attributes the refusal to a job code requirement
retained from bootstrap becoming incompatible with the replacement binary's
signature. That is the reported explanation, not an independently verified
launchd-internals contract or a claim about every binary replacement.

# Reject kickstart as the complete upgrade strategy

For a provider that promises “rerun install after upgrading the program,”
restarting an unchanged loaded job is not sufficient evidence of recovery.
The reported failure kept the path and job while changing the executable;
comparing only the plist or treating “loaded” as “healthy” misses that
boundary. For this post-upgrade refusal, use bootout followed by bootstrap
of the provider-owned job rather than repeating kickstart, and verify that
the resulting service actually runs.

A long-running KeepAlive process can also hide the upgrade boundary while
it continues using its old executable. The source identifies its next exit
and attempted respawn as the delayed-failure risk; the capture does not
establish a separate custody-service reproduction. Include a loaded but
non-running job in upgrade recovery, but do not classify every idle launchd
job as broken or diagnose every exit 78 as a signature problem.

The [persisted-launcher lesson](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md)
owns executable-location lifetime. This is a different failure: a surviving
path does not prove that the service manager will admit its replacement
executable. Neither lesson grants permission to modify foreign jobs or to
perform host service operations from an unauthorized instance.

# Eliminate the reliance on operator memory

Put the reload into the provider's service-upgrade lifecycle, not just a
troubleshooting note. Regression coverage should distinguish job-file
changes from executable replacement at the same path, cover loaded-but-down
recovery, and verify bootout-before-bootstrap ordering and failure reporting.
Where an operator step remains necessary, name both operations rather than
an ambiguous “restart.” These are implementation and review targets, not
checks implemented or run by this harvest.

A command-sequence fake cannot establish which macOS versions enforce the
reported requirement. Apply the existing
[real-binary rehearsal discipline](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
to an authorized macOS upgrade-and-restart rehearsal, including the delayed
respawn case. Record the actual platform and signature transition before
extending the finding's scope. The proposal says a provider fix was being
built; it supplies no completed implementation, release or deployment proof.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-11-04; notes/launchd-restarts-need-bootout-after-a-binary-upgrade.md.

The captured proposal and note support the reported failure, failed
kickstart and successful bootout/bootstrap recovery. They do not establish
that this is the only possible recovery, that all macOS releases behave the
same way, or that another service manager cannot have an analogous upgrade
failure. No Linux comparison was reproduced here.
