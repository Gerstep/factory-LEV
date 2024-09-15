class DataManager extends Phaser.Scene {
  constructor() {
      super('DataManager');
  }

  preload() {
      this.load.image('planet', 'planet.png');
      this.load.image('ship', 'ship.png');
      this.load.image('ship2', 'ship2.png');
      this.load.image('planet1', 'planet1.png');
      this.load.image('chest', 'chest.png');
      this.load.image('char', 'char.png');
      this.load.image('shop', 'shop.png');
      this.load.image('boss', 'boss.png');
      this.load.audio('background_music', 'music.mp3');
      this.load.image('asteroid', 'asteroid.png');
      this.load.image('laser', 'laser.png');
  }

  create() {
    this.registry.set('score', 10);
    this.registry.set('ships', ['default']);
    this.registry.set('currentShip', 'ship');
    this.scene.start('MainScene');
}
}

export default DataManager;