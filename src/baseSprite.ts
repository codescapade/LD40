import { Globals } from './globals';

export class BaseSprite extends Phaser.Sprite {
  public gridPosition:Phaser.Point;

  constructor (game:Phaser.Game, gridX:number, gridY:number, atlas:string, spriteName:string ) {
    let worldPos:Phaser.Point = Globals.toWorld(gridX, gridY);
    super(game, worldPos.x, worldPos.y, atlas, spriteName);
    this.anchor.set(0.5, 0.5);
    this.game.add.existing(this);
    this.gridPosition = new Phaser.Point(gridX, gridY);

  } // constructor

  public updatePosition (gridX:number, gridY:number):void {
    this.gridPosition.set(gridX, gridY);
    let worldPos = Globals.toWorld(gridX, gridY);
    this.position.set(worldPos.x, worldPos.y);

  } // updatePosition

} // BaseSprite
