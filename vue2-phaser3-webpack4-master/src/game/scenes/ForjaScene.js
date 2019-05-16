import { Scene } from 'phaser';
import constants from '../constants'; // Constants

export default class ForjaScene extends Scene {
    constructor() {
        super({key: 'ForjaScene'});
    }

    create() {

        console.log("Starting ForjaScene ...");

        let jugador = constants.players.getChildren()[constants.ronda%4];
        //imatge de fons
        this.add.image(600, 441, 'fondoForja');
        let that = this;
        let numMunicio = 1; // quantitat de munició que vol forjar el jugador
        this.textNumMunicio; //text de la quantitat de munició mostrat per pantalla
        this.textPreuMunicio; // text del preu total de la munició que es vol comprar


        //Imatge arma
        this.add.image(400, 441, 'arma');
        this.add.text(370, 491, constants.preu_arma + ' UP', {fontSize: '32px', fill: '#000'});

        //Imatge munició
        this.add.image(700, 441, 'municion');
        this.textPreuMunicio = this.add.text(670, 471, constants.preu_municio + ' UP', {fontSize: '32px', fill: '#000'});
        this.textNumMunicio = this.add.text(695, 521, '0', {fontSize: '32px', fill: '#000'});

        //Per a comprar munició
        const butoComprarMunicio = this.add.text(640, 561, 'COMPRAR', {fontSize: '32px', fill: 'black'}).setInteractive();
        butoComprarMunicio.on('pointerup', () => {if (jugador.plom >= constants.preu_municio*numMunicio) {jugador.plom -= constants.preu_municio*numMunicio; jugador.municio += numMunicio;}});

        //Per a comprar l'arma
        const butoComprarArma = this.add.text(340, 561, 'COMPRAR', {fontSize: '28px', fill: 'black'}).setInteractive();
        butoComprarArma.on('pointerup', () => {if (jugador.teArma === false && jugador.plom >= constants.preu_arma){jugador.plom -= constants.preu_arma; jugador.posarArma()}});
        const buttonPlus = this.add.text(this.textNumMunicio.x + 30, this.textNumMunicio.y, '+', {fontSize: '32px', fill: '#000'}).setInteractive();
        buttonPlus.on('pointerup', () => this.updateClickCountText(++numMunicio));

        const buttonMinus = this.add.text(this.textNumMunicio.x - 30, this.textNumMunicio.y, '-', {fontSize: '32px', fill: '#000'}).setInteractive();
        buttonMinus.on('pointerup', () => {if (numMunicio > 1) this.updateClickCountText(--numMunicio)});

        this.updateClickCountText(numMunicio);

        var butoMenu = that.add.image(210, 800, 'botonMenu').setInteractive();
        butoMenu.on('pointerup', function () {
            that.scene.restart();
            that.scene.switch('PlayScene');
        });

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
    }

    comprar(preu){
        jugador.plom -= preu;
    }

    updateClickCountText(num)
    {
        this.textNumMunicio.setText(num);
        this.textPreuMunicio.setText(num*constants.preu_municio + ' UP');
    }

    update () {
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
    }
}
