# Decisions

Accepted positions on how the knowledge package behaves.

* [Consult explores accepted knowledge remotely; instances get no knowledge copy by default](consult-explores-accepted-knowledge-remotely-no-per-instance-copy.md) - Decided 2026-09-26 on the human's direction: oats.okf 3.0.0 adds read-only consult commands (bases, index, cat, ls, search, links) that serve a base's accepted commit from a host-wide bare partial-clone cache with reproducible receipts, no instance holds any knowledge copy (no spawn snapshot, no per-call views; read and refresh removed), a new okf-consult skill teaches consulting at task start and throughout while the okf skill defers to it, and every answer is confined to its base and to the accepted commit.
