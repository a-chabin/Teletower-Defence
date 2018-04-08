(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var game = new Phaser.Game(1024, 650, Phaser.AUTO, 'test', null, true, false);
var health = 100,
    score = 5000,
    map = {};

var BasicGame = function (game) {};
BasicGame.Boot = function (game) {};

var isoGroup, unitGroup, cursorPos, cursor, healthBar;
var tiles  = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 
    0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 
    0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ]
var tileTypes = {
    0: 'grass',
    1: 'road',
    2: 'grass_active',
    3: 'tower',
    4: 'water'
}
var mapW = 25;
var mapH = tiles.length / mapW;
// window.mapEditor = [];
var mapRoad = [{x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:665.5, y:583}, {x:529.5, y:515}, {x:529.5, y:515}, {x:529.5, y:515}, {x:529.5, y:515}, {x:529.5, y:515}, {x:529.5, y:515}, {x:529.5, y:515}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:767.5, y:396}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:697.5, y:361}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:461.5, y:480}, {x:394.5, y:446}, {x:394.5, y:446}, {x:394.5, y:446}, {x:394.5, y:446}, {x:394.5, y:446}, {x:394.5, y:446}, {x:664.5, y:311}, {x:664.5, y:311}, {x:664.5, y:311}, {x:664.5, y:311}, {x:664.5, y:311}, {x:664.5, y:311}, {x:664.5, y:311}, {x:613.5, y:286}, {x:613.5, y:286}, {x:613.5, y:286}, {x:613.5, y:286}, {x:613.5, y:286}, {x:613.5, y:286}, {x:613.5, y:286}, {x:342.5, y:421}, {x:342.5, y:421}, {x:342.5, y:421}, {x:342.5, y:421}, {x:342.5, y:421}, {x:342.5, y:421}, {x:342.5, y:421}, {x:255.5, y:377}, {x:255.5, y:377}, {x:255.5, y:377}, {x:255.5, y:377}, {x:255.5, y:377}, {x:255.5, y:377}, {x:255.5, y:377}, {x:503.5, y:256}, {x:503.5, y:256}, {x:503.5, y:256}, {x:503.5, y:256}, {x:503.5, y:256}, {x:503.5, y:256}, {x:503.5, y:256}];

var skills = {
  'roofers': {
    'price': 3000,
    'last_used': null,
    'button': null,
    'timer_coords': [285, 72],
    'sprite': null
  },
  'obnimashki': {
    'price': 5000,
    'last_used': null,
    'button': null,
    'timer_coords': [285, 108],
    'sprite': null
  },
  'roizman': {
    'price': 10000,
    'last_used': null,
    'button': null,
    'timer_coords': [285, 142]
  }
};
var defender_price = 500
var enemies = [];
var defenders = [];

function skillIsAvailable(name) {
  if (name === 'obnimashki' && health > 80) {
      return false;
  }

  return !skillIsActive(name) && score >= skills[name].price;
}

function skillIsActive(name) {
  if (skills[name].last_used != null) {
    return (Date.now() - skills[name].last_used) < 30 * 1000;
  }
  return false;
}

function buy(skill) {
  var skill_data = skills[skill];
  var price = skill_data.price;

  if (score < price) return;
  score -= price;
  skill_data.last_used = Date.now();
}

function buyRoofers() {
  buy('roofers');

  var enm = enemies.slice();
  for (var i = 0; i < enm.length; i++) {
    enm[i].freeze();
  }
}

function buyObnimashki() {
  if (health > 80) return;

  buy('obnimashki');

  heal(20);
}

function buyRoizman() {
  buy('roizman');

  epic();

  var enm = enemies.slice();
  for (var i = 0; i < enm.length; i++) {
    enm[i].destroy();
  }
}

var timer;

var water = [];

var tower;

BasicGame.Boot.prototype =
{
    preload: function () {
        // Да-да, это цены
        game.load.image('buy-1000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-1000.png');
        game.load.image('buy-2000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-2000.png');
        game.load.image('buy-3000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-3000.png');
        game.load.image('buy-5000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-5000.png');
        game.load.image('buy-10000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-10000.png');
        // Да-да, дизэйбл
        game.load.image('buy-disabled-1000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-disabled-1000.png');
        game.load.image('buy-disabled-2000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-disabled-2000.png');
        game.load.image('buy-disabled-3000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-disabled-3000.png');
        game.load.image('buy-disabled-5000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-disabled-5000.png');
        game.load.image('buy-disabled-10000', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/buy/buy-disabled-10000.png');
        game.load.image('tree1', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/tree1.png');
        game.load.image('tree2', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/tree2.png');
        game.load.image('road', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/road.png');
        game.load.image('grass', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/grass.png');
        game.load.image('grass_active', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/grass_active.png');
        game.load.image('water', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/water.png');
        game.load.image('tower', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/tower.png');
        game.load.image('tower-flag', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/tower-flag.png');
        game.load.image('pickup-burning', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/pickup-burning.png');
        game.load.image('devyatka', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/devyatka.png');
        game.load.image('money', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/money.png');
        game.load.image('heart', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/heart.png');
        game.load.image('friends', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/friends.png');

        game.load.spritesheet('activist', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/activist.png', 32, 64, 8);
        game.load.spritesheet('thief', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/thief.png', 128, 184, 28);
        game.load.spritesheet('police', 'http://tech.skbkontur.ru/hackathon-2018.1-team35/img/police.png', 128, 218, 5);

        game.time.advancedTiming = true;
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.3);
    },
    create: function () {
        // Create a group for our tiles.
        isoGroup = game.add.group();
        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        unitGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        var rectangle = new Phaser.Rectangle(game.width - 230, 10, 170, 20);
        var bmd = game.add.bitmapData(game.width, game.height);
        bmd.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#2d2d2d');
        bmd.addToWorld();

        var barConfig = {
            width: 166,
            height: 16,
            x: game.width - 145,
            y: 20,
            bg: {
              color: '#8e2020'
            },
            bar: {
              color: '#fe0000'
            },
            animationDuration: 600,
            flipped: false
        };
        game.input.mouse.capture = true;
        healthBar = new HealthBar(game, barConfig);
        healthBar.setPercent(health);

        game.add.image(190, 55, "buy-disabled-3000");
        game.add.image(190, 90, "buy-disabled-5000");
        game.add.image(190, 125, "buy-disabled-10000");
        skills['roofers']['button'] = game.add.button(190, 55, 'buy-3000', buyRoofers, this, 2, 1, 0);
        skills['obnimashki']['button'] = game.add.button(190, 90, 'buy-5000', buyObnimashki, this, 2, 1, 0);
        skills['roizman']['button'] = game.add.button(190, 125, 'buy-10000', buyRoizman, this, 2, 1, 0);

        document.addEventListener("startGame", startGame);
        timer = game.time.create(false);
      },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        water.forEach(function (w) {
          w.isoZ = -1 + (-1 * Math.sin((game.time.now + (w.isoX * 5)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
          w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.1, 1);
        });
        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds && tile.key=="grass_active") {
                tile.selected = true;
                tile.tint = 0x86bfda;
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
            }

            if (tile.selected && game.input.activePointer.leftButton.isDown) {
                if (score >= defender_price && !([tile.isoBounds.x, tile.isoBounds.y] in map) && tile.key == 'grass_active'){
                    score -= defender_price;
                    new Defender(tile);
                }
            }
        });
        game.iso.simpleSort(unitGroup);

        if (health <= 0) {
            end();
        }

        if (!skillIsActive('roofers')) {
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].unfreeze();
            }    
        }
    },
    render: function () {
        game.add.image(game.width - 275, 5, 'heart');
        game.add.image(game.width - 277, 55, "money");
        game.debug.text(health, game.width - 160, 25, "#fff");
        game.debug.text(score, game.width - 230, 74, "#a7aebe");

        game.debug.text("Суперспособности:", 2, 25, "#a7aebe");
        game.debug.text("Руферы (Freeze)", 2, 72, "#a7aebe");
        game.debug.text("Обнимашки (+20 hp)", 2, 108, "#a7aebe");
        game.debug.text("Ройзман", 2, 142, "#a7aebe");

        for (skill in skills) {
          skills[skill].button.visible = skillIsAvailable(skill);

          if (skillIsActive(skill) && skills[skill].last_used != null) {
            if (skill === 'roofers') {
              if (skills[skill].sprite != null) {
                skills[skill].sprite.visible = true;
              } else {
                tile = game.add.isoSprite(76, 76, 0, 'tower-flag', 0, isoGroup);
                tile.anchor.set(0.5, 1);
                skills[skill].sprite = tile;
              }
            }

            if (skill === 'obnimashki') {
                if (skills[skill].sprite != null) {
                    skills[skill].sprite.visible = true;
                } else {
                    tile = game.add.isoSprite(110, 110, 0, 'friends', 0, isoGroup);
                    tile.anchor.set(0.5, 1);
                    skills[skill].sprite = tile;
                }
            }

            var x = skills[skill].timer_coords[0];
            var y = skills[skill].timer_coords[1];

            game.debug.text(Math.floor((Date.now() - skills[skill].last_used) / 1000) + " / 30", x, y, "#a7aebe");
          } else {
            if (skill === 'roofers' && skills[skill].sprite != null) {
              skills[skill].sprite.visible = false;
            }
            if (skill === 'obnimashki' && skills[skill].sprite != null) {
                skills[skill].sprite.visible = false;
              }
        }
        }
      },
    spawnTiles: function () {
        var tile;
        for (var i = 0; i < mapH; i += 1) {
            for (var j = 0; j < mapW; j += 1) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                var type = tiles[(i+1)*mapW-(j+1)];
                tile = game.add.isoSprite(i * 19, j * 19, 0, tileTypes[type], 0, isoGroup);
                tile.anchor.set(0.5, 1);
                if (type === 3) {
                  tower = tile;
                }
                if (type === 4) {
                    water.push(tile);
                  }
            }
        }

        tile = game.add.isoSprite(78, 450, 0, 'pickup-burning', 0, unitGroup);
        tile.anchor.set(0.5, 1);
        tile = game.add.isoSprite(140, 30, 0, 'devyatka', 0, unitGroup);
        tile.anchor.set(0.5, 1);
        tile = game.add.isoSprite(345, -25, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(190, -25, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(260, -25, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(280, 0, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(300, -25, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(310, 400, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(390, -25, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(400, 45, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 0.5);
        tile = game.add.isoSprite(520, 290, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 1);
        tile = game.add.isoSprite(130, 320, 0, 'tree2', 0, unitGroup);
        tile.anchor.set(0.5, 1);
      }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');

/* Units */
function Enemy(x, y){
    var self = this;
    this.health = 100;
    this.speed = 60;
    this.damage = 10;
    this.reward = 100;
    this.active = true;
    var path = mapRoad.slice();
    var target = path[0] || {
        x: x,
        y: y,
    };
    var move = function(){
        if(!self.active) return;
        var vec = {
            x: target.x - self.sprite.x,
            y: target.y - self.sprite.y,
        }
        var len = distance(target, self.sprite)
        var deltaTime = game.time.elapsed/1000; 
        if(len > self.speed*deltaTime){
            self.sprite.x += vec.x * self.speed / len*deltaTime;
            self.sprite.y += vec.y * self.speed / len*deltaTime;
            if(vec.x > 0){
                self.sprite.scale.x = Math.abs(self.sprite.scale.x);
            }
            if(vec.x < 0){
                self.sprite.scale.x = -Math.abs(self.sprite.scale.x);
            }
        }
        var pos={x:0,y:0};
        game.iso.unproject(self.sprite, pos);
        self.sprite.isoX = pos.x;
        self.sprite.isoY = pos.y;
        // tile = game.add.isoSprite(pos.x, pos.y, 0, 'thief', 28, unitGroup);
        };
    this.destroy = function(){
        var idx = enemies.indexOf(self);
        if(idx!=-1){
            enemies.splice(idx, 1);
        }
        self.sprite.destroy();
    };
    var getTarget = function(){
        var len = distance(target, self.sprite)
        var deltaTime = game.time.elapsed/1000; 
        if(len <= self.speed*deltaTime){
            path.shift();
            target = path[0] || target;
        }
        if(path.length==0){
            self.destroy();
            hurt(self.damage);
        }
    };

    this.freeze = function() {
        if (target.x === 475 && target.y === 590) return;
        self.active = false;
    }

    this.unfreeze = function() {
        self.active = true;
    }

    this.moveTo = function(x, y){
        target.x = x;
        target.y = y;
    };
    this.hurt = function(points) {
        var result = self.health - points;
        self.health = (result >= 0) ? result : 0;
        if(self.health<=0){
            self.damage = 0;
            score += self.reward;
            target = {x:475, y:590};
            path = [target];
            self.unfreeze();
            // destroy();
            return;
        }
        if(self.sprite.tint == 0xffffff){
            setTimeout(function(){
                if(self && self.sprite){
                    self.sprite.tint = 0xff0000;
                }
            },100);
            setTimeout(function(){
                if(self && self.sprite){
                    self.sprite.tint = 0xffffff;
                }
            },300);
        }
    }
    this.sprite.update = function() {
        if(self.active){
            !self.anim.isPlaying && self.anim.play();
        }else{
            self.anim.stop();
        }
        getTarget();
        move();
    }
    enemies.push(this);
}

function Thief(x, y){
    var pos = {x: 0, y: 0};
    game.iso.unproject({x:x,y:y}, pos);
    this.sprite = game.add.isoSprite(pos.x, pos.y, 0, 'thief', 28, unitGroup);
    this.sprite.width = 24;
    this.sprite.height = 36;
    this.sprite.anchor.set(0.5, 0.9);
    this.anim = this.sprite.animations.add('walk');
    this.anim.play(10, true);
    Enemy.call(this, x, y);
    this.health = 100;
    this.damage = 20;
    this.reward = 500;
}

function Police(x, y){
    var pos = {x: 0, y: 0};
    game.iso.unproject({x:x,y:y}, pos);
    this.sprite = game.add.isoSprite(pos.x, pos.y, 0, 'police', 5, unitGroup);
    this.sprite.width = 24;
    this.sprite.height = 36;
    this.sprite.anchor.set(0.5, 0.9);
    this.anim = this.sprite.animations.add('walk');
    this.anim.play(10, true);
    Enemy.call(this, x, y);
    this.health = 200;
    this.damage = 40;
    this.reward = 2000;
}

function Defender(tile){
    var self = this;
    map[[tile.isoBounds.x, tile.isoBounds.y]] = 'activist';
    this.damage = 5;
    this.radius = 70;
    this.sprite = game.add.isoSprite(tile.isoBounds.x + 10, tile.isoBounds.y + 10, 0, 'activist', 8, unitGroup);
    this.sprite.anchor.set(0.5, 1);

    var anim = this.sprite.animations.add('post');
    var target;
    var destroy = function(){
        var idx = defenders.indexOf(self);
        if(idx!=-1){
            defenders.splice(idx, 1);
        }
        self.sprite.destroy();
    };
    var attack = function(){
        if(target){
            var deltaTime = game.time.elapsed/1000; 
            target.hurt(self.damage*deltaTime);
            if(!anim.isPlaying){
                anim.play(3, true);
            }
        }
    };
    var getTarget = function(){
        var dist;
        target = undefined;
        for (var i = 0; i < enemies.length; i++) {
            dist = distance(enemies[i].sprite, self.sprite);
            if(dist < self.radius){
                if(!target || distance(target.sprite, self.sprite) < dist){
                    if(enemies[i].health > 0){
                        target = enemies[i];
                    }
                }
            }
        }
        if(!target){
            anim.stop(true);
        }
    };
    this.sprite.update = function() {
        getTarget();
        attack();
    }
    defenders.push(this);
}


/* Health */
function hurt(points) {
    var result = health - points;
    health = (result >= 0) ? result : 0;
    healthBar.setPercent(health);
    var self = tower;
    if(points > 0 && self && self.tint == 0xffffff){
        setTimeout(function(){
            if(self && self){
                self.tint = 0xff0000;
            }
        },100);
        setTimeout(function(){
            if(self && self){
                self.tint = 0xffffff;
            }
        },300);
    }
}

function heal(points) {
    var result = health + points;
    health = (result < 100) ? result : 100;
    healthBar.setPercent(health);
}

function spawnEnemy(gameClass){
    new gameClass(mapRoad[0].x,mapRoad[0].y);
}
function startGame(){
    console.log("start");
    new Wave([Thief, 5, Police, 2], [1000, 2000], 2000);
    new Wave([Thief, 10, Police, 8], [1000, 2000], 20000);
    new Wave([Thief, 40, Police, 20], [1000, 2000], 40000);
    new Wave([Thief, 65, Police, 35], [1000, 2000], 60000);
    timer.start();
}


function distance(vec1, vec2) {
    var vec = {
        x: vec1.x - vec2.x,
        y: vec1.y - vec2.y,
    }
    return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
}

window.Wave=Wave;
window.Thief=Thief;
window.Police=Police;

function Wave(enemies, rate, pause) {
    var pack = [];
    var enemy;
    for (var i = 0; i < enemies.length/2; i++) {
        pack.push({
            "class": enemies[2*i],
            "count": enemies[2*i+1],
        })
    }

    function spawn() {
        pack = pack.filter(function(a){return a.count>0});
        if(pack.length){
            enemy = pack[Math.floor(Math.random()*pack.length)];
            enemy.count-=1;
            spawnEnemy(enemy.class);
            timer.add(rate[0] + (rate[1]-rate[0])*Math.random(), spawn);
        }
    }
    timer.add(pause, spawn);
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3BoYXNlci1ub2RlLWtpdC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnVpbGQvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMDI0LCA2NTAsIFBoYXNlci5BVVRPLCAndGVzdCcsIG51bGwsIHRydWUsIGZhbHNlKTtcbnZhciBoZWFsdGggPSAxMDAsXG4gICAgc2NvcmUgPSA1MDAwLFxuICAgIG1hcCA9IHt9O1xuXG52YXIgQmFzaWNHYW1lID0gZnVuY3Rpb24gKGdhbWUpIHt9O1xuQmFzaWNHYW1lLkJvb3QgPSBmdW5jdGlvbiAoZ2FtZSkge307XG5cbnZhciBpc29Hcm91cCwgdW5pdEdyb3VwLCBjdXJzb3JQb3MsIGN1cnNvciwgaGVhbHRoQmFyO1xudmFyIHRpbGVzICA9IFtcbiAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAxLCAxLCAxLCAxLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAyLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAzLCAxLCAxLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAyLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAxLCAxLCAxLCAxLCAwLCAwLCBcbiAgICAwLCAwLCAwLCAwLCAyLCAxLCAyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDQsIDQsIDQsIDQsIDQsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsXG4gICAgNCwgNCwgNCwgNCwgNCwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCxcbiAgICA0LCA0LCA0LCA0LCA0LCAxLCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LFxuICAgIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICBdXG52YXIgdGlsZVR5cGVzID0ge1xuICAgIDA6ICdncmFzcycsXG4gICAgMTogJ3JvYWQnLFxuICAgIDI6ICdncmFzc19hY3RpdmUnLFxuICAgIDM6ICd0b3dlcicsXG4gICAgNDogJ3dhdGVyJ1xufVxudmFyIG1hcFcgPSAyNTtcbnZhciBtYXBIID0gdGlsZXMubGVuZ3RoIC8gbWFwVztcbi8vIHdpbmRvdy5tYXBFZGl0b3IgPSBbXTtcbnZhciBtYXBSb2FkID0gW3t4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn1dO1xuXG52YXIgc2tpbGxzID0ge1xuICAncm9vZmVycyc6IHtcbiAgICAncHJpY2UnOiAzMDAwLFxuICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICdidXR0b24nOiBudWxsLFxuICAgICd0aW1lcl9jb29yZHMnOiBbMjg1LCA3Ml0sXG4gICAgJ3Nwcml0ZSc6IG51bGxcbiAgfSxcbiAgJ29ibmltYXNoa2knOiB7XG4gICAgJ3ByaWNlJzogNTAwMCxcbiAgICAnbGFzdF91c2VkJzogbnVsbCxcbiAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAndGltZXJfY29vcmRzJzogWzI4NSwgMTA4XSxcbiAgICAnc3ByaXRlJzogbnVsbFxuICB9LFxuICAncm9pem1hbic6IHtcbiAgICAncHJpY2UnOiAxMDAwMCxcbiAgICAnbGFzdF91c2VkJzogbnVsbCxcbiAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAndGltZXJfY29vcmRzJzogWzI4NSwgMTQyXVxuICB9XG59O1xudmFyIGRlZmVuZGVyX3ByaWNlID0gNTAwXG52YXIgZW5lbWllcyA9IFtdO1xudmFyIGRlZmVuZGVycyA9IFtdO1xuXG5mdW5jdGlvbiBza2lsbElzQXZhaWxhYmxlKG5hbWUpIHtcbiAgaWYgKG5hbWUgPT09ICdvYm5pbWFzaGtpJyAmJiBoZWFsdGggPiA4MCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuICFza2lsbElzQWN0aXZlKG5hbWUpICYmIHNjb3JlID49IHNraWxsc1tuYW1lXS5wcmljZTtcbn1cblxuZnVuY3Rpb24gc2tpbGxJc0FjdGl2ZShuYW1lKSB7XG4gIGlmIChza2lsbHNbbmFtZV0ubGFzdF91c2VkICE9IG51bGwpIHtcbiAgICByZXR1cm4gKERhdGUubm93KCkgLSBza2lsbHNbbmFtZV0ubGFzdF91c2VkKSA8IDMwICogMTAwMDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJ1eShza2lsbCkge1xuICB2YXIgc2tpbGxfZGF0YSA9IHNraWxsc1tza2lsbF07XG4gIHZhciBwcmljZSA9IHNraWxsX2RhdGEucHJpY2U7XG5cbiAgaWYgKHNjb3JlIDwgcHJpY2UpIHJldHVybjtcbiAgc2NvcmUgLT0gcHJpY2U7XG4gIHNraWxsX2RhdGEubGFzdF91c2VkID0gRGF0ZS5ub3coKTtcbn1cblxuZnVuY3Rpb24gYnV5Um9vZmVycygpIHtcbiAgYnV5KCdyb29mZXJzJyk7XG5cbiAgdmFyIGVubSA9IGVuZW1pZXMuc2xpY2UoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbm0ubGVuZ3RoOyBpKyspIHtcbiAgICBlbm1baV0uZnJlZXplKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYnV5T2JuaW1hc2hraSgpIHtcbiAgaWYgKGhlYWx0aCA+IDgwKSByZXR1cm47XG5cbiAgYnV5KCdvYm5pbWFzaGtpJyk7XG5cbiAgaGVhbCgyMCk7XG59XG5cbmZ1bmN0aW9uIGJ1eVJvaXptYW4oKSB7XG4gIGJ1eSgncm9pem1hbicpO1xuXG4gIGVwaWMoKTtcblxuICB2YXIgZW5tID0gZW5lbWllcy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGVubS5sZW5ndGg7IGkrKykge1xuICAgIGVubVtpXS5kZXN0cm95KCk7XG4gIH1cbn1cblxudmFyIHRpbWVyO1xuXG52YXIgd2F0ZXIgPSBbXTtcblxudmFyIHRvd2VyO1xuXG5CYXNpY0dhbWUuQm9vdC5wcm90b3R5cGUgPVxue1xuICAgIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g0JTQsC3QtNCwLCDRjdGC0L4g0YbQtdC90YtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMTAwMCcsICcuLi9pbWcvYnV5L2J1eS0xMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0yMDAwJywgJy4uL2ltZy9idXkvYnV5LTIwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTMwMDAnLCAnLi4vaW1nL2J1eS9idXktMzAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktNTAwMCcsICcuLi9pbWcvYnV5L2J1eS01MDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0xMDAwMCcsICcuLi9pbWcvYnV5L2J1eS0xMDAwMC5wbmcnKTtcbiAgICAgICAgLy8g0JTQsC3QtNCwLCDQtNC40LfRjdC50LHQu1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0xMDAwJywgJy4uL2ltZy9idXkvYnV5LWRpc2FibGVkLTEwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTIwMDAnLCAnLi4vaW1nL2J1eS9idXktZGlzYWJsZWQtMjAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtMzAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0zMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC01MDAwJywgJy4uL2ltZy9idXkvYnV5LWRpc2FibGVkLTUwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTEwMDAwJywgJy4uL2ltZy9idXkvYnV5LWRpc2FibGVkLTEwMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RyZWUxJywgJy4uL2ltZy90cmVlMS5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0cmVlMicsICcuLi9pbWcvdHJlZTIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgncm9hZCcsICcuLi9pbWcvcm9hZC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdncmFzcycsICcuLi9pbWcvZ3Jhc3MucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZ3Jhc3NfYWN0aXZlJywgJy4uL2ltZy9ncmFzc19hY3RpdmUucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnd2F0ZXInLCAnLi4vaW1nL3dhdGVyLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3Rvd2VyJywgJy4uL2ltZy90b3dlci5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0b3dlci1mbGFnJywgJy4uL2ltZy90b3dlci1mbGFnLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BpY2t1cC1idXJuaW5nJywgJy4uL2ltZy9waWNrdXAtYnVybmluZy5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdkZXZ5YXRrYScsICcuLi9pbWcvZGV2eWF0a2EucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnbW9uZXknLCAnLi4vaW1nL21vbmV5LnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2hlYXJ0JywgJy4uL2ltZy9oZWFydC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdmcmllbmRzJywgJy4uL2ltZy9mcmllbmRzLnBuZycpO1xuXG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYWN0aXZpc3QnLCAnLi4vaW1nL2FjdGl2aXN0LnBuZycsIDMyLCA2NCwgOCk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgndGhpZWYnLCAnLi4vaW1nL3RoaWVmLnBuZycsIDEyOCwgMTg0LCAyOCk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncG9saWNlJywgJy4uL2ltZy9wb2xpY2UucG5nJywgMTI4LCAyMTgsIDUpO1xuXG4gICAgICAgIGdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XG4gICAgICAgIGdhbWUucGx1Z2lucy5hZGQobmV3IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljKGdhbWUpKTtcblxuICAgICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSVNPQVJDQURFKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHNldCBhIGdhbWUgY2FudmFzLWJhc2VkIG9mZnNldCBmb3IgdGhlIDAsIDAsIDAgaXNvbWV0cmljIGNvb3JkaW5hdGUgLSBieSBkZWZhdWx0XG4gICAgICAgIC8vIHRoaXMgcG9pbnQgd291bGQgYmUgYXQgc2NyZWVuIGNvb3JkaW5hdGVzIDAsIDAgKHRvcCBsZWZ0KSB3aGljaCBpcyB1c3VhbGx5IHVuZGVzaXJhYmxlLlxuICAgICAgICBnYW1lLmlzby5hbmNob3Iuc2V0VG8oMC41LCAwLjMpO1xuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGdyb3VwIGZvciBvdXIgdGlsZXMuXG4gICAgICAgIGlzb0dyb3VwID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgaXNvR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIGlzb0dyb3VwLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljLklTT0FSQ0FERTtcblxuICAgICAgICB1bml0R3JvdXAgPSBnYW1lLmFkZC5ncm91cCgpO1xuXG4gICAgICAgIC8vIExldCdzIG1ha2UgYSBsb2FkIG9mIHRpbGVzIG9uIGEgZ3JpZC5cbiAgICAgICAgdGhpcy5zcGF3blRpbGVzKCk7XG5cbiAgICAgICAgLy8gUHJvdmlkZSBhIDNEIHBvc2l0aW9uIGZvciB0aGUgY3Vyc29yXG4gICAgICAgIGN1cnNvclBvcyA9IG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYy5Qb2ludDMoKTtcblxuICAgICAgICB2YXIgcmVjdGFuZ2xlID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoZ2FtZS53aWR0aCAtIDIzMCwgMTAsIDE3MCwgMjApO1xuICAgICAgICB2YXIgYm1kID0gZ2FtZS5hZGQuYml0bWFwRGF0YShnYW1lLndpZHRoLCBnYW1lLmhlaWdodCk7XG4gICAgICAgIGJtZC5yZWN0KHJlY3RhbmdsZS54LCByZWN0YW5nbGUueSwgcmVjdGFuZ2xlLndpZHRoLCByZWN0YW5nbGUuaGVpZ2h0LCAnIzJkMmQyZCcpO1xuICAgICAgICBibWQuYWRkVG9Xb3JsZCgpO1xuXG4gICAgICAgIHZhciBiYXJDb25maWcgPSB7XG4gICAgICAgICAgICB3aWR0aDogMTY2LFxuICAgICAgICAgICAgaGVpZ2h0OiAxNixcbiAgICAgICAgICAgIHg6IGdhbWUud2lkdGggLSAxNDUsXG4gICAgICAgICAgICB5OiAyMCxcbiAgICAgICAgICAgIGJnOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzhlMjAyMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXI6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjZmUwMDAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiA2MDAsXG4gICAgICAgICAgICBmbGlwcGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBnYW1lLmlucHV0Lm1vdXNlLmNhcHR1cmUgPSB0cnVlO1xuICAgICAgICBoZWFsdGhCYXIgPSBuZXcgSGVhbHRoQmFyKGdhbWUsIGJhckNvbmZpZyk7XG4gICAgICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG5cbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMTkwLCA1NSwgXCJidXktZGlzYWJsZWQtMzAwMFwiKTtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMTkwLCA5MCwgXCJidXktZGlzYWJsZWQtNTAwMFwiKTtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMTkwLCAxMjUsIFwiYnV5LWRpc2FibGVkLTEwMDAwXCIpO1xuICAgICAgICBza2lsbHNbJ3Jvb2ZlcnMnXVsnYnV0dG9uJ10gPSBnYW1lLmFkZC5idXR0b24oMTkwLCA1NSwgJ2J1eS0zMDAwJywgYnV5Um9vZmVycywgdGhpcywgMiwgMSwgMCk7XG4gICAgICAgIHNraWxsc1snb2JuaW1hc2hraSddWydidXR0b24nXSA9IGdhbWUuYWRkLmJ1dHRvbigxOTAsIDkwLCAnYnV5LTUwMDAnLCBidXlPYm5pbWFzaGtpLCB0aGlzLCAyLCAxLCAwKTtcbiAgICAgICAgc2tpbGxzWydyb2l6bWFuJ11bJ2J1dHRvbiddID0gZ2FtZS5hZGQuYnV0dG9uKDE5MCwgMTI1LCAnYnV5LTEwMDAwJywgYnV5Um9pem1hbiwgdGhpcywgMiwgMSwgMCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN0YXJ0R2FtZVwiLCBzdGFydEdhbWUpO1xuICAgICAgICB0aW1lciA9IGdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuICAgICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHVuZGVyc3RhbmQgdGhhdCBzY3JlZW4tdG8taXNvbWV0cmljIHByb2plY3Rpb24gbWVhbnMgeW91IGhhdmUgdG8gc3BlY2lmeSBhIHogcG9zaXRpb24gbWFudWFsbHksIGFzIHRoaXMgY2Fubm90IGJlIGVhc2lseVxuICAgICAgICAvLyBkZXRlcm1pbmVkIGZyb20gdGhlIDJEIHBvaW50ZXIgcG9zaXRpb24gd2l0aG91dCBleHRyYSB0cmlja2VyeS4gQnkgZGVmYXVsdCwgdGhlIHogcG9zaXRpb24gaXMgMCBpZiBub3Qgc2V0LlxuICAgICAgICBnYW1lLmlzby51bnByb2plY3QoZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLnBvc2l0aW9uLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgIHdhdGVyLmZvckVhY2goZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICB3Lmlzb1ogPSAtMSArICgtMSAqIE1hdGguc2luKChnYW1lLnRpbWUubm93ICsgKHcuaXNvWCAqIDUpKSAqIDAuMDA0KSkgKyAoLTEgKiBNYXRoLnNpbigoZ2FtZS50aW1lLm5vdyArICh3Lmlzb1kgKiA4KSkgKiAwLjAwNSkpO1xuICAgICAgICAgIHcuYWxwaGEgPSBQaGFzZXIuTWF0aC5jbGFtcCgxICsgKHcuaXNvWiAqIDAuMSksIDAuMSwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRpbGVzIGFuZCB0ZXN0IHRvIHNlZSBpZiB0aGUgM0QgcG9zaXRpb24gZnJvbSBhYm92ZSBpbnRlcnNlY3RzIHdpdGggdGhlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIElzb1Nwcml0ZSB0aWxlIGJvdW5kcy5cbiAgICAgICAgaXNvR3JvdXAuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIGluQm91bmRzID0gdGlsZS5pc29Cb3VuZHMuY29udGFpbnNYWShjdXJzb3JQb3MueCwgY3Vyc29yUG9zLnkpO1xuICAgICAgICAgICAgLy8gSWYgaXQgZG9lcywgZG8gYSBsaXR0bGUgYW5pbWF0aW9uIGFuZCB0aW50IGNoYW5nZS5cbiAgICAgICAgICAgIGlmICghdGlsZS5zZWxlY3RlZCAmJiBpbkJvdW5kcyAmJiB0aWxlLmtleT09XCJncmFzc19hY3RpdmVcIikge1xuICAgICAgICAgICAgICAgIHRpbGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRpbGUudGludCA9IDB4ODZiZmRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgbm90LCByZXZlcnQgYmFjayB0byBob3cgaXQgd2FzLlxuICAgICAgICAgICAgZWxzZSBpZiAodGlsZS5zZWxlY3RlZCAmJiAhaW5Cb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aWxlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGlsZS50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aWxlLnNlbGVjdGVkICYmIGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5sZWZ0QnV0dG9uLmlzRG93bikge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZSA+PSBkZWZlbmRlcl9wcmljZSAmJiAhKFt0aWxlLmlzb0JvdW5kcy54LCB0aWxlLmlzb0JvdW5kcy55XSBpbiBtYXApICYmIHRpbGUua2V5ID09ICdncmFzc19hY3RpdmUnKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gZGVmZW5kZXJfcHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBEZWZlbmRlcih0aWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBnYW1lLmlzby5zaW1wbGVTb3J0KHVuaXRHcm91cCk7XG5cbiAgICAgICAgaWYgKGhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICBlbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2tpbGxJc0FjdGl2ZSgncm9vZmVycycpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbmVtaWVzW2ldLnVuZnJlZXplKCk7XG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoZ2FtZS53aWR0aCAtIDI3NSwgNSwgJ2hlYXJ0Jyk7XG4gICAgICAgIGdhbWUuYWRkLmltYWdlKGdhbWUud2lkdGggLSAyNzcsIDU1LCBcIm1vbmV5XCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoaGVhbHRoLCBnYW1lLndpZHRoIC0gMTYwLCAyNSwgXCIjZmZmXCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoc2NvcmUsIGdhbWUud2lkdGggLSAyMzAsIDc0LCBcIiNhN2FlYmVcIik7XG5cbiAgICAgICAgZ2FtZS5kZWJ1Zy50ZXh0KFwi0KHRg9C/0LXRgNGB0L/QvtGB0L7QsdC90L7RgdGC0Lg6XCIsIDIsIDI1LCBcIiNhN2FlYmVcIik7XG4gICAgICAgIGdhbWUuZGVidWcudGV4dChcItCg0YPRhNC10YDRiyAoRnJlZXplKVwiLCAyLCA3MiwgXCIjYTdhZWJlXCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoXCLQntCx0L3QuNC80LDRiNC60LggKCsyMCBocClcIiwgMiwgMTA4LCBcIiNhN2FlYmVcIik7XG4gICAgICAgIGdhbWUuZGVidWcudGV4dChcItCg0L7QudC30LzQsNC9XCIsIDIsIDE0MiwgXCIjYTdhZWJlXCIpO1xuXG4gICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udmlzaWJsZSA9IHNraWxsSXNBdmFpbGFibGUoc2tpbGwpO1xuXG4gICAgICAgICAgaWYgKHNraWxsSXNBY3RpdmUoc2tpbGwpICYmIHNraWxsc1tza2lsbF0ubGFzdF91c2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ3Jvb2ZlcnMnKSB7XG4gICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3NiwgNzYsIDAsICd0b3dlci1mbGFnJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlID0gdGlsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdvYm5pbWFzaGtpJykge1xuICAgICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTEwLCAxMTAsIDAsICdmcmllbmRzJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUgPSB0aWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHggPSBza2lsbHNbc2tpbGxdLnRpbWVyX2Nvb3Jkc1swXTtcbiAgICAgICAgICAgIHZhciB5ID0gc2tpbGxzW3NraWxsXS50aW1lcl9jb29yZHNbMV07XG5cbiAgICAgICAgICAgIGdhbWUuZGVidWcudGV4dChNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gc2tpbGxzW3NraWxsXS5sYXN0X3VzZWQpIC8gMTAwMCkgKyBcIiAvIDMwXCIsIHgsIHksIFwiI2E3YWViZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNraWxsID09PSAncm9vZmVycycgJiYgc2tpbGxzW3NraWxsXS5zcHJpdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdvYm5pbWFzaGtpJyAmJiBza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBzcGF3blRpbGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hcEg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXBXOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSB0aWxlIHVzaW5nIHRoZSBuZXcgZ2FtZS5hZGQuaXNvU3ByaXRlIGZhY3RvcnkgbWV0aG9kIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgLy8gVGhlIGxhc3QgcGFyYW1ldGVyIGlzIHRoZSBncm91cCB5b3Ugd2FudCB0byBhZGQgaXQgdG8gKGp1c3QgbGlrZSBnYW1lLmFkZC5zcHJpdGUpXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0aWxlc1soaSsxKSptYXBXLShqKzEpXTtcbiAgICAgICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKGkgKiAxOSwgaiAqIDE5LCAwLCB0aWxlVHlwZXNbdHlwZV0sIDAsIGlzb0dyb3VwKTtcbiAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgdG93ZXIgPSB0aWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICB3YXRlci5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3OCwgNDUwLCAwLCAncGlja3VwLWJ1cm5pbmcnLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxNDAsIDMwLCAwLCAnZGV2eWF0a2EnLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzNDUsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxOTAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgyNjAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgyODAsIDAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzAwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzEwLCA0MDAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzkwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNDAwLCA0NSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg1MjAsIDI5MCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTMwLCAzMjAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgfVxufTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBCYXNpY0dhbWUuQm9vdCk7XG5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XG5cbi8qIFVuaXRzICovXG5mdW5jdGlvbiBFbmVteSh4LCB5KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5zcGVlZCA9IDYwO1xuICAgIHRoaXMuZGFtYWdlID0gMTA7XG4gICAgdGhpcy5yZXdhcmQgPSAxMDA7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHZhciBwYXRoID0gbWFwUm9hZC5zbGljZSgpO1xuICAgIHZhciB0YXJnZXQgPSBwYXRoWzBdIHx8IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICB9O1xuICAgIHZhciBtb3ZlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIXNlbGYuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIHZhciB2ZWMgPSB7XG4gICAgICAgICAgICB4OiB0YXJnZXQueCAtIHNlbGYuc3ByaXRlLngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueSAtIHNlbGYuc3ByaXRlLnksXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IGRpc3RhbmNlKHRhcmdldCwgc2VsZi5zcHJpdGUpXG4gICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgaWYobGVuID4gc2VsZi5zcGVlZCpkZWx0YVRpbWUpe1xuICAgICAgICAgICAgc2VsZi5zcHJpdGUueCArPSB2ZWMueCAqIHNlbGYuc3BlZWQgLyBsZW4qZGVsdGFUaW1lO1xuICAgICAgICAgICAgc2VsZi5zcHJpdGUueSArPSB2ZWMueSAqIHNlbGYuc3BlZWQgLyBsZW4qZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYodmVjLnggPiAwKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS5zY2FsZS54ID0gTWF0aC5hYnMoc2VsZi5zcHJpdGUuc2NhbGUueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2ZWMueCA8IDApe1xuICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnNjYWxlLnggPSAtTWF0aC5hYnMoc2VsZi5zcHJpdGUuc2NhbGUueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvcz17eDowLHk6MH07XG4gICAgICAgIGdhbWUuaXNvLnVucHJvamVjdChzZWxmLnNwcml0ZSwgcG9zKTtcbiAgICAgICAgc2VsZi5zcHJpdGUuaXNvWCA9IHBvcy54O1xuICAgICAgICBzZWxmLnNwcml0ZS5pc29ZID0gcG9zLnk7XG4gICAgICAgIC8vIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAndGhpZWYnLCAyOCwgdW5pdEdyb3VwKTtcbiAgICAgICAgfTtcbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgaWR4ID0gZW5lbWllcy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGVuZW1pZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zcHJpdGUuZGVzdHJveSgpO1xuICAgIH07XG4gICAgdmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBsZW4gPSBkaXN0YW5jZSh0YXJnZXQsIHNlbGYuc3ByaXRlKVxuICAgICAgICB2YXIgZGVsdGFUaW1lID0gZ2FtZS50aW1lLmVsYXBzZWQvMTAwMDsgXG4gICAgICAgIGlmKGxlbiA8PSBzZWxmLnNwZWVkKmRlbHRhVGltZSl7XG4gICAgICAgICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICB0YXJnZXQgPSBwYXRoWzBdIHx8IHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBpZihwYXRoLmxlbmd0aD09MCl7XG4gICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGh1cnQoc2VsZi5kYW1hZ2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZnJlZXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0YXJnZXQueCA9PT0gNDc1ICYmIHRhcmdldC55ID09PSA1OTApIHJldHVybjtcbiAgICAgICAgc2VsZi5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnVuZnJlZXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVUbyA9IGZ1bmN0aW9uKHgsIHkpe1xuICAgICAgICB0YXJnZXQueCA9IHg7XG4gICAgICAgIHRhcmdldC55ID0geTtcbiAgICB9O1xuICAgIHRoaXMuaHVydCA9IGZ1bmN0aW9uKHBvaW50cykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5oZWFsdGggLSBwb2ludHM7XG4gICAgICAgIHNlbGYuaGVhbHRoID0gKHJlc3VsdCA+PSAwKSA/IHJlc3VsdCA6IDA7XG4gICAgICAgIGlmKHNlbGYuaGVhbHRoPD0wKXtcbiAgICAgICAgICAgIHNlbGYuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIHNjb3JlICs9IHNlbGYucmV3YXJkO1xuICAgICAgICAgICAgdGFyZ2V0ID0ge3g6NDc1LCB5OjU5MH07XG4gICAgICAgICAgICBwYXRoID0gW3RhcmdldF07XG4gICAgICAgICAgICBzZWxmLnVuZnJlZXplKCk7XG4gICAgICAgICAgICAvLyBkZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2VsZi5zcHJpdGUudGludCA9PSAweGZmZmZmZil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmLnNwcml0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LDEwMCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmLnNwcml0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zcHJpdGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHNlbGYuYWN0aXZlKXtcbiAgICAgICAgICAgICFzZWxmLmFuaW0uaXNQbGF5aW5nICYmIHNlbGYuYW5pbS5wbGF5KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VsZi5hbmltLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRUYXJnZXQoKTtcbiAgICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBlbmVtaWVzLnB1c2godGhpcyk7XG59XG5cbmZ1bmN0aW9uIFRoaWVmKHgsIHkpe1xuICAgIHZhciBwb3MgPSB7eDogMCwgeTogMH07XG4gICAgZ2FtZS5pc28udW5wcm9qZWN0KHt4OngseTp5fSwgcG9zKTtcbiAgICB0aGlzLnNwcml0ZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICd0aGllZicsIDI4LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gMjQ7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gMzY7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDAuOSk7XG4gICAgdGhpcy5hbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnKTtcbiAgICB0aGlzLmFuaW0ucGxheSgxMCwgdHJ1ZSk7XG4gICAgRW5lbXkuY2FsbCh0aGlzLCB4LCB5KTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDIwO1xuICAgIHRoaXMucmV3YXJkID0gNTAwO1xufVxuXG5mdW5jdGlvbiBQb2xpY2UoeCwgeSl7XG4gICAgdmFyIHBvcyA9IHt4OiAwLCB5OiAwfTtcbiAgICBnYW1lLmlzby51bnByb2plY3Qoe3g6eCx5Onl9LCBwb3MpO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3BvbGljZScsIDUsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUud2lkdGggPSAyNDtcbiAgICB0aGlzLnNwcml0ZS5oZWlnaHQgPSAzNjtcbiAgICB0aGlzLnNwcml0ZS5hbmNob3Iuc2V0KDAuNSwgMC45KTtcbiAgICB0aGlzLmFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgnd2FsaycpO1xuICAgIHRoaXMuYW5pbS5wbGF5KDEwLCB0cnVlKTtcbiAgICBFbmVteS5jYWxsKHRoaXMsIHgsIHkpO1xuICAgIHRoaXMuaGVhbHRoID0gMjAwO1xuICAgIHRoaXMuZGFtYWdlID0gNDA7XG4gICAgdGhpcy5yZXdhcmQgPSAyMDAwO1xufVxuXG5mdW5jdGlvbiBEZWZlbmRlcih0aWxlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgbWFwW1t0aWxlLmlzb0JvdW5kcy54LCB0aWxlLmlzb0JvdW5kcy55XV0gPSAnYWN0aXZpc3QnO1xuICAgIHRoaXMuZGFtYWdlID0gNTtcbiAgICB0aGlzLnJhZGl1cyA9IDcwO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHRpbGUuaXNvQm91bmRzLnggKyAxMCwgdGlsZS5pc29Cb3VuZHMueSArIDEwLCAwLCAnYWN0aXZpc3QnLCA4LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAxKTtcblxuICAgIHZhciBhbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3Bvc3QnKTtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGlkeCA9IGRlZmVuZGVycy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGRlZmVuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgICB2YXIgYXR0YWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGFyZ2V0KXtcbiAgICAgICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgICAgIHRhcmdldC5odXJ0KHNlbGYuZGFtYWdlKmRlbHRhVGltZSk7XG4gICAgICAgICAgICBpZighYW5pbS5pc1BsYXlpbmcpe1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheSgzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGlzdCA9IGRpc3RhbmNlKGVuZW1pZXNbaV0uc3ByaXRlLCBzZWxmLnNwcml0ZSk7XG4gICAgICAgICAgICBpZihkaXN0IDwgc2VsZi5yYWRpdXMpe1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQgfHwgZGlzdGFuY2UodGFyZ2V0LnNwcml0ZSwgc2VsZi5zcHJpdGUpIDwgZGlzdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuZW1pZXNbaV0uaGVhbHRoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbmVtaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0YXJnZXQpe1xuICAgICAgICAgICAgYW5pbS5zdG9wKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNwcml0ZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2V0VGFyZ2V0KCk7XG4gICAgICAgIGF0dGFjaygpO1xuICAgIH1cbiAgICBkZWZlbmRlcnMucHVzaCh0aGlzKTtcbn1cblxuXG4vKiBIZWFsdGggKi9cbmZ1bmN0aW9uIGh1cnQocG9pbnRzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGhlYWx0aCAtIHBvaW50cztcbiAgICBoZWFsdGggPSAocmVzdWx0ID49IDApID8gcmVzdWx0IDogMDtcbiAgICBoZWFsdGhCYXIuc2V0UGVyY2VudChoZWFsdGgpO1xuICAgIHZhciBzZWxmID0gdG93ZXI7XG4gICAgaWYocG9pbnRzID4gMCAmJiBzZWxmICYmIHNlbGYudGludCA9PSAweGZmZmZmZil7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKHNlbGYgJiYgc2VsZil7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMTAwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmKXtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwzMDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGVhbChwb2ludHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gaGVhbHRoICsgcG9pbnRzO1xuICAgIGhlYWx0aCA9IChyZXN1bHQgPCAxMDApID8gcmVzdWx0IDogMTAwO1xuICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG59XG5cbmZ1bmN0aW9uIHNwYXduRW5lbXkoZ2FtZUNsYXNzKXtcbiAgICBuZXcgZ2FtZUNsYXNzKG1hcFJvYWRbMF0ueCxtYXBSb2FkWzBdLnkpO1xufVxuZnVuY3Rpb24gc3RhcnRHYW1lKCl7XG4gICAgY29uc29sZS5sb2coXCJzdGFydFwiKTtcbiAgICBuZXcgV2F2ZShbVGhpZWYsIDUsIFBvbGljZSwgMl0sIFsxMDAwLCAyMDAwXSwgMjAwMCk7XG4gICAgbmV3IFdhdmUoW1RoaWVmLCAxMCwgUG9saWNlLCA4XSwgWzEwMDAsIDIwMDBdLCAyMDAwMCk7XG4gICAgbmV3IFdhdmUoW1RoaWVmLCA0MCwgUG9saWNlLCAyMF0sIFsxMDAwLCAyMDAwXSwgNDAwMDApO1xuICAgIG5ldyBXYXZlKFtUaGllZiwgNjUsIFBvbGljZSwgMzVdLCBbMTAwMCwgMjAwMF0sIDYwMDAwKTtcbiAgICB0aW1lci5zdGFydCgpO1xufVxuXG5cbmZ1bmN0aW9uIGRpc3RhbmNlKHZlYzEsIHZlYzIpIHtcbiAgICB2YXIgdmVjID0ge1xuICAgICAgICB4OiB2ZWMxLnggLSB2ZWMyLngsXG4gICAgICAgIHk6IHZlYzEueSAtIHZlYzIueSxcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguc3FydCh2ZWMueCp2ZWMueCArIHZlYy55KnZlYy55KTtcbn1cblxud2luZG93LldhdmU9V2F2ZTtcbndpbmRvdy5UaGllZj1UaGllZjtcbndpbmRvdy5Qb2xpY2U9UG9saWNlO1xuXG5mdW5jdGlvbiBXYXZlKGVuZW1pZXMsIHJhdGUsIHBhdXNlKSB7XG4gICAgdmFyIHBhY2sgPSBbXTtcbiAgICB2YXIgZW5lbXk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aC8yOyBpKyspIHtcbiAgICAgICAgcGFjay5wdXNoKHtcbiAgICAgICAgICAgIFwiY2xhc3NcIjogZW5lbWllc1syKmldLFxuICAgICAgICAgICAgXCJjb3VudFwiOiBlbmVtaWVzWzIqaSsxXSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGF3bigpIHtcbiAgICAgICAgcGFjayA9IHBhY2suZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBhLmNvdW50PjB9KTtcbiAgICAgICAgaWYocGFjay5sZW5ndGgpe1xuICAgICAgICAgICAgZW5lbXkgPSBwYWNrW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpwYWNrLmxlbmd0aCldO1xuICAgICAgICAgICAgZW5lbXkuY291bnQtPTE7XG4gICAgICAgICAgICBzcGF3bkVuZW15KGVuZW15LmNsYXNzKTtcbiAgICAgICAgICAgIHRpbWVyLmFkZChyYXRlWzBdICsgKHJhdGVbMV0tcmF0ZVswXSkqTWF0aC5yYW5kb20oKSwgc3Bhd24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRpbWVyLmFkZChwYXVzZSwgc3Bhd24pO1xufSJdfQ==
