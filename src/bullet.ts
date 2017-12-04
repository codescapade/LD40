import { BaseSprite } from "./baseSprite";
import { GameState } from "./states/gameState";
import { SpriteType } from "./globals";


export class Bullet extends BaseSprite {
  private _delay:number = 20;
  private _timer:number = 0;

  private _direction:Phaser.Point = new Phaser.Point;

  private _state:GameState;

  constructor(state:GameState, gridX:number, gridY:number, color:string) {
    super(state.game, gridX, gridY, 'sprites', color + '_bullet');
    this.frameName = 'green_bullet';
    this._state = state;

  } // constructor

  public update ():void {
    if (!this.alive) {
      return;
    }

    if (this._timer < this._delay) {
      this._timer += this._state.time.elapsed;
    } else {
      this._timer = 0;
      this._move();
    }

  } // update

  public shoot (x:number, y:number, direction:Phaser.Point, angle:number):void {
    this.updatePosition(x, y);
    this.angle = angle;
    this._direction = direction.clone();
    this.revive();
    this._timer = 0;

    if (this._isColliding(x, y)) {
      this._die();
    }
  } // shoot

  private _move ():void {
    let newX = this.gridPosition.x + this._direction.x;
    let newY = this.gridPosition.y + this._direction.y;

    if (this._isColliding(newX, newY)) {
      this._die();
      return;
    }
    this.updatePosition(newX, newY);

  } // _move

  private _isColliding (x:number, y:number):boolean {
    let index = this._state.map.getTile(x, y).index;
    if (index > 0 && index < 4) {
      this._updateMap(x, y);
      return true;
    }

    if (this._state.player.hitBody(SpriteType.BULLET, x, y)) {
      return true;
    }

    return false;

  } // _isColliding

  private _die ():void {
    this.kill();
    // maybe add explosion later

  } // _die

  private _updateMap (x:number, y:number):void {
    if (x <= 0 || x >= this._state.map.width - 1 || y <= 0 || y >= this._state.map.height - 1) {
      return;
    }

    this._state.map.putTile(0, x, y, 0);

    for (let yi = y - 1; yi <= y + 1; yi++) {
      for (let xi = x - 1; xi <= x + 1; xi++) {
        if (yi < 0 || yi > this._state.map.height - 1 ||
            xi < 0 || xi > this._state.map.width - 1) {
          continue;
        }
        
        if (this._state.map.getTile(xi, yi).index == 2) {
          if (xi == 0 || xi == this._state.map.width - 1 || yi == 0 || yi == this._state.map.height - 1) {
            this._state.map.putTile(3, xi, yi, 0);
          } else {
            this._state.map.putTile(1, xi, yi, 0);
          }
        }
      }
    }

  } // _updateMap

} // Bullet