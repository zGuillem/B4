import { Scene } from 'phaser';
import constants from '../constants'; // Constants
import Personaje from '../Personatge'; // Classe personatge
import Malfactor from "../Malfactor";
import Mercader from "../Mercader";

let usarForja = false; //cert si el jugador és a sobre de la forja i pot usar-la
let forja; //sprite de la forja
let butoMoure, butoDisparar, butoExit, butoForja, butoComprar, butoCartes, butoFi; //butons
let potDisparar;
let jugador;
let missatge;
let timer = 0; // nombre de frames en els que s'ha mostrat el missatge de la casella sort
let startTimer = false; // cert si hem d'iniciar el timer
let that;
let objectiu;

function collisionen(x, y, grup) {
    let element = grup.getChildren();
    for (let i = 0; i < grup.getLength(); i++)
        if (element[i].x === x && element[i].y === y) // Si hi ha algun element a aquesta posicio, retorna cert
            return true;
    return false; // Si a la casella no hi ha cap element, retorna fals
}

function collisionen_jugador(x, y, grup) {
    let element = grup.getChildren();
    let i = 0;
    while (i < grup.getLength() && (element[i].x !== x && element[i].y !== y))
        {
            i++;
        }// Si hi ha algun element a aquesta posicio, retorna cert

    if ( i === grup.getLength() ) i = -1;

    return i; // Si a la casella no hi ha cap element, retorna fals
}

function collisionen_dispar(x, y, grup) {
    let element = grup.getChildren();
    for (let i = 0; i < grup.getLength(); i++)
        if (element[i].x === x && element[i].y === y)
        {
            element[i].vides -= 1;
            console.log(i + " té " + element[i].vides);
        }

}

function nouTorn(that){
    if (constants.mercader.haAparegut)
        constants.mercader.actualitzarFase();
    jugador = constants.players.getChildren()[constants.ronda%4];
    jugador.nouTorn();
    constants.potMoure = true;
    constants.ronda += 1;
    console.log("TORN JUGADOR: " + constants.ronda%4);
    butoMoure.setFrame(1);
    butoFi.setFrame(0);
    that.scene.stop('CardsScene');
    that.scene.stop('MercaderScene');
}


function teEnemicAProp(jugador){
    let masksEnemics = that.add.group();
    console.log(jugador.torn)
    //Col·loquem màsqueres a les posicions del voltant, sense tenir en compte posicions
        if (jugador.y-constants.MIDACASELLA >= constants.INIT_Y) //Si no estem al límit superior
            masksEnemics.add(that.add.image(jugador.x, jugador.y-constants.MIDACASELLA, 'mask'));

        if (jugador.y+constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) //Si no som al límit inferior
            masksEnemics.add(that.add.image(jugador.x, jugador.y+constants.MIDACASELLA, 'mask'));

        if (jugador.x-constants.MIDACASELLA >= constants.INIT_X){ //Si no som al límit esquerra
            if (jugador.y - constants.MIDACASELLA >= constants.INIT_Y) // I no som a la cantonada de l'esquerra
                masksEnemics.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y - constants.MIDACASELLA, 'mask'));
            if (jugador.y + constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) // I no som a la cantonada de la dreta
                masksEnemics.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y + constants.MIDACASELLA, 'mask'));
            masksEnemics.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y, 'mask'));
        }

        if (jugador.x+constants.MIDACASELLA <= constants.INIT_X + constants.MIDACASELLA*constants.MIDATAULELL) { //Si no som al límit dret
            if (jugador.y - constants.MIDACASELLA >= constants.INIT_Y) // I no som a la cantonada de l'esquerra
                masksEnemics.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y - constants.MIDACASELLA, 'mask'));
            if (jugador.y + constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) // I no som a la cantonada de la dreta
                masksEnemics.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y + constants.MIDACASELLA, 'mask'));
            masksEnemics.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y, 'mask'));
        }
        let maskChildren = masksEnemics.getChildren();
        for (let i = 0; i < masksEnemics.getLength(); i++){
            let maskElement = maskChildren[i];
            if (!collisionen(maskElement.x, maskElement.y, constants.players)) { //eliminem la màscara si col·lisiona amb un altre jugador
                masksEnemics.remove(maskElement, true, true);
                i--;
            }
            else { //la fem interactiva
                maskElement.setInteractive();
                maskElement.on('pointerup', function () {
                    collisionen_dispar(maskElement.x, maskElement.y, constants.players);
                        jugador.haDisparat = true;
                        butoDisparar.setFrame(0);
                        masksEnemics.clear(true,true);
                });
            }
        }
}

function teTendaAProp(jugador) {
    let mercats = constants.casellesMercader.getChildren();
    for (let i = 0; i < mercats.length; i++){
        let distanciaX = Math.abs(jugador.x - mercats[i].x);
        let distanciaY= Math.abs(jugador.y - mercats[i].y);
        if ((distanciaX === constants.MIDACASELLA && distanciaY === 0) || (distanciaX === 0 && distanciaY === constants.MIDACASELLA))
            return true;
    }
    return false;
}

function buscarPosicio(objecte){
    let x = (Math.floor(Math.random()*4)) * 100 + constants.INIT_X;
    let y = (Math.floor(Math.random()*4)) * 100 + constants.INIT_Y;

    while (collisionen(x,y, constants.players) || collisionen(x,y, constants.edificis) || collisionen(x,y, constants.minijocs) || ((x === forja.x && y === forja.y)))
    {
        x = (Math.floor(Math.random()*4)) * 100 + constants.INIT_X;
        y = (Math.floor(Math.random()*4)) * 100 + constants.INIT_Y;
    }

    objecte.x = x;
    objecte.y = y;
}

function casellaMinijoc(){
    let joc = Phaser.Math.RND.between(0,2);
    if (joc === 0)
        that.scene.launch('MinijocDianes',[1, 4, []]);
    else if (joc === 1)
        that.scene.launch('MinijocBeber', [1, 4, []]);
    else if (joc === 2)
        that.scene.launch('MinijocDones', [1, 4, []]);
}

function casellaSort(){
    let loteria = Phaser.Math.RND.between(0,6);
    startTimer = true;
    switch (loteria) {
        case 0: // es trenca l'arma
            //aca mostrar el mensaje
            jugador.teArma = false;
            break;
        case 1: // li regalen un arma
            jugador.teArma = true;
            break;
        case 2: // guanya un de plom
            jugador.plom += 1;
            break;
        case 3: // perd un de plom
            jugador.plom -= 1;
            break;
        case 4: // guanya un de munició
            jugador.municio += 1;
            break;
        case 5: // perd un de munició
            jugador.municio -= 1;
            break;
        case 6: // minijoc
            startTimer = false;
            casellaMinijoc();
            break;
    }
}

export default class PlayScene extends Scene {
    constructor () {
        super({ key: 'PlayScene' });
    }

    create () {
        console.log("Starting PlayScene ...");

        //VARIABLES
        that = this;
        let grid; //fons taulell
        let masks = this.add.group(); //guarda les posicions on ens podem moure
        constants.potMoure = true; //cert si el botó fa quelcom al premer sobre ell
        potDisparar = false; // cert si el jugador té un enemic a l'abast i té un arma i munició
        startTimer = false;
        timer = 0;

        constants.players = this.add.group(); //llista jugadors
        constants.ronda = 0; //inicialitzem ronda
        constants.baralla = constants.BARALLA.slice(0); // inicialitzem baralla

        this.scene.launch('HudScene'); //mostrem el HUD

        constants.baralla.sort(function(a,b){return 0.5 - Math.random()}); //Barregem la baralla de cartes

        //Posar dors baralla
        this.add.sprite(1100, 261, 'dorso', 0);

        //Creem el taulell amb les seves caselles especials
        crearTaulell();

        // Creem els botons
        crearButoFi();
        crearButoDisparar();
        crearButoMoure();
        crearButoExit();
        crearButoForja();
        crearButoComprar();
        crearButoCartes();

        //Afegim els jugadors
        constants.players.add(new Personaje(this, constants.INIT_X, constants.INIT_Y, 'player', 1));
        constants.players.add(new Personaje(this, constants.INIT_X, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL, 'player2', 2));
        constants.players.add(new Personaje(this, constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL, 'player3', 3));
        constants.players.add(new Personaje(this, constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL, constants.INIT_Y, 'player4', 4));

        jugador = constants.players.getChildren()[0];

        //Posem al foragit en una casella aleatòria
        /*constants.malfactor = new Malfactor(that);
        buscarPosicio(constants.malfactor);*/

        function crearTaulell() {

            that.add.image(700,500, 'fondoTablero');

            grid = that.add.group({ key: 'verde', frame: 0, repeat:48 });
            for (const gridAlignElement of Phaser.Actions.GridAlign(grid.getChildren(), {
                width: 7,
                cellWidth: constants.MIDACASELLA,
                cellHeight: constants.MIDACASELLA,
                x: constants.INIT_X,
                y: constants.INIT_Y
            }));

            constants.casellesMercader = that.add.group([
                {
                    key: 'mercat', setXY: {x: constants.INIT_X + constants.MIDACASELLA * 4, y: constants.INIT_Y - constants.MIDACASELLA}
                },
                {
                    key: 'mercat', setXY: {x: constants.INIT_X - constants.MIDACASELLA, y: constants.INIT_Y + constants.MIDACASELLA * 2}
                },
                {
                    key: 'mercat', setXY: {x: constants.INIT_X + constants.MIDACASELLA * 7, y: constants.INIT_Y + constants.MIDACASELLA * 4}
                },
                {
                    key: 'mercat', setXY: {x: constants.INIT_X + constants.MIDACASELLA * 2, y: constants.INIT_Y + constants.MIDACASELLA * 7}
                }
            ])

            //Posem els edificis
            constants.edificis = that.add.group([
                {
                    key: 'edifici', setXY: {x: constants.INIT_X, y: constants.INIT_Y + constants.MIDACASELLA * 3}
                },
                {
                    key: 'edifici', setXY: { x: constants.INIT_X + constants.MIDACASELLA * 2, y: constants.INIT_Y + constants.MIDACASELLA * 5}
                },
                {
                    key: 'edifici', setXY: { x: constants.INIT_X + constants.MIDACASELLA * 4, y: constants.INIT_Y + constants.MIDACASELLA * 2}
                },
                {
                    key: 'edifici', setXY: { x: constants.INIT_X + constants.MIDACASELLA * 5, y: constants.INIT_Y + constants.MIDACASELLA * 4}
                },
                {
                    key: 'edifici', setXY: { x: constants.INIT_X + constants.MIDACASELLA * 6, y: constants.INIT_Y + constants.MIDACASELLA}
                }
            ]);

            //Posem les caselles de minijocs
            constants.minijocs = that.add.group([
                {
                    key: 'minijoc',
                    setXY: { x: constants.INIT_X + constants.MIDACASELLA, y: constants.INIT_Y + constants.MIDACASELLA}
                },
                {
                    key: 'minijoc',
                    setXY: { x: constants.INIT_X + constants.MIDACASELLA * 4, y: constants.INIT_Y}
                },
                {
                    key: 'minijoc',
                    setXY: { x: constants.INIT_X + constants.MIDACASELLA * 4, y: constants.INIT_Y + constants.MIDACASELLA*6}
                },
            ]);

            //Posem les caselles de sort
            constants.sort = that.add.group([
                {
                    key: 'sort',
                    setXY: { x: constants.INIT_X + constants.MIDACASELLA * 2, y: constants.INIT_Y + constants.MIDACASELLA * 2}
                },
                {
                    key: 'sort',
                    setXY: { x: constants.INIT_X + constants.MIDACASELLA * 6, y: constants.INIT_Y + constants.MIDACASELLA * 4}
                }
            ]);

            //Posem la forja al centre del taulell
            forja = that.add.image(constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL/2, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL/2, 'forja');
        }

        function crearButoMoure() {
            butoMoure = that.add.sprite(1000, 290, 'botonMover', 1).setInteractive();
            butoMoure.on('pointerup', () => { if (jugador.haMogut === false && constants.potMoure === true) posarMasqueres()});
        }

        function crearButoDisparar(){
            butoDisparar = that.add.sprite(1230, 290, 'botonDisparar', 1).setInteractive();
            butoDisparar.on('pointerup', () => {
                if (jugador.haDisparat === false && potDisparar) teEnemicAProp(jugador);
            });
        }

        function crearButoCartes(){
            butoCartes = that.add.sprite(1120, 550, 'botonCartas', 1).setInteractive();
            butoCartes.on('pointerup', () => {
                that.scene.run('CardsScene', {buto: butoExit});
            });
        }

        function crearButoExit() {
            butoExit = that.add.sprite(170, 930, 'botonExit', 1).setInteractive();
            butoExit.on('pointerup', function () {
                that.scene.stop('HudScene');
                that.scene.stop('CardsScene');
                that.scene.stop('MercaderScene');
                that.scene.start('MainScene');
            });
        }

        function crearButoForja(){
            butoForja = that.add.sprite(1000, 420, 'botonForja', 0).setInteractive();
            butoForja.on('pointerup', function(){
                if (usarForja === true)
                    that.scene.switch('ForjaScene');
            });
        }

        function crearButoComprar(){
            butoComprar = that.add.sprite(1230, 420, 'botonComprar', 0).setInteractive();
            butoComprar.on('pointerup', function(){
                if (jugador.potComprar === true)
                    that.scene.run('MercaderScene');
            });
        }

        function crearButoFi(){
            console.log("TORN JUGADOR: " + constants.ronda%4);
            butoFi = that.add.sprite(1300, 930, 'butoFiTorn', 0).setInteractive();
            butoFi.on('pointerup', function(){
                if (jugador.haMogut === true) {
                    nouTorn(that);
                }
            });
        }

        function posarMasqueres(){
            jugador = constants.players.getChildren()[constants.ronda % 4];
            constants.potMoure = false; // el butó de moure no fa res al clickar-lo

            //Col·loquem màsqueres a les posicions del voltant, sense tenir en compte posicions
            if (jugador.y-constants.MIDACASELLA >= constants.INIT_Y) //Si no estem al límit superior
                masks.add(that.add.image(jugador.x, jugador.y-constants.MIDACASELLA, 'mask'));

            if (jugador.y+constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) //Si no som al límit inferior
                masks.add(that.add.image(jugador.x, jugador.y+constants.MIDACASELLA, 'mask'));

            if (jugador.x-constants.MIDACASELLA >= constants.INIT_X){ //Si no som al límit esquerra
                if (jugador.y - constants.MIDACASELLA >= constants.INIT_Y) // I no som a la cantonada de l'esquerra
                    masks.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y - constants.MIDACASELLA, 'mask'));
                if (jugador.y + constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) // I no som a la cantonada de la dreta
                    masks.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y + constants.MIDACASELLA, 'mask'));
                masks.add(that.add.image(jugador.x - constants.MIDACASELLA, jugador.y, 'mask'));
            }

            if (jugador.x+constants.MIDACASELLA <= constants.INIT_X + constants.MIDACASELLA*constants.MIDATAULELL) { //Si no som al límit dret
                if (jugador.y - constants.MIDACASELLA >= constants.INIT_Y) // I no som a la cantonada de l'esquerra
                    masks.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y - constants.MIDACASELLA, 'mask'));
                if (jugador.y + constants.MIDACASELLA <= constants.INIT_Y + constants.MIDACASELLA*constants.MIDATAULELL) // I no som a la cantonada de la dreta
                    masks.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y + constants.MIDACASELLA, 'mask'));
                masks.add(that.add.image(jugador.x + constants.MIDACASELLA, jugador.y, 'mask'));
            }

            //Eliminem les màsqueres que col·lisionen amb un enemic i la resta les fem interactives
            let maskChildren = masks.getChildren();
            for (let i = 0; i < masks.getLength(); i++){
                let maskElement = maskChildren[i];
                if (collisionen(maskElement.x, maskElement.y, constants.players)) { //eliminem la màscara si col·lisiona amb un altre jugador
                    masks.remove(maskElement, true, true);
                    i--;
                }
                else { //la fem interactiva
                    maskElement.setInteractive();
                    maskElement.on('pointerup', function () {
                        jugador.x = this.x;
                        jugador.y = this.y;
                        if (collisionen(jugador.x, jugador.y, constants.edificis))
                            jugador.estaRefugiat = true;
                        masks.clear(true, true);
                        jugador.haMogut = true;
                        butoFi.setFrame(1);
                        if (collisionen(jugador.x, jugador.y, constants.minijocs))
                        {
                            casellaMinijoc();
                        }
                        /*else if (jugador.x === constants.malfactor.x && jugador.y === constants.malfactor.y)
                        {
                            console.log("ACÁ ESTARÍA EL MINIJUEGO DEL BANDIDO");
                            console.log("Acá se comprobaría el vencedor");
                            buscarPosicio(constants.malfactor);
                        }*/
                        else if (collisionen(jugador.x, jugador.y, constants.sort)){
                            casellaSort();
                        }
                    });
                }
            }
        }

        this.cursor = this.add.image(0,0, "dones_cursor");
        this.children.add(this.cursor);
        this.cursor.setDepth(1);

        constants.mercader = new Mercader(this);
    }


    update () {

        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;

        let jugadors = constants.players.getChildren();
        let jugador = jugadors[constants.ronda%4];

        if (jugador.vides > 0)
        {
            //Activació/Desactivació del botó de moure
            if (jugador.haMogut === false && constants.potMoure === true) {
                butoMoure.setFrame(1);
            }
            else{
                butoMoure.setFrame(0);
            }

            // Activació/Desactivació del botó de la forja
            if (jugador.x === forja.x && jugador.y === forja.y  ) { //Si el jugador està a la forja i té la clau
                usarForja = true;
                butoForja.setFrame(1);
            }
            else {
                usarForja = false;
                butoForja.setFrame(0);
            }

            //Activació/Desactivació del botó de disparar
            if (jugador.haDisparat === false && jugador.teArma === true && jugador.municio > 0) {
                potDisparar = true;
                butoDisparar.setFrame(1);
            }
            else {
                butoDisparar.setFrame(0);
                potDisparar = false;
            }

            //Activació/Desactivació del botó de comprar
            if (constants.mercader.activat === true && teTendaAProp(jugador)){
                jugador.potComprar = true;
                butoComprar.setFrame(1);
            }
            else {
                jugador.potComprar = false;
                butoComprar.setFrame(0);
            }


            //Es mostra el missatge de la casella de sort
            if (startTimer === true)
                timer += 1;

            if (timer >= 130) { // la carta desapareix durant 200 frames
                //missatge.destroy(true);
                startTimer = false;
                timer = 0;
            }
        }
        else
        {
            nouTorn(that);
        }


        //Aparició/Desaparició del mercader
        if (constants.ronda % 10 === 0 && constants.mercader.haAparegut === false) {
            constants.mercader.apareix();
        }
        if (constants.ronda % 22 === 0 && constants.mercader.haAparegut === true)
            constants.mercader.desapareix();
    }
}
