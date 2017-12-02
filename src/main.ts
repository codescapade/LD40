
class Main extends Phaser.Game {
  constructor () {
    super(800, 600, Phaser.CANVAS, 'container', null);
  }
}

window.onload = () => {
  new Main();
};