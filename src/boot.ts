import Globals from './globals';

export default class Boot extends Phaser.State {
  public preload ():void {
    this.stage.disableVisibilityChange = false;
    this.stage.smoothed = false;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    Globals.seed = this.rnd.between(0, 9999999999);
    this.rnd.sow([Globals.seed.toString()]);
  }
  
  public create ():void {
    this.game.state.start('preload');
    
  }
}