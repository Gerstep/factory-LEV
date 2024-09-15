import DataManager from './DataManager.js';
import MainScene from './MainScene.js';
import PlanetScene from './PlanetScene.js';
import ShopScene from './ShopScene.js';
import AsteroidScene from './AsteroidScene.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [DataManager, MainScene, PlanetScene, ShopScene, AsteroidScene]
};

const game = new Phaser.Game(config);