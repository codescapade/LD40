import { Globals,  SpriteType } from './globals';
import { BaseSprite } from './baseSprite';
import { GameState } from './states/gameState';

export class Snake {
  protected _desiredDirection:Phaser.Point;
  protected _currentDirection:Phaser.Point;
  protected _desiredRotation:number;

  protected _delay:number;

  protected _snakeHead:BaseSprite;
  protected _snakeBody:BaseSprite[] = [];

  protected _bodyGroup:Phaser.Group;

  protected _state:GameState;

  protected _onGoal:boolean = false;

  private _timer:number = 0;

  private _isPlayer:boolean;

  constructor (state:GameState, gridX:number, gridY:number, delay:number,
      spriteSheet:string, spriteColor:string, size:number, isPlayer:boolean) {
    this._delay = delay;
    this._state = state;
    this._isPlayer = isPlayer;

    this._desiredDirection = new Phaser.Point(1, 0);
    this._currentDirection = this._desiredDirection.clone();

    this._snakeHead = new BaseSprite(this._state.game, gridX, gridY, spriteSheet,
        spriteColor + '_snake_head');
    
    if (this._isPlayer) {
      this._bodyGroup = this._state.add.group();
      this._bodyGroup.classType = BaseSprite;
      for (let i = 0; i < 500; i++) {
        let part:BaseSprite = new BaseSprite(this._state.game, 0, 0, spriteSheet,
            spriteColor + '_snake_body');
        part.kill();
        this._bodyGroup.add(part);
      }
      
      for (let i = 1; i <= size; i++) {
        let bodyPart:BaseSprite = this._bodyGroup.getFirstExists(false);
        bodyPart.revive();
        bodyPart.updatePosition(gridX - i, gridY);
        this._snakeBody.push(bodyPart);
      }
    }

  } // constructor

  public update ():void {
    if (this._timer < this._delay) {
      this._timer += this._state.time.elapsed;
    } else {
      this._timer = 0;
      this._updateSnake();
    }

  } // update

  public hitHead (type:SpriteType, x:number, y:number):boolean {
    if (this._snakeHead.gridPosition.x == x &&  this._snakeHead.gridPosition.y == y) {
      // TODO take action when hit by an enemy or bullet
      return true;
    }

    return false;

  } // hitHead

  public hitBody (type:SpriteType, x:number, y:number):boolean {
    if (!this._isPlayer) {
      return false;
    }

    let index:number = -1;
    for (let i = 0; i < this._snakeBody.length; i++) {
      let part:BaseSprite = this._snakeBody[i];
      if (part.gridPosition.x == x && part.gridPosition.y == y) {
        index = i;
        break;
      }
    }

    if (index >= 0 && type == SpriteType.BULLET) {
      //let total = this._snakeBody.length - index;
      console.log(index);
      for (let i = this._snakeBody.length - 1; i >= index; i--) {
        this._snakeBody[i].kill();
        this._snakeBody.splice(i, 1);
      }
    }

    return index > -1;
  
  } // hitBody

  protected _updateSnake ():void {
    let difference:Phaser.Point = Phaser.Point.add(this._desiredDirection, this._currentDirection);
    if (difference.x != 0 || difference.y != 0) {
      this._currentDirection = this._desiredDirection.clone();
      this._snakeHead.angle = this._desiredRotation;
    }

    let newX:number = this._snakeHead.gridPosition.x + this._currentDirection.x;
    let newY:number = this._snakeHead.gridPosition.y + this._currentDirection.y;

    let index:number = this._state.map.getTile(newX, newY, 0).index;
    if (index > 0 && index < 4) {
      // dead
      return;
    }

    if (this._isPlayer) {
      if (this.hitBody(SpriteType.NONE, newX, newY)) {
        // dead
        return;
      }

      
      if (index == 4) {
        this._onGoal = true;
      } else {
        this._onGoal = false;
      }

      if (this._state.food.gridPosition.x == newX && this._state.food.gridPosition.y == newY) {
        this._updateSnakePositon(true);
        this._state.updateFood();
      } else {
        this._updateSnakePositon(false);
      }
    }
    else {
      this._updateSnakePositon(false);
    }
  } // _updateSnake

  protected _updateSnakePositon (grow:boolean):void {
    let oldX = this._snakeHead.gridPosition.x;
    let oldY = this._snakeHead.gridPosition.y;

    let newX = oldX + this._currentDirection.x;
    let newY = oldY + this._currentDirection.y;

    this._snakeHead.updatePosition(newX, newY);
    if (grow) {
      let newPart:BaseSprite = this._bodyGroup.getFirstExists(false);
      newPart.revive();
      newPart.updatePosition(oldX, oldY);
      this._snakeBody.unshift(newPart);
    } else {
      if (this._snakeBody.length == 0) {
        return;
      }
      let lastPart:BaseSprite = this._snakeBody.pop();
      lastPart.updatePosition(oldX, oldY);
      this._snakeBody.unshift(lastPart);
    }

  } // _updateSnakePosition

} // Snake