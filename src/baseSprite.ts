import Globals from './globals';

export default class BaseSprite extends Phaser.Sprite {
  private _gridPosition:Phaser.Point;

  constructor (game:Phaser.Game, gridX:number, gridY:number, spriteName:string ) {
    let worldPos:Phaser.Point = Globals.toWorld(gridX, gridY);
    super(game, worldPos.x, worldPos.y, spriteName);
    this.anchor.set(0.5, 0.5);
    this.game.add.existing(this);
    this._gridPosition = new Phaser.Point(gridX, gridY);
  }

  updatePosition (gridX:number, gridY:number):void {
    this.gridPosition.set(gridX, gridY);
    let worldPos = Globals.toWorld(gridX, gridY);
    this.position.set(worldPos.x, worldPos.y);
  }
  get gridPosition ():Phaser.Point {
    return this._gridPosition;
  }
}