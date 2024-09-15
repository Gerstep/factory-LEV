class AsteroidScene extends Phaser.Scene {
  constructor() {
    super('AsteroidScene');
  }

  create() {
    const background = this.add.image(512, 450, 'asteroid');
    background.setDisplaySize(1024, 900);

    this.add.text(512, 50, 'Press Space to shoot', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
      stroke: '#ffffff',
      strokeThickness: 2 
    }).setOrigin(0.5);

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

    // Boss setup
    this.boss = this.physics.add.image(100, 300, 'boss');
    this.boss.setDisplaySize(150, 150);
    this.boss.setCollideWorldBounds(true);
    this.boss.setImmovable(true);
    this.boss.body.enable = true;

    // Create a tween for boss movement
    this.bossTween = this.tweens.add({
      targets: this.boss,
      x: 924,
      duration: 4000,
      ease: 'Linear',
      yoyo: true,
      repeat: -1
    });

    this.boss.setData('health', this.bossHealth);

    // Add the ship
    this.ship = this.physics.add.image(512, 450, this.registry.get('currentShip'));
    this.ship.setDisplaySize(100, 100);
    this.ship.setCollideWorldBounds(true);

    // Add cursor keys for ship control
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add laser group
    this.lasers = this.physics.add.group();

    // Add space key for shooting
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Initialize boss health
    this.bossHealth = 12;

    // Add collision between lasers and boss
    this.physics.add.collider(this.lasers, this.boss, this.hitBoss, null, this);

    // Add boss health text
    this.bossHealthText = this.add.text(this.boss.x, this.boss.y - 100, 'Boss Health: 3', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5);

    // Add a shooting cooldown
    this.lastFired = 0;
    this.fireRate = 300; // milliseconds
  }

  update(time) {
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(160);
    } else {
      this.ship.setVelocityX(0);
    }
  
    if (this.cursors.up.isDown) {
      this.ship.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.ship.setVelocityY(160);
    } else {
      this.ship.setVelocityY(0);
    }

    // Shooting mechanism with cooldown
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && time > this.lastFired) {
      this.shootLaser();
      this.lastFired = time + this.fireRate;
    }

    // Check for collisions between lasers and boss
    this.physics.world.collide(this.lasers, this.boss, this.hitBoss, null, this);

    // Remove lasers that are out of bounds
    this.lasers.children.entries.forEach((laser) => {
      if (laser.y < 0) {
        laser.destroy();
      }
    });

    // Update boss health text position and content
    if (this.bossHealthText && this.boss) {
      this.bossHealthText.setPosition(this.boss.x, this.boss.y - 100);
      this.bossHealthText.setText('Boss Health: ' + this.bossHealth);
    }

    // Check boss physics body
    if (this.boss && this.boss.body) {
      if (!this.boss.body.enable) {
        console.log('Boss physics body disabled, re-enabling');
        this.boss.body.enable = true;
      }
    } else {
      console.log('Boss or boss body not found');
    }

    // Check if boss exists and recreate if necessary
    if (this.bossHealth > 0 && (!this.boss || !this.boss.body)) {
      console.log('Recreating boss');
      this.boss = this.physics.add.image(this.boss.x, this.boss.y, 'boss');
      this.boss.setDisplaySize(150, 150);
      this.boss.setCollideWorldBounds(true);
      this.boss.setImmovable(true);
      this.boss.body.enable = true;
      this.physics.add.collider(this.lasers, this.boss, this.hitBoss, null, this);
      
      // Recreate the boss movement tween
      this.bossTween = this.tweens.add({
        targets: this.boss,
        x: 924,
        duration: 4000,
        ease: 'Linear',
        yoyo: true,
        repeat: -1
      });
    }
  }

  shootLaser() {
    const laser = this.lasers.create(this.ship.x, this.ship.y - 20, 'laser');
    laser.setDisplaySize(10, 40);  // Set width to 10px and height to 40px
    laser.setVelocityY(-400);
  }

  hitBoss(laser, boss) {
    console.log('Hit boss function called');
    console.log('Current boss health:', this.bossHealth);
    
    // Ensure the laser is destroyed
    if (laser && laser.active) {
      laser.destroy();
    }
    
    this.bossHealth--;
  
    console.log('Boss health after hit:', this.bossHealth);
  
    // Visual feedback for hit
    this.tweens.add({
      targets: boss,
      alpha: 0.5,
      duration: 50,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        console.log('Tween completed, setting alpha back to 1');
        boss.setAlpha(1);
      }
    });
  
    // Update boss health text
    this.bossHealthText.setText('Boss Health: ' + this.bossHealth);
  
    if (this.bossHealth <= 0) {
      console.log('Boss health reached 0, destroying boss');
      this.bossTween.stop();
      boss.destroy();
      this.bossHealthText.destroy();
      this.boss = null; // Set boss to null to indicate it's defeated
      this.add.text(512, 300, 'Boss Defeated!', {
        fontSize: '48px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      }).setOrigin(0.5);
    } else {
      console.log('Boss still alive, current health:', this.bossHealth);
      boss.setActive(true).setVisible(true);
    }
  }
}

export default AsteroidScene;