# Lessons

* [A refusal that needs the old bytes is a pre-commit gate, never a post-hoc rollback](refusal-belongs-before-commit.md) - Decide inside the transaction while the old state is live; "do it, then undo it" is safe only for a pure inverse.
* [Identity and location belong to the resolved object, never to the string that named it](resolved-object-not-referring-string.md) - Guards compare canonical resolved objects and opened descriptors, never lexical paths or names.
* [Kernel-composed instructions are executable surface and may assert only what every instance has](kernel-composed-text-is-executable-surface.md) - Instructions beat code; shared text states the invariant, and capability content lives in its own inject.
* [Hook failures and error messages are output channels](hook-and-error-channels-disclose.md) - Argument vectors stop injection, not disclosure; credential-bearing failures are rebuilt and minted secrets suppressed.
* [The CLI as a machine boundary](machine-boundary-contract.md) - One stdout envelope, exit status as answer, explanations that survive a broken deployment, and refusals that name their cause.
* [A kernel fail-closed guarantee is proven only by its first real capability user](fail-closed-mechanism-proven-by-first-user.md) - Enforcement, its intended user and the schema must move together.
