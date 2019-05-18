import {Scene} from 'phaser'
import mapa from '@/game/assets/Mapa.png';
import bomb from '@/game/assets/bomb.png';

//Tauler
import dorso from '@/game/assets/dorso.png';
import mesa from '@/game/assets/mesa.png'
import rojo from '@/game/assets/rojo.png';
import fondoTablero from '@/game/assets/fondoTablero.png';
import verde from '@/game/assets/verde.png';
import mercat from '@/game/assets/mercat.png';
import mercader from '@/game/assets/mercader.png';
import fonsTenda from '@/game/assets/fonsTenda.jpg';
import forja from '@/game/assets/fotoForja.png';
import edifici from '@/game/assets/fotoEdificio.png';
import minijoc from '@/game/assets/fotoMinijuego.png';
import sort from '@/game/assets/fotoSuerte.png';
import malfactor from '@/game/assets/bandido.png';
import botonMover from '@/game/assets/botonMover.png';
import botonDisparar from '@/game/assets/botonDisparar.png';
import botonCartas from '@/game/assets/botonCartas.png';
import botonMenu from '@/game/assets/menu.png';
import botonExit from '@/game/assets/exit.png';
import botonForja from '@/game/assets/botonForja.png';
import botonComprar from '@/game/assets/botonComprar.png';
import botonStart from '@/game/assets/start.png';
import botonManual from '@/game/assets/manual.png';
import botonCreditos from '@/game/assets/creditos.png';
import butoFiTorn from '@/game/assets/fiTorn.png';
import player from '@/game/assets/player.png';
import player2 from '@/game/assets/player2.png';
import player3 from '@/game/assets/player3.png';
import player4 from '@/game/assets/player4.png';
import mask from '@/game/assets/mascara.png';
import credits from '@/game/assets/credits.png';
import mMove from  '@/game/assets/mMove.png';
import mDisparar from '@/game/assets/mDisparar.png';
import mComprar from '@/game/assets/mComprar.png';
import mForjar from '@/game/assets/mForjar.png';
import mMinijuegos from '@/game/assets/mMinijuegos.png';
import mOtros from '@/game/assets/mOtros.png';
import flecha from '@/game/assets/flecha.png';
import fondoForja from '@/game/assets/fonsForja.jpg';
import arma from '@/game/assets/arma.png';
import municion from '@/game/assets/municion.png';
import carta1 from '@/game/assets/carta1.png';
import carta2 from '@/game/assets/carta2.png';
import carta3 from '@/game/assets/carta3.png';
import carta4 from '@/game/assets/carta4.png';
import carta5 from '@/game/assets/carta5.png';
import carta6 from '@/game/assets/carta6.png';
import carta7 from '@/game/assets/carta7.png';
import carta8 from '@/game/assets/carta8.png';
import colores from '@/game/assets/colores.png';
import vidas from '@/game/assets/vidas.png';
import escudo from '@/game/assets/escudo.png';
import pistola from '@/game/assets/pistola.png';
import numeros from '@/game/assets/numeros.png';
import refugio from '@/game/assets/refugio.png';
import fondo_menu from '@/game/assets/fondo_menu.png';

//Beure
import beure_jugador1 from '@/game/assets/beure_jugador1.png';
import beure_jugador2 from '@/game/assets/beure_jugador2.png';
import beure_jugador3 from '@/game/assets/beure_jugador3.png';
import beure_jugador4 from '@/game/assets/beure_jugador4.png';
import taberna_minijoc from '@/game/assets/taberna_minijoc_beure.png';
import ready_go from '@/game/assets/ready_go.png';
import beure_particules_1 from  '@/game/assets/beber_particulas_nivel_embriaguez_1.png';
import beure_particules_2 from  '@/game/assets/beber_particulas_nivel_embriaguez_2.png';

//Dianes
import paisatge_dianes from '@/game/assets/Fons_llaunes.png';
import barra_dianes from '@/game/assets/Taula_dianes.png';
import llauna from '@/game/assets/llauna.png';

//Dones
import dona_corrent from '@/game/assets/sprites_mujer_caminando.png'
import dones_cursor from '@/game/assets/minijoc_dones_cursor.png'
import mujeres_espacio from '@/game/assets/mujeres_espacio.png'
import dones_diana from '@/game/assets/dones_diana.png'


//General
import nombres from '@/game/assets/sprite_numeros_grandes.png'


export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        //Debug
        this.load.image('mapa', mapa);
        this.load.image('bomb', bomb);
        this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg']);

        this.load.image("fondo_menu", fondo_menu);

        //Hub
        this.load.spritesheet('colores', colores, {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('vidas', vidas, {frameWidth: 196, frameHeight: 24});
        this.load.spritesheet('escudo', escudo, {frameWidth: 28, frameHeight: 24});
        this.load.spritesheet('pistola', pistola, {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('numeros', numeros, {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('refugio', refugio, {frameWidth: 24, frameHeight: 24});

        //Tablero
        this.load.image('fondoTablero', fondoTablero);
        this.load.image('rojo', rojo);
        this.load.image('verde', verde);
        this.load.image('forja', forja);
        this.load.image('edifici', edifici);
        this.load.image('minijoc', minijoc);
        this.load.image('sort', sort);
        this.load.image('malfactor', malfactor);
        this.load.image('mercat', mercat);
        this.load.image('fonsTenda', fonsTenda);
        this.load.spritesheet('mercader', mercader, {frameWidth: 100, frameHeight: 100});

        //Jugadores
        this.load.image('player', player);
        this.load.image('player2', player2);
        this.load.image('player3', player3);
        this.load.image('player4', player4);

        // Botones
        this.load.image('botonMenu', botonMenu);
        this.load.spritesheet('botonExit', botonExit, {frameWidth: 200, frameHeight: 50});
        this.load.spritesheet('botonMover', botonMover, {frameWidth: 200, frameHeight: 100});
        this.load.spritesheet('botonDisparar', botonDisparar, {frameWidth: 200, frameHeight: 100});
        this.load.spritesheet('botonCartas', botonCartas, {frameWidth: 200, frameHeight: 100});
        this.load.spritesheet('botonForja', botonForja, {frameWidth: 200, frameHeight: 100});
        this.load.spritesheet('botonComprar', botonComprar, {frameWidth: 200, frameHeight: 100});
        this.load.image('botonStart', botonStart);
        this.load.image('botonManual', botonManual);
        this.load.image('botonCreditos', botonCreditos);
        this.load.spritesheet('butoFiTorn', butoFiTorn, {frameWidth: 100, frameHeight: 100});

        // Cartas
        this.load.image('carta1', carta1);
        this.load.image('carta2', carta2);
        this.load.image('carta3', carta3);
        this.load.image('carta4', carta4);
        this.load.image('carta5', carta5);
        this.load.image('carta6', carta6);
        this.load.image('carta7', carta7);
        this.load.image('carta8', carta8);

        // How to play
        this.load.image('mMover', mMove);
        this.load.image('mDisparar', mDisparar);
        this.load.image('mComprar', mComprar);
        this.load.image('mForjar', mForjar);
        this.load.image('mMinijuegos', mMinijuegos);
        this.load.image('mOtros', mOtros);

        // Flechas
        this.load.image('flecha', flecha);

        this.load.image('mask', mask);
        this.load.image('credits', credits);
        this.load.image('mesa', mesa);
        this.load.spritesheet('casilla', verde, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('dorso', dorso, { frameWidth: 200, frameHeight: 350 });

        //Forja
        this.load.image('fondoForja', fondoForja);
        this.load.image('arma', arma);
        this.load.image('municion', municion);
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])

        //Beure
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
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.spritesheet('beure_particules2', beure_particules_2, {
            frameWidth: 120,
            frameHeight: 120
        });
        this.load.image('taberna_beure', taberna_minijoc);


        //Diana
        this.load.image('paisatge_dianes', paisatge_dianes);
        this.load.image('barra_dianes', barra_dianes);
        this.load.image('llauna_dianes', llauna);

        //Dones
        this.load.spritesheet('dones_dona_corrent', dona_corrent, {
            frameWidth: 640,
            frameHeight: 640
        });
        this.load.spritesheet('dones_diana', dones_diana, {
            frameWidth: 79,
            frameHeight: 79
        });
        this.load.image('dones_cursor', dones_cursor);
        this.load.image('dones_fons', mujeres_espacio);

        //CountDown
        this.load.spritesheet('ReadyGo', ready_go, {
            frameWidth: 420,
            frameHeight: 384
        });
        this.load.spritesheet('nombres', nombres,
        {
            frameWidth: 192,
            frameHeight: 192
        })
    }

    create() {
        this.scene.start('MainScene');
    }
}
