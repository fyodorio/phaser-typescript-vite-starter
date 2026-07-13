import { AUTO, Game, Scale } from 'phaser';
import { Boot } from './scenes/Boot';
import { Play } from './scenes/Play';

//  Low internal resolution (16:9) scaled up to keep a chunky pixel-art look.
//  Docs: https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 640,
  height: 360,
  parent: 'game-container',
  backgroundColor: '#1d2b53',
  pixelArt: true,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 900 },
      debug: false,
    },
  },
  scene: [Boot, Play],
};

export default function StartGame(parent: string) {
  return new Game({ ...config, parent });
}
