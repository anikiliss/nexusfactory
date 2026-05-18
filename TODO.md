# NexusFactory — TODO

> Working list of tasks. Update as we go. Mark done with [x].
> Strict MVP scope. Anything outside MVP goes to DESIGN.md backlog, not here.

## Phase 1 — Project Setup

- [x] Install git in Termux
- [x] Configure git user (anikiliss / anikiliss@gmail.com)
- [x] Generate SSH key for GitHub
- [x] Add SSH key to GitHub account
- [x] Verify SSH connection to GitHub
- [x] Create local repo `~/projects/nexusfactory`
- [x] Create remote repo on GitHub (private)
- [x] Link local repo to remote
- [x] First commit (README.md)
- [x] Create DESIGN.md
- [x] Create TODO.md (this file)
- [x] Install Node.js in Termux
- [x] Initialize Vue 3 + Vite project skeleton
- [x] Verify `npm run dev` starts local server
- [x] Verify Chrome on phone can open the dev server
- [x] Create `.gitignore` (exclude node_modules, dist, etc.)
- [x] First commit of empty Vue project

## Phase 2 — Foundation (no gameplay yet)

- [x] App shell: status bar visible, top bar, main area, bottom bar with 4 tab buttons
- [x] Tab routing (switch content when tapping tab)
- [x] Pinia store: empty state object scaffold
- [x] Save/Load to localStorage (auto-save every 30s)
- [x] Offline progress placeholder (logs delta time, doesn't apply yet)
- [x] Settings screen accessible via gear icon
- [x] "Reset progress" button in Settings (with confirm)
- [x] Color palette and base styles (dark theme, neon accents)

## Phase 3 — Resources & Workbench

- [ ] Define data model for resources (id, name, icon, current amount, max storage)
- [ ] Iron ore and coal as starting resources (amount = 0)
- [ ] Workbench tab UI: list of recipes
- [ ] Recipe data model (input resources, output resource, craft time)
- [ ] Tap recipe to start crafting (single craft)
- [ ] Craft progress visual (progress bar)
- [ ] Add resource to inventory on craft complete
- [ ] Resource display in top bar (current MW, current iron, current coal)
- [ ] Storage cap: can't exceed max storage for a resource

## Phase 4 — Drills (auto-mining)

- [ ] Define data model for buildings (id, type, level, energy %, max power)
- [ ] Drills tab UI: list of drills + Build button
- [ ] Iron Drill: produces iron ore over time
- [ ] Coal Drill: produces coal over time (locked behind MAM)
- [ ] Drill detail screen: shows current production, upgrade button
- [ ] Upgrade button: increases production, costs resources
- [ ] Energy slider per drill (0-100%)
- [ ] Game tick: every second, all drills produce based on energy %

## Phase 5 — Energy

- [ ] Energy tab UI: total generation, total consumption, generators list
- [ ] Solar Panel: starting generator, fixed low output
- [ ] Coal Generator: locked, consumes coal, higher output
- [ ] Generation tick: solar always on, coal consumes coal per tick
- [ ] Demand vs supply calculation
- [ ] If demand > supply: scale down all consumers proportionally
- [ ] Display current generation/consumption numbers (no graph yet)

## Phase 6 — Factories

- [ ] Factories tab UI: list of factory types + Build button
- [ ] Constructor: takes input, produces output over time, consumes energy
- [ ] Factory detail screen: recipes, current recipe selection, upgrade
- [ ] Recipe selection: tap recipe in factory detail to set active recipe
- [ ] Factory tick: every second, if has input + energy, produces output

## Phase 7 — MAM (Research)

- [ ] MAM as a separate screen (icon in top bar or as part of a tab)
- [ ] Research data model (id, name, cost, unlocks)
- [ ] 5 starting research nodes (see DESIGN.md)
- [ ] Research consumes resources instantly
- [ ] On complete: unlock corresponding building/upgrade
- [ ] Lock state in UI (locked buildings shown greyed out)

## Phase 8 — Ship & Win

- [ ] Ship state (which modules built)
- [ ] Single ship module in MVP (e.g. "Engine") with high resource cost
- [ ] When built: cutscene placeholder (black screen, "CUTSCENE: launch", skip button)
- [ ] Titles screen ("Thanks for playing")
- [ ] Reset to play again

## Phase 9 — Polish & Test

- [ ] Save/load tested across browser close
- [ ] Offline progress actually applies on launch
- [ ] Balance pass: starting amounts, prices, production rates feel right
- [ ] All tab switches smooth
- [ ] No errors in browser console

## Phase 10 — Search (optional in MVP)

- [ ] Per-tab search overlay
- [ ] Substring matching, case-insensitive
- [ ] Highlight matched substring
- [ ] Per-tab history (max 20)
- [ ] Pinned items
- [ ] If we run out of time, skip in MVP and add in v0.2

---

# After MVP

Next steps once v0.1 is playable:
- Switch text/emoji icons to AI-generated images
- Sound effects
- Vibration
- Tips and tutorial system
- Energy graph
- Add a few more resources (copper, wood)
- Statistics screen
- Eventually: APK packaging via bubblewrap

---

*Last updated: 2026-05-18*
