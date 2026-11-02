---
type: Reference
title: About these rules
description: What the rules are, where they come from, and the philosophy behind them
tags: [about]
status: stable
generated: { by: human:jpdevries, at: 2026-03-29T04:16:06-07:00 }
---
# markup.tips — Web Standards Rules for Agents

## Summary

Performance-first, accessibility-first patterns for building modern web UIs.
Each file is a self-contained rule an agent can apply without reading a full codebase.

Lighthouse 97 is not an accident. These patterns compound.

This directory is an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/open-knowledge-format)
v0.2 bundle. [index.md](index.md) lists every rule with its one-line description;
[log.md](log.md) records the bundle's history. Each rule is a `type: Rule` concept whose
frontmatter carries its title, description, tags, status, and provenance.

## Reference Implementation

[pantry-host](https://github.com/jpdevries/pantry-host) — a self-hosted kitchen manager.
Every rule in this directory is distilled from patterns proven in that codebase.

## Philosophy

- Use the platform. Reach for a native API before a library.
- Semantic HTML is free performance and free accessibility.
- CSS custom properties > component-scoped styles for theming.
- Offline is a feature, not an edge case.
- Never hard-code a color. Never reduce opacity on hover.
