export default class Game extends Phaser.State {
  public create ():void {
    console.log('game start here');
    this.add.sprite(20, 20, 'food');
  }

  public update ():void {
    //console.log(this.time.elapsed);
  }
}