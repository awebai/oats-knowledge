---
type: Decision
title: Harness authentication is native and user-managed; OATS never handles credentials
description: Users authenticate their harness through its own mechanisms and OATS launches it in that native authenticated context; OATS never parses, copies, stores or wraps credentials, never imposes an API-key-only subset, and never swaps HOME or profiles to make isolation evidence pass.
tags: [kernel, runtime, harnesses, authentication, credentials, boundaries]
timestamp: 2026-09-18
---
# Rationale

Accepted by the human 2026-09-18. A proposed first captured SDK host for Pi
introduced an explicit auth-file argument, an OATS-owned read-through
credential store and an API-key-only restriction. That would have put OATS in
charge of credential selection, formats and lifecycle, and would have excluded
an already-authenticated OAuth or subscription installation. The human
rejected that responsibility split outright: OATS must not require a new key,
a different login method or an OATS-managed credential layer merely to launch
a harness the user has already authenticated. The rule applies to every
supported harness, not only Pi.

**The harness owns authentication.** Users log in and configure their harness
through its own supported mechanisms, independently of OATS. OATS launches the
selected harness with its normal native authenticated context; a thin SDK host
uses the harness's supported native authentication facilities rather than
replacing them. Credential resolution, configured credential helpers, OAuth
refresh and native credential persistence are performed by the harness. OATS
never parses, filters, copies, converts, injects or stores harness credentials;
never wraps a credential store or creates an auth service; never imposes an
API-key-only subset; never asks users to supply secrets to OATS; never adds an
auth-file selector or credential-format contract as a launch prerequisite; and
preserves the user's ordinary native profile selection instead of introducing a
parallel account-selection model.

Missing, expired or invalid authentication surfaces as the harness's own
non-secret failure for the user to resolve. OATS does not silently log in,
repair accounts, create keys, borrow identities or claim readiness from model
metadata.

**Two boundaries stay separate.** Resource composition and curriculum are
OATS-controlled (the [selected profile per harness](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md));
authentication is harness-controlled. Neither policy requires isolating,
cloning or replacing native authentication. Do not change HOME, native profile
directories or the authentication environment to an empty or private surrogate
merely to make resource-isolation evidence pass; keep the selected curriculum
and owned session-history placement independent of the native authentication
context. If a supported SDK interface cannot preserve both native
authentication and the required resource/history boundaries, name the precise
limitation — do not reach for private APIs, copied credentials or a wrapper.

Native authentication is not a current-config fallback: OATS still honours the
captured runtime and model selection and must not substitute an unrelated
model or source. Being logged into a harness establishes nothing about a
messaging principal's human, context, team or grants; harness authentication
and external-service authorisation are separate axes (see the
[messaging boundary](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md)).

# Consequences

- Real execution acceptance uses a harness the operator has already
  authenticated normally; acceptance must never create, copy or reformat
  credentials to make a test pass. Inert SDK construction and in-memory test
  fixtures are valid inert tests, not authentication policy or live readiness.
- Corollary lesson (2026-09-18): curating a harness's curriculum does not make
  OATS the owner of its authentication. The two were conflated once and the
  conflation was rejected; do not re-derive it from "OATS controls the launch".

# Related

[Strict curriculum is a Pi-profile claim](/nodes/oats-kernel-expert/decisions/native-launch-strict-pi-only.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md);
[A promised replacement guarantee needs an external identity witness](/nodes/oats-kernel-expert/decisions/external-witness-for-captured-session-identity.md).

# Citations

1. OATS rationale source `agents/oats-expert/soul/knowledge/decisions/harness-native-authentication.md` (accepted 2026-09-18).
