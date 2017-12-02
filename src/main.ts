
import Boot from './boot';
import Preload from './preload';
import Game from './game';

class Main extends Phaser.Game {
  public test: 'testing';

  constructor () {
    super(640, 480, Phaser.CANVAS, 'container', null);

    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('game', Game);

    this.state.start('boot');
  }
}

window.onload = () => {
  new Main();
};