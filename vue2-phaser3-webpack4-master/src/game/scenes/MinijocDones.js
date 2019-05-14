import { Scene } from "phaser";
import constants from "../constants";
import CountDown from "./CountDownScene";


const WIDTH = constants.mida_tile * constants.tiles[0];
const HEIGHT = constants.mida_tile * constants.tiles[1];

class Dona extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        scene.add.existing(this);
    }
}

class Diana extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        scene.add.existing(this);
    }
}

export default class MinjocDones extends Scene {

    constructor() {
        super({key: "MinijocDones"});
        this.dones = [];
        this.dianes = [];
    }

    create() {

        constants.escena_pausada = "MinijocDianes";
        this.scene.add('CountDown', CountDown, true, {x: 400, y: 300});
        this.scene.pause();

        //Comencem el minijoc
        console.log("Starting MinijocDones ...");

        //let background = this.add.image(0, 0, "paisatge_dianes"); //Background
        //background.setOrigin(0, 0);

        //let foreground = this.add.image(WIDTH / 2, HEIGHT-80, "barra_dianes"); //Foreground

        //Modifiquem la posicio del personatge1 i el seu frame durant un click de ratoli

        update()
        {

        }
    }

}
function onEvent() {

}