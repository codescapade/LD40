import { Globals, SpriteType } from './globals';
import { BaseSprite } from './baseSprite';
import { GameState } from './states/gameState';
import { Snake } from './snake';
import { Bullet } from './bullet';

export class Player extends Snake {
  private _leftKey:Phaser.Key;
  private _rightKey:Phaser.Key;
  private _upKey:Phaser.Key;
  private _downKey:Phaser.Key;
  private _shootKey:Phaser.Key;

  private _bullet:Bullet;

  private _goalTimer:number = 0;
  private _goalDelay:number = 50;
  private _addingToGoal:boolean = false;

  private _multiplier:number = 1;
  private _basicScore:number = 2;

  constructor (state:GameState, gridX:number, gridY:number, delay:number) {
    super(state, gridX, gridY, delay, 'sprites', 'blue', 0, true);

    this._bullet = new Bullet(state, 0, 0, 'blue');
    this._bullet.kill();

    
    this._leftKey = this._state.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this._rightKey = this._state.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this._upKey = this._state.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this._downKey = this._state.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this._shootKey = this._state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this._state.game.camera.roundPx = true;
    this._state.game.camera.x = this._snakeHead.x - this._state.game.width * 0.5;
    this._state.game.camera.y = this._snakeHead.y - this._state.game.height * 0.5;
    this._state.game.camera.follow(this._snakeHead, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

  } // constructor

  public update () {
    if (this._onGoal && this._snakeBody.length > 0) {
      if (!this._addingToGoal) {
        this._addingToGoal = true;
        this._multiplier = this._snakeBody.length;
        this._goalTimer = 0;
      }

      if (this._goalTimer < this._goalDelay) {
        this._goalTimer += this._state.time.elapsed;
      } else {
        this._goalTimer = 0;
        this._addToGoal();
      }
      return;
    }

    this._updateInput();
    super.update();
    
  } // update

  private _updateInput () {
    if (this._leftKey.justDown) {
      this._desiredDirection.set(-1, 0);
      this._desiredRotation = 180;
    } else if (this._rightKey.justDown) {
      this._desiredDirection.set(1, 0);
      this._desiredRotation = 0;
    } else if (this._upKey.justDown) {
      this._desiredDirection.set(0, -1);
      this._desiredRotation = 270;
    } else if (this._downKey.justDown) {
      this._desiredDirection.set(0, 1);
      this._desiredRotation = 90;
    }

    if (this._shootKey.justDown && !this._bullet.alive) {
      this._shoot();
    }

  } // _updateInput

  private _shoot ():void {
    if (this._snakeBody.length == 0) {
      return;
    }

    // remove the last snake part from the array and kill it
    this._snakeBody.pop().kill();

    let bulletX = this._snakeHead.gridPosition.x + this._currentDirection.x;
    let bulletY = this._snakeHead.gridPosition.y + this._currentDirection.y;
    this._bullet.shoot(bulletX, bulletY, this._currentDirection, this._snakeHead.angle);
  
  } // _shoot

  private _addToGoal ():void {
    this._snakeBody.pop().kill();
    this._state.updateScore(this._multiplier);

    if (this._snakeBody.length == 0) {
      if (this._delay > 50) {
        this._delay -= 10;
      }
      this._addingToGoal = false;
      this._multiplier = 0;
      this._goalTimer = 0;
    }

  } // _addToGoal

} // Player