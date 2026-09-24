---
type: Lesson
title: A merged provider payload cannot enforce host-only keys — the resolver, not the hook, refuses a setting that must come from the host file
description: A hook receives one deep-merged settings map with no layer provenance, so a rule like "this key may come only from the host-local file" cannot be enforced in the provider; declare the key host-only in the manifest and let the resolver reject it in every other layer.
tags: [lesson, integrations, settings, provenance, security, manifest, resolver]
timestamp: 2026-09-24
---

Learned 2026-09-24 while specifying a messaging provider whose resident-to-custody
map must never come from a committed file.

# Rule

- A provider's settings arrive as **one merged map**: workspace base, per-team
  block, soul payload, host-local file and per-spawn pairs, deep-merged in
  that order. By the time the hook runs, the origin of each key is gone.
- Therefore a setting that must be **host-owned** (a path to a credential
  custody directory, a machine-local socket) cannot be protected inside the
  provider. The provider documents the rule and fails on an unresolvable
  value; it does not guess provenance from the shape of the value.
- The place to refuse it is the **resolver**, where the layers are still
  separate: the manifest declares the key host-only and the kernel rejects it
  in every committed or per-spawn layer with a typed schema error, the same
  way it refuses a reserved key today.

# Why

A committed workspace file that can point a spawn at a custody directory on
someone's machine is a way to make a spawn serve an identity it was never
meant to serve. The hook cannot tell that map from the one the host file
provides. Only the component that sees the layers can, and the kernel already
has the mechanism for a reserved key; extending it to a capability-declared
attribute keeps the kernel ignorant of what the key means. Declaring the
attribute is not free until the manifest schema knows it: an unknown
attribute on a settings entry fails the manifest gates, so the schema change
lands before the declaration, never together.

# Consequences

- Provider authors list their host-only keys in the manifest once the schema
  accepts the attribute, and say in their docs which keys are host-only
  meanwhile.
- Operators place such keys in the host-local file only
  ([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).
- The kernel's side of the rule (declared ownership of inputs, refusal by the
  resolver) is recorded in
  [operator bindings: flat map, declared ownership](/nodes/oats-kernel-expert/decisions/operator-bindings-flat-map-declared-ownership.md).

# Citations

- Maintainer's inbox note of the same name (2026-09-24) and decision 27's
  host-only item in the oats-expert node
  ([the served identity is a messaging-layer fact](/nodes/oats-expert/decisions/served-identity-is-a-messaging-layer-fact.md)).
