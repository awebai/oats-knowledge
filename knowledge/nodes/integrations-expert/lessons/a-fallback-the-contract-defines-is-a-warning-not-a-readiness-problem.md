---
type: Lesson
title: A fallback the contract defines is a warning, not a readiness problem
description: When the contract says an input degrades to a defined default (an unmapped team label resolves to the personal team), the provider's spawn and readiness must take the default and warn, never refuse or report needs-configuration; a discovery-level warning and operational readiness are separate, and a provider that blocks on a defined fallback turns the kernel's warning into an outage.
tags: [integrations, readiness, fallback, contracts, warnings]
timestamp: 2026-09-25
---

**Observed.** The teams contract made an unmapped soul label a discovery
warning that resolves to the personal team. The provider's first release
kept its older behaviour: spawn refused ("cannot determine target team for
label …") and readiness answered needs-configuration for exactly that
input. The kernel warned, the provider blocked, and an instance the contract
said should run did not.

**Rules.**
- Read the contract's fallbacks as behaviour to implement, not as inputs to
  reject: take the default, and say so with a warning that names the input
  and the default used (`team-unmapped`, "using personal team …").
- Keep readiness status honest about operation, not about configuration
  taste: the status is ready when the instance can run on the fallback, and
  the warning carries the improvement the operator may make.
- Test the fallback with the real binary and the kernel's actual signal
  (`mapped: false`), not only the refusal path.
