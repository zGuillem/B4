import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import MinijocBeure from './scenes/MinijocBeure'
import CountDown from './scenes/CountDownScene'
import MinijocDianes from './scenes/MinijocDianes'
import constants from './constants'

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width:  constants.tiles[0]*constants.mida_tile,
        height: constants.tiles[1]*constants.mida_tile,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        scene: [BootScene, PlayScene, MinijocBeure, CountDown, MinijocDianes]
    })
}

export default launch
export {launch}
