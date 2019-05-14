import { Scene } from "phaser";
import constants from "../constants";
import CountDown from "./CountDownScene";


const WIDTH = constants.mida_tile * constants.tiles[0];
const HEIGHT = constants.mida_tile * constants.tiles[1];

class Dona extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        this.scene = scene;
        this.velocitat = Phaser.Math.Between(5, 7);
        scene.add.existing(this);
    }
}

class Diana extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        this.scene = scene;
        this.velocitat = Phaser.Math.Between(5, 7);
        scene.add.existing(this);
    }
}

export default class MinjocDones extends Scene {

    constructor() {
        super({key: "MinijocDones"});
        this.dones = [];
        this.nDones = 0;
        this.dianes = [];
        this.nDianes = 0;
        this.scene = NULL;

        //Funciones
        this.actualitzarDones = function()
        {
            var donesEliminar = [];
            for (var i = 0; i < this.nDones; i++)
            {
                this.dones[i].x += this.dones[i].velocitat;
                if (Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds, this.dones[i].getBounds()))
                {
                    donesEliminar.push(this.dones[i]);
                }
            }
            for (var j in donesEliminar)
            {
                j.destroy();
                this.nDones--;
            }
        };
        this.actualitzarDianes = function()
        {
            var dianesEliminar = [];
            for (var i = 0; i < this.nDianes; i++)
            {
                this.nDianes[i].x += this.nDianes[i].velocitat;
                if (Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds, this.nDianes[i].getBounds()))
                {
                    donesEliminar.push(this.nDianes[i]);
                }
            }
            for (var j in dianesEliminar)
            {
                j.destroy();
                this.nDianes--;
            }
        }
    }

    create() {
        constants.escena_pausada = "MinijocDianes";
        this.scene.add('CountDown', CountDown, true, {x: 400, y: 300});
        this.scene.pause();

        //Comencem el minijoc
        console.log("Starting MinijocDones ...");

        this.dianes.push(new Diana(this,100,100));
        this.dianes.push(new Diana(this,200,100));
        this.dianes.push(new Diana(this,300,100));
        this.dianes.push(new Diana(this,400,100));

        var dia = new Diana(this,400,100);


        //let background = this.add.image(0, 0, "paisatge_dianes"); //Background
        //background.setOrigin(0, 0);

        //let foreground = this.add.image(WIDTH / 2, HEIGHT-80, "barra_dianes"); //Foreground


        update()
        {

        }
    }

}
function onEvent() {

}