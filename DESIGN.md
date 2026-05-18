# NexusFactory — Game Design Document

> Living document. Source of truth for what the game is, what's in MVP, and what's in the backlog.

## High-Level Concept

You crash-landed on an unknown planet. Your salvaged solar panels barely keep your basic systems running. You need to mine resources, craft parts, build factories, research technology, and eventually assemble an upgraded spaceship to escape.

- **Genre:** Idle / Incremental / Management
- **Platform:** Browser (HTML/JS), packaged as APK via PWA
- **Orientation:** Portrait (phone)
- **Game loop tick:** 1 second
- **Save:** localStorage (browser/APK)
- **Offline progress:** counted on next launch, no cap

## Core Game Loop

1. Mine raw resources from drills
2. Craft parts (manually on workbench, or automatically in factories)
3. Spend resources on MAM (research) to unlock new buildings/recipes
4. Build more advanced factories
5. Generate enough power for everything to run
6. Build ship parts to progress the story
7. Final goal: install Jetson Thor 1PB processor, launch ship, win

## Win Condition

Build all ship modules ending with the final Jetson Thor 1PB processor.
On completion: cutscene placeholder (black screen with "CUTSCENE" text + skip button) leading to titles. Game ends.

## UI Layout

### Screen Structure
- Android status bar visible (time, battery, signal)
- Game is NOT fullscreen by default (fullscreen is a future setting)
- Top bar: search field, key stat (current MW), settings gear (top-right)
- Main area: current tab content
- Bottom bar: tab buttons (max 5)

### Tabs (MVP order)
1. **Workbench** — manual crafting (available from start)
2. **Drills** — automated mining (each drill is upgradeable)
3. **Factories** — automated crafting (faster than workbench)
4. **Energy** — power generation and consumption overview

Other tabs (Ship, Stats, etc.) are accessed via icons in the top bar or via Settings, not bottom tabs.

### Settings
- Accessed via gear icon top-right
- Contains: sound, vibration, language, reset progress, export/import save, stats

## Search

- Per-tab search (each tab has its own independent search)
- Search only matches items relevant to the current tab
- Triggered by tapping the search bar at the top
- Fullscreen overlay opens with input field at bottom (above keyboard)
- Results above the input, scrollable
- Each result row: icon left, name center, pin/delete buttons right
- Substring matching, case-insensitive
- Matched substring is highlighted in results
- Per-tab history of last 20 queries
- Pinned items stay on top, never auto-evicted
- Tap result: close search, open the item's detail screen
- Back button: close search

## Navigation Stack

Back button works like a hierarchy:

- Tab "Factories"
  - List of factory types (Constructor, Assembler, Smelter...)
    - Specific factory instance (recipes: gold ingot, ...)
      - Upgrade window (production speed)
        - Fine-tuning (energy slider, power cuts)

Each Back returns one level up.

## Resources (MVP)

Only 2 raw resources to start:
- **Iron ore** — basic structural material
- **Coal** — fuel for early power generation

Backlog resources (not in MVP): copper, gold, wood, water, oil, gasoline, fuel oil, sulfur, plastic, silver, uranium, argon, oxygen, paper, ...

## Buildings (MVP)

- **Workbench** — manual crafting (always available, no power)
- **Iron Drill** — auto-mines iron ore
- **Coal Drill** — auto-mines coal
- **Solar Panel** — starting power source (limited)
- **Coal Generator** — better power, consumes coal
- **Constructor** — single automated factory (e.g. ingot to plate)

## Energy System

- Each building has a max power draw in MW
- Each building has a 0-100% energy slider in its detail screen
- Production scales linearly with energy %
- If global generation is less than demand: all consumers automatically reduced proportionally (future: priority queue per building)
- Energy tab shows:
  - Current generation (blue line on graph)
  - Current consumption (yellow line on graph)
  - Graph X axis: last 1 hour of game time
  - List of consumers sorted by usage

## MAM (Research)

- Each upgrade or new building must first be unlocked in MAM
- Research costs resources (about 10x the normal cost) and produces a prototype
- After unlock, the actual building costs normal price
- 5 starting research nodes in MVP:
  1. Unlock Coal Drill
  2. Unlock Coal Generator
  3. Unlock Constructor
  4. Increase drill production +25%
  5. Increase storage capacity

## Save / Load

- Auto-save every 30 seconds, on tab change, and on app close
- Offline progress: calculated on launch as (now - lastSaveTime) times production rate
- Stored in localStorage as a single JSON object
- Export/import save: text dump for backup

## Tips & Tutorial

- First-time player sees inline tips on Workbench: "Tap to craft iron plate"
- Tips disappear after relevant action is performed
- Reserved space in UI for hints (not implemented in MVP, but layout accounts for them)

---

# Backlog (Post-MVP)

Ideas approved but deferred. Recorded so they're not lost.

## Expansion Ideas

- **Expeditions:** swipe-direction mini-game (up/left/right/down) on the planet's surface. Encounter monsters, gather loot.
- **Monsters & combat:** kill enemies for resources and DNA samples.
- **DNA samples:** reduce MAM research time by %.
- **Weapon crafting:** new production chain for expedition weapons.
- **Cutscene system:** placeholder black screen with title and skip button for narrative beats (ship parts complete, final launch, etc.).
- **Many more resources:** copper, gold, wood, water, oil, gasoline, fuel oil, sulfur, plastic, silver, uranium, argon, oxygen, paper.
- **Paper resource:** reduces cost of future MAM research.
- **Liquid/gas system:** oil refining, oxygen for smelter upgrades.
- **Jetson Thor processors:** insertable into buildings, set their production to infinity. Tiered: 1TB, 2TB, 4TB, up to 1PB (final).
- **Ship as standalone tab:** with build stages, each completed stage gives % buff to all factories.
- **Vouchers / boosters:** rewards from research for temporary speed/efficiency buffs.
- **AI generated icons:** Stable Diffusion / Midjourney style, flat design with long shadow, blue round badge.
- **Sound effects:** click, craft complete, error, etc. Toggleable.
- **Vibration:** on important events (research done, no power). Toggleable.
- **Statistics tab:** total resources mined, hours played, research completed.
- **Search optimization:** fuzzy matching, search across all tabs at once.
- **Fullscreen toggle:** for users who prefer immersion.
- **Cloud save:** sync between devices. Probably not.
- **Achievements:** with progress bars.
- **Cookie-clicker style tap-to-boost:** tap on drill for +1 ore or +5 sec speed.

## Tech Stack (decided later)

- Vue 3 + Vite (likely)
- Pinia for state management
- localStorage for save
- No backend
- Build target: PWA, then APK via bubblewrap (in proot-distro Ubuntu inside Termux)

---

# Open Questions

Things we haven't decided yet:

- Exact tick rate visualization (animation smoothness vs CPU)
- Whether to allow building multiple instances of the same factory type
- Maximum upgrade level per building
- Specific numbers (production rates, costs) — will balance during playtesting
- Visual style: flat design with long shadow (samples shown, not finalized)

---

*Document version: 0.1*
*Last updated: 2026-05-18*
*Maintained by: anikiliss + Claude (Kisa)*
