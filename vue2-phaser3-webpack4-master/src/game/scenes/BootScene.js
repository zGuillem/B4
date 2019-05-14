import {Scene} from 'phaser'
import mapa from '@/game/assets/Mapa.png';
import bomb from '@/game/assets/bomb.png';

//Beure
import beure_jugador1 from '@/game/assets/beure_jugador1.png';
import beure_jugador2 from '@/game/assets/beure_jugador2.png';
import beure_jugador3 from '@/game/assets/beure_jugador3.png';
import beure_jugador4 from '@/game/assets/beure_jugador4.png';
import beure_j1_cara from '@/game/assets/minijoc_beure_cara.png';
import taberna_minijoc from '@/game/assets/taberna_minijoc_beure.png';
import taberna_barra from '@/game/assets/barra_taberna.png';
import ready_go from '@/game/assets/ready_go.png';
import beure_particules_1 from  '@/game/assets/beber_particulas_nivel_embriaguez_1.png';

//Dianes
import paisatge_dianes from '@/game/assets/Fons_llaunes.png';
import barra_dianes from '@/game/assets/Taula_dianes.png';
import llauna from '@/game/assets/llauna.png';

//Dones
import dona_corrent from '@/game/assets/minijoc_dones_dona.png'

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('mapa', mapa);
        this.load.image('bomb', bomb);
        this.load.spritesheet('beure_jugador1', beure_jugador1, {
            frameWidth: 216,
            frameHeight: 216
        });
        this.load.spritesheet('beure_jugador2', beure_jugador2, {
            frameWidth: 216,
            frameHeight: 216
        });
        this.load.spritesheet('beure_jugador3', beure_jugador3, {
            frameWidth: 216,
            frameHeight: 216
        });
        this.load.spritesheet('beure_jugador4', beure_jugador4, {
            frameWidth: 216,
            frameHeight: 216
        });
        this.load.spritesheet('beure_particules1', beure_particules_1, {
            frameWidth: 96,
            frameHeight: 96
        });
        this.load.spritesheet('dones_dona_corrent', dona_corrent, {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.image('barra', taberna_barra);
        this.load.image('paisatge_dianes', paisatge_dianes);
        this.load.image('barra_dianes', barra_dianes);
        this.load.image('llauna_dianes', llauna);
        this.load.spritesheet('beure_j1_cara', beure_j1_cara, {
            frameWidth: 34,
            frameHeight: 40
        });
        this.load.spritesheet('ReadyGo', ready_go, {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.image('taberna_beure', taberna_minijoc);
        this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg']);
    }

    create() {
        this.scene.start('MinijocDones');
    }
}
