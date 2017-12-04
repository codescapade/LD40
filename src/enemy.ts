import { Snake } from './snake';
import { Bullet } from './bullet';
import { GameState } from './states/gameState';
import { BaseSprite } from './baseSprite';

export class Enemy extends Snake {
  private _bullet:Bullet;
  private _colors:string[];
  private _color:string;
  private _directions:Phaser.Point[];

  constructor (state:GameState, gridX:number, gridY:number, delay:number) {
    super(state, gridX, gridY, delay, 'sprites', 'red', 0, false);
    this._colors = ['green', 'red']
    this._color = this._colors[state.game.rnd.between(0, 1)];

    this._snakeHead.frameName = this._color + '_snake_head';
    
    this._directions = [new Phaser.Point(1, 0), new Phaser.Point(-1, 0),
        new Phaser.Point(0, 1), new Phaser.Point(0, -1)];
  } // constructor

  public update () {
    this._setNewDirection();
    super.update();
  }

  private _setNewDirection ():void {
    let foundDirection:boolean = false;
    let nr:number;
    let dir:Phaser.Point;

    while (!foundDirection) {
      nr = this._state.game.rnd.between(0, 3);
      dir = this._directions[nr];
      let newX:number = this._snakeHead.gridPosition.x + dir.x;
      let newY:number = this._snakeHead.gridPosition.y + dir.y;
      
      if (this._state.map.getTile(newX, newY).index == 0) {
        foundDirection = true;
      }
    }

    this._desiredDirection = dir;
    if (nr == 0) {
      this._desiredRotation = 0;
    } else if (nr == 1) {
      this._desiredRotation = 180;
    } else if (nr == 2) {
      this._desiredRotation = 90;
    } else if (nr == 3) {
      this._desiredRotation = 270;
    }
  }

} // Enemy