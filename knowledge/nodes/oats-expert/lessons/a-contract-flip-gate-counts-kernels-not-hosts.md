---
type: Lesson
title: A gate on "every host is updated" counts kernels, not hosts
description: One host can run several kernels, one per node version, and its schedule unit records its own kernel path, so before a contract flip read every install and the unit's path and check a capability the update adds rather than a version number.
tags: [planning, migration, contracts, gates, hosts, kernels, schedule, evidence]
timestamp: 2026-10-30
---
# A host is not one kernel

A gate that says "every host runs the new kernel" assumes one kernel per
host. That is not what a host is. Each node version has its own global npm
prefix and so its own kernel install, and a user-level bin directory can
hold a third. `oats --version` from a home reports the kernel that home's
shim names and says nothing about the others.

The schedule unit is the install that matters most and is the easiest to
miss. The unit records its own kernel path, written only when the schedule
host is installed. Nothing an update does to the homes rewrites it. After a
contract flip, that older kernel keeps running triggered spawns unattended
and fails them with nobody watching, while every reading taken from a home
says the host is updated.

The source reports one host whose homes ran one release under one node
version while its schedule tick ran an older release under another; this
is the reported case, not a survey of hosts.

# What the gate reads instead

Before a flip that an old kernel cannot follow:

- Enumerate every install on the host: each node prefix, the user-level
  bin directory, and the path the schedule unit itself names. Treat the
  unit's path as a separate install even when it resolves into a prefix
  already listed.
- Check a **capability the bridge release adds**, not a version number. A
  version string proves what was installed somewhere; a field or behaviour
  only the bridge produces proves that the install being asked is the one
  that will run. The source's bridge added a declared `package` field and
  used its presence as the check.
- Count the gate as passed per kernel, never per host.

This extends [dating host-read facts](/nodes/oats-expert/lessons/date-host-read-facts-before-an-adoption-gate.md):
that lesson makes a version reading name its host and observation time;
this one says a host has several readings, and the one nobody takes is
the schedule unit's. Upgrade sequencing for a deployment remains the
operator's [host-requirements lesson](/nodes/oats-operator-expert/lessons/check-target-provider-host-requirements-before-sync.md).

# Elimination route

The lasting fix is a kernel-side check that reports when the schedule unit
runs a different kernel from the homes on the same host, so a gate can read
one answer instead of enumerating prefixes. Until that exists, the lesson
stands and the enumeration is manual.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-10-30; notes/flip-gate-is-per-kernel.md.

Observed while preparing one repository move for one team's hosts. The
host's kernel and node versions, and the unit's recorded path, are
source-reported; this harvest did not inspect the host. The claim that only
the schedule install command writes the unit's path is the source's reading
and was not independently checked against the kernel.
