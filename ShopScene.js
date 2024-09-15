class ShopScene extends Phaser.Scene {
  constructor() {
      super('ShopScene');
  }

  create() {
    const background = this.add.image(512, 450, 'shop');
    background.setDisplaySize(1024, 900);

    this.scoreText = this.add.text(1000, 20, 'Money: ' + this.registry.get('score') + '$', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
        stroke: '#ffffff',
        strokeThickness: 2
    }).setOrigin(1, 0);

    this.add.text(512, 50, 'Welcome to the Shop!', {
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

    // Add ship purchase button
    const buyShipButton = this.add.text(512, 450, 'Buy Ship BA1PAPA (10$)', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
        stroke: '#ffffff',
        strokeThickness: 2
    }).setOrigin(0.5).setInteractive();

    buyShipButton.on('pointerup', () => {
        this.buyShip();
    });
  }
  
  buyShip() {
    const currentMoney = this.registry.get('score');
    if (currentMoney >= 10) {
        const ships = this.registry.get('ships');
        if (!ships.includes('BA1PAPA')) {
            ships.push('BA1PAPA');
            this.registry.set('ships', ships);
            this.registry.set('score', currentMoney - 10);
            this.registry.set('currentShip', 'ship2');
            this.scoreText.setText('Money: ' + (currentMoney - 10) + '$');
            this.add.text(512, 550, 'Ship BA1PAPA purchased!', {
                fontSize: '24px',
                color: '#00ff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 },
            }).setOrigin(0.5);
        } else {
            this.add.text(512, 550, 'You already own this ship!', {
                fontSize: '24px',
                color: '#ff0000',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 },
            }).setOrigin(0.5);
        }
    } else {
        this.add.text(512, 550, 'Not enough money!', {
            fontSize: '24px',
            color: '#ff0000',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5);
    }
  } 
}

export default ShopScene;