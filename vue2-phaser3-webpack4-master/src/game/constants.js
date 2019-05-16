import rexWaitEvents from './plugins/waitevents.js';


export default {
    CARTES: [['Whisky', true, 'carta1', '+1 de vida'], ['Goma2', true, 'carta2', '-1 de vida'], ['Saqueado', true, 'carta3', 'descartar una carta'], ['FalloTecnico', true, 'carta4', 'descartar arma'], ['Asalto', false, 'carta5', 'robar una carta'], ['Recamara', false, 'carta6', 'tiro extra'], ['Caballo', false, 'carta7', '+1 de movimiento'], ['Angel', false, 'carta8', 'escudo']],
    BARALLA: [0],
    MIDA_TILE: 48,
    TILES: [21, 15],
    INIT_X: 290, //posició x de la primera casella del taulell
    INIT_Y: 60, //posició y de la primera casella del taulell
    MIDATAULELL: 6, //nombre de files i columnes del taulell menys una
    MIDACASELLA: 100, // dimensions de cada casella
    preu_arma: 5, // preu de l'arma bàsica
    preu_municio: 0.5, //preu de la munició de l'arma bàsica
    potMoure: true, //Cert si el jugador pot moure's, fals altrament
    players: undefined, //llista dels jugadors amb les seves dades
    edificis: undefined, // llista amb els sprites de les caselles d'edificis
    minijocs: undefined, // llista amb els sprites de les caselles de minijoc
    ronda: 0, // número de ronda, també defineix el torn del jugador ( ronda % 4 )
    baralla: undefined,
    mida_tile: 48,
    tiles: [21, 15],
    escena_pausada: "",

    //Tractar minijocs
    puntuacio: [],
    plomo_recompensa: 5,
    estat: "lliure",

    waitevents: this.plugins.get('rexWaitEvents').add(),
    emitter: this.sys.events
}