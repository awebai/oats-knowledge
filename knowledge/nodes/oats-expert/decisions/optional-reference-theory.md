---
type: Decision
title: Optional reference theory, capability-owned runtime
description: OATS offers an adoptable reference knowledge theory while each capability owns its runtime behavior and may choose a different model.
tags: [knowledge, architecture, capabilities]
timestamp: 2026-09-17
---
# Accepted direction

The OATS founder accepted this direction in the human scoping discussion on
2026-09-13: OATS should teach and exemplify an opinionated reference knowledge
theory without making it universal provider policy. Default OKF follows that
theory; another knowledge capability may adopt it, adapt it, or choose a
different knowledge model.

# Rationale and rejected alternative

The same-day amendment superseded an earlier interpretation requiring common
knowledge doctrine and runtime protocols across all integrations. That approach
would turn a preferred theory into a restriction on users choosing different
knowledge approaches. An optional reference retains useful guidance without
removing that choice.

Each capability owns its complete runtime package: instructions, skills, memory
and capture conventions, reader tools, harvesting where applicable, validation,
and delivery. Explicit reuse through supported packaging is allowed. A
compulsory shared theory-runtime dependency, or a silent runtime behavior change
when reference documentation changes, is not the intended contract.

# Consequences for future decisions

When authoring or reviewing a knowledge capability, distinguish the generic
kernel contract from the reference model's choices. Do not reject an alternative
capability merely for using different knowledge theory. Provider autonomy still
preserves layer selection, configuration, lifecycle, executable trust, work-mode
boundaries, and repository governance.

**Where the line runs (reaffirmed 2026-09-16, helper contract accepted
2026-09-17, redesign lead with the human).** Kernel contracts are: the
selected provider and its exact approval; captured source and instance
context; versioned opaque binding and invocation inputs; lifecycle ordering
and required outcomes; independent helper execution; retained authority and
custody obligations. Capability functionality is: the knowledge model and
schema, storage and read views, episodic conventions and input selection,
the harvester and its prompts, promotion policy, validation, retries, delivery
and acceptance semantics. **No universal kernel harvester, mandatory
state-file layout or Git publisher follows** from the kernel contracts. Helper
injection is declared *per capability* (inherit, omit or file) for that
capability's own injection only; omission is never consent; helper memory
behaviour is reviewed as capability policy, never hardcoded reference-model
policy in the captured path
([kernel view](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
The 2026-09-19 [flexible-knowledge decision](/nodes/oats-expert/decisions/flexible-knowledge-and-situated-instances.md)
extends this: capabilities own their learning model and placement, not only
their runtime.

The knowledge-theory-expert is an authoring aid: it is not a required live
dispatcher, universal harvester, or approval service. Operating a capability
should not depend on that expert being alive or on fetching mutable reference
documentation at runtime. This records accepted rationale, not implementation
completion or a particular deployment's configuration.

# A lesson the reference theory carries forward

Memory contracts must be **symmetric** (discovered 2026-07-10 when the human
asked whether agents actually *use* their knowledge). The first knowledge
injection taught capture and harvest thoroughly and consultation in one
passing line; knowledge accumulated that nobody read, and only souls whose
own instructions said "consult first" compensated. Any knowledge capability —
default or alternative — that teaches writing without an equally explicit
index-first consult instruction is building an archive, not expertise.
Re-deriving what the base already knows is a defect.

# Evidence

Founder acceptance and same-day amendment, 2026-09-13, recorded in the OATS
architecture decision `provider-neutral-knowledge-and-harvest` (Status, Decision
1–4, Boundaries, and Citation 2).

Evidence: OKF input 947332ff26a4dfe521231a56529a86d83b28cd3ec6f49ccfec5fa13495750637
(note content hash 7f18936875de6be7b6aff8e6d5738ef7c384365c15cfe14b7e55e50238cc9aba).
Symmetry lesson: legacy `agents/oats-expert/soul/knowledge/lessons/okf-injection-read-side-gap.md`
(2026-07-10). Contract-versus-functionality line and helper contract: legacy
`decisions/provider-neutral-knowledge-and-harvest.md` amendments of 2026-09-16/17.
