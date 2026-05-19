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
- Top bar: key stat (current MW), settings gear (top-right)
- Main area: current tab content
- Bottom bar: search field (above tabs) + tab buttons (max 5)

### Tabs (MVP order, RU labels)
1. **Верстак** (workbench) — manual crafting (available from start)
2. **Добыча** (drills) — automated mining (each drill is upgradeable)
3. **Производство** (factories) — automated crafting (faster than workbench)
4. **Питание** (energy) — power generation and consumption overview

Other tabs (Ship, Stats, etc.) are accessed via icons in the top bar or via Settings, not bottom tabs.

### Settings
- Accessed via gear icon top-right
- Contains: sound, vibration, language, reset progress, export/import save, stats
- **Ad gallery:** "Просмотренные рекламы" — list of all ad cutscenes the player has triggered. Tap to rewatch.

## Search

- Per-tab search (each tab has its own independent search)
- Search only matches items relevant to the current tab
- Triggered by tapping the search bar at the bottom (above tab buttons)
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

- Tab "Производство"
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

## Storage Rules

- **Workbench storage cap is HARD 999 per resource.** Never upgradable, ever. This is intentional friction to push the player toward automation. Reaching 999 means "you're done mining by hand, build a drill".
- **Drill storage** is per-drill, upgradeable via research.
- **Factory storage** is shared (warehouse-style), upgradeable via Storage Building.
- **Storage Building level is gated by Ship level** — to upgrade storage you must first advance the Ship.

## Ship as Central Platform

The Ship is the central progression axis. The entire industry is built on top of it.

- Starts as crash debris (small flat footprint).
- Each Ship level expands the platform — visually grows in size as the player progresses.
- New decks and sections appear with each tier.
- Ship level gates Storage Building upgrades, which gate Factory capacity.
- Sequence: Build ship parts → Ship level up → Storage tier up → Factory storage up.

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

## Ad Cutscenes

Each MAM research node can be sped up once via watching a humorous ad cutscene. This is an entirely offline feature — videos are bundled inside the APK, no network calls.

### Mechanics

- Each research has its own unique ad video. Ads do not repeat across researches.
- Below the research progress bar is a button: **"Ускорить"** with a 🎬 icon next to it, hinting at the video.
- Tapping the button opens a fullscreen ad cutscene overlay.
- **"Пропустить"** (skip) button is available immediately — no forced watching.
- Whether the player watches fully or skips instantly, the bonus is granted on tap: **-50% of remaining research time**.
- After use, the button becomes greyed out and disabled for that research. One use per research, ever.
- Ad fullscreen overlay disables tab navigation while shown. Only "Пропустить" closes it.

### Content

- Ads are nostalgic / absurd / hilarious old commercials (Japanese roof tiles, 90s shampoo, etc.) curated by the developer.
- All videos are bundled in `src/assets/ads/` and shipped with the APK.
- Audio is included. Players can mute via system volume; in-game audio toggle (backlog) will also apply.
- Suggested format: MP4 (H.264), 480p, ~30 seconds, 5-20 MB each.
- File naming convention: `ad_<research_id>.mp4` (e.g. `ad_coal_drill.mp4`).

### Gallery

- Settings → "Просмотренные рекламы" (Watched ads).
- Lists all ads the player has unlocked (i.e. triggered at least once).
- Each item: video thumbnail (first frame), title (matching research name), tap to rewatch.
- Rewatching is free, no bonus, purely entertainment.
- Encourages players to share favorites with friends.

### Why this design

- Player retains control: opt-in, instant skip, no forced viewing.
- Variety: each ad is unique, so curiosity drives engagement.
- Gallery turns each ad into a small reward worth collecting.
- No real ads, no SDK, no network — game stays fully offline and respectful of the player.

## MAM (Research)

- Each upgrade or new building must first be unlocked in MAM
- Research costs resources (about 10x the normal cost) and produces a prototype
- After unlock, the actual building costs normal price
- Each research has a time cost (stored as seconds in state)
- 5 starting research nodes in MVP:
  1. Unlock Coal Drill
  2. Unlock Coal Generator
  3. Unlock Constructor
  4. Increase drill production +25%
  5. Increase storage capacity (factory only — Workbench cap is hard 999)

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
- **Battery / accumulator buildings:** store excess energy, release on demand. Buffers brief deficits (e.g. 5 minutes) while player rushes to upgrade generators. Deferred to keep early energy mechanics simple.
- **Golden ad:** rare premium ad cutscene with doubled bonus (-100% time = instant completion). Triggers on a random small chance when "Ускорить" is tapped.

---

# Long-term Vision (Sequel & Beyond)

Direction for the game's evolution after MVP ships.

## Sequel: Space Phase

After the player builds the ship and escapes the planet (current MVP end), the natural continuation is space.

- **Setting:** open space, asteroid fields.
- **Mining shift:** no more coal (it doesn't exist in asteroids). Iron, ice, rare metals.
- **Energy shift:** ice → water → hydrogen → fusion. Brand new energy chain.
- **Story arc:** find a new home or build one. Search for habitable planets, or terraform.
- **Why this matters:** MVP ending no longer feels like "the end" but like "act 1 finale". Player isn't disappointed by winning — they're hyped for what's next.

## Visual Growth of the Platform

Ship grows visibly tier by tier. Player sees their base literally become bigger.

- Tier 1: crash debris, small flat surface, 1-2 buildings fit.
- Tier 5: organized base, multiple decks, factories visible.
- Tier 10+: massive industrial platform, vertical sections.
- Possible rendering: 2D grid or simple SVG diagram, top-down or isometric.

This becomes a strong silent reward: the player doesn't need text to feel they progressed.

---

## Tech Stack (decided later)

- Vue 3 + Vite (decided)
- Pinia for state management (decided)
- localStorage for save (decided)
- No backend
- Build target: PWA, then APK via bubblewrap (in proot-distro Ubuntu inside Termux)

---

# Open Questions

Things we haven't decided yet:

- Exact tick rate visualization (animation smoothness vs CPU)
- Whether to allow building multiple instances of the same factory type
- Maximum upgrade level per building
- Specific numbers (production rates, costs) — will balance during playtesting
- Visual style: stylized realistic icons (Iron Ore, Coal, Drill, Solar Panel done in this style)

---

*Document version: 0.3*
*Last updated: 2026-05-19*
*Maintained by: anikiliss + Claude (Kisa)*
