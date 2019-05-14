import { Scene } from 'phaser';
import constants from '../constants';
import Personaje from '../Personatge';

const WIDTH = constants.mida_tile* constants.tiles[0];
const HEIGHT = constants.mida_tile* constants.tiles[1];

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
  }

  create () {
    var that = this;
    console.log("Starting PlayScene ...");


    let i = this.add.image(WIDTH/2, HEIGHT/2, 'mapa');
    console.log(i);

    var personatge1 =  new Personaje(this, 0, 0);

    this.input.on('pointerdown', function(event){
      personatge1.x = event.x;
      personatge1.y = event.y;
      console.log(personatge1.x);
    },this);
  }

  update () {
  }
}
