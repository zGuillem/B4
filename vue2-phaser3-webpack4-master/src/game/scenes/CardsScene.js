import { Scene } from 'phaser';
import constants from "../constants";

let timer = 0; // nombre de frames en els que s'ha mostrat una carta automàtica
let startTimer = false; // cert si hem d'iniciar el timer
let cartaAuto = undefined; //carta automàtica
let butoRobar;
let potRobar = false;
let jugador;
let imatgeCarta = undefined;

function robarCarta(that){
    if (constants.baralla.length === 0) { // Si la baralla s'ha acabat, la tornem a reiniciar
        constants.baralla = constants.BARALLA.slice(0);
        constants.baralla.sort(function (a, b) {return 0.5 - Math.random()}); //Barregem la baralla de cartes
    }

    let carta = constants.baralla.pop();
    if (constants.CARTES[carta][1] === true) {// si és automàtica
        startTimer = true;
        cartaAuto = that.add.image(600, 360, constants.CARTES[carta][2]);
        usarCarta(carta, that);
    }
    else {
        jugador.afegirCarta(carta);
        mostrarCartes(that);
    }
}

function usarCarta(id, that){
    let nom = constants.CARTES[id][0];
    switch (nom) {
        case 'Whisky': // Dóna un de vida
            jugador.vides += 1;
            break;
        case 'Goma2': // Treu un de vida
            jugador.vides -= 1;
            break;
        case 'Saqueado': // Descarta l'última carta
            if (jugador.nCartes > 0) {
                jugador.treureCarta(0);
                mostrarCartes(that);
            }
            break;
        case 'FalloTecnico': // Descarta l'arma del jugador
            if (jugador.teArma)
                jugador.treureArma();
            break;
        case 'Asalto': // Robar una carta
            jugador.haRobat = false;
            break;
        case 'Recamara': // Tir extra
            jugador.haDisparat = false;
            break;
        case 'Caballo': // Moviment extra
            jugador.haMogut = false;
            constants.potMoure = true;
            break;
        case 'Angel':
            jugador.posarEscut();
            break;
    }

    if (imatgeCarta !== undefined) {
        if (imatgeCarta.x === 600) // Si s'ha clickat la primera carta
            jugador.treureCarta(0);
        else
            jugador.treureCarta(1);
        imatgeCarta.destroy(true);
    }

}

function mostrarCartes(that){
    let x = 600; // posició x de la carta
    let y = 700; // posició y de la carta
    let ma = jugador.cartes;
    ma.forEach(function(carta){
        imatgeCarta = that.add.image(x, y, constants.CARTES[carta][2]).setInteractive();
        imatgeCarta.on('pointerup', () => usarCarta(carta, that));
        x += 230;
    });
}

export default class CardsScene extends Scene {
    constructor () {
        super({ key: 'CardsScene' });
    }

    create () {
        console.log("Cards HudScene ...");
        potRobar = true;
        let that = this;
        jugador = constants.players.getChildren()[constants.ronda%4];

        // Taula
        this.add.image(700, 580, 'mesa');

        //Butó per a tornar a la pantalla de joc
        let butoMenu = this.add.image(130, 760, 'botonMenu').setInteractive();
        butoMenu.on('pointerup', function () {
            if (cartaAuto !== undefined)
                cartaAuto.destroy(true);
            that.scene.sleep();
        });

        // Mostrem les cartes del jugador
        mostrarCartes(that);

        //Botó per a robar una carta
        butoRobar = this.add.image(1100, 261, 'dorso', 0).setInteractive();
        butoRobar.on('pointerup', function(){
            if (potRobar === true && jugador.haRobat === false){
                potRobar = false;
                jugador.haRobat = true;
                robarCarta(that);
            }
        });
        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);
    }

    update () {

        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
        if (jugador.haRobat === false && jugador.nCartes < 2) {
            potRobar = true;
            butoRobar.setFrame(1);
        }
        else {
            potRobar = false;
            butoRobar.setFrame(0);
        }

        if (startTimer === true)
            timer += 1;

        if (timer >= 200) { // la carta desapareix durant 200 frames
            cartaAuto.destroy(true);
            startTimer = false;
            timer = 0;
        }
    }
}
