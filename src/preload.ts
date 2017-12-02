import Globals from './globals';

export default class Preload extends Phaser.State {
  public preload ():void {
    this.load.image('head', 'assets/images/head.png');
    this.load.image('body', 'assets/images/body.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('food', 'assets/images/food.png');
  }

  public create ():void {
    console.log(Globals.seed);
    this.game.state.start('game');
  }
}