import { Scene } from 'phaser';
import constants from '../constants';


export default class CountDown extends Scene {
    constructor () {
        super({ key: '' });
    }

    create () {
        console.log("Starting CountDown...");

        var Countdown = this.add.sprite(200,200, 'ReadyGo');

        var time = this.time.addEvent({
            delay: 1000,
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