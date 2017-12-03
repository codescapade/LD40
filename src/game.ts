import Globals from './globals';
import BaseSprite from './baseSprite';
import Generator from './generator';

export default class Game extends Phaser.State {
  private _snake:BaseSprite;
  private _timer:number = 0;
  private _delay:number = 350;

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

  private _map:Phaser.Tilemap;
  private _mapLayer:Phaser.TilemapLayer;

  public create ():void {

    let gen:Generator = new Generator(this.game, 40, 30);
    let mapCSV:string = gen.buildMap(20, 4, 8, 4, 8);
    this.load.tilemap('map', null, mapCSV, Phaser.Tilemap.CSV);
    this._map = this.add.tilemap('map', Globals.TILESIZE, Globals.TILESIZE);
    this._map.addTilesetImage('tiles');

    this._mapLayer = this._map.createLayer(0);
    this._mapLayer.resizeWorld();

    let snakePos:Phaser.Point = new Phaser.Point();
    let foundPos:boolean = false;
    let rndX:number;
    let rndY:number;
    while (!foundPos) {
      rndX = this.game.rnd.between(0, this._map.width - 1);
      rndY = this.game.rnd.between(0, this._map.height - 1);
      
      if ((rndX - 3) >= 0 && (rndX + 3) < this._map.width - 1) {
        foundPos = true;
        for (let i = (rndX - 3); i <= (rndX + 3); i++) {
          if (this._map.getTile(i, rndY, 0).index != 0) {
            foundPos = false;
            break;
          }
        }
      }
    }
    console.log('head x: ' + rndX + ', y: ' + rndY);
    this._snake = new BaseSprite(this.game, rndX, rndY, 'head');
    
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
      bodyPart.updatePosition(snakeGridPos.x - i, snakeGridPos.y);
      this._body.push(bodyPart);
    }

    this.game.camera.follow(this._snake, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

    this._leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this._rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this._upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this._downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

  } // create

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
    
  } // update

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 3, 14, '#00ff00');

  } // render

  private updateSnake ():void {
    let difference = Phaser.Point.add(this._desiredDirection, this._currentDirection);
    if (difference.x != 0 || difference.y != 0) {
      this._currentDirection = this._desiredDirection.clone();
      this._snake.angle = this._desiredRotation;
    }

    let oldPos:Phaser.Point = this._snake.gridPosition.clone();

    let newX:number = oldPos.x + this._currentDirection.x;
    let newY:number = oldPos.y + this._currentDirection.y;
    if (this._map.getTile(newX, newY, 0).index != 0) {
      return;
    }
    this._snake.updatePosition(newX, newY);

    var lastBodyPart:BaseSprite = this._body.pop();
    lastBodyPart.updatePosition(oldPos.x, oldPos.y);
    this._body.unshift(lastBodyPart);

  } // updateSnake

  private updateFood ():void {
    let emptyPosition:boolean = false;

  } // updateFood

} // Game