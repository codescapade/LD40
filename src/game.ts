import Globals from './globals';
import BaseSprite from './baseSprite';

export default class Game extends Phaser.State {
  private _snake:BaseSprite;
  private _timer:number = 0;
  private _delay:number = 500;

  private _leftKey:Phaser.Key;
  private _rightKey:Phaser.Key;
  private _upKey:Phaser.Key;
  private _downKey:Phaser.Key;

  private _desiredRotation:number = 0;
  private _desiredDirection:Phaser.Point = new Phaser.Point(1, 0);
  private _currentDirection:Phaser.Point = new Phaser.Point(1, 0);

  private _bodyGroup:Phaser.Group;
  private _body:BaseSprite[];
  private _food:BaseSprite;

  public create ():void {
    this._snake = new BaseSprite(this.game, 1, 1, 'head');

    this._bodyGroup = this.add.group();
    this._bodyGroup.classType = BaseSprite;
    for (let i = 0; i < 100; i++) {
      let part:BaseSprite = new BaseSprite(this.game, 0, 0, 'body');
      part.kill();
      this._bodyGroup.add(part);
    }

    let snakeGridPos:Phaser.Point = this._snake.gridPosition;
    this._body = [];
    for (let i = 1; i < 3; i++) {
      let bodyPart:BaseSprite = this._bodyGroup.getFirstExists(false);
      bodyPart.revive();
      bodyPart.updatePosition(snakeGridPos.x - 1, snakeGridPos.y);
      this._body.push(bodyPart);
    }

    this._leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this._rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this._upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this._downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  }

  public update ():void {
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

    if (this._timer < this._delay) {
      this._timer += this.time.elapsed;
    } else {
      this._timer = 0;
      this.updateSnake();
    }
  }

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 3, 14, '#00ff00');
  }

  private updateSnake ():void {
    let difference = Phaser.Point.add(this._desiredDirection, this._currentDirection);
    if (difference.x != 0 || difference.y != 0) {
      this._currentDirection = this._desiredDirection.clone();
      this._snake.angle = this._desiredRotation;
    }
    let oldPos:Phaser.Point = this._snake.gridPosition.clone();
    this._snake.updatePosition(oldPos.x + this._currentDirection.x, oldPos.y + this._currentDirection.y);

    var lastBodyPart:BaseSprite = this._body.pop();
    lastBodyPart.updatePosition(oldPos.x, oldPos.y);
    this._body.unshift(lastBodyPart);
  }
  
  private updateFood ():void {
    let emptyPosition:boolean = false;

  }

  private toGrid (position:Phaser.Point):Phaser.Point {
    return new Phaser.Point
  }
}