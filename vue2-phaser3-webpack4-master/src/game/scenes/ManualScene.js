import { Scene } from 'phaser';

// NOTA: Poner la posicion de la imagen y de as flechas como constante

const PAGINES = ['mMover', 'mDisparar', 'mComprar', 'mForjar', 'mMinijuegos', 'mOtros']; //guarda l'ordre de les fotos de cada pàgina
var page;

// Flechas
var flechaAnt = null; // flecha para ir hacia atrás
var flechaSeg = null; // flecha para avanzar

var imatge = null; //foto que es mostra

function cambiarFoto(that, page) {
    imatge = that.add.image(441, 401, PAGINES[page]); //Canviem la foto

    //Destuïm les fleches
    if (flechaAnt !== null)
        flechaAnt.destroy(true);
    if (flechaSeg !== null)
        flechaSeg.destroy(true);

    if (page === 0) { //Si som a la primera pàgina només posem la flecha següent
        flechaSeg = that.add.image(796, 441, 'flecha').setInteractive();
        flechaSeg.on('pointerup', function (){
            page += 1;
            cambiarFoto(that, page);
        });
    }
    else if (page === PAGINES.length-1) { //Si som a la última pàgina només posem la flecha anterior
        flechaAnt = that.add.image(66, 441, 'flecha').setFlip(true, false).setInteractive();
        flechaAnt.on('pointerup', function () {
            page -= 1;
            console.log(page);
            cambiarFoto(that, page);
        });
    }
    else { //Altrament posem ambdòs fleches
        flechaSeg = that.add.image(796, 441, 'flecha').setInteractive();
        flechaSeg.on('pointerup', function (){
            page += 1;
            cambiarFoto(that, page);
        });
        flechaAnt = that.add.image(66, 441, 'flecha').setFlip(true, false).setInteractive();
        flechaAnt.on('pointerup', function (){
            page -= 1;
            cambiarFoto(that, page);
        });
    }
}

export default class ManualScene extends Scene {
    constructor () {
        super({ key: 'ManualScene' });
    }

    create () {
        console.log("Starting ManualScene ...");
        var that = this;
        page = 0;

        cambiarFoto(that, page);

        // Botón menú
        var butoMenu = this.add.image(210, 800, 'botonMenu').setInteractive();
        butoMenu.on('pointerup', function () {
            that.scene.start('MainScene');
        });

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);
    }
    // jueves a las 15:30hs
    update () {
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
    }
}
