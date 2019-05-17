import { Scene } from "phaser";
import constants from "../constants";
import CountDown from "./CountDownScene";
import Personaje from "../Personatge";


const WIDTH = constants.mida_tile * constants.tiles[0];
const HEIGHT = constants.mida_tile * constants.tiles[1];

function recompensar(guanyador)
{
    let jugadores = constants.players.getChildren();
    jugadores[guanyador].plom += constants.plom_recompensa;
}

function guanyador(puntuacio){
    var guanyador = 0;
    var punts = 9999;
    for ( var i = 0;  i < 4; i++)
    {

        if (puntuacio[i] < punts)
        {
            guanyador = i;
            punts = puntuacio[i];
            console.log(punts);
        }
    }
    //console.log(puntuacio);
    //console.log(guanyador);
    return guanyador-1;
}

class Llauna extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        scene.add.existing(this);
    }
}

class Detector extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bomb");
        this.direccio = 1;
        this.velMax = 5;
        this.velocitat = this.velMax;
        this.velMin = 3;
        this.velReduccio = 0.5;
        scene.add.existing(this);
    }
}

var graphics;

export default class MinijocDianes extends Scene {
    init(data){
        this.jugador = data[0];
        this.torns = data[1];
        this.puntuacions = data[2];
    }

    constructor() {
        super({ key: "MinijocDianes" });
        //Creem en ordre els objectes del escenari
        let llaunes;
        let detector;
        let direccio_detector = 1;
        let linia;
        this.temps = -1;
        this.temps_final = 0;
        //let graphics;


        this.calcular_punts_linia = function(xO,yO,xF,yF,length)
        {
            //console.log("O: " + xO +"," +yO);
            //console.log("F: " + xF +"," +yF);
            var vec = [ xF - xO, yF - yO];
            //console.log("Vec " + vec[0] +"," +vec[1]);
            var long = Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]);
            //console.log("Long: " + long);
            var aux  = [vec[0]*length/long, vec[1]*length/long];
            var aux2 = [aux[0]+xO, aux[1]+yO];
            //console.log("Aux2: " + aux2[0] +"," + aux2[1]);
            return aux2;
        }

        this.acabat = function(llaunes) {
            var acabat = true;
            var llauna = 0;
            while (acabat && llauna < 4)
            {
                if (llaunes[llauna].visible === true)
                {
                    acabat = false;
                }
                llauna = llauna +1;
            }
            return acabat;
        };
    }

    create(time) {
        this.scene.bringToTop();
        //.log(this.jugador);
        //console.log(this.torns);
        //Comencem el minijoc
        var escena = this;
        console.log("Starting MinijocDianes ...");

        let background = this.add.image(0, 0, "paisatge_dianes"); //Background
        background.setOrigin(0, 0);

        this.llaunes = [
            new Llauna(escena, 300, HEIGHT-196),
            new Llauna(escena, 430, HEIGHT-196),
            new Llauna(escena, 570, HEIGHT-196),
            new Llauna(escena, 700, HEIGHT-196)
        ];


        let foreground = this.add.image(WIDTH / 2, HEIGHT-80, "barra_dianes"); //Foreground

        this.detector = new Detector(this,400, HEIGHT-196);
        this.detector.visible = false;


        var punts = this.calcular_punts_linia(WIDTH / 2, HEIGHT, this.detector.x, this.detector.y,  150);

        this.linia = new Phaser.Geom.Line(WIDTH / 2, HEIGHT, punts[0], punts[1]);

        graphics = this.add.graphics({ lineStyle: { width: 6, color: 0xaa00aa } });

        graphics.strokeLineShape(this.linia);

        //Modifiquem la posicio del personatge1 i el seu frame durant un click de ratoli
        this.input.on("pointerdown",
            function(event) {
                for (var i = 0; i < 4; i++)
                {
                    if (this.llaunes[i].getBounds().contains(this.detector.x, this.detector.y)) {
                        this.llaunes[i].setTint(Math.random() * 0xffffff);
                        this.llaunes[i].visible = false;
                    }
                }
            },this);

        constants.escena_pausada = "MinijocDianes";
        //this.scene.add('CountDown', CountDown, true, { x: 400, y: 300 });
        this.scene.launch('CountDown');
        this.scene.pause();

    }


    update(time, delta) {

        //console.log(constants.players.getChildren()[1].plom);


        if (time > 0)
        {
            console.log("Temps fill de puta");
            console.log(this.temps < 10);
            if (this.temps < 10)
            {
                this.temps = time;
                console.log("Temps actualitzat");
            }
        }


        if (!this.acabat(this.llaunes))
        {
            this.detector.x += this.detector.velocitat * this.detector.direccio;

            if (this.detector.x < 280 || this.detector.x > 720)
            {
                this.detector.direccio *= -1;
                if (this.detector.x < 280)
                {
                    this.detector.x = 280;
                }
                else
                {
                    this.detector.x = 720;
                }

                if (this.detector.velocitat - this.detector.velReduccio >= this.detector.velMin)
                {
                    this.detector.velocitat -= this.detector.velReduccio;
                }
            }

            var punts = this.calcular_punts_linia(this.linia.x1, this.linia.y1, this.detector.x, this.detector.y,  150);

            this.linia.setTo(this.linia.x1, this.linia.y1, punts[0], punts[1]);
            graphics.clear();
            graphics.strokeLineShape(this.linia);
        }
        else
        {

            this.temps_final = time;
            console.log(this.temps);
            console.log(this.temps_final);
            console.log(this.temps_final-this.temps);

            this.puntuacions[this.jugador] = Math.floor(this.temps_final-this.temps);
            this.scene.stop();
            if (this.jugador < this.torns)
            {
                this.jugador++;
                this.scene.start('MinijocDianes',[this.jugador, this.torns, this.puntuacions]);
            }
            else
            {
                recompensar(guanyador(this.puntuacions));
                console.log("Tornem a l'escena");
            }
        }
    }
}

function onEvent() {

}


function acabat(llaunes) {
    var acabat = true;
    var llauna = 0;
    while (acabat && llauna < 4)
    {
        console.log(llauna);
        if (llaunes[llauna].visible === true)
        {
            acabat = false;
        }
        llauna = llauna +1;
    }
    return acabat;
}

