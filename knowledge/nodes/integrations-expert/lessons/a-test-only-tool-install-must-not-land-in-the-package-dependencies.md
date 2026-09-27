---
type: Lesson
title: A test-only tool installed with npm --prefix inside the repository lands in the package's dependencies
description: Installing a published CLI for tests with `npm install --prefix <repo> <pkg>@<version>` writes it into package.json and package-lock.json, so a capability that must ship no runtime dependency closure then carries one; install such tools into a prefix outside the repository, or remove the entry and regenerate the lock before pushing.
tags: [lesson, integrations, testing, packaging, npm]
timestamp: 2026-09-26
---

Observed in a messaging-provider release: the developer installed the
published messaging CLI for the real-binary tests with `npm install --prefix`
pointed at the repository, and npm saved it as a dependency of the package,
which the capability must not carry.

**Rule.** Install test-only tools into a scratch prefix outside the
repository (`npm install --prefix <scratch>`) and put its `node_modules/.bin`
first on PATH, as
[a real-CLI rehearsal controls which binary PATH resolves](/nodes/integrations-expert/lessons/a-real-cli-rehearsal-controls-which-binary-path-resolves.md)
requires anyway. If one landed in the repository's manifest, remove it and
regenerate the lock before the push. A reviewer checks
`git diff package.json package-lock.json` on every provider release.
