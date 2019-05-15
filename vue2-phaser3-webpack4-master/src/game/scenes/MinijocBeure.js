import { Scene } from "phaser";
import constants from "../constants";
import CountDown from "./CountDownScene";
const WIDTH = constants.mida_tile * constants.tiles[0];
const HEIGHT = constants.mida_tile * constants.tiles[1];

const JUGADOR_SPRITE = [, "beure_jugador1","beure_jugador2", "beure_jugador3", "beure_jugador4"];

class Personaje extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, JUGADOR_SPRITE[sprite]);
    this.particules = scene.add.sprite(x-70, y-40, "beure_particules1");
    this.particules.setDepth(1);
    this.particules.visible = false;
    this.actual = 0;
    this.reductor = 0.05; //Velocitat a la que es redueix la borratxera del jugador
    this.alcohol = 3; //Valor que sube cada click del jugador
    this.frame_actual = 0;
    this.frame_anterior = 0;
    this.coma = false; //Boolean que indica si el jugador ha arribat al coma etilic
    scene.add.existing(this);
  }
}

export default class MinijocBeure extends Scene {
  constructor() {
    super({ key: "MinijocBeure" });
    //Creem en ordre els objectes del escenari
    let personatge1;
    let personatge2;
    let temps;
    let timer_numeros;
  }

  create() {

    //Comencem el minijoc
    console.log("Starting MinijocBeure ...");

    var teclaJugador1 = this.input.keyboard.addKey("enter"); // Get key object
    teclaJugador1.on("down",function(event) {
        if (!this.personatge1.coma) {
          this.personatge1.actual += this.personatge1.alcohol;
          this.personatge1.setFrame(this.personatge1.frame_actual + 1);
          console.log(this.personatge1.actual + 1);
        }
      },this);

    teclaJugador1.on("up", function(event) {
          if (!this.personatge1.coma)
          {
            this.personatge1.setFrame(this.personatge1.frame_actual);
            console.log(this.personatge1.actual);
          }
          },this);

    var teclaJugador2 = this.input.keyboard.addKey("space"); // Get key object
    teclaJugador2.on("down", function(event) {
        if (!this.personatge2.coma) {
            this.personatge2.actual += this.personatge2.alcohol;
            this.personatge2.setFrame(this.personatge2.frame_actual + 1);
            console.log(this.personatge2.actual + 1);
          }
        },this);

    teclaJugador2.on("up", function(event) {
          if (!this.personatge2.coma)
          {
            this.personatge2.setFrame(this.personatge2.frame_actual);
            console.log(this.personatge2.actual);
          }
        }, this);

    let background = this.add.image(-100, 0, "taberna_beure"); //Background
    background.setOrigin(0, 0);

    this.personatge1 = new Personaje(this, 600, 401, 1);
    this.personatge2 = new Personaje(this, 700, 401, 2);

    constants.escena_pausada = "MinijocBeure";
    this.scene.add('CountDown', CountDown, true, { x: 400, y: 300 });
    this.scene.pause();

    this.timer_nombres = this.add.sprite(800, 100, "nombres", 5);
    this.children.add(this.timer_nombres);

    var timer = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      repeat: -1
    });

   //Creem la configuració per les animacions
    this.anims.create({
      key: "anim_particules1",
      frames: this.anims.generateFrameNumbers("beure_particules1"),
      frameRate: 2,
      repeat:-1
    });

    this.anims.create({
      key: "anim_particules2",
      frames: this.anims.generateFrameNumbers("beure_particules2"),
      frameRate: 2,
      repeat:-1
    });

    this.personatge1.particules.play("anim_particules1");

   //this.add.image(0, 0, 'beure_j1_cara', '__BASE').setOrigin(0);

    //Modifiquem la posicio del personatge1 i el seu frame durant un click de ratoli
    this.input.on(
      "pointerdown",
      function(event) {
        this.personatge1.actual += this.personatge1.alcohol;
        console.log(this.personatge1.actual);
      },
      this
    );
  }

  update(time) {
    comparar_personatge(this.personatge1);
    comparar_personatge(this.personatge2);
  }
}

var comptador = 1;

function onEvent() {
  this.timer_nombres.setFrame(5-comptador);
  if (comptador < 5) {
    console.log(comptador);
    comptador += 1;
  } else {
    this.scene.pause();
  }
}

function comparar_personatge(personatge) {
  //console.log(personatge.actual);
  if (personatge.actual >= 0 && !personatge.coma) {
    personatge.actual -= personatge.reductor;
  }

  personatge.particules.visible = true;
  personatge.frame_anterior = personatge.frame_actual;
  if (personatge.actual < 25) {
    personatge.frame_actual = 0;
    personatge.particules.visible = false;
  } else if (personatge.actual >= 25 && personatge.actual < 75) {
    personatge.frame_actual = 2;
  } else if (personatge.actual >= 75 && personatge.actual < 100) {
    personatge.frame_actual = 4;
  } else if (personatge.actual >= 100) {
    personatge.frame_actual = 6;
    personatge.setFrame(6);
    personatge.coma = true;
  }
  canviarParticules(personatge);
}

function canviarParticules(personatge)
{
  if(personatge.frame_actual === 4 && personatge.frame_anterior === 2 ) {
    personatge.particules.setTexture("beure_particules2");
    personatge.particules.play("anim_particules2");
  }
  else if(personatge.frame_actual === 2 && personatge.frame_anterior === 4 ) {
    personatge.particules.setTexture("beure_particules1");
    personatge.particules.play("anim_particules1");
  }
  else if(personatge.frame_actual === 0 && personatge.frame_anterior === 2 ) {
    personatge.particules.play("anim_particules1");
  }
}