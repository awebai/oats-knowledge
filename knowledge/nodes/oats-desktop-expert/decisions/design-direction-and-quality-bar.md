---
type: Decision
title: One design authority, a stated quality bar, and a native terminal
description: The Desktop expert owns UX and design direction and the developer implements it; the quality bar is calm, coherent and accessible; a visual redesign never restyles the native terminal surface.
tags: [desktop, design, ux, quality, accessibility, terminal, ownership]
timestamp: 2026-09-29
---
# Rationale

**One design authority** (human direction, 2026-09-29). Desktop has two
roles: `oats-desktop-expert` owns product rationale *and* UX and design
direction (information architecture, interaction design, visual language,
themes, accessibility, experience coherence), and `oats-desktop-developer`
builds all of `packages/desktop`, renderer views, styles, themes and copy
included, proposing design changes rather than drifting on them. A separate
designer soul was removed. It had its own authority over the renderer while
the expert held the interaction rationale and the developer held the rest of
the package, so a UI change crossed three roles, and the designer carried
the expert's skills unchanged. Rejected: keeping a designer that also
implements renderer work (it splits one package's code between two builders
and one design question between two authorities); a designer that only
advises (a third voice with nothing to own).

**Design direction.** Agents and their relationships stay at the centre of
the product ([Agent-centered navigation](agent-centered-navigation.md)), and
the product optimizes for situational awareness across large, active teams.
Before an unfamiliar flow changes, it is researched and specified; an
established design decision is changed only after reading why it was made.

**Quality bar.** Professional, calm, coherent and efficient. Clear hierarchy
and predictable interaction beat decoration. WCAG AA holds in every supported
theme, proven on effective colours
([Accessibility is proven on effective colours](../lessons/effective-contrast-over-token-pairs.md)),
and important flows are verified live, not only in the DOM.

# A redesign does not restyle the native terminal

A design-parity pass (Redesign v3, 2026-09-24) gave terminal tabs a
"transcript rhythm": 12px type, a 1.7 line height and a vertical inset. On
the real agent terminal it read as wrong: spaced-out rows between tool calls,
smaller text, and xterm's block cursor stretched to 1.7 rows, because the
cursor fills the whole cell. The human reverted it on 2026-09-29 to the
geometry chosen on 2026-07-23: 13px system monospace, xterm's default line
height, 32px side gutters and no vertical inset. tmux owns row spacing. The
terminal is the agent's own native surface
([Terminal tabs are viewers](terminal-viewers-not-session-owners.md)), so
design tokens may theme its colours but not its cell geometry. A mockup's
typography for a terminal region is not a spec for the live terminal. Test
it against a real TUI (box drawing, the cursor at an input line) before
adopting it.

# Current contracts

- [Current souls/oats-desktop-expert/AGENTS.md](https://github.com/awebai/oats/blob/main/souls/oats-desktop-expert/AGENTS.md)
- [Current souls/oats-desktop-developer/AGENTS.md](https://github.com/awebai/oats/blob/main/souls/oats-desktop-developer/AGENTS.md)
- [Current packages/desktop/renderer/terminal-tab.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/terminal-tab.mjs)

# Citations

1. Human direction 2026-09-29, relayed by oats-expert-lead: "keep only desktop expert and desktop developer, and the expert is also a UX expert"; awebai/oats#311.
2. Human request 2026-09-29 (terminal "looks off" against OAS and the early redesign); awebai/oats#307 @ a5abfd86, reverting the terminal typography of awebai/oats#137 to 060de502 (2026-07-23, "preserve native terminal geometry").
3. The removed designer soul's principles and quality bar, souls/oats-desktop-designer/AGENTS.md @ a5abfd86.
