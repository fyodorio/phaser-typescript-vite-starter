# gta

A minimal pixel-art platformer, scaffolded clean on the latest stack:

- **[Phaser 4](https://phaser.io/)** — 2D game framework
- **[Vite 8](https://vite.dev/)** — dev server & bundler (Rolldown + Oxc under the hood)
- **[TypeScript 7](https://www.typescriptlang.org/)** — type checking

No asset files: all sprites (player, ground, coins) are generated procedurally
at runtime, so the project builds and runs out of the box.

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:8080
npm run build    # type-check (tsc --noEmit) then production build to dist/
npm run preview  # serve the production build locally
```

## Controls

| Action | Keys |
| ------ | ---- |
| Move   | `←` / `→` or `A` / `D` |
| Jump   | `↑` / `W` / `Space` |

Collect the gold coins.

## Project layout

```
index.html              # entry HTML, mounts #game-container
vite.config.ts          # Vite config (Phaser split into its own chunk)
tsconfig.json           # TS 7, bundler module resolution
src/
  main.ts               # boots the game
  game/
    main.ts             # Phaser.Game config (resolution, physics, scenes)
    scenes/
      Boot.ts           # generates textures procedurally, then starts Play
      Play.ts           # the platformer: movement, jumping, coins
```

## Notes

Vite 8 minifies with Oxc by default, so there's no `terser` dependency. To
replace the placeholder art with real spritesheets, drop them in `public/` (or
import them) and swap the `generateTexture` calls in `Boot.ts` for `this.load.*`
in a preloader.
