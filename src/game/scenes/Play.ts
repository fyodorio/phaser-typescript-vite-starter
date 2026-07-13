import { Scene } from 'phaser';

const MOVE_SPEED = 160;
const JUMP_VELOCITY = 360;

/** Minimal side-scrolling platformer: move, jump, collect coins. */
export class Play extends Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super('Play');
  }

  create() {
    const { width, height } = this.scale;

    const platforms = this.buildLevel(width, height);
    this.player = this.createPlayer(height);
    this.physics.add.collider(this.player, platforms);

    this.createCoins();
    this.createHud(height);
    this.bindInput();
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onGround = body.blocked.down || body.touching.down;

    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const jump =
      this.cursors.up.isDown ||
      this.cursors.space.isDown ||
      this.keys.W.isDown;

    if (left) {
      this.player.setVelocityX(-MOVE_SPEED);
      this.player.setFlipX(true);
    } else if (right) {
      this.player.setVelocityX(MOVE_SPEED);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (jump && onGround) {
      this.player.setVelocityY(-JUMP_VELOCITY);
    }
  }

  private buildLevel(width: number, height: number) {
    const platforms = this.physics.add.staticGroup();

    // Solid ground along the bottom.
    for (let x = 8; x < width; x += 16) {
      platforms.create(x, height - 8, 'ground');
    }

    // Floating ledges: [startX, y, tileCount].
    const ledges: Array<[number, number, number]> = [
      [112, 260, 5],
      [336, 200, 6],
      [520, 132, 4],
    ];
    for (const [startX, y, count] of ledges) {
      for (let i = 0; i < count; i++) {
        platforms.create(startX + i * 16, y, 'ground');
      }
    }

    return platforms;
  }

  private createPlayer(height: number) {
    const player = this.physics.add.sprite(48, height - 40, 'player');
    player.setCollideWorldBounds(true);
    player.setBounce(0.05);
    return player;
  }

  private createCoins() {
    const coins = this.physics.add.group();
    const spots: Array<[number, number]> = [
      [128, 230],
      [368, 170],
      [544, 100],
      [280, 320],
      [456, 320],
    ];
    for (const [x, y] of spots) {
      const coin = coins.create(x, y, 'coin') as Phaser.Physics.Arcade.Sprite;
      (coin.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }

    this.physics.add.overlap(this.player, coins, (_player, coin) => {
      (coin as Phaser.Physics.Arcade.Sprite).disableBody(true, true);
      this.score += 1;
      this.scoreText.setText(`Coins: ${this.score}`);
    });
  }

  private createHud(height: number) {
    this.scoreText = this.add
      .text(8, 8, 'Coins: 0', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#fff1e8',
      })
      .setScrollFactor(0);

    this.add.text(8, height - 18, 'Arrows / A,D to move  •  Up / W / Space to jump', {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#c2c3c7',
    });
  }

  private bindInput() {
    const keyboard = this.input.keyboard!;
    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys('W,A,D') as Record<string, Phaser.Input.Keyboard.Key>;
  }
}
