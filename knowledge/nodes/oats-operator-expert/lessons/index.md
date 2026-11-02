# Lessons

Placement, identity, verification and adoption judgement learned operating deployments.

* [Trial runtime redirection excludes host-service proof](trial-runtime-redirection-excludes-host-service-proof.md) - A Linux trial reported that redirecting runtime state made the user service manager unreachable, so its successful tick-loop wake proves neither host-service installation nor complete containment.
* [Rootless messaging needs the server's database extensions, not just PostgreSQL](rootless-messaging-needs-required-database-extensions.md) - A rootless aweb trial failed with the pgserver wheel because pgcrypto was absent and succeeded with a PostgreSQL 16 build including that extension.
* [Claude trial metrics need origin and message identity](claude-trial-metrics-need-origin-and-message-identity.md) - In Claude Code 2.1.308 trial transcripts, origin-bearing user entries distinguish input turns from tool results, while message identity prevents repeated streaming usage from being counted twice.

* [Place each fact at the scope that owns it](place-each-fact-at-the-scope-that-owns-it.md) - Shared declarations, host facts or spawn: choose by how many holders the fact may have, meaning over type.
* [The installed provider is the authority for a setting](the-installed-provider-is-the-authority-for-a-setting.md) - The preview proves delivery, not effect; configure against what the locked provider reads.
* [Check the target provider's host requirements before sync](check-target-provider-host-requirements-before-sync.md) - Green checks against the current lock do not establish readiness for a moving provider; compare the target version's host requirements and satisfy them before writing the new lock.
* [The messaging root is a deployment-bounded host fact](messaging-root-placement-decides-the-team.md) - Where the root sits decides which team residents mint into; a root above the deployment is a silent cross-team leak.
* [Retire ordering for self-custodial identities](self-custodial-identity-retires-from-inside-the-home.md) - De-register from inside the home before removing it; a stranded record gets one deferred re-check.
* [A team-local identity is reachable only inside its team](a-team-local-identity-is-reachable-only-inside-its-team.md) - A seat other teams must contact needs a custody-served global identity, never a per-instance global mint.
* [Anything read through a shared checkout is only as current as that tree](shared-checkout-serves-a-stale-soul.md) - Validity is not currency; verify the tree against the remote and leave repair to its owner.
* [A shared checkout's local main leaks into every worktree spawned from it](a-shared-checkouts-local-main-leaks-into-every-spawned-worktree.md) - Branch from the remote main; commits a tree cannot push are stranded and ride every PR.
* [A channel's verified=false is the channel's verdict](a-channel-verification-flag-is-the-channels-verdict-not-the-senders.md) - Confirm with a CLI fetch and a registry lookup before asking the sender to rotate anything.
* [Tracker integrations are partial surfaces](tracker-integrations-are-partial-surfaces.md) - Tell an adopter up front what agents can operate in the tracker, what stays human-owned, and that gaps escalate.
