import { Scene } from 'phaser';
import constants from '../constants';

const WIDTH = constants.mida_tile * constants.tiles[0];
const HEIGHT = constants.mida_tile * constants.tiles[1];

export default class CountDown extends Scene {
    constructor () {
        super({ key: 'CountDown' });
    }

    create () {
        console.log("Starting CountDown...");

        var Countdown = this.add.sprite(WIDTH/2,HEIGHT/2, 'ReadyGo');
        var time = this.time.addEvent({
            delay: 700,
            callback: onEvent,
            callbackScope: this,
            repeat: 9,
            paused: true
        });

        var teclaJugador2 = this.input.keyboard.addKey("space"); // Get key object
        teclaJugador2.on(
            "down",
            function(event) {
                if (time.paused)
                {
                    Countdown.setFrame(1);
                    time.paused = false;
                }
            },
            this
        );

        this.input.on('pointerdown', function(event){
            if (time.paused)
            {
                Countdown.setFrame(1);
                time.paused = false;
            }
        },this);

        this.scene.bringToTop();
    }

    update () {
    }
}

function onEvent()
{
    this.scene.resume(constants.escena_pausada);
    console.log("Tornem a l'escena");
    this.scene.stop();
}