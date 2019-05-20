class Personaje extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, imatge, torn, vides, plom, municio) {
        super(scene, x, y, imatge);
        scene.add.existing(this);
        this.torn = torn;
        this.vides = vides;
        this.plom = 30;
        this.municio = municio;
        this.teClau = false; // cert si té la clau de la forja
        this.teArma = false;
        this.teEscut = false;
        this.estaRefugiat = false;
        this.nCartes = 0; // nombre de cartes que té el jugador
        this.cartes = []; // cartes que el jugador té a la mà
        this.haMogut = false;
        this.haDisparat = false;
        this.haRobat = false;
        this.potRobar = true;
        this.potComprar = false;
    }

    nouTorn() {
        this.haMogut = false;
        this.haDisparat = false;
        this.haRobat = false;
        this.potComprar = false;
        this.potRobar = true;
    }

    posarArma(){
        // FALTA cambiar de sprite
        this.teArma = true;
    }

    treureArma(){
        //FALTA cambiar de sprite
        this.teArma = false;
    }

    posarEscut(){
        this.teEscut = true;
        //FALTA cambiar de sprite
    }

    afegirCarta(id){
        if (this.nCartes < 2){ //i té menys de dues cartes a la mà
            this.nCartes += 1;
            this.cartes.push(id);
        }
    }

    treureCarta(posicio){
        this.nCartes -= 1;
        this.cartes.splice(posicio, 1);
    }
}

export default Personaje;