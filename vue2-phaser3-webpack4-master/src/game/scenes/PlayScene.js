import { Scene } from 'phaser';
import constants from '../constants'; // Constants
import Personaje from '../Personatge'; // Classe personatge

let usarForja = false; //cert si el jugador és a sobre de la forja i pot usar-la
let forja; //sprite de la forja
let butoMoure, butoDisparar, butoExit, butoForja, butoCartes, butoFi; //butons
let potDisparar;
let jugador;
let that;


function collisionen(x, y, grup) {
  var element = grup.getChildren();
  for (let i = 0; i < grup.getLength(); i++)
    if (element[i].x === x && element[i].y === y) // Si hi ha algun element a aquesta posicio, retorna cert
      return true;
  return false; // Si a la casella no hi ha cap element, retorna fals
}

function nouTorn(that){
  jugador = constants.players.getChildren()[constants.ronda%4];
  jugador.nouTorn();
  constants.potMoure = true;
  constants.ronda += 1;
  console.log("TORN JUGADOR: " + constants.ronda%4);
  butoMoure.setFrame(1);
  butoFi.setFrame(0);
  that.scene.stop('CardsScene');
}

function teEnemicAProp(jugador){
  // falta implementar, RECURSIVIDAD
}

function recompensar(guanyador)
{
    let jugadors = constants.players.getChildren();
    jugadors[guanyador].plom += constants.plomo_recompensa;
}

function guanyador(){
    var guanyador = 0;
    var puntuacio = 0;
    for ( var i = 1;  i < 5; i++)
    {
        if (constants.puntuacio[i] > puntuacio)
        {
            guanyador = i;
            puntuacio = constants.puntuacio[i];
        }
    }
    return guanyador;
}

function pausar_escenes() {
    console.log("Pausar");
    that.scene.sleep('HudScene');
    that.scene.sleep('CardsScene');
    that.scene.sleep();
    //reanudar_escenes();
}

function reanudar_escenes() {
}

function tractar_minijocs(jugador, minijoc)
{
}

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    //this.estat = "lliure";
  }

  create () {
    console.log("Starting PlayScene ...");

    //VARIABLES
    that = this;
    let grid; //fons taulell
    let masks = this.add.group(); //guarda les posicions on ens podem moure
    constants.potMoure = true; //cert si el botó fa quelcom al premer sobre ell
    potDisparar = false; // cert si el jugador té un enemic a l'abast i té un arma i munició

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
    crearButoCartes();


    //Afegim els jugadors
    constants.players.add(new Personaje(this, constants.INIT_X + 200, constants.INIT_Y + 300, 'player', 1, 3, 2, 0));
    constants.players.add(new Personaje(this, constants.INIT_X, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL, 'player2', 2, 3, 2, 0));
    constants.players.add(new Personaje(this, constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL, 'player3', 3, 3, 2, 0));
    constants.players.add(new Personaje(this, constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL, constants.INIT_Y, 'player4', 4, 3, 2, 0));

    jugador = constants.players.getChildren()[0];

    function crearTaulell() {
        // Tablero SOLO ES EL FONDO, las casillas especiales van por encima
        grid = that.add.group({ key: 'verde', frame: 0, repeat:48 });
        for (const gridAlignElement of Phaser.Actions.GridAlign(grid.getChildren(), {
            width: 7,
            cellWidth: constants.MIDACASELLA,
            cellHeight: constants.MIDACASELLA,
            x: constants.INIT_X,
            y: constants.INIT_Y
        }));

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

        //Posem la forja al centre del taulell
        forja = that.add.image(constants.INIT_X + constants.MIDACASELLA * constants.MIDATAULELL/2, constants.INIT_Y + constants.MIDACASELLA * constants.MIDATAULELL/2, 'forja');

    }

    function crearButoMoure() {
      butoMoure = that.add.sprite(190, 800, 'botonMover', 1).setInteractive();
      butoMoure.on('pointerup', () => { if (jugador.haMogut === false && constants.potMoure === true) posarMasqueres()});
    }

    function crearButoDisparar(){
      butoDisparar = that.add.sprite(410, 800, 'botonDisparar', 0).setInteractive();
      butoDisparar.on('pointerup', () => {if (potDisparar === true && jugador.haDisparat === false) that.disparar()});
    }

    function crearButoCartes(){
      butoCartes = that.add.sprite(850, 800, 'botonCartas', 1).setInteractive();
      butoCartes.on('pointerup', () => {
        that.scene.run('CardsScene', {buto: butoExit});
      });
    }

    function crearButoExit() {
      butoExit = that.add.sprite(1070, 60, 'botonExit', 1).setInteractive();
      butoExit.on('pointerup', function () {
        that.scene.stop('HudScene');
        that.scene.stop('CardsScene');
        that.scene.start('MainScene');
      });
    }

    function crearButoForja(){
      butoForja = that.add.sprite(630, 800, 'botonForja', 0).setInteractive();
      butoForja.on('pointerup', function(){
        if (usarForja === true)
          that.scene.switch('ForjaScene');
      });
    }

    function crearButoFi(){
      console.log("TORN JUGADOR: " + constants.ronda%4);
      butoFi = that.add.sprite(1100, 561, 'butoFiTorn', 0).setInteractive();
      butoFi.on('pointerup', function(){
        //if (jugador.haMogut === true) {
          nouTorn(that);
        //}
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
            if (collisionen(jugador.x, jugador.y, constants.minijocs)) {
                let joc = Phaser.Math.RND.between(0, 2);
                if (joc === 0) {
                    tractar_minijocs(1, "MinijocDianes");
                    //recompensar(guanyador());
                } else if (joc === 1) {
                    tractar_minijocs(1, "MinijocDianes");
                    /*var i = 1;
                    while ( i < 5 )
                    {
                        if (constants.estat === "lliure")
                        {
                            constants.estat = "ocupat";
                            that.scene.launch('MinijocDianes');
                            i++;
                        }

                        console.log(constants.estat);
                    }
                    recompensar(guanyador());
                    */
                } else if (joc === 2) {
                    that.scene.start("MinijocDianes", );
                    /*var i = 1;
                    while ( i < 5 )
                    {
                        if (constants.estat === "lliure")
                        {
                            constants.estat = "ocupat";
                            that.scene.launch('MinijocDianes');
                            i++;
                        }

                        console.log(constants.estat);
                    }
                    recompensar(guanyador());*/
                }
            }
          });
        }
      }
    }

      this.cursor = this.add.image(0,0, "dones_cursor");
      this.children.add(this.cursor);
      this.cursor.setDepth(1);
  }

  disparar(){
    jugador.haDisparat = true;
    console.log ("HE DISPARAT");
    butoDisparar.setFrame(0);
  }




  update () {
      this.cursor.x = this.input.x;
      this.cursor.y = this.input.y;

    let jugadors = constants.players.getChildren();
    let jugador = jugadors[constants.ronda%4];

    //Activació/Desactivació del botó de moure
    if (jugador.haMogut === false && constants.potMoure === true) {
      butoMoure.setFrame(1);
    }
    else{
      butoMoure.setFrame(0);
    }

    // Activació/Desactivació del botó de la forja
    if (jugador.x === forja.x && jugador.y === forja.y) { //Si el jugador està a la forja
      usarForja = true;
      butoForja.setFrame(1);
    }
    else {
      usarForja = false;
      butoForja.setFrame(0);
    }

    //Activació/Desactivació del botó de disparar
    if (jugador.haDisparat === false && jugador.teArma === true && jugador.municio > 0 && teEnemicAProp(jugador)) {
      potDisparar = true;
      butoDisparar.setFrame(1);
    }
    else {
      butoDisparar.setFrame(0);
      potDisparar = false;
    }

  }
}
