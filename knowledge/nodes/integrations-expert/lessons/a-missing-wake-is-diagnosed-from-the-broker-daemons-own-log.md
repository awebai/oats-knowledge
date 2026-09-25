---
type: Lesson
title: A missing wake is diagnosed from the broker daemon's own log, not from its status rows
description: A wake broker row reading active with no pending hints and no attempt shows that delivery did not happen, not why; the daemon's service log names the cause, and the daemon's version is that of the binary its service manager started, independent of the client on PATH.
tags: [messaging, wake, diagnostics, grants, versioning]
timestamp: 2026-09-25
---

**Observed.** During a hosted grant rehearsal, a probe home registered with
the host wake broker never woke on inbound mail. The broker's status row read
active, no pending hints, no attempt, no submit, while every other home on
the host woke in the same minutes. The first report attributed this to the
server not routing wake hints to grant-registered homes. That attribution
was wrong.

**What the daemon's log said.** The broker's service log (where the service
manager sends the daemon's stderr) carried, for every registration of the
probe, a stream-unavailable line for the grant identity home every ten
seconds until deregistration, with the error that the directory was not
initialized for the client. The daemon never opened an event stream for the
home, so no event could reach it and nothing was filtered afterwards. The
daemon was an older client binary, started by the service manager weeks
earlier, that predates grant homes; the newer client on PATH, which the
launch hook used to register the home and to send through the grant, read
the same home without complaint.

**Rules.**
- A status row proves absence of delivery, never its cause. Before
  attributing a missing wake to the server, read the daemon's own log for
  the home's identity path and look for stream-connected versus
  stream-unavailable lines.
- The wake daemon is a separately long-running process. Its version is the
  version of the binary the service manager started, not the client on
  PATH; a client floor check does not cover it. Record the daemon's pid,
  binary, version and start time in any wake report.
- A grant home is only useful for wake if the daemon understands grant
  homes. Treat a daemon at or above the grant floor as a preflight condition
  of the messaging integration and surface it as a readiness problem rather
  than leaving it to be found by a silent probe; the position of record is
  [the readiness check of the daemon's version](/nodes/integrations-expert/decisions/the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md).
