import { Globals, SpriteType } from '../globals';
import { BaseSprite } from '../baseSprite';
import { Generator } from '../generator';
import { Player } from '../player';
import { Enemy } from '../enemy';

export class GameState extends Phaser.State {
  public map:Phaser.Tilemap;
  public food:BaseSprite;
  public player:Player;

  public enemies:Enemy[];

  private _score:number = 0;
  private _scoreText:Phaser.Text;

  private _mapLayer:Phaser.TilemapLayer;

  public create ():void {    
    let gen:Generator = new Generator(this.game, 32, 24);
   //let gen:Generator = new Generator(this.game, 80, 80);
    let mapCSV:string = gen.buildMap(12, 4, 9, 2, 6);
    this.load.tilemap('map', null, mapCSV, Phaser.Tilemap.CSV);
    this.map = this.add.tilemap('map', Globals.TILESIZE, Globals.TILESIZE);
    this.map.addTilesetImage('tiles');

    this._mapLayer = this.map.createLayer(0);
    this._mapLayer.resizeWorld();

    this._createPlayer();

    this.enemies = [];
    for (let i = 0; i < 10; i++) {
      this._createEnemy();
    }
    
    
    this.food = new BaseSprite(this.game, 0, 0, 'sprites', 'food');
    this.updateFood();

    this._score = 0;
    let style = { font: '18px Arial', fill: '#ffffff', align: 'left' };
    this._scoreText = this.game.add.text(10, 10, 'Score: 0', style);

  } // create

  public update ():void {
    this.player.update();

    this.enemies.forEach((enemy:Enemy) => {
      enemy.update();
    });
    
  } // update

  public render ():void {
    this.game.debug.text(this.time.fps.toString() || '--', 3, 14, '#00ff00');

  } // render

  public updateFood ():void {
    let emptyPosition:boolean = false;
    let rndX:number;
    let rndY:number;
    while (!emptyPosition) {
      rndX = this.game.rnd.between(0, this.map.width - 1);
      rndY = this.game.rnd.between(0, this.map.height - 1);

      if (this.map.getTile(rndX, rndY, 0).index == 0) {
        emptyPosition = true;
        if (this.player.hitHead(SpriteType.NONE, rndX, rndY) ||
            this.player.hitBody(SpriteType.NONE, rndX, rndY)) {
          emptyPosition = false;
        }
      }
    }
    this.food.updatePosition(rndX, rndY);

  } // updateFood

  public updateScore (amount:number):void {
    this._score += amount;
    this._scoreText.text = 'Score: ' + Math.floor(this._score).toString();

  } // updateScore

  private _createPlayer ():void {
    let foundPos:boolean = false;
    let rndX:number;
    let rndY:number;
    while (!foundPos) {
      rndX = this.game.rnd.between(0, this.map.width - 1);
      rndY = this.game.rnd.between(0, this.map.height - 1);
      
      if ((rndX - 3) >= 0 && (rndX + 3) < this.map.width - 1) {
        foundPos = true;
        for (let i = (rndX - 3); i <= (rndX + 3); i++) {
          if (this.map.getTile(i, rndY, 0).index != 0) {
            foundPos = false;
            break;
          }
        }
      }
    }
    this.player = new Player(this, rndX, rndY, 250);

  } // createPlayer

  private _createEnemy ():void {
    let foundPos:boolean = false;

    let rndX:number;
    let rndY:number;

    while (!foundPos) {
      rndX = this.game.rnd.between(0, this.map.width - 1);
      rndY = this.game.rnd.between(0, this.map.height - 1);

      if (this.map.getTile(rndX, rndY).index == 0) {
        foundPos = true;
      }
    }
    let enemy = new Enemy(this, rndX, rndY, 800);
    this.enemies.push(enemy);
  }


} // Game
