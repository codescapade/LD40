import { Globals } from '../globals';

export class PreloadState extends Phaser.State {
  public preload ():void {
    this.load.atlasJSONHash('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
    this.load.image('tiles', 'assets/images/tiles.png');

  } // preload

  public create ():void {
    this.game.state.start('game');

  } // create

} // Preload
