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

        //Funcions
    }
}

class Diana extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "llauna_dianes");
        this.scene = scene;
        this.velocitat = Phaser.Math.Between(5, 7);
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

    constructor() {
        super({key: "MinijocDones"});
        this.dones = [];
        this.nDones = 0;
        this.dianes = [];
        this.nDianes = 0;

        //Funciones
        this.crearDona = function (escena, x, y)
        {
          var dona = new Dona(escena, x, y);
          dona.setInteractive().on('pointerdown',function(event)
          {
            console.log("CLICKAT");
          });
          return dona;
        };

        this.crearDiana = function (escena, x, y)
        {
            let diana = new Diana(escena, x, y);
            diana.setInteractive().on('pointerdown',function(event)
            {
                console.log("CLICKAT");
            });
            return diana;
        };

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
            for (let j in donesEliminar)
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
        /*
        constants.escena_pausada = "MinijocDones";
        this.scene.add('CountDown', CountDown, true, {x: 400, y: 300});
        this.scene.pause();

        //Comencem el minijoc
        console.log("Starting MinijocDones ...");
*/
        //this.input.setDefaultCursor('url(@/game/assets/input/Cursor.cur)', pointer);

        //this.input.mouse.requestPointerLock();

        this.dianes.push(this.crearDiana(this, 100, 100));
        this.dianes.push(this.crearDiana(this, 200, 100));
        this.dianes.push(this.crearDiana(this, 300, 100));
        this.dianes.push(this.crearDiana(this, 400, 100));

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);

        //let background = this.add.image(0, 0, "paisatge_dianes"); //Background
        //background.setOrigin(0, 0);

        //let foreground = this.add.image(WIDTH / 2, HEIGHT-80, "barra_dianes"); //Foreground


        //this.input.mouse.requestPointerLock();


        //this.input.on('move', function (pointer) {
            //if (this.input.mouse.locked)
            //{
                //this.cursor.x += pointer.movementX;
                //this.cursor.y += pointer.movementY;
            //}
        //}, this);

    }

    update()
    {
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;

        this.actualitzarDianes();
        this.actualitzarDones();
    }
}
function onEvent() {

}

function clickat (event, objecte){
    console.log("Clickat");

}