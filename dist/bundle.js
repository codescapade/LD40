(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");

var BaseSprite = function (_Phaser$Sprite) {
    _inherits(BaseSprite, _Phaser$Sprite);

    function BaseSprite(game, gridX, gridY, atlas, spriteName) {
        _classCallCheck(this, BaseSprite);

        var worldPos = globals_1.Globals.toWorld(gridX, gridY);

        var _this = _possibleConstructorReturn(this, (BaseSprite.__proto__ || Object.getPrototypeOf(BaseSprite)).call(this, game, worldPos.x, worldPos.y, atlas, spriteName));

        _this.anchor.set(0.5, 0.5);
        _this.game.add.existing(_this);
        _this.gridPosition = new Phaser.Point(gridX, gridY);
        return _this;
    } // constructor


    _createClass(BaseSprite, [{
        key: "updatePosition",
        value: function updatePosition(gridX, gridY) {
            this.gridPosition.set(gridX, gridY);
            var worldPos = globals_1.Globals.toWorld(gridX, gridY);
            this.position.set(worldPos.x, worldPos.y);
        } // updatePosition

    }]);

    return BaseSprite;
}(Phaser.Sprite); // BaseSprite


exports.BaseSprite = BaseSprite;

},{"./globals":5}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var baseSprite_1 = require("./baseSprite");
var globals_1 = require("./globals");

var Bullet = function (_baseSprite_1$BaseSpr) {
    _inherits(Bullet, _baseSprite_1$BaseSpr);

    function Bullet(state, gridX, gridY, color) {
        _classCallCheck(this, Bullet);

        var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, state.game, gridX, gridY, 'sprites', color + '_bullet'));

        _this._delay = 20;
        _this._timer = 0;
        _this._direction = new Phaser.Point();
        _this.frameName = 'green_bullet';
        _this._state = state;
        return _this;
    } // constructor


    _createClass(Bullet, [{
        key: "update",
        value: function update() {
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

    }, {
        key: "shoot",
        value: function shoot(x, y, direction, angle) {
            this.updatePosition(x, y);
            this.angle = angle;
            this._direction = direction.clone();
            this.revive();
            this._timer = 0;
            if (this._isColliding(x, y)) {
                this._die();
            }
        } // shoot

    }, {
        key: "_move",
        value: function _move() {
            var newX = this.gridPosition.x + this._direction.x;
            var newY = this.gridPosition.y + this._direction.y;
            if (this._isColliding(newX, newY)) {
                this._die();
                return;
            }
            this.updatePosition(newX, newY);
        } // _move

    }, {
        key: "_isColliding",
        value: function _isColliding(x, y) {
            var index = this._state.map.getTile(x, y).index;
            if (index > 0 && index < 4) {
                this._updateMap(x, y);
                return true;
            }
            if (this._state.player.hitBody(globals_1.SpriteType.BULLET, x, y)) {
                return true;
            }
            return false;
        } // _isColliding

    }, {
        key: "_die",
        value: function _die() {
            this.kill();
            // maybe add explosion later
        } // _die

    }, {
        key: "_updateMap",
        value: function _updateMap(x, y) {
            if (x <= 0 || x >= this._state.map.width - 1 || y <= 0 || y >= this._state.map.height - 1) {
                return;
            }
            this._state.map.putTile(0, x, y, 0);
            for (var yi = y - 1; yi <= y + 1; yi++) {
                for (var xi = x - 1; xi <= x + 1; xi++) {
                    if (yi < 0 || yi > this._state.map.height - 1 || xi < 0 || xi > this._state.map.width - 1) {
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

    }]);

    return Bullet;
}(baseSprite_1.BaseSprite); // Bullet


exports.Bullet = Bullet;

},{"./baseSprite":1,"./globals":5}],3:[function(require,module,exports){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = require("./snake");

var Enemy = function (_snake_1$Snake) {
    _inherits(Enemy, _snake_1$Snake);

    function Enemy(state, gridX, gridY, delay) {
        _classCallCheck(this, Enemy);

        var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, state, gridX, gridY, delay, 'sprites', 'red', 0, false));

        _this._colors = ['green', 'red'];
        _this._color = _this._colors[state.game.rnd.between(0, 1)];
        _this._snakeHead.frameName = _this._color + '_snake_head';
        _this._directions = [new Phaser.Point(1, 0), new Phaser.Point(-1, 0), new Phaser.Point(0, 1), new Phaser.Point(0, -1)];
        return _this;
    } // constructor


    _createClass(Enemy, [{
        key: "update",
        value: function update() {
            this._setNewDirection();
            _get(Enemy.prototype.__proto__ || Object.getPrototypeOf(Enemy.prototype), "update", this).call(this);
        }
    }, {
        key: "_setNewDirection",
        value: function _setNewDirection() {
            var foundDirection = false;
            var nr = void 0;
            var dir = void 0;
            while (!foundDirection) {
                nr = this._state.game.rnd.between(0, 3);
                dir = this._directions[nr];
                var newX = this._snakeHead.gridPosition.x + dir.x;
                var newY = this._snakeHead.gridPosition.y + dir.y;
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
    }]);

    return Enemy;
}(snake_1.Snake); // Enemy


exports.Enemy = Enemy;

},{"./snake":8}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Generator = function () {
    function Generator(game, width, height) {
        _classCallCheck(this, Generator);

        this._game = game;
        this._width = width;
        this._height = height;
        this._map = [];
        for (var y = 0; y < height; y++) {
            var row = [];
            for (var x = 0; x < width; x++) {
                row.push(1);
            }
            this._map.push(row);
        }
    } // constructor


    _createClass(Generator, [{
        key: "buildMap",
        value: function buildMap(nrRooms, minSize, maxSize, minOverlap, maxOverlap) {
            var room = this._getRndRoom(minSize, maxSize, true);
            this._createRoom(room);
            var totalRooms = 1;
            var totalTries = 300;
            var timesTried = 0;
            var foundPlace = false;
            while (totalRooms < nrRooms) {
                timesTried = 0;
                foundPlace = false;
                while (!foundPlace && timesTried < totalTries) {
                    room = this._getRndRoom(minSize, maxSize, false);
                    var overlap = this._countTiles(room);
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

    }, {
        key: "_getRndRoom",
        value: function _getRndRoom(minSize, maxSize, firstRoom) {
            var roomWidth = this._game.rnd.between(minSize, maxSize);
            var roomHeight = this._game.rnd.between(minSize, maxSize);
            var x = void 0;
            var y = void 0;
            if (firstRoom) {
                x = Math.floor(this._width * 0.5 - roomWidth * 0.5);
                y = Math.floor(this._height * 0.5 - roomHeight * 0.5);
            } else {
                x = this._game.rnd.between(1, this._width - roomWidth - 1);
                y = this._game.rnd.between(1, this._height - roomHeight - 1);
            }
            return new Phaser.Rectangle(x, y, roomWidth, roomHeight);
        } // getRndRoom

    }, {
        key: "_countTiles",
        value: function _countTiles(room) {
            var count = 0;
            for (var y = room.y; y < room.y + room.height; y++) {
                for (var x = room.x; x < room.x + room.width; x++) {
                    if (this._map[y][x] == 0) {
                        count++;
                    }
                }
            }
            return count;
        } // countTiles

    }, {
        key: "_createRoom",
        value: function _createRoom(room) {
            for (var y = room.y; y < room.y + room.height; y++) {
                for (var x = room.x; x < room.x + room.width; x++) {
                    this._map[y][x] = 0;
                }
            }
        } // createRoom

    }, {
        key: "_allNeigborsAreWalls",
        value: function _allNeigborsAreWalls(x, y) {
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

    }, {
        key: "_removeDoubleWalls",
        value: function _removeDoubleWalls() {
            var wallsToRemove = [];
            for (var y = 0; y < this._height; y++) {
                for (var x = 0; x < this._width; x++) {
                    if (this._allNeigborsAreWalls(x, y)) {
                        wallsToRemove.push(new Phaser.Point(x, y));
                    }
                }
            }
            for (var i = 0; i < wallsToRemove.length; i++) {
                var wallPos = wallsToRemove[i];
                this._map[wallPos.y][wallPos.x] = 2;
            }
        } // remvoeDoubleWalls

    }, {
        key: "_setOuterWalls",
        value: function _setOuterWalls() {
            for (var y = 0; y < this._height; y++) {
                for (var x = 0; x < this._width; x++) {
                    if (x == 0 || x == this._width - 1 || y == 0 || y == this._height - 1) {
                        if (this._map[y][x] == 1) {
                            this._map[y][x] = 3;
                        }
                    }
                }
            }
        } // _setOuterwalls

    }, {
        key: "_setGoal",
        value: function _setGoal() {
            var foundPosition = false;
            var rndX = 0;
            var rndY = 0;
            while (!foundPosition) {
                rndX = this._game.rnd.between(1, this._width - 2);
                rndY = this._game.rnd.between(1, this._height - 2);
                if (this._map[rndY][rndX] == 0) {
                    foundPosition = true;
                    for (var y = rndY - 1; y <= rndY + 1; y++) {
                        for (var x = rndX - 1; x <= rndX + 1; x++) {
                            if (this._map[y][x] != 0) {
                                foundPosition = false;
                            }
                        }
                    }
                }
            }
            this._map[rndY][rndX] = 4;
        } // _setGoal

    }, {
        key: "_getCSV",
        value: function _getCSV() {
            var csvString = '';
            for (var y = 0; y < this._height; y++) {
                for (var x = 0; x < this._width; x++) {
                    csvString += this._map[y][x].toString();
                    csvString += ',';
                }
                csvString = csvString.replace(/,\s*$/, '');
                csvString += '\n';
            }
            return csvString;
        } // getCSV

    }]);

    return Generator;
}(); // Generator


exports.Generator = Generator;

var Level = function Level() {
    _classCallCheck(this, Level);
};

exports.Level = Level;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Globals = function () {
    function Globals() {
        _classCallCheck(this, Globals);
    }

    _createClass(Globals, null, [{
        key: "toGrid",
        value: function toGrid(x, y) {
            return new Phaser.Point(Math.floor(x / Globals.TILESIZE), Math.floor(y / Globals.TILESIZE));
        }
    }, {
        key: "toWorld",
        value: function toWorld(x, y) {
            return new Phaser.Point(x * Globals.TILESIZE + Globals.TILESIZE * 0.5, y * Globals.TILESIZE + Globals.TILESIZE * 0.5);
        }
    }]);

    return Globals;
}();

Globals.TILESIZE = 20;
Globals.seed = 0;
exports.Globals = Globals;
var SpriteType;
(function (SpriteType) {
    SpriteType[SpriteType["BODY"] = 0] = "BODY";
    SpriteType[SpriteType["HEAD"] = 1] = "HEAD";
    SpriteType[SpriteType["BULLET"] = 2] = "BULLET";
    SpriteType[SpriteType["NONE"] = 3] = "NONE";
})(SpriteType = exports.SpriteType || (exports.SpriteType = {}));

},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var bootState_1 = require("./states/bootState");
var preloadState_1 = require("./states/preloadState");
var gameState_1 = require("./states/gameState");

var Main = function (_Phaser$Game) {
    _inherits(Main, _Phaser$Game);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, 640, 480, Phaser.AUTO, 'container', null));

        _this.state.add('boot', bootState_1.BootState);
        _this.state.add('preload', preloadState_1.PreloadState);
        _this.state.add('game', gameState_1.GameState);
        _this.state.start('boot');
        return _this;
    } // constructor


    return Main;
}(Phaser.Game); // Main


window.onload = function () {
    new Main();
    console.log('window loaded');
}; // window.onload

},{"./states/bootState":9,"./states/gameState":10,"./states/preloadState":11}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var snake_1 = require("./snake");
var bullet_1 = require("./bullet");

var Player = function (_snake_1$Snake) {
    _inherits(Player, _snake_1$Snake);

    function Player(state, gridX, gridY, delay) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, state, gridX, gridY, delay, 'sprites', 'blue', 0, true));

        _this._goalTimer = 0;
        _this._goalDelay = 50;
        _this._addingToGoal = false;
        _this._multiplier = 1;
        _this._basicScore = 2;
        _this._bullet = new bullet_1.Bullet(state, 0, 0, 'blue');
        _this._bullet.kill();
        _this._leftKey = _this._state.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        _this._rightKey = _this._state.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        _this._upKey = _this._state.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        _this._downKey = _this._state.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        _this._shootKey = _this._state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        _this._state.game.camera.roundPx = true;
        _this._state.game.camera.x = _this._snakeHead.x - _this._state.game.width * 0.5;
        _this._state.game.camera.y = _this._snakeHead.y - _this._state.game.height * 0.5;
        _this._state.game.camera.follow(_this._snakeHead, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        return _this;
    } // constructor


    _createClass(Player, [{
        key: "update",
        value: function update() {
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
            _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), "update", this).call(this);
        } // update

    }, {
        key: "_updateInput",
        value: function _updateInput() {
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

    }, {
        key: "_shoot",
        value: function _shoot() {
            if (this._snakeBody.length == 0) {
                return;
            }
            // remove the last snake part from the array and kill it
            this._snakeBody.pop().kill();
            var bulletX = this._snakeHead.gridPosition.x + this._currentDirection.x;
            var bulletY = this._snakeHead.gridPosition.y + this._currentDirection.y;
            this._bullet.shoot(bulletX, bulletY, this._currentDirection, this._snakeHead.angle);
        } // _shoot

    }, {
        key: "_addToGoal",
        value: function _addToGoal() {
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

    }]);

    return Player;
}(snake_1.Snake); // Player


exports.Player = Player;

},{"./bullet":2,"./snake":8}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");
var baseSprite_1 = require("./baseSprite");

var Snake = function () {
    function Snake(state, gridX, gridY, delay, spriteSheet, spriteColor, size, isPlayer) {
        _classCallCheck(this, Snake);

        this._snakeBody = [];
        this._onGoal = false;
        this._timer = 0;
        this._delay = delay;
        this._state = state;
        this._isPlayer = isPlayer;
        this._desiredDirection = new Phaser.Point(1, 0);
        this._currentDirection = this._desiredDirection.clone();
        this._snakeHead = new baseSprite_1.BaseSprite(this._state.game, gridX, gridY, spriteSheet, spriteColor + '_snake_head');
        if (this._isPlayer) {
            this._bodyGroup = this._state.add.group();
            this._bodyGroup.classType = baseSprite_1.BaseSprite;
            for (var i = 0; i < 500; i++) {
                var part = new baseSprite_1.BaseSprite(this._state.game, 0, 0, spriteSheet, spriteColor + '_snake_body');
                part.kill();
                this._bodyGroup.add(part);
            }
            for (var _i = 1; _i <= size; _i++) {
                var bodyPart = this._bodyGroup.getFirstExists(false);
                bodyPart.revive();
                bodyPart.updatePosition(gridX - _i, gridY);
                this._snakeBody.push(bodyPart);
            }
        }
    } // constructor


    _createClass(Snake, [{
        key: "update",
        value: function update() {
            if (this._timer < this._delay) {
                this._timer += this._state.time.elapsed;
            } else {
                this._timer = 0;
                this._updateSnake();
            }
        } // update

    }, {
        key: "hitHead",
        value: function hitHead(type, x, y) {
            if (this._snakeHead.gridPosition.x == x && this._snakeHead.gridPosition.y == y) {
                // TODO take action when hit by an enemy or bullet
                return true;
            }
            return false;
        } // hitHead

    }, {
        key: "hitBody",
        value: function hitBody(type, x, y) {
            if (!this._isPlayer) {
                return false;
            }
            var index = -1;
            for (var i = 0; i < this._snakeBody.length; i++) {
                var part = this._snakeBody[i];
                if (part.gridPosition.x == x && part.gridPosition.y == y) {
                    index = i;
                    break;
                }
            }
            if (index >= 0 && type == globals_1.SpriteType.BULLET) {
                //let total = this._snakeBody.length - index;
                console.log(index);
                for (var _i2 = this._snakeBody.length - 1; _i2 >= index; _i2--) {
                    this._snakeBody[_i2].kill();
                    this._snakeBody.splice(_i2, 1);
                }
            }
            return index > -1;
        } // hitBody

    }, {
        key: "_updateSnake",
        value: function _updateSnake() {
            var difference = Phaser.Point.add(this._desiredDirection, this._currentDirection);
            if (difference.x != 0 || difference.y != 0) {
                this._currentDirection = this._desiredDirection.clone();
                this._snakeHead.angle = this._desiredRotation;
            }
            var newX = this._snakeHead.gridPosition.x + this._currentDirection.x;
            var newY = this._snakeHead.gridPosition.y + this._currentDirection.y;
            var index = this._state.map.getTile(newX, newY, 0).index;
            if (index > 0 && index < 4) {
                // dead
                return;
            }
            if (this._isPlayer) {
                if (this.hitBody(globals_1.SpriteType.NONE, newX, newY)) {
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
            } else {
                this._updateSnakePositon(false);
            }
        } // _updateSnake

    }, {
        key: "_updateSnakePositon",
        value: function _updateSnakePositon(grow) {
            var oldX = this._snakeHead.gridPosition.x;
            var oldY = this._snakeHead.gridPosition.y;
            var newX = oldX + this._currentDirection.x;
            var newY = oldY + this._currentDirection.y;
            this._snakeHead.updatePosition(newX, newY);
            if (grow) {
                var newPart = this._bodyGroup.getFirstExists(false);
                newPart.revive();
                newPart.updatePosition(oldX, oldY);
                this._snakeBody.unshift(newPart);
            } else {
                if (this._snakeBody.length == 0) {
                    return;
                }
                var lastPart = this._snakeBody.pop();
                lastPart.updatePosition(oldX, oldY);
                this._snakeBody.unshift(lastPart);
            }
        } // _updateSnakePosition

    }]);

    return Snake;
}(); // Snake


exports.Snake = Snake;

},{"./baseSprite":1,"./globals":5}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("../globals");

var BootState = function (_Phaser$State) {
    _inherits(BootState, _Phaser$State);

    function BootState() {
        _classCallCheck(this, BootState);

        return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
    }

    _createClass(BootState, [{
        key: "preload",
        value: function preload() {
            this.stage.disableVisibilityChange = false;
            this.stage.smoothed = false;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            this.time.advancedTiming = true;
            globals_1.Globals.seed = this.rnd.between(0, 9999999999);
            this.rnd.sow([globals_1.Globals.seed.toString()]);
        } // preload

    }, {
        key: "create",
        value: function create() {
            this.game.state.start('preload');
        } // create

    }]);

    return BootState;
}(Phaser.State); // Boot


exports.BootState = BootState;

},{"../globals":5}],10:[function(require,module,exports){
"use strict";

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("../globals");
var baseSprite_1 = require("../baseSprite");
var generator_1 = require("../generator");
var player_1 = require("../player");
var enemy_1 = require("../enemy");

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));

        _this._score = 0;
        return _this;
    }

    _createClass(GameState, [{
        key: "create",
        value: function create() {
            var gen = new generator_1.Generator(this.game, 32, 24);
            //let gen:Generator = new Generator(this.game, 80, 80);
            var mapCSV = gen.buildMap(12, 4, 9, 2, 6);
            this.load.tilemap('map', null, mapCSV, Phaser.Tilemap.CSV);
            this.map = this.add.tilemap('map', globals_1.Globals.TILESIZE, globals_1.Globals.TILESIZE);
            this.map.addTilesetImage('tiles');
            this._mapLayer = this.map.createLayer(0);
            this._mapLayer.resizeWorld();
            this._createPlayer();
            this.enemies = [];
            for (var i = 0; i < 10; i++) {
                this._createEnemy();
            }
            this.food = new baseSprite_1.BaseSprite(this.game, 0, 0, 'sprites', 'food');
            this.updateFood();
            this._score = 0;
            var style = { font: '18px Arial', fill: '#ffffff', align: 'left' };
            this._scoreText = this.game.add.text(10, 10, 'Score: 0', style);
        } // create

    }, {
        key: "update",
        value: function update() {
            this.player.update();
            this.enemies.forEach(function (enemy) {
                enemy.update();
            });
        } // update

    }, {
        key: "render",
        value: function render() {
            this.game.debug.text(this.time.fps.toString() || '--', 3, 14, '#00ff00');
        } // render

    }, {
        key: "updateFood",
        value: function updateFood() {
            var emptyPosition = false;
            var rndX = void 0;
            var rndY = void 0;
            while (!emptyPosition) {
                rndX = this.game.rnd.between(0, this.map.width - 1);
                rndY = this.game.rnd.between(0, this.map.height - 1);
                if (this.map.getTile(rndX, rndY, 0).index == 0) {
                    emptyPosition = true;
                    if (this.player.hitHead(globals_1.SpriteType.NONE, rndX, rndY) || this.player.hitBody(globals_1.SpriteType.NONE, rndX, rndY)) {
                        emptyPosition = false;
                    }
                }
            }
            this.food.updatePosition(rndX, rndY);
        } // updateFood

    }, {
        key: "updateScore",
        value: function updateScore(amount) {
            this._score += amount;
            this._scoreText.text = 'Score: ' + Math.floor(this._score).toString();
        } // updateScore

    }, {
        key: "_createPlayer",
        value: function _createPlayer() {
            var foundPos = false;
            var rndX = void 0;
            var rndY = void 0;
            while (!foundPos) {
                rndX = this.game.rnd.between(0, this.map.width - 1);
                rndY = this.game.rnd.between(0, this.map.height - 1);
                if (rndX - 3 >= 0 && rndX + 3 < this.map.width - 1) {
                    foundPos = true;
                    for (var i = rndX - 3; i <= rndX + 3; i++) {
                        if (this.map.getTile(i, rndY, 0).index != 0) {
                            foundPos = false;
                            break;
                        }
                    }
                }
            }
            this.player = new player_1.Player(this, rndX, rndY, 250);
        } // createPlayer

    }, {
        key: "_createEnemy",
        value: function _createEnemy() {
            var foundPos = false;
            var rndX = void 0;
            var rndY = void 0;
            while (!foundPos) {
                rndX = this.game.rnd.between(0, this.map.width - 1);
                rndY = this.game.rnd.between(0, this.map.height - 1);
                if (this.map.getTile(rndX, rndY).index == 0) {
                    foundPos = true;
                }
            }
            var enemy = new enemy_1.Enemy(this, rndX, rndY, 800);
            this.enemies.push(enemy);
        }
    }]);

    return GameState;
}(Phaser.State); // Game


exports.GameState = GameState;

},{"../baseSprite":1,"../enemy":3,"../generator":4,"../globals":5,"../player":7}],11:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });

var PreloadState = function (_Phaser$State) {
    _inherits(PreloadState, _Phaser$State);

    function PreloadState() {
        _classCallCheck(this, PreloadState);

        return _possibleConstructorReturn(this, (PreloadState.__proto__ || Object.getPrototypeOf(PreloadState)).apply(this, arguments));
    }

    _createClass(PreloadState, [{
        key: "preload",
        value: function preload() {
            this.load.atlasJSONHash('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
            this.load.image('tiles', 'assets/images/tiles.png');
        } // preload

    }, {
        key: "create",
        value: function create() {
            this.game.state.start('game');
        } // create

    }]);

    return PreloadState;
}(Phaser.State); // Preload


exports.PreloadState = PreloadState;

},{}]},{},[6])

//# sourceMappingURL=bundle.js.map
