
class MainScene extends Phaser.Scene {
  constructor() {
      super('MainScene');
  }

  create() {
      const background = this.add.image(512, 450, 'planet');
      background.setDisplaySize(1024, 1024);
      this.scoreText = this.add.text(1000, 20, 'Money: ' + this.registry.get('score') + '$' , {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 10, y: 5 },
          stroke: '#ffffff',
          strokeThickness: 2
      }).setOrigin(1, 0);

      this.add.text(90, 50, 'LEV GAME', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
      this.add.text(500, 800, 'Go to the planet!', {
              fontSize: '32px',
              color: '#ffffff',
              backgroundColor: '#000000',
              padding: { x: 3, y: 3 },
              stroke: '#ffffff',
              strokeThickness: 2 
      }).setOrigin(0.5);

      this.ship = this.add.image(512, 450, this.registry.get('currentShip'));
      this.ship.setDisplaySize(200, 200);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.createLandButton();
      this.createShopButton();
      this.createFullscreenButton();
      this.scale.on('resize', this.resize, this);

      this.music = this.sound.add('background_music', { loop: true });
      this.music.play();
      this.createMuteButton();
  }

  resize(gameSize) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.cameras.resize(width, height);

    // Adjust positions of UI elements if needed
    // For example:
    this.scoreText.setPosition(width - 20, 20);
    this.muteButton.setPosition(width - 86, height - 36);
}

createMuteButton() {
  this.muteButton = this.add.text(this.cameras.main.width - 26, this.cameras.main.height - 36, '🔊', {
      fontSize: '32px',
      color: '#ffffff'
  }).setOrigin(1, 0).setInteractive();

  this.muteButton.on('pointerup', () => {
      if (this.sound.mute) {
          this.sound.mute = false;
          this.muteButton.setText('🔊');
      } else {
          this.sound.mute = true;
          this.muteButton.setText('🔇');
      }
  });
}

  createFullscreenButton() {
    const fullscreenButton = this.add.text(this.cameras.main.width - 16, this.cameras.main.height -  36, '[ ]', {
        fontSize: '32px',
        color: '#ffffff'
    }).setOrigin(1, 0).setInteractive();

    fullscreenButton.on('pointerup', () => {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
    });
}

  createLandButton() {
      this.landButton = this.add.text(924, 100, 'Land on the planet', {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 10, y: 5 },
          stroke: '#ffffff',
          strokeThickness: 2
      }).setOrigin(1, 0.5).setInteractive();

      this.landButton.on('pointerover', () => {
          this.landButton.setStyle({ backgroundColor: '#333333' });
      });

      this.landButton.on('pointerout', () => {
          this.landButton.setStyle({ backgroundColor: '#000000' });
      });

      this.landButton.on('pointerdown', () => {
          this.landButton.setStyle({ backgroundColor: '#555555' });
      });

      this.landButton.on('pointerup', () => {
          this.landButton.setStyle({ backgroundColor: '#333333' });
          this.scene.start('PlanetScene');
      });

      this.landButton.setVisible(false);
  }

  createShopButton() {
    this.shopButton = this.add.text(924, 450, 'Go to shop', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
        stroke: '#ffffff',
        strokeThickness: 2
    }).setOrigin(1, 0.5).setInteractive();

    this.shopButton.on('pointerover', () => {
        this.shopButton.setStyle({ backgroundColor: '#333333' });
    });

    this.shopButton.on('pointerout', () => {
        this.shopButton.setStyle({ backgroundColor: '#000000' });
    });

    this.shopButton.on('pointerdown', () => {
        this.shopButton.setStyle({ backgroundColor: '#555555' });
    });

    this.shopButton.on('pointerup', () => {
        this.shopButton.setStyle({ backgroundColor: '#333333' });
        this.scene.start('ShopScene');
    });

    this.shopButton.setVisible(false);
}

  update() {
      if (this.cursors.left.isDown) {
          this.ship.x -= 5;
      } else if (this.cursors.right.isDown) {
          this.ship.x += 5;
      }

      if (this.cursors.up.isDown) {
          this.ship.y -= 5;
      } else if (this.cursors.down.isDown) {
          this.ship.y += 5;
      }

      if (this.ship.x > 724 && this.ship.y < 200) {
          this.landButton.setVisible(true);
      } else {
          this.landButton.setVisible(false);
      }

      if (this.ship.x > 724 && this.ship.y > 350 && this.ship.y < 550) {
        this.shopButton.setVisible(true);
    } else {
          this.shopButton.setVisible(false);
      }

      this.ship.x = Phaser.Math.Clamp(this.ship.x, 100, 924);
      this.ship.y = Phaser.Math.Clamp(this.ship.y, 100, 800);
  }
}

export default MainScene;