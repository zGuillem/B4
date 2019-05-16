import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import MainScene from './scenes/MainScene'
import CreditsScene from "./scenes/CreditsScene";
import ManualScene from "./scenes/ManualScene";
import ForjaScene from "./scenes/ForjaScene";
import MercaderScene from "./scenes/MercaderScene";
import HudScene from "./scenes/HudScene";
import CardsScene from "./scenes/CardsScene";


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
        scene: [BootScene, PlayScene, MainScene, CreditsScene, ManualScene, ForjaScene, MercaderScene, HudScene, CardsScene]
    })
}

export default launch
export {launch}
