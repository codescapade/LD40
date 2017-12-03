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

    function BaseSprite(game, gridX, gridY, spriteName) {
        _classCallCheck(this, BaseSprite);

        var worldPos = globals_1.default.toWorld(gridX, gridY);

        var _this = _possibleConstructorReturn(this, (BaseSprite.__proto__ || Object.getPrototypeOf(BaseSprite)).call(this, game, worldPos.x, worldPos.y, spriteName));

        _this.anchor.set(0.5, 0.5);
        _this.game.add.existing(_this);
        _this._gridPosition = new Phaser.Point(gridX, gridY);
        return _this;
    }

    _createClass(BaseSprite, [{
        key: "updatePosition",
        value: function updatePosition(gridX, gridY) {
            this.gridPosition.set(gridX, gridY);
            var worldPos = globals_1.default.toWorld(gridX, gridY);
            this.position.set(worldPos.x, worldPos.y);
        }
    }, {
        key: "gridPosition",
        get: function get() {
            return this._gridPosition;
        }
    }]);

    return BaseSprite;
}(Phaser.Sprite);

exports.default = BaseSprite;

},{"./globals":5}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");

var Boot = function (_Phaser$State) {
    _inherits(Boot, _Phaser$State);

    function Boot() {
        _classCallCheck(this, Boot);

        return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
    }

    _createClass(Boot, [{
        key: "preload",
        value: function preload() {
            this.stage.disableVisibilityChange = false;
            this.stage.smoothed = false;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            this.time.advancedTiming = true;
            globals_1.default.seed = this.rnd.between(0, 9999999999);
            this.rnd.sow([globals_1.default.seed.toString()]);
        } // preload

    }, {
        key: "create",
        value: function create() {
            this.game.state.start('preload');
        } // create

    }]);

    return Boot;
}(Phaser.State); // Boot


exports.default = Boot;

},{"./globals":5}],3:[function(require,module,exports){
"use strict";

var _typeof8 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof7 = typeof Symbol === "function" && _typeof8(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof8(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof8(obj);
};

var _typeof6 = typeof Symbol === "function" && _typeof7(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof7(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof7(obj);
};

var _typeof5 = typeof Symbol === "function" && _typeof6(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof6(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof6(obj);
};

var _typeof4 = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof5(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof5(obj);
};

var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof4(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof4(obj);
};

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
var globals_1 = require("./globals");
var baseSprite_1 = require("./baseSprite");
var generator_1 = require("./generator");

var Game = function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));

        _this._timer = 0;
        _this._delay = 250;
        _this._desiredRotation = 0;
        _this._desiredDirection = new Phaser.Point(1, 0);
        _this._currentDirection = new Phaser.Point(1, 0);
        return _this;
    }

    _createClass(Game, [{
        key: "create",
        value: function create() {
            var gen = new generator_1.default(this.game, 40, 30);
            var mapCSV = gen.buildMap(20, 4, 8, 4, 8);
            this.load.tilemap('map', null, mapCSV, Phaser.Tilemap.CSV);
            this._map = this.add.tilemap('map', globals_1.default.TILESIZE, globals_1.default.TILESIZE);
            this._map.addTilesetImage('tiles');
            this._mapLayer = this._map.createLayer(0);
            this._mapLayer.resizeWorld();
            this.createSnake();
            this._food = new baseSprite_1.default(this.game, 0, 0, 'food');
            this.updateFood();
            this.game.camera.follow(this._snake, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
            this._leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this._rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this._upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this._downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        } // create

    }, {
        key: "update",
        value: function update() {
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

    }, {
        key: "render",
        value: function render() {
            this.game.debug.text(this.time.fps.toString() || '--', 3, 14, '#00ff00');
        } // render

    }, {
        key: "createSnake",
        value: function createSnake() {
            var snakePos = new Phaser.Point();
            var foundPos = false;
            var rndX = void 0;
            var rndY = void 0;
            while (!foundPos) {
                rndX = this.game.rnd.between(0, this._map.width - 1);
                rndY = this.game.rnd.between(0, this._map.height - 1);
                if (rndX - 3 >= 0 && rndX + 3 < this._map.width - 1) {
                    foundPos = true;
                    for (var i = rndX - 3; i <= rndX + 3; i++) {
                        if (this._map.getTile(i, rndY, 0).index != 0) {
                            foundPos = false;
                            break;
                        }
                    }
                }
            }
            this._snake = new baseSprite_1.default(this.game, rndX, rndY, 'head');
            this._bodyGroup = this.add.group();
            this._bodyGroup.classType = baseSprite_1.default;
            for (var _i = 0; _i < 100; _i++) {
                var part = new baseSprite_1.default(this.game, 0, 0, 'body');
                part.kill();
                this._bodyGroup.add(part);
            }
            var snakeGridPos = this._snake.gridPosition;
            this._body = [];
            for (var _i2 = 1; _i2 < 3; _i2++) {
                var bodyPart = this._bodyGroup.getFirstExists(false);
                bodyPart.revive();
                bodyPart.updatePosition(snakeGridPos.x - _i2, snakeGridPos.y);
                this._body.push(bodyPart);
            }
        }
    }, {
        key: "updateSnake",
        value: function updateSnake() {
            var difference = Phaser.Point.add(this._desiredDirection, this._currentDirection);
            if (difference.x != 0 || difference.y != 0) {
                this._currentDirection = this._desiredDirection.clone();
                this._snake.angle = this._desiredRotation;
            }
            var oldPos = this._snake.gridPosition.clone();
            var newX = oldPos.x + this._currentDirection.x;
            var newY = oldPos.y + this._currentDirection.y;
            if (this._map.getTile(newX, newY, 0).index != 0) {
                return;
            }
            var hitSelf = false;
            for (var i = 0; i < this._body.length; i++) {
                var body = this._body[i];
                if (body.gridPosition.x == newX && body.gridPosition.y == newY) {
                    hitSelf = true;
                    break;
                }
            }
            if (hitSelf) {
                return;
            }
            this._snake.updatePosition(newX, newY);
            if (this._food.gridPosition.equals(this._snake.gridPosition)) {
                var newPart = this._bodyGroup.getFirstExists(false);
                newPart.revive();
                newPart.updatePosition(oldPos.x, oldPos.y);
                this._body.unshift(newPart);
                this.updateFood();
            } else {
                var lastBodyPart = this._body.pop();
                lastBodyPart.updatePosition(oldPos.x, oldPos.y);
                this._body.unshift(lastBodyPart);
            }
        } // updateSnake

    }, {
        key: "updateFood",
        value: function updateFood() {
            var emptyPosition = false;
            var rndX = void 0;
            var rndY = void 0;
            while (!emptyPosition) {
                rndX = this.game.rnd.between(0, this._map.width - 1);
                rndY = this.game.rnd.between(0, this._map.height - 1);
                if (this._map.getTile(rndX, rndY, 0).index == 0) {
                    emptyPosition = true;
                    if (this._snake.gridPosition.x == rndX && this._snake.gridPosition.y == rndY) {
                        emptyPosition = false;
                    }
                    for (var i = 0; i < this._body.length; i++) {
                        var body = this._body[i];
                        if (body.gridPosition.x == rndX && body.gridPosition.y == rndY) {
                            emptyPosition = false;
                            break;
                        }
                    }
                }
            }
            this._food.updatePosition(rndX, rndY);
        } // updateFood

    }]);

    return Game;
}(Phaser.State); // Game


exports.default = Game;

},{"./baseSprite":1,"./generator":4,"./globals":5}],4:[function(require,module,exports){
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
            var room = this.getRndRoom(minSize, maxSize, true);
            this.createRoom(room);
            var totalRooms = 1;
            var totalTries = 300;
            var timesTried = 0;
            var foundPlace = false;
            while (totalRooms < nrRooms) {
                timesTried = 0;
                foundPlace = false;
                while (!foundPlace && timesTried < totalTries) {
                    room = this.getRndRoom(minSize, maxSize, false);
                    var overlap = this.countTiles(room);
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

    }, {
        key: "getRndRoom",
        value: function getRndRoom(minSize, maxSize, firstRoom) {
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
        key: "countTiles",
        value: function countTiles(room) {
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
        key: "createRoom",
        value: function createRoom(room) {
            for (var y = room.y; y < room.y + room.height; y++) {
                for (var x = room.x; x < room.x + room.width; x++) {
                    this._map[y][x] = 0;
                }
            }
        } // createRoom

    }, {
        key: "allNeigborsAreWalls",
        value: function allNeigborsAreWalls(x, y) {
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
        key: "removeDoubleWalls",
        value: function removeDoubleWalls() {
            var wallsToRemove = [];
            for (var y = 0; y < this._height; y++) {
                for (var x = 0; x < this._width; x++) {
                    if (this.allNeigborsAreWalls(x, y)) {
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
        key: "getCSV",
        value: function getCSV() {
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


exports.default = Generator;

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
exports.default = Globals;

},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = require("./boot");
var preload_1 = require("./preload");
var game_1 = require("./game");

var Main = function (_Phaser$Game) {
    _inherits(Main, _Phaser$Game);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, 640, 480, Phaser.AUTO, 'container', null));

        _this.state.add('boot', boot_1.default);
        _this.state.add('preload', preload_1.default);
        _this.state.add('game', game_1.default);
        _this.state.start('boot');
        return _this;
    } // constructor


    return Main;
}(Phaser.Game); // Main


window.onload = function () {
    new Main();
}; // window.onload

},{"./boot":2,"./game":3,"./preload":7}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("./globals");

var Preload = function (_Phaser$State) {
    _inherits(Preload, _Phaser$State);

    function Preload() {
        _classCallCheck(this, Preload);

        return _possibleConstructorReturn(this, (Preload.__proto__ || Object.getPrototypeOf(Preload)).apply(this, arguments));
    }

    _createClass(Preload, [{
        key: "preload",
        value: function preload() {
            this.load.image('head', 'assets/images/head.png');
            this.load.image('body', 'assets/images/body.png');
            //this.load.image('wall', 'assets/images/wall.png');
            this.load.image('food', 'assets/images/food.png');
            this.load.image('tiles', 'assets/images/walls.png');
        } // preload

    }, {
        key: "create",
        value: function create() {
            console.log(globals_1.default.seed);
            this.game.state.start('game');
        } // create

    }]);

    return Preload;
}(Phaser.State); // Preload


exports.default = Preload;

},{"./globals":5}]},{},[6])

//# sourceMappingURL=bundle.js.map
