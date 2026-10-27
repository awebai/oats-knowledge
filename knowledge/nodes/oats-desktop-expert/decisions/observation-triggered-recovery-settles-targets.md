---
type: Decision
title: Observation-triggered recovery settles targets instead of scheduling retries
description: A shared observation-driven trigger waits for startup prerequisites, admits one sweep above a start-time floor, and settles unchanged refusals or ineligible homes so roster reads do not become an endless retry loop.
tags: [desktop, shared-client, recovery, observation, retry]
timestamp: 2026-10-27
---
# Client mechanics, not recovery authority

The Desktop expert's 2026-10-27 design addresses how a client should trigger
a kernel action repeatedly from roster observations. When the reviewed
recovery policy calls for continuous sweeps, keep the trigger rule shared
between clients and leave eligibility and lifecycle effects to the kernel.
The [maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
owns that policy; this client design does not itself supersede its trigger
scope or authorize recovery of an otherwise ineligible home.

**A floor alone does not stop a retry loop.** A permanently refused home can
remain visibly lost, so a client that tests only liveness and elapsed time
will sweep it again forever. Keep a client-run set of settled targets as
well as single flight and a minimum interval measured from the last sweep's
start. An observed lost local home requests a sweep only if it is not
settled. A read arriving while busy or below the floor is dropped: no queue
and no retry timer. The next ordinary roster read asks again.

A refusal, or a skip because the home is not lost or was not seen recently,
settles that home. Release it when a later sweep or roster observation shows
it changed. Settling is suppression of a redundant trigger, not a client
inference that the kernel's lost row is now healthy. It cannot waive the
kernel's own eligibility checks, lock or recovery bounds. Remote rows are
not local trigger evidence; keep the [unknown-state boundary](kernel-unknown-is-not-refined-by-a-client-probe.md).

# Arm after the data the sweep reads

Only the launch sweep arms later observation-driven triggering. In Desktop,
wait for the startup import of saved deployments into the machine registry
to settle, whether it succeeds or fails. Running the sweep concurrently can
miss deployments known only to Desktop on the first launch after an upgrade.
This ordering must not block window restore or the first roster read; reads
before arming simply do not initiate recovery.

Keep the runner and trigger in Desktop main, which already owns the notice
handoff and sees the panel replies it proxies. Moving the runner into the
replaceable bundled server was rejected because it would require a new
notice HTTP surface, main-to-server arming after import, and re-arming on
every server replacement. The lasting choice is to colocate observation,
arming and reporting with their existing owner, not to create a second
scheduler or transport just because another component also sees status.

# Report news, not the standing answer

The kernel may repeat a standing refusal in every sweep. Report a refusal
once per home/reason/code in a client run, and allow it again after that
home recovers. Successful resumes, fresh starts and blocked outcomes are
events of their sweep, not standing refusal duplicates. Trigger settling
and notice deduplication solve different problems: one avoids repeated work,
the other avoids teaching people to dismiss repetitive notices.

[Machine-scoped notices](machine-notices-are-action-free-and-outcome-driven.md)
own which outcomes justify a notice and when a host warning has actually
been shown. Do not equate receiving a warning with having reported it.

# Enforcement and evidence limits

Keep these invariants in the shared trigger and its composition tests:
pre-arm reads, import success/failure, one sweep in flight, start-time floor,
settlement and release, and refusal deduplication across recovery. Use the
ordinary observation cadence instead of introducing a retry loop.

Evidence: OKF proposal from oats-desktop-expert/session-resume-desktop-expert,
2026-10-27; notes/continuous-resume-trigger-in-main.md;
notes/sweep-after-startup-registry-import.md;
notes/resume-notice-only-for-home-outcomes.md.

The source reports product-owner direction relayed through the coordinator
for a continuous shared-client trigger. That is reported acceptance context,
not an independently audited human exchange or permission to replace the
maintainer's policy record. The proposal identifies
[awebai/oats#1567](https://github.com/awebai/oats/issues/1567) for the later
not-seen-recently skip contract and
[#1564](https://github.com/awebai/oats/pull/1564) for the then-unmerged client
implementation. The proposal's later skip rule refines the narrower initial
note. Floor/release behavior is reported as unit-tested; the live check
covered launch and a refused home not re-sweeping. This harvest did not run
those tests or establish end-to-end recovery on real deployments.
