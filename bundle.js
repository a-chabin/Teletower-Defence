(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var game = new Phaser.Game(1024, 650, Phaser.AUTO, 'test', null, true, false);
var health = 100,
    score = 2000,
    map = {};

var BasicGame = function (game) {};
BasicGame.Boot = function (game) {};

var isGameStart = false;
var statictics;
var timeText;

var isoGroup, unitGroup, cursorPos, cursor, healthBar;
var tiles  = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 
    0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 
    0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 
    0, 0, 0, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
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
    'timer_coords': [300, 65],
    'sprite': null
  },
  'obnimashki': {
    'price': 5000,
    'last_used': null,
    'button': null,
    'timer_coords': [300, 110],
    'sprite': null
  },
  'roizman': {
    'price': 10000,
    'last_used': null,
    'button': null,
    'timer_coords': [300, 155]
  }
};
var defender_price = 1000
var enemies = [];
var defenders = [];

var guiText = {
    style: { font: "16px IBM Plex Mono", fontWeight: "500", fill:"#000"},
    boldStyle: { font: "16px IBM Plex Mono", fontWeight: "700", fill:"#000"},
    largeStyle: { font: "80px IBM Plex Mono", fontWeight: "700", fill:"#000"},
    whiteStyle: { font: "16px IBM Plex Mono", fontWeight: "500", fill:"#fff"},
}

function skillIsAvailable(name) {
  if (name === 'obnimashki' && health >= 99) {
      return false;
  }

  return !skillIsActive(name) && score >= skills[name].price;
}

function skillIsActive(name) {
  if (skills[name].last_used != null) {
    return (statictics.getTime()*1000 - skills[name].last_used) < 30 * 1000;
  }
  return false;
}

function buy(skill) {
  var skill_data = skills[skill];
  var price = skill_data.price;

  if (score < price) return;
  score -= price;
  skill_data.last_used = statictics.getTime()*1000;
}

function buyRoofers() {
  buy('roofers');

  var enm = enemies.slice();
  for (var i = 0; i < enm.length; i++) {
    enm[i].freeze();
  }
}

function buyObnimashki() {
  if (health >= 99) return;

  buy('obnimashki');

  heal(30, 2);
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

var healthbarEnemyConfig = {
    width: 30,
    height: 3,
    bg: {
      color: '#8e2020'
    },
    bar: {
      color: '#fe0000'
    },
    animationDuration: 100,
    flipped: false
};
BasicGame.Boot.prototype =
{
    preload: function () {
        // Да-да, это цены
        game.load.image('buy-1000', './img/buy/buy-1000.png');
        game.load.image('buy-2000', './img/buy/buy-2000.png');
        game.load.image('buy-3000', './img/buy/buy-3000.png');
        game.load.image('buy-5000', './img/buy/buy-5000.png');
        game.load.image('buy-10000', './img/buy/buy-10000.png');
        // Да-да, дизэйбл
        game.load.image('buy-disabled-1000', './img/buy/buy-disabled-1000.png');
        game.load.image('buy-disabled-2000', './img/buy/buy-disabled-2000.png');
        game.load.image('buy-disabled-3000', './img/buy/buy-disabled-3000.png');
        game.load.image('buy-disabled-5000', './img/buy/buy-disabled-5000.png');
        game.load.image('buy-disabled-10000', './img/buy/buy-disabled-10000.png');
        game.load.image('tree1', './img/tree1.png');
        game.load.image('tree2', './img/tree2.png');
        game.load.image('road', './img/road.png');
        game.load.image('grass', './img/grass.png');
        game.load.image('grass_active', './img/grass_active.png');
        game.load.image('water', './img/water.png');
        game.load.image('tower', './img/tower.png');
        game.load.image('tower-flag', './img/tower-flag.png');
        game.load.image('pickup-burning', './img/pickup-burning.png');
        game.load.image('devyatka', './img/devyatka.png');
        game.load.image('money', './img/money.png');
        game.load.image('heart', './img/heart.png');
        game.load.image('friends', './img/friends.png');

        game.load.spritesheet('activist', './img/activist.png', 32, 64, 8);
        game.load.spritesheet('thief', './img/thief.png', 128, 184, 28);
        game.load.spritesheet('police', './img/police.png', 128, 218, 5);

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

        var healthbarConfig = {
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
        healthBar = new HealthBar(game, healthbarConfig);
        healthBar.setPercent(health);

        game.add.image(210, 60, "buy-disabled-3000");
        game.add.image(210, 105, "buy-disabled-5000");
        game.add.image(210, 150, "buy-disabled-10000");
        game.add.image(game.width - 275, 5, 'heart');
        game.add.image(game.width - 277, 55, "money");
        skills['roofers']['button'] = game.add.button(210, 60, 'buy-3000', buyRoofers, this, 2, 1, 0);
        skills['obnimashki']['button'] = game.add.button(210, 105, 'buy-5000', buyObnimashki, this, 2, 1, 0);
        skills['roizman']['button'] = game.add.button(210, 150, 'buy-10000', buyRoizman, this, 2, 1, 0);

        document.addEventListener("startGame", startGame);

        game.add.text(2, 20, "Суперспособности", guiText.boldStyle);
        game.add.text(2, 65, "Руферы (Freeze)", guiText.style);
        game.add.text(2, 110, "Обнимашки (+30 hp)", guiText.style);
        game.add.text(2, 155, "Ройзман", guiText.style);

        timeText = game.add.text(2, 650 - 150, "", guiText.largeStyle);
        game.add.text(2, 650 - 30, "Башня продержалась", guiText.style);
        
        guiText.health = game.add.text(game.width - 160, 10, health, guiText.whiteStyle);
        guiText.score = game.add.text(game.width - 230, 60, score, guiText.style);

        guiText.skills = {}
        for (skill in skills) {
            guiText.skills[skill] = game.add.text(skills[skill].timer_coords[0], skills[skill].timer_coords[1], "", guiText.style);
        }
        
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

            if (tile.selected && game.input.activePointer.isDown) {
                if (score >= defender_price && !([tile.isoBounds.x, tile.isoBounds.y] in map) && tile.key == 'grass_active'){
                    score -= defender_price;
                    new Defender(tile);
                }
            }
        });
        game.iso.simpleSort(unitGroup);

        if (health <= 0) {
            end();
        }else{
            if (isGameStart) {
                statictics.update();
            }
        }
        
        if (!skillIsActive('roofers')) {
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].unfreeze();
            }    
        }
    },
    render: function () {
        guiText.health.text = health;
        guiText.score.text = score;

        if (isGameStart) {
            timeText.setText(statictics.getTime());
        }
        
        for (skill in skills) {
          skills[skill].button.visible = skillIsAvailable(skill);
          if(skills[skill].button.input.pointerOver()){
            skills[skill].button.tint = 0xbbffbb;
          }else{
            skills[skill].button.tint = 0xffffff;
          }
          guiText.skills[skill].text = "";
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
                    tile = game.add.isoSprite(105, 110, 0, 'friends', 0, isoGroup);
                    tile.anchor.set(0.5, 1);
                    skills[skill].sprite = tile;
                }
            }
            guiText.skills[skill].text = 30-Math.floor((statictics.getTime()*1000 - skills[skill].last_used) / 1000) + "с";
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
    var maxHealth = 0;
    this.healthbar = new HealthBar(game, healthbarEnemyConfig);
    this.healthbar.setPercent(100);
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
        self.healthbar.setPosition(self.sprite.x, self.sprite.y-40)
        // tile = game.add.isoSprite(pos.x, pos.y, 0, 'thief', 28, unitGroup);
        };
    this.destroy = function(){
        var idx = enemies.indexOf(self);
        if(idx!=-1){
            enemies.splice(idx, 1);
        }
        self.sprite.destroy();
        self.healthbar.kill();
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
        maxHealth = Math.max(maxHealth, self.health);
        var result = self.health - points;
        self.health = (result >= 0) ? result : 0;
        self.healthbar.setPercent(self.health/maxHealth*100);
        if(self.health<=0){
            self.damage = 0;
            score += self.reward;
            statictics.money += self.reward;
            target = {x:475, y:590};
            path = [target];
            self.unfreeze();
            // destroy();
            self.healthbar.bgSprite.visible = false;
            self.healthbar.barSprite.visible = false;
            statictics.kills++;
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
    this.damage = 40;
    this.reward = 100;
    this.speed = 60;
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
    this.damage = 20;
    this.reward = 200;
    this.speed = 90;
}

function Boss(x, y){
    var pos = {x: 0, y: 0};
    game.iso.unproject({x:x,y:y}, pos);
    this.sprite = game.add.isoSprite(pos.x, pos.y, 0, 'police', 5, unitGroup);
    this.sprite.width = 24;
    this.sprite.height = 36;
    this.sprite.anchor.set(0.5, 0.9);
    this.anim = this.sprite.animations.add('walk');
    this.anim.play(10, true);
    Enemy.call(this, x, y);
    this.health = 2000;
    this.damage = 40;
    this.reward = 2000;
    this.speed = 20;
}

function Defender(tile){
    var self = this;
    map[[tile.isoBounds.x, tile.isoBounds.y]] = 'activist';
    this.damage = 45;
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

function heal(points, speed) {
    if(points > 0){
        var result = health + speed;
        health = (result < 100) ? result : 100;
        healthBar.setPercent(health);
        timer.add(1000, heal.bind(this, points-speed, speed));
    }
}

function spawnEnemy(gameClass){
    return new gameClass(mapRoad[0].x,mapRoad[0].y);
}


function distance(vec1, vec2) {
    var iso1={x:0,y:0};
    var iso2={x:0,y:0};
    game.iso.unproject(vec1, iso1);
    game.iso.unproject(vec2, iso2);
    var vec = {
        x: iso1.x - iso2.x,
        y: iso1.y - iso2.y,
    }
    return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
}

window.Wave=Wave;
window.Thief=Thief;
window.Police=Police;

function Wave(enemies, rate, pause) {
    var self = this;
    var pack = [];
    var current;
    this.factor = 1;
    this.finish = new Phaser.Signal();

    function spawn() {
        pack = pack.filter(function(a){return a.count>0});
        if(pack.length){
            current = pack[Math.floor(Math.random()*pack.length)];
            current.count-=1;
            var enemy = spawnEnemy(current.class);
            enemy.health = enemy.health * self.factor;
            timer.add((rate[0] + (rate[1]-rate[0])*Math.random()), spawn);
        }else{
            self.finish.dispatch();
        }
    }
    this.start = function(){
        pack = [];
        for (var i = 0; i < enemies.length/2; i++) {
            pack.push({
                "class": enemies[2*i],
                "count": enemies[2*i+1] * self.factor,
            })
        }
        timer.add(pause / Math.sqrt(self.factor), spawn);
    }
}

function Chain(waves, repeats, pause, count_factor) {
    var self = this;
    var queue = waves.slice();
    var current;
    this.factor = 1;
    function startWave() {
        if(queue.length > 0){
            current = queue[0];
            queue.shift();
            current.finish.add(startWave);
            current.factor = self.factor;
            current.start();

        }else{
            if(repeats != 0){
                self.factor = self.factor * count_factor;
                timer.add(pause, startWave);
                repeats--;
                queue = waves.slice();
            }
        }
    }
    timer.add(0, startWave);
}

function Statictics(){
    var time = 0;
    this.getTime = function(){
        return Math.floor(time / 1000);
    }
    this.update = function(){
        time += game.time.elapsed;
    }
    this.money = 0;
    this.kills = 0;
}

function startGame(){
    isGameStart = true;
    statictics = new Statictics();

    var waves = [
        new Wave([Thief, 2], [1000, 2000], 1000),
        new Wave([Thief, 4], [1000, 2000], 8000),
        new Wave([Police, 4], [1000, 2000], 8000),
        new Wave([Thief, 8, Police, 4], [1000, 2000], 8000),
        new Wave([Boss, 1], [2000, 4000], 8000),
        new Wave([], [], 16000),
    ];
    window.chain = new Chain(waves, -1, 10000, 2);

    timer.start();
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTAyNCwgNjUwLCBQaGFzZXIuQVVUTywgJ3Rlc3QnLCBudWxsLCB0cnVlLCBmYWxzZSk7XG52YXIgaGVhbHRoID0gMTAwLFxuICAgIHNjb3JlID0gMjAwMCxcbiAgICBtYXAgPSB7fTtcblxudmFyIEJhc2ljR2FtZSA9IGZ1bmN0aW9uIChnYW1lKSB7fTtcbkJhc2ljR2FtZS5Cb290ID0gZnVuY3Rpb24gKGdhbWUpIHt9O1xuXG52YXIgaXNHYW1lU3RhcnQgPSBmYWxzZTtcbnZhciBzdGF0aWN0aWNzO1xudmFyIHRpbWVUZXh0O1xuXG52YXIgaXNvR3JvdXAsIHVuaXRHcm91cCwgY3Vyc29yUG9zLCBjdXJzb3IsIGhlYWx0aEJhcjtcbnZhciB0aWxlcyAgPSBbXG4gICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMywgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgNCwgNCwgNCwgNCwgNCwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCxcbiAgICA0LCA0LCA0LCA0LCA0LCAxLCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LFxuICAgIDQsIDQsIDQsIDQsIDQsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsXG4gICAgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gIF1cbnZhciB0aWxlVHlwZXMgPSB7XG4gICAgMDogJ2dyYXNzJyxcbiAgICAxOiAncm9hZCcsXG4gICAgMjogJ2dyYXNzX2FjdGl2ZScsXG4gICAgMzogJ3Rvd2VyJyxcbiAgICA0OiAnd2F0ZXInXG59XG52YXIgbWFwVyA9IDI1O1xudmFyIG1hcEggPSB0aWxlcy5sZW5ndGggLyBtYXBXO1xuLy8gd2luZG93Lm1hcEVkaXRvciA9IFtdO1xudmFyIG1hcFJvYWQgPSBbe3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fV07XG5cbnZhciBza2lsbHMgPSB7XG4gICdyb29mZXJzJzoge1xuICAgICdwcmljZSc6IDMwMDAsXG4gICAgJ2xhc3RfdXNlZCc6IG51bGwsXG4gICAgJ2J1dHRvbic6IG51bGwsXG4gICAgJ3RpbWVyX2Nvb3Jkcyc6IFszMDAsIDY1XSxcbiAgICAnc3ByaXRlJzogbnVsbFxuICB9LFxuICAnb2JuaW1hc2hraSc6IHtcbiAgICAncHJpY2UnOiA1MDAwLFxuICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICdidXR0b24nOiBudWxsLFxuICAgICd0aW1lcl9jb29yZHMnOiBbMzAwLCAxMTBdLFxuICAgICdzcHJpdGUnOiBudWxsXG4gIH0sXG4gICdyb2l6bWFuJzoge1xuICAgICdwcmljZSc6IDEwMDAwLFxuICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICdidXR0b24nOiBudWxsLFxuICAgICd0aW1lcl9jb29yZHMnOiBbMzAwLCAxNTVdXG4gIH1cbn07XG52YXIgZGVmZW5kZXJfcHJpY2UgPSAxMDAwXG52YXIgZW5lbWllcyA9IFtdO1xudmFyIGRlZmVuZGVycyA9IFtdO1xuXG52YXIgZ3VpVGV4dCA9IHtcbiAgICBzdHlsZTogeyBmb250OiBcIjE2cHggSUJNIFBsZXggTW9ub1wiLCBmb250V2VpZ2h0OiBcIjUwMFwiLCBmaWxsOlwiIzAwMFwifSxcbiAgICBib2xkU3R5bGU6IHsgZm9udDogXCIxNnB4IElCTSBQbGV4IE1vbm9cIiwgZm9udFdlaWdodDogXCI3MDBcIiwgZmlsbDpcIiMwMDBcIn0sXG4gICAgbGFyZ2VTdHlsZTogeyBmb250OiBcIjgwcHggSUJNIFBsZXggTW9ub1wiLCBmb250V2VpZ2h0OiBcIjcwMFwiLCBmaWxsOlwiIzAwMFwifSxcbiAgICB3aGl0ZVN0eWxlOiB7IGZvbnQ6IFwiMTZweCBJQk0gUGxleCBNb25vXCIsIGZvbnRXZWlnaHQ6IFwiNTAwXCIsIGZpbGw6XCIjZmZmXCJ9LFxufVxuXG5mdW5jdGlvbiBza2lsbElzQXZhaWxhYmxlKG5hbWUpIHtcbiAgaWYgKG5hbWUgPT09ICdvYm5pbWFzaGtpJyAmJiBoZWFsdGggPj0gOTkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAhc2tpbGxJc0FjdGl2ZShuYW1lKSAmJiBzY29yZSA+PSBza2lsbHNbbmFtZV0ucHJpY2U7XG59XG5cbmZ1bmN0aW9uIHNraWxsSXNBY3RpdmUobmFtZSkge1xuICBpZiAoc2tpbGxzW25hbWVdLmxhc3RfdXNlZCAhPSBudWxsKSB7XG4gICAgcmV0dXJuIChzdGF0aWN0aWNzLmdldFRpbWUoKSoxMDAwIC0gc2tpbGxzW25hbWVdLmxhc3RfdXNlZCkgPCAzMCAqIDEwMDA7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBidXkoc2tpbGwpIHtcbiAgdmFyIHNraWxsX2RhdGEgPSBza2lsbHNbc2tpbGxdO1xuICB2YXIgcHJpY2UgPSBza2lsbF9kYXRhLnByaWNlO1xuXG4gIGlmIChzY29yZSA8IHByaWNlKSByZXR1cm47XG4gIHNjb3JlIC09IHByaWNlO1xuICBza2lsbF9kYXRhLmxhc3RfdXNlZCA9IHN0YXRpY3RpY3MuZ2V0VGltZSgpKjEwMDA7XG59XG5cbmZ1bmN0aW9uIGJ1eVJvb2ZlcnMoKSB7XG4gIGJ1eSgncm9vZmVycycpO1xuXG4gIHZhciBlbm0gPSBlbmVtaWVzLnNsaWNlKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5tLmxlbmd0aDsgaSsrKSB7XG4gICAgZW5tW2ldLmZyZWV6ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1eU9ibmltYXNoa2koKSB7XG4gIGlmIChoZWFsdGggPj0gOTkpIHJldHVybjtcblxuICBidXkoJ29ibmltYXNoa2knKTtcblxuICBoZWFsKDMwLCAyKTtcbn1cblxuZnVuY3Rpb24gYnV5Um9pem1hbigpIHtcbiAgYnV5KCdyb2l6bWFuJyk7XG5cbiAgZXBpYygpO1xuXG4gIHZhciBlbm0gPSBlbmVtaWVzLnNsaWNlKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5tLmxlbmd0aDsgaSsrKSB7XG4gICAgZW5tW2ldLmRlc3Ryb3koKTtcbiAgfVxufVxuXG52YXIgdGltZXI7XG5cbnZhciB3YXRlciA9IFtdO1xuXG52YXIgdG93ZXI7XG5cbnZhciBoZWFsdGhiYXJFbmVteUNvbmZpZyA9IHtcbiAgICB3aWR0aDogMzAsXG4gICAgaGVpZ2h0OiAzLFxuICAgIGJnOiB7XG4gICAgICBjb2xvcjogJyM4ZTIwMjAnXG4gICAgfSxcbiAgICBiYXI6IHtcbiAgICAgIGNvbG9yOiAnI2ZlMDAwMCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAxMDAsXG4gICAgZmxpcHBlZDogZmFsc2Vcbn07XG5CYXNpY0dhbWUuQm9vdC5wcm90b3R5cGUgPVxue1xuICAgIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8g0JTQsC3QtNCwLCDRjdGC0L4g0YbQtdC90YtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMTAwMCcsICcuL2ltZy9idXkvYnV5LTEwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTIwMDAnLCAnLi9pbWcvYnV5L2J1eS0yMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0zMDAwJywgJy4vaW1nL2J1eS9idXktMzAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktNTAwMCcsICcuL2ltZy9idXkvYnV5LTUwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTEwMDAwJywgJy4vaW1nL2J1eS9idXktMTAwMDAucG5nJyk7XG4gICAgICAgIC8vINCU0LAt0LTQsCwg0LTQuNC30Y3QudCx0LtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtMTAwMCcsICcuL2ltZy9idXkvYnV5LWRpc2FibGVkLTEwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTIwMDAnLCAnLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0yMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0zMDAwJywgJy4vaW1nL2J1eS9idXktZGlzYWJsZWQtMzAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtNTAwMCcsICcuL2ltZy9idXkvYnV5LWRpc2FibGVkLTUwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTEwMDAwJywgJy4vaW1nL2J1eS9idXktZGlzYWJsZWQtMTAwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndHJlZTEnLCAnLi9pbWcvdHJlZTEucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndHJlZTInLCAnLi9pbWcvdHJlZTIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgncm9hZCcsICcuL2ltZy9yb2FkLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2dyYXNzJywgJy4vaW1nL2dyYXNzLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2dyYXNzX2FjdGl2ZScsICcuL2ltZy9ncmFzc19hY3RpdmUucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnd2F0ZXInLCAnLi9pbWcvd2F0ZXIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndG93ZXInLCAnLi9pbWcvdG93ZXIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndG93ZXItZmxhZycsICcuL2ltZy90b3dlci1mbGFnLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BpY2t1cC1idXJuaW5nJywgJy4vaW1nL3BpY2t1cC1idXJuaW5nLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2RldnlhdGthJywgJy4vaW1nL2RldnlhdGthLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vbmV5JywgJy4vaW1nL21vbmV5LnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2hlYXJ0JywgJy4vaW1nL2hlYXJ0LnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2ZyaWVuZHMnLCAnLi9pbWcvZnJpZW5kcy5wbmcnKTtcblxuICAgICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2FjdGl2aXN0JywgJy4vaW1nL2FjdGl2aXN0LnBuZycsIDMyLCA2NCwgOCk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgndGhpZWYnLCAnLi9pbWcvdGhpZWYucG5nJywgMTI4LCAxODQsIDI4KTtcbiAgICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdwb2xpY2UnLCAnLi9pbWcvcG9saWNlLnBuZycsIDEyOCwgMjE4LCA1KTtcblxuICAgICAgICBnYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuICAgICAgICBnYW1lLnBsdWdpbnMuYWRkKG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYyhnYW1lKSk7XG5cbiAgICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QbHVnaW4uSXNvbWV0cmljLklTT0FSQ0FERSk7XG4gICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBzZXQgYSBnYW1lIGNhbnZhcy1iYXNlZCBvZmZzZXQgZm9yIHRoZSAwLCAwLCAwIGlzb21ldHJpYyBjb29yZGluYXRlIC0gYnkgZGVmYXVsdFxuICAgICAgICAvLyB0aGlzIHBvaW50IHdvdWxkIGJlIGF0IHNjcmVlbiBjb29yZGluYXRlcyAwLCAwICh0b3AgbGVmdCkgd2hpY2ggaXMgdXN1YWxseSB1bmRlc2lyYWJsZS5cbiAgICAgICAgZ2FtZS5pc28uYW5jaG9yLnNldFRvKDAuNSwgMC4zKTtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBDcmVhdGUgYSBncm91cCBmb3Igb3VyIHRpbGVzLlxuICAgICAgICBpc29Hcm91cCA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIGlzb0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICBpc29Hcm91cC5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGx1Z2luLklzb21ldHJpYy5JU09BUkNBREU7XG5cbiAgICAgICAgdW5pdEdyb3VwID0gZ2FtZS5hZGQuZ3JvdXAoKTtcblxuICAgICAgICAvLyBMZXQncyBtYWtlIGEgbG9hZCBvZiB0aWxlcyBvbiBhIGdyaWQuXG4gICAgICAgIHRoaXMuc3Bhd25UaWxlcygpO1xuXG4gICAgICAgIC8vIFByb3ZpZGUgYSAzRCBwb3NpdGlvbiBmb3IgdGhlIGN1cnNvclxuICAgICAgICBjdXJzb3JQb3MgPSBuZXcgUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuUG9pbnQzKCk7XG5cbiAgICAgICAgdmFyIHJlY3RhbmdsZSA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKGdhbWUud2lkdGggLSAyMzAsIDEwLCAxNzAsIDIwKTtcbiAgICAgICAgdmFyIGJtZCA9IGdhbWUuYWRkLmJpdG1hcERhdGEoZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpO1xuICAgICAgICBibWQucmVjdChyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIHJlY3RhbmdsZS53aWR0aCwgcmVjdGFuZ2xlLmhlaWdodCwgJyMyZDJkMmQnKTtcbiAgICAgICAgYm1kLmFkZFRvV29ybGQoKTtcblxuICAgICAgICB2YXIgaGVhbHRoYmFyQ29uZmlnID0ge1xuICAgICAgICAgICAgd2lkdGg6IDE2NixcbiAgICAgICAgICAgIGhlaWdodDogMTYsXG4gICAgICAgICAgICB4OiBnYW1lLndpZHRoIC0gMTQ1LFxuICAgICAgICAgICAgeTogMjAsXG4gICAgICAgICAgICBiZzoge1xuICAgICAgICAgICAgICBjb2xvcjogJyM4ZTIwMjAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFyOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnI2ZlMDAwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogNjAwLFxuICAgICAgICAgICAgZmxpcHBlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgZ2FtZS5pbnB1dC5tb3VzZS5jYXB0dXJlID0gdHJ1ZTtcbiAgICAgICAgaGVhbHRoQmFyID0gbmV3IEhlYWx0aEJhcihnYW1lLCBoZWFsdGhiYXJDb25maWcpO1xuICAgICAgICBoZWFsdGhCYXIuc2V0UGVyY2VudChoZWFsdGgpO1xuXG4gICAgICAgIGdhbWUuYWRkLmltYWdlKDIxMCwgNjAsIFwiYnV5LWRpc2FibGVkLTMwMDBcIik7XG4gICAgICAgIGdhbWUuYWRkLmltYWdlKDIxMCwgMTA1LCBcImJ1eS1kaXNhYmxlZC01MDAwXCIpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZSgyMTAsIDE1MCwgXCJidXktZGlzYWJsZWQtMTAwMDBcIik7XG4gICAgICAgIGdhbWUuYWRkLmltYWdlKGdhbWUud2lkdGggLSAyNzUsIDUsICdoZWFydCcpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZShnYW1lLndpZHRoIC0gMjc3LCA1NSwgXCJtb25leVwiKTtcbiAgICAgICAgc2tpbGxzWydyb29mZXJzJ11bJ2J1dHRvbiddID0gZ2FtZS5hZGQuYnV0dG9uKDIxMCwgNjAsICdidXktMzAwMCcsIGJ1eVJvb2ZlcnMsIHRoaXMsIDIsIDEsIDApO1xuICAgICAgICBza2lsbHNbJ29ibmltYXNoa2knXVsnYnV0dG9uJ10gPSBnYW1lLmFkZC5idXR0b24oMjEwLCAxMDUsICdidXktNTAwMCcsIGJ1eU9ibmltYXNoa2ksIHRoaXMsIDIsIDEsIDApO1xuICAgICAgICBza2lsbHNbJ3JvaXptYW4nXVsnYnV0dG9uJ10gPSBnYW1lLmFkZC5idXR0b24oMjEwLCAxNTAsICdidXktMTAwMDAnLCBidXlSb2l6bWFuLCB0aGlzLCAyLCAxLCAwKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic3RhcnRHYW1lXCIsIHN0YXJ0R2FtZSk7XG5cbiAgICAgICAgZ2FtZS5hZGQudGV4dCgyLCAyMCwgXCLQodGD0L/QtdGA0YHQv9C+0YHQvtCx0L3QvtGB0YLQuFwiLCBndWlUZXh0LmJvbGRTdHlsZSk7XG4gICAgICAgIGdhbWUuYWRkLnRleHQoMiwgNjUsIFwi0KDRg9GE0LXRgNGLIChGcmVlemUpXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDExMCwgXCLQntCx0L3QuNC80LDRiNC60LggKCszMCBocClcIiwgZ3VpVGV4dC5zdHlsZSk7XG4gICAgICAgIGdhbWUuYWRkLnRleHQoMiwgMTU1LCBcItCg0L7QudC30LzQsNC9XCIsIGd1aVRleHQuc3R5bGUpO1xuXG4gICAgICAgIHRpbWVUZXh0ID0gZ2FtZS5hZGQudGV4dCgyLCA2NTAgLSAxNTAsIFwiXCIsIGd1aVRleHQubGFyZ2VTdHlsZSk7XG4gICAgICAgIGdhbWUuYWRkLnRleHQoMiwgNjUwIC0gMzAsIFwi0JHQsNGI0L3RjyDQv9GA0L7QtNC10YDQttCw0LvQsNGB0YxcIiwgZ3VpVGV4dC5zdHlsZSk7XG4gICAgICAgIFxuICAgICAgICBndWlUZXh0LmhlYWx0aCA9IGdhbWUuYWRkLnRleHQoZ2FtZS53aWR0aCAtIDE2MCwgMTAsIGhlYWx0aCwgZ3VpVGV4dC53aGl0ZVN0eWxlKTtcbiAgICAgICAgZ3VpVGV4dC5zY29yZSA9IGdhbWUuYWRkLnRleHQoZ2FtZS53aWR0aCAtIDIzMCwgNjAsIHNjb3JlLCBndWlUZXh0LnN0eWxlKTtcblxuICAgICAgICBndWlUZXh0LnNraWxscyA9IHt9XG4gICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgICBndWlUZXh0LnNraWxsc1tza2lsbF0gPSBnYW1lLmFkZC50ZXh0KHNraWxsc1tza2lsbF0udGltZXJfY29vcmRzWzBdLCBza2lsbHNbc2tpbGxdLnRpbWVyX2Nvb3Jkc1sxXSwgXCJcIiwgZ3VpVGV4dC5zdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRpbWVyID0gZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XG4gICAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnNvciBwb3NpdGlvbi5cbiAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdW5kZXJzdGFuZCB0aGF0IHNjcmVlbi10by1pc29tZXRyaWMgcHJvamVjdGlvbiBtZWFucyB5b3UgaGF2ZSB0byBzcGVjaWZ5IGEgeiBwb3NpdGlvbiBtYW51YWxseSwgYXMgdGhpcyBjYW5ub3QgYmUgZWFzaWx5XG4gICAgICAgIC8vIGRldGVybWluZWQgZnJvbSB0aGUgMkQgcG9pbnRlciBwb3NpdGlvbiB3aXRob3V0IGV4dHJhIHRyaWNrZXJ5LiBCeSBkZWZhdWx0LCB0aGUgeiBwb3NpdGlvbiBpcyAwIGlmIG5vdCBzZXQuXG4gICAgICAgIGdhbWUuaXNvLnVucHJvamVjdChnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIucG9zaXRpb24sIGN1cnNvclBvcyk7XG5cbiAgICAgICAgd2F0ZXIuZm9yRWFjaChmdW5jdGlvbiAodykge1xuICAgICAgICAgIHcuaXNvWiA9IC0xICsgKC0xICogTWF0aC5zaW4oKGdhbWUudGltZS5ub3cgKyAody5pc29YICogNSkpICogMC4wMDQpKSArICgtMSAqIE1hdGguc2luKChnYW1lLnRpbWUubm93ICsgKHcuaXNvWSAqIDgpKSAqIDAuMDA1KSk7XG4gICAgICAgICAgdy5hbHBoYSA9IFBoYXNlci5NYXRoLmNsYW1wKDEgKyAody5pc29aICogMC4xKSwgMC4xLCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGlsZXMgYW5kIHRlc3QgdG8gc2VlIGlmIHRoZSAzRCBwb3NpdGlvbiBmcm9tIGFib3ZlIGludGVyc2VjdHMgd2l0aCB0aGUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgSXNvU3ByaXRlIHRpbGUgYm91bmRzLlxuICAgICAgICBpc29Hcm91cC5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgaW5Cb3VuZHMgPSB0aWxlLmlzb0JvdW5kcy5jb250YWluc1hZKGN1cnNvclBvcy54LCBjdXJzb3JQb3MueSk7XG4gICAgICAgICAgICAvLyBJZiBpdCBkb2VzLCBkbyBhIGxpdHRsZSBhbmltYXRpb24gYW5kIHRpbnQgY2hhbmdlLlxuICAgICAgICAgICAgaWYgKCF0aWxlLnNlbGVjdGVkICYmIGluQm91bmRzICYmIHRpbGUua2V5PT1cImdyYXNzX2FjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGlsZS50aW50ID0gMHg4NmJmZGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBub3QsIHJldmVydCBiYWNrIHRvIGhvdyBpdCB3YXMuXG4gICAgICAgICAgICBlbHNlIGlmICh0aWxlLnNlbGVjdGVkICYmICFpbkJvdW5kcykge1xuICAgICAgICAgICAgICAgIHRpbGUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aWxlLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRpbGUuc2VsZWN0ZWQgJiYgZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZSA+PSBkZWZlbmRlcl9wcmljZSAmJiAhKFt0aWxlLmlzb0JvdW5kcy54LCB0aWxlLmlzb0JvdW5kcy55XSBpbiBtYXApICYmIHRpbGUua2V5ID09ICdncmFzc19hY3RpdmUnKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gZGVmZW5kZXJfcHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBEZWZlbmRlcih0aWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBnYW1lLmlzby5zaW1wbGVTb3J0KHVuaXRHcm91cCk7XG5cbiAgICAgICAgaWYgKGhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICBlbmQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoaXNHYW1lU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBzdGF0aWN0aWNzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXNraWxsSXNBY3RpdmUoJ3Jvb2ZlcnMnKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZW5lbWllc1tpXS51bmZyZWV6ZSgpO1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGd1aVRleHQuaGVhbHRoLnRleHQgPSBoZWFsdGg7XG4gICAgICAgIGd1aVRleHQuc2NvcmUudGV4dCA9IHNjb3JlO1xuXG4gICAgICAgIGlmIChpc0dhbWVTdGFydCkge1xuICAgICAgICAgICAgdGltZVRleHQuc2V0VGV4dChzdGF0aWN0aWNzLmdldFRpbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udmlzaWJsZSA9IHNraWxsSXNBdmFpbGFibGUoc2tpbGwpO1xuICAgICAgICAgIGlmKHNraWxsc1tza2lsbF0uYnV0dG9uLmlucHV0LnBvaW50ZXJPdmVyKCkpe1xuICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udGludCA9IDB4YmJmZmJiO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBndWlUZXh0LnNraWxsc1tza2lsbF0udGV4dCA9IFwiXCI7XG4gICAgICAgICAgaWYgKHNraWxsSXNBY3RpdmUoc2tpbGwpICYmIHNraWxsc1tza2lsbF0ubGFzdF91c2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ3Jvb2ZlcnMnKSB7XG4gICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3NiwgNzYsIDAsICd0b3dlci1mbGFnJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlID0gdGlsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdvYm5pbWFzaGtpJykge1xuICAgICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTA1LCAxMTAsIDAsICdmcmllbmRzJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUgPSB0aWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGd1aVRleHQuc2tpbGxzW3NraWxsXS50ZXh0ID0gMzAtTWF0aC5mbG9vcigoc3RhdGljdGljcy5nZXRUaW1lKCkqMTAwMCAtIHNraWxsc1tza2lsbF0ubGFzdF91c2VkKSAvIDEwMDApICsgXCLRgVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdyb29mZXJzJyAmJiBza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ29ibmltYXNoa2knICYmIHNraWxsc1tza2lsbF0uc3ByaXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIHNwYXduVGlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWFwSDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcFc7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHRpbGUgdXNpbmcgdGhlIG5ldyBnYW1lLmFkZC5pc29TcHJpdGUgZmFjdG9yeSBtZXRob2QgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAvLyBUaGUgbGFzdCBwYXJhbWV0ZXIgaXMgdGhlIGdyb3VwIHlvdSB3YW50IHRvIGFkZCBpdCB0byAoanVzdCBsaWtlIGdhbWUuYWRkLnNwcml0ZSlcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHRpbGVzWyhpKzEpKm1hcFctKGorMSldO1xuICAgICAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoaSAqIDE5LCBqICogMTksIDAsIHRpbGVUeXBlc1t0eXBlXSwgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICB0b3dlciA9IHRpbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdhdGVyLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDc4LCA0NTAsIDAsICdwaWNrdXAtYnVybmluZycsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDE0MCwgMzAsIDAsICdkZXZ5YXRrYScsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDM0NSwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDE5MCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDI2MCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDI4MCwgMCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzMDAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzMTAsIDQwMCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzOTAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg0MDAsIDQ1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDUyMCwgMjkwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxMzAsIDMyMCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICB9XG59O1xuXG5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEJhc2ljR2FtZS5Cb290KTtcbmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcblxuLyogVW5pdHMgKi9cbmZ1bmN0aW9uIEVuZW15KHgsIHkpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLnNwZWVkID0gNjA7XG4gICAgdGhpcy5kYW1hZ2UgPSAxMDtcbiAgICB0aGlzLnJld2FyZCA9IDEwMDtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdmFyIG1heEhlYWx0aCA9IDA7XG4gICAgdGhpcy5oZWFsdGhiYXIgPSBuZXcgSGVhbHRoQmFyKGdhbWUsIGhlYWx0aGJhckVuZW15Q29uZmlnKTtcbiAgICB0aGlzLmhlYWx0aGJhci5zZXRQZXJjZW50KDEwMCk7XG4gICAgdmFyIHBhdGggPSBtYXBSb2FkLnNsaWNlKCk7XG4gICAgdmFyIHRhcmdldCA9IHBhdGhbMF0gfHwge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgIH07XG4gICAgdmFyIG1vdmUgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZighc2VsZi5hY3RpdmUpIHJldHVybjtcbiAgICAgICAgdmFyIHZlYyA9IHtcbiAgICAgICAgICAgIHg6IHRhcmdldC54IC0gc2VsZi5zcHJpdGUueCxcbiAgICAgICAgICAgIHk6IHRhcmdldC55IC0gc2VsZi5zcHJpdGUueSxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuID0gZGlzdGFuY2UodGFyZ2V0LCBzZWxmLnNwcml0ZSlcbiAgICAgICAgdmFyIGRlbHRhVGltZSA9IGdhbWUudGltZS5lbGFwc2VkLzEwMDA7IFxuICAgICAgICBpZihsZW4gPiBzZWxmLnNwZWVkKmRlbHRhVGltZSl7XG4gICAgICAgICAgICBzZWxmLnNwcml0ZS54ICs9IHZlYy54ICogc2VsZi5zcGVlZCAvIGxlbipkZWx0YVRpbWU7XG4gICAgICAgICAgICBzZWxmLnNwcml0ZS55ICs9IHZlYy55ICogc2VsZi5zcGVlZCAvIGxlbipkZWx0YVRpbWU7XG4gICAgICAgICAgICBpZih2ZWMueCA+IDApe1xuICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnNjYWxlLnggPSBNYXRoLmFicyhzZWxmLnNwcml0ZS5zY2FsZS54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHZlYy54IDwgMCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zcHJpdGUuc2NhbGUueCA9IC1NYXRoLmFicyhzZWxmLnNwcml0ZS5zY2FsZS54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9zPXt4OjAseTowfTtcbiAgICAgICAgZ2FtZS5pc28udW5wcm9qZWN0KHNlbGYuc3ByaXRlLCBwb3MpO1xuICAgICAgICBzZWxmLnNwcml0ZS5pc29YID0gcG9zLng7XG4gICAgICAgIHNlbGYuc3ByaXRlLmlzb1kgPSBwb3MueTtcbiAgICAgICAgc2VsZi5oZWFsdGhiYXIuc2V0UG9zaXRpb24oc2VsZi5zcHJpdGUueCwgc2VsZi5zcHJpdGUueS00MClcbiAgICAgICAgLy8gdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICd0aGllZicsIDI4LCB1bml0R3JvdXApO1xuICAgICAgICB9O1xuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBpZHggPSBlbmVtaWVzLmluZGV4T2Yoc2VsZik7XG4gICAgICAgIGlmKGlkeCE9LTEpe1xuICAgICAgICAgICAgZW5lbWllcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNwcml0ZS5kZXN0cm95KCk7XG4gICAgICAgIHNlbGYuaGVhbHRoYmFyLmtpbGwoKTtcbiAgICB9O1xuICAgIHZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbGVuID0gZGlzdGFuY2UodGFyZ2V0LCBzZWxmLnNwcml0ZSlcbiAgICAgICAgdmFyIGRlbHRhVGltZSA9IGdhbWUudGltZS5lbGFwc2VkLzEwMDA7IFxuICAgICAgICBpZihsZW4gPD0gc2VsZi5zcGVlZCpkZWx0YVRpbWUpe1xuICAgICAgICAgICAgcGF0aC5zaGlmdCgpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gcGF0aFswXSB8fCB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGF0aC5sZW5ndGg9PTApe1xuICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4gICAgICAgICAgICBodXJ0KHNlbGYuZGFtYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmZyZWV6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGFyZ2V0LnggPT09IDQ3NSAmJiB0YXJnZXQueSA9PT0gNTkwKSByZXR1cm47XG4gICAgICAgIHNlbGYuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy51bmZyZWV6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZlVG8gPSBmdW5jdGlvbih4LCB5KXtcbiAgICAgICAgdGFyZ2V0LnggPSB4O1xuICAgICAgICB0YXJnZXQueSA9IHk7XG4gICAgfTtcbiAgICB0aGlzLmh1cnQgPSBmdW5jdGlvbihwb2ludHMpIHtcbiAgICAgICAgbWF4SGVhbHRoID0gTWF0aC5tYXgobWF4SGVhbHRoLCBzZWxmLmhlYWx0aCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBzZWxmLmhlYWx0aCAtIHBvaW50cztcbiAgICAgICAgc2VsZi5oZWFsdGggPSAocmVzdWx0ID49IDApID8gcmVzdWx0IDogMDtcbiAgICAgICAgc2VsZi5oZWFsdGhiYXIuc2V0UGVyY2VudChzZWxmLmhlYWx0aC9tYXhIZWFsdGgqMTAwKTtcbiAgICAgICAgaWYoc2VsZi5oZWFsdGg8PTApe1xuICAgICAgICAgICAgc2VsZi5kYW1hZ2UgPSAwO1xuICAgICAgICAgICAgc2NvcmUgKz0gc2VsZi5yZXdhcmQ7XG4gICAgICAgICAgICBzdGF0aWN0aWNzLm1vbmV5ICs9IHNlbGYucmV3YXJkO1xuICAgICAgICAgICAgdGFyZ2V0ID0ge3g6NDc1LCB5OjU5MH07XG4gICAgICAgICAgICBwYXRoID0gW3RhcmdldF07XG4gICAgICAgICAgICBzZWxmLnVuZnJlZXplKCk7XG4gICAgICAgICAgICAvLyBkZXN0cm95KCk7XG4gICAgICAgICAgICBzZWxmLmhlYWx0aGJhci5iZ1Nwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmhlYWx0aGJhci5iYXJTcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhdGljdGljcy5raWxscysrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlbGYuc3ByaXRlLnRpbnQgPT0gMHhmZmZmZmYpe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKHNlbGYgJiYgc2VsZi5zcHJpdGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwxMDApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKHNlbGYgJiYgc2VsZi5zcHJpdGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwzMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihzZWxmLmFjdGl2ZSl7XG4gICAgICAgICAgICAhc2VsZi5hbmltLmlzUGxheWluZyAmJiBzZWxmLmFuaW0ucGxheSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlbGYuYW5pbS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0VGFyZ2V0KCk7XG4gICAgICAgIG1vdmUoKTtcbiAgICB9XG4gICAgZW5lbWllcy5wdXNoKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBUaGllZih4LCB5KXtcbiAgICB2YXIgcG9zID0ge3g6IDAsIHk6IDB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh7eDp4LHk6eX0sIHBvcyk7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAndGhpZWYnLCAyOCwgdW5pdEdyb3VwKTtcbiAgICB0aGlzLnNwcml0ZS53aWR0aCA9IDI0O1xuICAgIHRoaXMuc3ByaXRlLmhlaWdodCA9IDM2O1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAwLjkpO1xuICAgIHRoaXMuYW5pbSA9IHRoaXMuc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCd3YWxrJyk7XG4gICAgdGhpcy5hbmltLnBsYXkoMTAsIHRydWUpO1xuICAgIEVuZW15LmNhbGwodGhpcywgeCwgeSk7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kYW1hZ2UgPSA0MDtcbiAgICB0aGlzLnJld2FyZCA9IDEwMDtcbiAgICB0aGlzLnNwZWVkID0gNjA7XG59XG5cbmZ1bmN0aW9uIFBvbGljZSh4LCB5KXtcbiAgICB2YXIgcG9zID0ge3g6IDAsIHk6IDB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh7eDp4LHk6eX0sIHBvcyk7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAncG9saWNlJywgNSwgdW5pdEdyb3VwKTtcbiAgICB0aGlzLnNwcml0ZS53aWR0aCA9IDI0O1xuICAgIHRoaXMuc3ByaXRlLmhlaWdodCA9IDM2O1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAwLjkpO1xuICAgIHRoaXMuYW5pbSA9IHRoaXMuc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCd3YWxrJyk7XG4gICAgdGhpcy5hbmltLnBsYXkoMTAsIHRydWUpO1xuICAgIEVuZW15LmNhbGwodGhpcywgeCwgeSk7XG4gICAgdGhpcy5oZWFsdGggPSAyMDA7XG4gICAgdGhpcy5kYW1hZ2UgPSAyMDtcbiAgICB0aGlzLnJld2FyZCA9IDIwMDtcbiAgICB0aGlzLnNwZWVkID0gOTA7XG59XG5cbmZ1bmN0aW9uIEJvc3MoeCwgeSl7XG4gICAgdmFyIHBvcyA9IHt4OiAwLCB5OiAwfTtcbiAgICBnYW1lLmlzby51bnByb2plY3Qoe3g6eCx5Onl9LCBwb3MpO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3BvbGljZScsIDUsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUud2lkdGggPSAyNDtcbiAgICB0aGlzLnNwcml0ZS5oZWlnaHQgPSAzNjtcbiAgICB0aGlzLnNwcml0ZS5hbmNob3Iuc2V0KDAuNSwgMC45KTtcbiAgICB0aGlzLmFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgnd2FsaycpO1xuICAgIHRoaXMuYW5pbS5wbGF5KDEwLCB0cnVlKTtcbiAgICBFbmVteS5jYWxsKHRoaXMsIHgsIHkpO1xuICAgIHRoaXMuaGVhbHRoID0gMjAwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDQwO1xuICAgIHRoaXMucmV3YXJkID0gMjAwMDtcbiAgICB0aGlzLnNwZWVkID0gMjA7XG59XG5cbmZ1bmN0aW9uIERlZmVuZGVyKHRpbGUpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBtYXBbW3RpbGUuaXNvQm91bmRzLngsIHRpbGUuaXNvQm91bmRzLnldXSA9ICdhY3RpdmlzdCc7XG4gICAgdGhpcy5kYW1hZ2UgPSA0NTtcbiAgICB0aGlzLnJhZGl1cyA9IDcwO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHRpbGUuaXNvQm91bmRzLnggKyAxMCwgdGlsZS5pc29Cb3VuZHMueSArIDEwLCAwLCAnYWN0aXZpc3QnLCA4LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAxKTtcblxuICAgIHZhciBhbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3Bvc3QnKTtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGlkeCA9IGRlZmVuZGVycy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGRlZmVuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgICB2YXIgYXR0YWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGFyZ2V0KXtcbiAgICAgICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgICAgIHRhcmdldC5odXJ0KHNlbGYuZGFtYWdlKmRlbHRhVGltZSk7XG4gICAgICAgICAgICBpZighYW5pbS5pc1BsYXlpbmcpe1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheSgzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGlzdCA9IGRpc3RhbmNlKGVuZW1pZXNbaV0uc3ByaXRlLCBzZWxmLnNwcml0ZSk7XG4gICAgICAgICAgICBpZihkaXN0IDwgc2VsZi5yYWRpdXMpe1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQgfHwgZGlzdGFuY2UodGFyZ2V0LnNwcml0ZSwgc2VsZi5zcHJpdGUpIDwgZGlzdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuZW1pZXNbaV0uaGVhbHRoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbmVtaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0YXJnZXQpe1xuICAgICAgICAgICAgYW5pbS5zdG9wKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNwcml0ZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2V0VGFyZ2V0KCk7XG4gICAgICAgIGF0dGFjaygpO1xuICAgIH1cbiAgICBkZWZlbmRlcnMucHVzaCh0aGlzKTtcbn1cblxuXG4vKiBIZWFsdGggKi9cbmZ1bmN0aW9uIGh1cnQocG9pbnRzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGhlYWx0aCAtIHBvaW50cztcbiAgICBoZWFsdGggPSAocmVzdWx0ID49IDApID8gcmVzdWx0IDogMDtcbiAgICBoZWFsdGhCYXIuc2V0UGVyY2VudChoZWFsdGgpO1xuICAgIHZhciBzZWxmID0gdG93ZXI7XG4gICAgaWYocG9pbnRzID4gMCAmJiBzZWxmICYmIHNlbGYudGludCA9PSAweGZmZmZmZil7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKHNlbGYgJiYgc2VsZil7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMTAwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmKXtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwzMDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGVhbChwb2ludHMsIHNwZWVkKSB7XG4gICAgaWYocG9pbnRzID4gMCl7XG4gICAgICAgIHZhciByZXN1bHQgPSBoZWFsdGggKyBzcGVlZDtcbiAgICAgICAgaGVhbHRoID0gKHJlc3VsdCA8IDEwMCkgPyByZXN1bHQgOiAxMDA7XG4gICAgICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG4gICAgICAgIHRpbWVyLmFkZCgxMDAwLCBoZWFsLmJpbmQodGhpcywgcG9pbnRzLXNwZWVkLCBzcGVlZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3Bhd25FbmVteShnYW1lQ2xhc3Mpe1xuICAgIHJldHVybiBuZXcgZ2FtZUNsYXNzKG1hcFJvYWRbMF0ueCxtYXBSb2FkWzBdLnkpO1xufVxuXG5cbmZ1bmN0aW9uIGRpc3RhbmNlKHZlYzEsIHZlYzIpIHtcbiAgICB2YXIgaXNvMT17eDowLHk6MH07XG4gICAgdmFyIGlzbzI9e3g6MCx5OjB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh2ZWMxLCBpc28xKTtcbiAgICBnYW1lLmlzby51bnByb2plY3QodmVjMiwgaXNvMik7XG4gICAgdmFyIHZlYyA9IHtcbiAgICAgICAgeDogaXNvMS54IC0gaXNvMi54LFxuICAgICAgICB5OiBpc28xLnkgLSBpc28yLnksXG4gICAgfVxuICAgIHJldHVybiBNYXRoLnNxcnQodmVjLngqdmVjLnggKyB2ZWMueSp2ZWMueSk7XG59XG5cbndpbmRvdy5XYXZlPVdhdmU7XG53aW5kb3cuVGhpZWY9VGhpZWY7XG53aW5kb3cuUG9saWNlPVBvbGljZTtcblxuZnVuY3Rpb24gV2F2ZShlbmVtaWVzLCByYXRlLCBwYXVzZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcGFjayA9IFtdO1xuICAgIHZhciBjdXJyZW50O1xuICAgIHRoaXMuZmFjdG9yID0gMTtcbiAgICB0aGlzLmZpbmlzaCA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XG5cbiAgICBmdW5jdGlvbiBzcGF3bigpIHtcbiAgICAgICAgcGFjayA9IHBhY2suZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBhLmNvdW50PjB9KTtcbiAgICAgICAgaWYocGFjay5sZW5ndGgpe1xuICAgICAgICAgICAgY3VycmVudCA9IHBhY2tbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnBhY2subGVuZ3RoKV07XG4gICAgICAgICAgICBjdXJyZW50LmNvdW50LT0xO1xuICAgICAgICAgICAgdmFyIGVuZW15ID0gc3Bhd25FbmVteShjdXJyZW50LmNsYXNzKTtcbiAgICAgICAgICAgIGVuZW15LmhlYWx0aCA9IGVuZW15LmhlYWx0aCAqIHNlbGYuZmFjdG9yO1xuICAgICAgICAgICAgdGltZXIuYWRkKChyYXRlWzBdICsgKHJhdGVbMV0tcmF0ZVswXSkqTWF0aC5yYW5kb20oKSksIHNwYXduKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmZpbmlzaC5kaXNwYXRjaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBwYWNrID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGgvMjsgaSsrKSB7XG4gICAgICAgICAgICBwYWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogZW5lbWllc1syKmldLFxuICAgICAgICAgICAgICAgIFwiY291bnRcIjogZW5lbWllc1syKmkrMV0gKiBzZWxmLmZhY3RvcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGltZXIuYWRkKHBhdXNlIC8gTWF0aC5zcXJ0KHNlbGYuZmFjdG9yKSwgc3Bhd24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hhaW4od2F2ZXMsIHJlcGVhdHMsIHBhdXNlLCBjb3VudF9mYWN0b3IpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHF1ZXVlID0gd2F2ZXMuc2xpY2UoKTtcbiAgICB2YXIgY3VycmVudDtcbiAgICB0aGlzLmZhY3RvciA9IDE7XG4gICAgZnVuY3Rpb24gc3RhcnRXYXZlKCkge1xuICAgICAgICBpZihxdWV1ZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBxdWV1ZVswXTtcbiAgICAgICAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBjdXJyZW50LmZpbmlzaC5hZGQoc3RhcnRXYXZlKTtcbiAgICAgICAgICAgIGN1cnJlbnQuZmFjdG9yID0gc2VsZi5mYWN0b3I7XG4gICAgICAgICAgICBjdXJyZW50LnN0YXJ0KCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihyZXBlYXRzICE9IDApe1xuICAgICAgICAgICAgICAgIHNlbGYuZmFjdG9yID0gc2VsZi5mYWN0b3IgKiBjb3VudF9mYWN0b3I7XG4gICAgICAgICAgICAgICAgdGltZXIuYWRkKHBhdXNlLCBzdGFydFdhdmUpO1xuICAgICAgICAgICAgICAgIHJlcGVhdHMtLTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IHdhdmVzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGltZXIuYWRkKDAsIHN0YXJ0V2F2ZSk7XG59XG5cbmZ1bmN0aW9uIFN0YXRpY3RpY3MoKXtcbiAgICB2YXIgdGltZSA9IDA7XG4gICAgdGhpcy5nZXRUaW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvIDEwMDApO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRpbWUgKz0gZ2FtZS50aW1lLmVsYXBzZWQ7XG4gICAgfVxuICAgIHRoaXMubW9uZXkgPSAwO1xuICAgIHRoaXMua2lsbHMgPSAwO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcbiAgICBpc0dhbWVTdGFydCA9IHRydWU7XG4gICAgc3RhdGljdGljcyA9IG5ldyBTdGF0aWN0aWNzKCk7XG5cbiAgICB2YXIgd2F2ZXMgPSBbXG4gICAgICAgIG5ldyBXYXZlKFtUaGllZiwgMl0sIFsxMDAwLCAyMDAwXSwgMTAwMCksXG4gICAgICAgIG5ldyBXYXZlKFtUaGllZiwgNF0sIFsxMDAwLCAyMDAwXSwgODAwMCksXG4gICAgICAgIG5ldyBXYXZlKFtQb2xpY2UsIDRdLCBbMTAwMCwgMjAwMF0sIDgwMDApLFxuICAgICAgICBuZXcgV2F2ZShbVGhpZWYsIDgsIFBvbGljZSwgNF0sIFsxMDAwLCAyMDAwXSwgODAwMCksXG4gICAgICAgIG5ldyBXYXZlKFtCb3NzLCAxXSwgWzIwMDAsIDQwMDBdLCA4MDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW10sIFtdLCAxNjAwMCksXG4gICAgXTtcbiAgICB3aW5kb3cuY2hhaW4gPSBuZXcgQ2hhaW4od2F2ZXMsIC0xLCAxMDAwMCwgMik7XG5cbiAgICB0aW1lci5zdGFydCgpO1xufVxuIl19
