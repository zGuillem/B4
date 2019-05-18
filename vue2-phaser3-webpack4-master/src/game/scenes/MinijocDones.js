import { Scene } from "phaser";
import constants from "../constants";
import CountDown from "./CountDownScene";

var contador = 0;
var punts = 0;
var dianes = 0;
var dianes_max = 10;

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
    return guanyador;
}

class Dona extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, vel) {
        super(scene, x, y, "dones_dona_corrent");
        this.scene = scene;
        this.velocitat = vel;
        scene.add.existing(this);

        //Funcions
    }
}

class Diana extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "dones_diana");
        this.scene = scene;
        this.desplegada = false;
        scene.add.existing(this);

        //Funcions
    }
}

class Cursor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "dones_cursor");
        scene.add.existing(this);

        //Funcions
    }
}

export default class MinijocDones extends Scene {

    init(data)
    {
        this.jugador = data[0];
        this.torns = data[1];
        this.puntuacions = data[2];
    }
    constructor() {
        super({key: "MinijocDones"});
        this.dona = undefined;
        this.dianes = [];
        this.dona_mini = undefined;
        this.temps = 0;
        this.temps_final = 0;

        //Funciones
        this.crearDona = function (escena, x, y, vel)
        {
          var dona = new Dona(escena, x, y, vel);
          dona.setInteractive().on('pointerdown',function(event)
          {
            punts -= 4;
          });
          return dona;
        };

        this.crearDiana = function (escena, x, y)
        {
            let diana = new Diana(escena, x, y);
            diana.setInteractive().on('pointerdown',function(event)
            {
                this.removeInteractive();
                this.desplegada = false;
                this.anims.playReverse("diana");
                punts += 2;
                dianes++;
                console.log("Dianes" +dianes);
            });
            return diana;
        };

    }

    create() {

        constants.escena_pausada = "MinijocDones";
        this.scene.launch('CountDown');
        this.scene.pause();

        //Comencem el minijoc
        console.log("Starting MinijocDones ...");


        this.scene.bringToTop();

        this.cridaDona = function()
        {
            timer_avis.reset({
                delay: 500,
                callback: this.avis,
                callbackScope: this,
                repeat: -1
            });
            console.log("timer_dona activat");
        };

        this.avis = function () {
            console.log("timer_dona");
            if (contador === 6)
            {
                this.dona = this.crearDona(this, 0, 700, Phaser.Math.Between(5, 7));
                this.dona.play("anim_dona");
                this.dona.setScale(2);
                timer_avis.reset({
                    delay: 500,
                    callback: this.avis,
                    callbackScope: this,
                    repeat: -1,
                    paused: true
                });
                contador = 0;
                this.dona_mini.visible = false;
                timer_dona = this.time.addEvent({
                    delay: 8000,
                    callback: this.cridaDona,
                    callbackScope: this,
                    repeat: 0
                });
            }
            else
            {
                contador++;
                this.dona_mini.visible = this.dona_mini.visible === false;
            }
            console.log(contador);
        };

        this.onEvent = function()
        {
            console.log("onEvent: " + this.dianes);
            let diana = Phaser.Math.RND.between(0, 5);
            if (this.dianes[diana].desplegada)
            {
                this.dianes[diana].removeInteractive();
                this.dianes[diana].desplegada = false;
                this.dianes[diana].anims.playReverse("diana");
            }
            else
            {
                this.dianes[diana].setInteractive();
                this.dianes[diana].desplegada = true;
                this.dianes[diana].play("diana");
            }

        };

        let background = this.add.image(0, 0, "dones_fons"); //Background
        background.setOrigin(0, 0);

        this.dianes.push(this.crearDiana(this, 24, 515).setOrigin(0, 0.5));
        this.dianes.push(this.crearDiana(this, 280, 420).setOrigin(0, 0.5));
        this.dianes.push(this.crearDiana(this, 445, 360).setOrigin(0, 0.5));
        this.dianes.push(this.crearDiana(this, 955, 355).setOrigin(1, 0.5));
        this.dianes.push(this.crearDiana(this, 1070, 425).setOrigin(1, 0.5));
        this.dianes.push(this.crearDiana(this, 1315, 510).setOrigin(1, 0.5));

        this.dianes[0].setFlipX(true);
        this.dianes[1].setFlipX(true);
        this.dianes[2].setFlipX(true);

        this.dianes[1].setScale(0.75);
        this.dianes[2].setScale(0.5);
        this.dianes[3].setScale(0.5);
        this.dianes[4].setScale(0.75);

        this.dianes[0].on('pointerup', function () {
            this.removeInteractive();
            this.desplegada = false;
            this.anims.playReverse("diana");
        });

        this.dona = new Dona(this, 0, 700, 0);

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);

        this.anims.create({
            key: "anim_dona",
            frames: this.anims.generateFrameNumbers("dones_dona_corrent"),
            frameRate: 6,
            repeat:-1
        });
        this.anims.create({
            key: "diana",
            frames: this.anims.generateFrameNumbers("dones_diana"),
            frameRate: 12,
            repeat:0,
        });

        this.dona_mini = this.add.sprite(700, 100, "dones_dona_corrent");
        this.dona_mini.setScale(0.3);
        this.dona_mini.visible = false;

        var timer = this.time.addEvent({
            delay: 700,
            callback: this.onEvent,
            callbackScope: this,
            repeat: -1
        });

        var timer_dona = this.time.addEvent({
            delay: 8000,
            callback: this.cridaDona,
            callbackScope: this,
            repeat: 0
        });

        var timer_avis = this.time.addEvent( {
            delay: 500,
            callback: this.avis,
            callbackScope: this,
            repeat: -1,
            paused: true
        });
    }

    update(time)
    {
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;

        console.log("X: " + this.input.x);
        console.log("Y: " + this.input.y);

        if (this.temps < 10)
        {
            this.temps = time;
            console.log("Temps actualitzat");
        }

        //console.log("Jugadors " + this.jugador);
        //console.log("Torns " + this.torns);

        if (!acabat())
        {
            this.dona.x += this.dona.velocitat;
        }
        else {
            this.temps_final = time;
            this.puntuacions[this.jugador] = Math.floor(this.temps_final-this.temps - punts);
            this.scene.stop();

            if (this.jugador < this.torns)
            {
                dianes = 0;
                this.jugador++;
                this.dianes = [];
                this.scene.start('MinijocDones',[this.jugador, this.torns, this.puntuacions]);
            }
            else
            {
                recompensar(guanyador(this.puntuacions));
                console.log("Tornem a l'escena");
            }
        }
    }
}


function clickat(diana){
    diana.removeInteractive();
    diana.desplegada = false;
    //diana.anims.playReverse("diana");
}

function acabat()
{
    return (dianes === dianes_max);
}