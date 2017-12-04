
export class Generator {
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
    let room:Phaser.Rectangle = this._getRndRoom(minSize, maxSize, true);
    this._createRoom(room);

    let totalRooms:number = 1;

    let totalTries:number = 300;
    let timesTried:number = 0;
    let foundPlace:boolean = false;
    while (totalRooms < nrRooms) {
      timesTried = 0;
      foundPlace = false;
      while(!foundPlace && timesTried < totalTries) {
        room = this._getRndRoom(minSize, maxSize, false);
        let overlap:number = this._countTiles(room);
        if (overlap >= minOverlap && overlap <= maxOverlap) {
          foundPlace = true;
          this._createRoom(room);
        }
        timesTried++;
      }
      totalRooms++;
    }

    this._removeDoubleWalls();
    this._setOuterWalls();
    this._setGoal();

    return this._getCSV();

  } // buildMap

  private _getRndRoom (minSize:number, maxSize:number, firstRoom:boolean):Phaser.Rectangle {
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

  private _countTiles (room:Phaser.Rectangle):number {
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

  private _createRoom (room:Phaser.Rectangle):void {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        this._map[y][x] = 0;
      }
    }
  } // createRoom

  private _allNeigborsAreWalls (x:number, y:number):boolean {
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

  private _removeDoubleWalls ():void {
    let wallsToRemove:Phaser.Point[] = [];
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        if (this._allNeigborsAreWalls(x, y)) {
          wallsToRemove.push(new Phaser.Point(x, y));
        }
      }
    }

    for (let i = 0; i < wallsToRemove.length; i++) {
      let wallPos:Phaser.Point = wallsToRemove[i];
      this._map[wallPos.y][wallPos.x] = 2;
    }

  } // remvoeDoubleWalls

  private _setOuterWalls ():void {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        if (x == 0 || x == this._width - 1 || y == 0 || y == this._height - 1) {
          if (this._map[y][x] == 1) {
            this._map[y][x] = 3;
          }
        }
      }
    }

  } // _setOuterwalls

  private _setGoal ():void {
    let foundPosition:boolean = false;
    let rndX:number = 0;
    let rndY:number = 0;
    while (!foundPosition) {
      rndX = this._game.rnd.between(1, this._width - 2);
      rndY = this._game.rnd.between(1, this._height - 2);
      if (this._map[rndY][rndX] == 0) {
        foundPosition = true;
        for (let y = rndY - 1; y <= rndY + 1; y++) {
          for (let x = rndX - 1; x <= rndX + 1; x++) {
            if (this._map[y][x] != 0) {
              foundPosition = false;
            }
          }
        }
        
      }
    }

    this._map[rndY][rndX] = 4;

  } // _setGoal

  private _getCSV ():string {
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

export class Level {

}