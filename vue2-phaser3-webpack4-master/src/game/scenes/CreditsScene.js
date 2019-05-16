import { Scene } from 'phaser';

var image1;
export default class CreditsScene extends Scene {
    constructor () {
        super({ key: 'CreditsScene' });
    }

    create () {
        console.log("Starting CreditsScene ...");
        var that = this;

        // Botón menú
        var butoMenu = this.add.image(210, 800, 'botonMenu').setInteractive();
        butoMenu.on('pointerup', function () {
            that.scene.start('MainScene');
        });

        image1 = this.add.tileSprite(441, 401, 500, 660, 'credits');
    }

    update () {
        if (image1.tilePositionY <= 1440)
            image1.tilePositionY += 2;
    }
}
