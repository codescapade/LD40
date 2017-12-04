
import { BootState } from './states/bootState';
import { PreloadState } from './states/preloadState';
import { GameState } from './states/gameState';

class Main extends Phaser.Game {
  constructor () {
    super(640, 480, Phaser.AUTO, 'container', null);

    this.state.add('boot', BootState);
    this.state.add('preload', PreloadState);
    this.state.add('game', GameState);

    this.state.start('boot');

  } // constructor

} // Main

window.onload = () => {
  new Main();
  console.log('window loaded');
}; // window.onload
