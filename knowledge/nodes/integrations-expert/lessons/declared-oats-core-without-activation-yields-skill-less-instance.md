---
type: Lesson
title: A soul declaration that suppresses a default must also provision its replacement, or the instance silently loses both
description: On the classic path, a soul created with the default core capability requirement stopped receiving the kernel's operational block and skills, but nothing installed or activated the capability; spawn then scaffolded a home with zero skills and no warning.
tags: [lesson, oats-core, classic, composition, fail-silent, spawn]
timestamp: 2026-09-21
---

Learned 2026-09-21 by the integrations expert on a 0.24-series kernel in a
scratch repository (classic path; the verbs involved no longer exist on the
workspace model).

Soul creation wrote a requirement on the core capability with the catalog
source; composition read that declaration and dropped the kernel's own
operational block and its skills. Installing the framework package acquired
it but activated nothing; a scaffold-only spawn succeeded with no warnings
and the home's skills directory was empty. Only an explicit activation of
the core capability for that soul made the instance receive its operating
skills and injection. The doctor's only hint before that was a one-line note
that the kernel injection was absent because the capability was declared.

The general lesson: when a declaration is used to switch a default off, the
same path must either provision the replacement or refuse loudly. A
suppression that trusts a separate, undocumented activation step produces an
agent that knows nothing about its own lifecycle and reports no problem.
