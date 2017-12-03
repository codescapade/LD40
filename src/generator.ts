

export default class Generator {
  private _width:number;
  private _height:number;
  private _game:Phaser.Game;

  private _map:number[][];

  constructor(game:Phaser.Game, width:number, height:number) {
    this._game = game;
    this._width = width;
    this._height = height;
    this._map = [];

    for (let y = 0; y < height; y++) {
      let row:number[] = [];
      for (let x = 0; x < width; x++) {
        row.push(1);
      }
      this._map.push(row);
    }

  } // constructor

  public buildMap (nrRooms:number, minSize:number, maxSize:number, minOverlap:number, maxOverlap:number):string {
    let room:Phaser.Rectangle = this.getRndRoom(minSize, maxSize, true);
    this.createRoom(room);

    let totalRooms:number = 1;

    let totalTries:number = 300;
    let timesTried:number = 0;
    let foundPlace:boolean = false;
    while (totalRooms < nrRooms) {
      timesTried = 0;
      foundPlace = false;
      while(!foundPlace && timesTried < totalTries) {
        room = this.getRndRoom(minSize, maxSize, false);
        let overlap:number = this.countTiles(room);
        if (overlap >= minOverlap && overlap <= maxOverlap) {
          foundPlace = true;
          this.createRoom(room);
        }
        timesTried++;
      }
      totalRooms++;
    }

    this.removeDoubleWalls();

    return this.getCSV();

  } // buildMap

  private getRndRoom (minSize:number, maxSize:number, firstRoom:boolean):Phaser.Rectangle {
    let roomWidth:number = this._game.rnd.between(minSize, maxSize);
    let roomHeight:number = this._game.rnd.between(minSize, maxSize);
    let x:number;
    let y:number;
    if (firstRoom) {
      x = Math.floor(this._width * 0.5 - roomWidth * 0.5);
      y = Math.floor(this._height * 0.5 - roomHeight * 0.5);
    } else {
      x = this._game.rnd.between(1, this._width - roomWidth - 1);
      y = this._game.rnd.between(1, this._height - roomHeight - 1);
    }

    return new Phaser.Rectangle(x, y, roomWidth, roomHeight);

  } // getRndRoom

  private countTiles (room:Phaser.Rectangle):number {
    let count = 0;
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        if (this._map[y][x] == 0) {
          count++;
        }
      }
    }

    return count;

  } // countTiles

  private createRoom (room:Phaser.Rectangle):void {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        this._map[y][x] = 0;
      }
    }
  } // createRoom

  private allNeigborsAreWalls (x:number, y:number):boolean {
    if (x - 1 >= 0 && y - 1 >= 0 && this._map[y - 1][x - 1] == 0) {
      return false;
    }

    if (x - 1 >= 0 && this._map[y][x - 1] == 0) {
      return false;
    }

    if (x - 1 >= 0 && y + 1 < this._height && this._map[y + 1][x - 1] == 0) {
      return false;
    }

    if (y + 1 < this._height && this._map[y + 1][x] == 0) {
      return false;
    }

    if (x + 1 < this._width && y + 1 < this._height && this._map[y + 1][x + 1] == 0) {
      return false;
    }

    if (x + 1 < this._width && this._map[y][x + 1] == 0) {
      return false;
    }

    if (x + 1 < this._width && y - 1 >= 0 && this._map[y - 1][x + 1] == 0) {
      return false;
    }

    if (y - 1 >= 0 && this._map[y - 1][x] == 0) {
      return false;
    }

    return true;

  } // allNeighborsAreWalls

  private removeDoubleWalls ():void {
    let wallsToRemove:Phaser.Point[] = [];
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        if (this.allNeigborsAreWalls(x, y)) {
          wallsToRemove.push(new Phaser.Point(x, y));
        }
      }
    }

    for (let i = 0; i < wallsToRemove.length; i++) {
      let wallPos:Phaser.Point = wallsToRemove[i];
      this._map[wallPos.y][wallPos.x] = 2;
    }

  } // remvoeDoubleWalls

  private getCSV ():string {
    let csvString:string = '';
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        csvString += this._map[y][x].toString();
        csvString += ',';
      }
      csvString = csvString.replace(/,\s*$/, '');
      csvString += '\n';
    }

    return csvString;

  } // getCSV

} // Generator
