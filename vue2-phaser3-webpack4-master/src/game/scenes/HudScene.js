import { Scene } from 'phaser';
import constants from "../constants";

let vides, escuts, municions, pistoles, refugis;
let that;
export default class HudScene extends Scene {
    constructor () {
        super({ key: 'HudScene' });
    }

    create () {
        console.log("Starting HudScene ...");
        that = this;

        let y = 60
        for (let i = 0; i < 4; i++){
            this.add.sprite(880, y, 'colores', i);
            y += 40;
        }

        vides = this.add.group([
            {
                key: 'vidas',
                frame: [3],
                repeat: 3,
                setXY:
                    {
                        x: 1000,
                        y: 60,
                        stepX: 0,
                        stepY: 40
                    }}
        ]);

        escuts = this.add.group([
            {
                key: 'escudo',
                frame: [1],
                repeat: 3,
                setXY:
                    {
                        x: 1120,
                        y: 60,
                        stepX: 0,
                        stepY: 40
                    }}
        ]);

        pistoles = this.add.group([
            {
                key: 'pistola',
                frame: [1],
                repeat: 3,
                setXY:
                    {
                        x: 1160,
                        y: 60,
                        stepX: 0,
                        stepY: 40
                    }}
        ]);

        refugis = this.add.group([
            {
                key: 'refugio',
                frame: [1],
                repeat: 3,
                setXY:
                    {
                        x: 1200,
                        y: 60,
                        stepX: 0,
                        stepY: 40
                    }}
        ]);

    }

    update () {
        let jugadors = constants.players.getChildren();
        for (let i = 0; i < 4; i++){
            //actualizar los datos
        }
    }
}
