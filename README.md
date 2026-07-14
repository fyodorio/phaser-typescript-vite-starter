# Modern Phaser+TypeScript+Vite starter

A minimal pixel-art platformer, scaffolded clean on the latest stack:

- **[Phaser 4](https://phaser.io/)** — 2D game framework
- **[TypeScript 7](https://www.typescriptlang.org/)** — type checking
- **[Vite 8](https://vite.dev/)** — dev server & bundler (Rolldown + Oxc under the hood)

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
vite.config.ts          # Vite config (dev server + build)
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

To replace the placeholder art with real spritesheets, drop them in `public/` (or
import them) and swap the `generateTexture` calls in `Boot.ts` for `this.load.*`
in a preloader.

## Feedback & contributing

This is a starter template, so the real test is what happens when **you** build
on it. If you scaffolded a project from this and something broke, felt awkward,
or was missing, I want to hear about it.

- **Found a bug?** [Open an issue](../../issues/new/choose) — include your Node
  version, OS, and a snippet or repro if you can.
- **Something felt clunky in your own project?** That's the most useful feedback
  there is. Tell me what you were trying to do.
- **Not sure if it's a bug?** Open an issue anyway — no report is too small, and
  questions are welcome.
- **Want to fix it yourself?** PRs are welcome; open an issue first for anything
  substantial so we can talk it through.

I read every issue.
