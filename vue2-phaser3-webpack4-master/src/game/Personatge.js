import jugador1 from '@/game/assets/jugador1.png';
class Personaje extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, "jugador1");
        scene.add.existing(this);
    }
}

export default Personaje;