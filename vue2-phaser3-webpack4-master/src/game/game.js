import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import MinijocBeure from './scenes/MinijocBeure'
import CountDown from './scenes/CountDownScene'
import MinijocDianes from './scenes/MinijocDianes'
import MinijocDones from './scenes/MinijocDones'
import constants from './constants'
import MainScene from './scenes/MainScene'
import CreditsScene from "./scenes/CreditsScene";
import ManualScene from "./scenes/ManualScene";
import ForjaScene from "./scenes/ForjaScene";
import CardsScene from "./scenes/CardsScene";
import MercaderScene from "./scenes/MercaderScene";
import HudScene from "./scenes/HudScene";

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 1400,
        height: 1000,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false
            }
        },
        scene: [BootScene, PlayScene, MinijocBeure, CountDown, MinijocDianes, MinijocDones,
                MainScene, CreditsScene, ManualScene, ForjaScene, HudScene, CardsScene, MercaderScene]
    })
}

export default launch
export {launch}
