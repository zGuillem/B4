class Malfactor extends Phaser.GameObjects.Sprite {

    constructor (scene, x = 0, y = 0) {
        super(scene, x, y, 'malfactor');
        scene.add.existing(this);
        this.claus = 2; // nombre de claus que poseeix el malfactor
        this.plom = 1; //nombre de plom que es dóna com a premi quan no queden claus
    }
    teClaus(){
        return this.claus > 0;
    }
    donarPlom(){
        return this.plom;
    }
}
export default Malfactor;
