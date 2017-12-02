export default class Globals {
  public static readonly TILESIZE:number = 20;
  
  public static seed:number = 0;

  public static toGrid (x:number, y:number):Phaser.Point {
    return new Phaser.Point(Math.floor(x / Globals.TILESIZE), Math.floor(y / Globals.TILESIZE));
  }

  public static toWorld (x:number, y:number):Phaser.Point {
    return new Phaser.Point(x * Globals.TILESIZE + Globals.TILESIZE * 0.5,
      y * Globals.TILESIZE + Globals.TILESIZE * 0.5);
  }
}