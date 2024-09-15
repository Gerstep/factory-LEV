class PlanetScene extends Phaser.Scene {
  constructor() {
      super('PlanetScene');
  }

  create() {
      const background = this.add.image(512, 450, 'planet1');
      this.score = 0;
      this.scoreText = this.add.text(1000, 20, 'Money: ' + this.registry.get('score') + '$' , {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 10, y: 5 },
          stroke: '#ffffff',
          strokeThickness: 2
      }).setOrigin(1, 0);
      background.setDisplaySize(1024, 900);
  
      const backButton = this.add.text(100, 50, 'Back to Space', {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 10, y: 5 },
          stroke: '#ffffff',
          strokeThickness: 2
      }).setOrigin(0.5).setInteractive();

      backButton.on('pointerover', () => {
          backButton.setStyle({ backgroundColor: '#333333' });
      });

      backButton.on('pointerout', () => {
          backButton.setStyle({ backgroundColor: '#000000' });
      });

      backButton.on('pointerdown', () => {
          backButton.setStyle({ backgroundColor: '#555555' });
      });
  
      backButton.on('pointerup', () => {
          this.scene.start('MainScene');
      });
  
      // Add the character
      this.character = this.physics.add.sprite(512, 450, 'char');
      this.character.setDisplaySize(150, 150);
  
      // Add 11 randomly positioned treasure chests
      this.chests = this.physics.add.staticGroup();
      for (let i = 0; i < 11; i++) {
          const x = Phaser.Math.Between(100, 924);
          const y = Phaser.Math.Between(100, 800);
          const chest = this.chests.create(x, y, 'chest');
          chest.setDisplaySize(75, 75);
      }
  
      // Add collision between character and chests
      this.physics.add.overlap(this.character, this.chests, this.collectChest, null, this);
  
      // Set up cursor keys for character movement
      this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
      // Character movement
      if (this.cursors.left.isDown) {
          this.character.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
          this.character.setVelocityX(160);
      } else {
          this.character.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown) {
          this.character.setVelocityY(-160);
      } else if (this.cursors.down.isDown) {
          this.character.setVelocityY(160);
      } else {
          this.character.setVelocityY(0);
      }
  }
  
  collectChest(character, chest) {
      const distance = Phaser.Math.Distance.Between(character.x, character.y, chest.x, chest.y);
      if (distance <= 50) {
          chest.disableBody(true, true);
          let score = this.registry.get('score');
          score += 1;
          this.registry.set('score', score);
          this.scoreText.setText('Score: ' + score);
      }
  }
}

export default PlanetScene;