import { Scene } from 'phaser';
import constants from "../constants";

export default class HudScene extends Scene {
    constructor () {
        super({ key: 'HudScene' });
    }

    create () {
        var that = this;
        console.log("Starting HudScene ...");
        this.textJugador ; // text amb el número de jugador que li toca jugar la ronda
        this.textVides; //text de la vida del jugador
        this.textPlom= constants.PREU_MUNICIO; // text de la quantitat de plom mostrat per pantalla
        this.textMunicio= constants.PREU_MUNICIO; //text de la quantitat de munició mostrat per pantalla

        this.textEscut;
        this.textArma;
        this.textEdifici;

        this.jugadors = constants.players.getChildren();
        this.jugador = this.jugadors[constants.ronda%4];
        this.children.add(this.jugadors);
        this.children.add(this.jugador);

        this.textJugador = this.add.text(40, 20, "JUGADOR " + this.jugador.torn, {fontSize: '30px', fill:'white'});
        this.textPlom = this.add.text(40, 60, "Plom: " + this.jugador.plom, {fontSize: '26px', fill: 'white'});
        this.textMunicio = this.add.text(40, 100, "Municio: " + this.jugador.municio, {fontSize: '26px', fill: 'white'});
        this.textVides = this.add.text(40, 140, "Vides: " + this.jugador.vides, {fontSize: '26px', fill: 'white'});
        this.textEscut = this.add.text(40, 180, "Escut: " + this.jugador.teEscut, {fontSize: '26px', fill: 'white'});
        this.textArma = this.add.text(40, 220, "Arma: " + this.jugador.teArma, {fontSize: '26px', fill: 'white'});
        this.textEdifici = this.add.text(40, 260, "Refugiat: " + this.jugador.estaRefugiat, {fontSize: '26px', fill: 'white'});

    }

    update () {
        this.jugadors = constants.players.getChildren();
        this.jugador = this.jugadors[constants.ronda%4];

        this.textJugador.setText("JUGADOR " + this.jugador.torn);
        this.textPlom.setText("Plom: " + this.jugador.plom);
        this.textMunicio.setText("Municio: " + this.jugador.municio);
        this.textVides.setText("Vides: " + this.jugador.vides);
        this.textEscut.setText("Escut: " + this.jugador.teEscut);
        this.textArma.setText("Arma: " + this.jugador.teArma);
        this.textEdifici.setText("Refugiat: " + this.jugador.estaRefugiat);
    }
}
