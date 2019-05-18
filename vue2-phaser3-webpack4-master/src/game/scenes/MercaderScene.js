import { Scene } from 'phaser';
import constants from '../constants'; // Constants

let jugador;

function comprarCarta(imatgeCarta, carta, that){
    let posX = imatgeCarta.x;
    let posY = imatgeCarta.y;

    imatgeCarta.destroy(true);
    imatgeCarta = that.add.image(posX, posY, 'dorso', 0);

    jugador.afegirCarta(carta);
    jugador.plom -= constants.preu_carta;
    constants.mercader.ofertes.filter(function(value, index, array){ return value === carta;});
}

function mostrarCartes(that){
    let x = 300; // posició x de la carta
    let y = 441; // posició y de la carta
    let ofertes = constants.mercader.ofertes;
    ofertes.forEach(function(oferta){
        let imatgeCarta = that.add.image(x, y, constants.CARTES[oferta][2]).setInteractive();
        imatgeCarta.on('pointerup', () => {if (jugador.plom >= constants.preu_carta && jugador.cartes.length < 2) comprarCarta(imatgeCarta, oferta, that)});
        x += 230;
    });
}

export default class MercaderScene extends Scene {
    constructor() {
        super({key: 'MercaderScene'});
    }

    create() {

        console.log("Starting MercaderScene ...");

        jugador = constants.players.getChildren()[constants.ronda%4];

        //imatge de fons
        this.add.image(700, 500, 'fonsTenda');

        let that = this;

        //Imatge arma
        let comprarArma = this.add.image(1090, 441, 'arma').setInteractive().on('pointerup', () => {
            if (jugador.teArma === false && jugador.plom >= constants.preu_arma / 2) {jugador.plom -= constants.preu_arma/2; jugador.teArma = true; comprarArma.destroy(true); comprarArma = this.add.image(990,441, 'dorso')}
        });


        mostrarCartes(that);

        var butoMenu = that.add.image(290, 900, 'botonMenu').setInteractive();
        butoMenu.on('pointerup', function () {
            that.scene.sleep();
        });
        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);
    }

    comprar(preu){
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
        jugador.plom -= preu;
    }

    updateClickCountText(num)
    {
        this.textNumMunicio.setText(num);
        this.textPreuMunicio.setText(num*constants.preu_municio + ' UP');
    }

    update () {
    }
}
