import { Scene } from 'phaser';

export default class MainScene extends Scene {
    constructor () {
        super({ key: 'MainScene' });
    }

    create () {


        console.log("Starting MainScene ...");
        var that = this;

        this.add.image(0,0, 'fondo_menu').setOrigin(0,0);

        //Botón start
        var butoStart = this.add.image(700, 200, 'botonStart').setInteractive();
        butoStart.on('pointerup', function () {
            that.scene.start('PlayScene');
        });

        //Botón instrucciones
        var butoManual = this.add.image(700, 360, 'botonManual').setInteractive();
        butoManual.on('pointerup', function () {
           that.scene.start('ManualScene');
        });

        //Botón créditos
        var butoCredits = this.add.image(700, 680, 'botonCreditos').setInteractive();
        butoCredits.on('pointerup', function() {
            that.scene.start('CreditsScene');
        });

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);
    }

    update () {
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
    }
}
