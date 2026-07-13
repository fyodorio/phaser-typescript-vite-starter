import { Scene } from 'phaser';

/**
 * Generates all textures procedurally so the example has zero asset files and
 * builds/runs out of the box. Swap these for real spritesheets later.
 */
export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.makePlayerTexture();
    this.makeGroundTexture();
    this.makeCoinTexture();

    this.scene.start('Play');
  }

  /** A tiny 12x16 character: skin-tone head, blue body, two eyes. */
  private makePlayerTexture() {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0xffccaa); // head
    g.fillRect(2, 0, 8, 6);
    g.fillStyle(0x29adff); // body
    g.fillRect(2, 6, 8, 10);
    g.fillStyle(0x000000); // eyes
    g.fillRect(4, 2, 1, 2);
    g.fillRect(7, 2, 1, 2);
    g.generateTexture('player', 12, 16);
    g.destroy();
  }

  /** A 16x16 tile: grass cap over dirt. Tiled to build platforms. */
  private makeGroundTexture() {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x00873c); // grass
    g.fillRect(0, 0, 16, 4);
    g.fillStyle(0x5a3921); // dirt
    g.fillRect(0, 4, 16, 12);
    g.generateTexture('ground', 16, 16);
    g.destroy();
  }

  /** An 8x8 gold coin. */
  private makeCoinTexture() {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0xffec27);
    g.fillCircle(4, 4, 3);
    g.generateTexture('coin', 8, 8);
    g.destroy();
  }
}
