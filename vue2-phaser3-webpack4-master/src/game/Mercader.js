import constants from './constants'

class Mercader extends Phaser.GameObjects.Sprite {

    constructor (scene, x = -100, y = -100) {
        super(scene, x, y, 'mercader', 4);
        scene.add.existing(this);
        this.haAparegut = false;
        this.fase = 4;
        this.activat; //cert si el mercader ja ha arribat, fals altrament
        this.maxOfertes = 3; // màximes ofertes de cartes que pot oferir el mercader
        this.ofertes = []; // guarda els índex de les cartes
    }

    generarOfertes(){
        for (let i = this.ofertes.length; i < this.maxOfertes; i++) {
            let novaCarta = Phaser.Math.RND.between(4, 7);
            while (this.ofertes.find(function(element) { return element === novaCarta}))
            {
                novaCarta = Phaser.Math.RND.between(4, 7);
            }
            this.ofertes.push(novaCarta); // afegeix una nova carta
        }
    }

    apareix(){
        this.generarOfertes();

        let mercat = Phaser.Math.RND.between(0,3);
        let posicioX = constants.casellesMercader.getChildren()[mercat].x;
        let posicioY = constants.casellesMercader.getChildren()[mercat].y;
        this.x = posicioX;
        this.y = posicioY;
        this.haAparegut = true;
    }

    desapareix(){
        this.activat = false;
        this.fase = 4;
        this.setFrame(this.fase);
        this.haAparegut = false;
        this.x = -100;
        this.y = -100;
    }

    actualitzarFase(){
        if (this.fase > 0) {
            this.fase -= 1;
            this.setFrame(this.fase);
        }
        else {
            this.activat = true;
        }
    }
}
export default Mercader;
