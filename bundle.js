(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var game = new Phaser.Game(1024, 650, Phaser.AUTO, 'test', null, true, false);
var health = 100,
    score = 2000,
    map = {};

var BasicGame = function (game) {};
BasicGame.Boot = function (game) {};

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
        game.load.image('buy-1000', '../img/buy/buy-1000.png');
        game.load.image('buy-2000', '../img/buy/buy-2000.png');
        game.load.image('buy-3000', '../img/buy/buy-3000.png');
        game.load.image('buy-5000', '../img/buy/buy-5000.png');
        game.load.image('buy-10000', '../img/buy/buy-10000.png');
        // Да-да, дизэйбл
        game.load.image('buy-disabled-1000', '../img/buy/buy-disabled-1000.png');
        game.load.image('buy-disabled-2000', '../img/buy/buy-disabled-2000.png');
        game.load.image('buy-disabled-3000', '../img/buy/buy-disabled-3000.png');
        game.load.image('buy-disabled-5000', '../img/buy/buy-disabled-5000.png');
        game.load.image('buy-disabled-10000', '../img/buy/buy-disabled-10000.png');
        game.load.image('tree1', '../img/tree1.png');
        game.load.image('tree2', '../img/tree2.png');
        game.load.image('road', '../img/road.png');
        game.load.image('grass', '../img/grass.png');
        game.load.image('grass_active', '../img/grass_active.png');
        game.load.image('water', '../img/water.png');
        game.load.image('tower', '../img/tower.png');
        game.load.image('tower-flag', '../img/tower-flag.png');
        game.load.image('pickup-burning', '../img/pickup-burning.png');
        game.load.image('devyatka', '../img/devyatka.png');
        game.load.image('money', '../img/money.png');
        game.load.image('heart', '../img/heart.png');
        game.load.image('friends', '../img/friends.png');

        game.load.spritesheet('activist', '../img/activist.png', 32, 64, 8);
        game.load.spritesheet('thief', '../img/thief.png', 128, 184, 28);
        game.load.spritesheet('police', '../img/police.png', 128, 218, 5);

        game.time.advancedTiming = true;
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.3);
    },
    create: function () {
        statictics = new Statictics();
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
            statictics.update();
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

        timeText.setText(statictics.getTime());
        
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
    this.reward = 80;
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
    console.log("start");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTAyNCwgNjUwLCBQaGFzZXIuQVVUTywgJ3Rlc3QnLCBudWxsLCB0cnVlLCBmYWxzZSk7XG52YXIgaGVhbHRoID0gMTAwLFxuICAgIHNjb3JlID0gMjAwMCxcbiAgICBtYXAgPSB7fTtcblxudmFyIEJhc2ljR2FtZSA9IGZ1bmN0aW9uIChnYW1lKSB7fTtcbkJhc2ljR2FtZS5Cb290ID0gZnVuY3Rpb24gKGdhbWUpIHt9O1xuXG52YXIgc3RhdGljdGljcztcbnZhciB0aW1lVGV4dDtcblxudmFyIGlzb0dyb3VwLCB1bml0R3JvdXAsIGN1cnNvclBvcywgY3Vyc29yLCBoZWFsdGhCYXI7XG52YXIgdGlsZXMgID0gW1xuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDMsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDQsIDQsIDQsIDQsIDQsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsXG4gICAgNCwgNCwgNCwgNCwgNCwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCxcbiAgICA0LCA0LCA0LCA0LCA0LCAxLCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LFxuICAgIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICBdXG52YXIgdGlsZVR5cGVzID0ge1xuICAgIDA6ICdncmFzcycsXG4gICAgMTogJ3JvYWQnLFxuICAgIDI6ICdncmFzc19hY3RpdmUnLFxuICAgIDM6ICd0b3dlcicsXG4gICAgNDogJ3dhdGVyJ1xufVxudmFyIG1hcFcgPSAyNTtcbnZhciBtYXBIID0gdGlsZXMubGVuZ3RoIC8gbWFwVztcbi8vIHdpbmRvdy5tYXBFZGl0b3IgPSBbXTtcbnZhciBtYXBSb2FkID0gW3t4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjY2NS41LCB5OjU4M30sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4OjUyOS41LCB5OjUxNX0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4Ojc2Ny41LCB5OjM5Nn0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjY5Ny41LCB5OjM2MX0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjQ2MS41LCB5OjQ4MH0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjM5NC41LCB5OjQ0Nn0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjY2NC41LCB5OjMxMX0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjYxMy41LCB5OjI4Nn0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjM0Mi41LCB5OjQyMX0sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjI1NS41LCB5OjM3N30sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn0sIHt4OjUwMy41LCB5OjI1Nn1dO1xuXG52YXIgc2tpbGxzID0ge1xuICAncm9vZmVycyc6IHtcbiAgICAncHJpY2UnOiAzMDAwLFxuICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICdidXR0b24nOiBudWxsLFxuICAgICd0aW1lcl9jb29yZHMnOiBbMzAwLCA2NV0sXG4gICAgJ3Nwcml0ZSc6IG51bGxcbiAgfSxcbiAgJ29ibmltYXNoa2knOiB7XG4gICAgJ3ByaWNlJzogNTAwMCxcbiAgICAnbGFzdF91c2VkJzogbnVsbCxcbiAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAndGltZXJfY29vcmRzJzogWzMwMCwgMTEwXSxcbiAgICAnc3ByaXRlJzogbnVsbFxuICB9LFxuICAncm9pem1hbic6IHtcbiAgICAncHJpY2UnOiAxMDAwMCxcbiAgICAnbGFzdF91c2VkJzogbnVsbCxcbiAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAndGltZXJfY29vcmRzJzogWzMwMCwgMTU1XVxuICB9XG59O1xudmFyIGRlZmVuZGVyX3ByaWNlID0gMTAwMFxudmFyIGVuZW1pZXMgPSBbXTtcbnZhciBkZWZlbmRlcnMgPSBbXTtcblxudmFyIGd1aVRleHQgPSB7XG4gICAgc3R5bGU6IHsgZm9udDogXCIxNnB4IElCTSBQbGV4IE1vbm9cIiwgZm9udFdlaWdodDogXCI1MDBcIiwgZmlsbDpcIiMwMDBcIn0sXG4gICAgYm9sZFN0eWxlOiB7IGZvbnQ6IFwiMTZweCBJQk0gUGxleCBNb25vXCIsIGZvbnRXZWlnaHQ6IFwiNzAwXCIsIGZpbGw6XCIjMDAwXCJ9LFxuICAgIGxhcmdlU3R5bGU6IHsgZm9udDogXCI4MHB4IElCTSBQbGV4IE1vbm9cIiwgZm9udFdlaWdodDogXCI3MDBcIiwgZmlsbDpcIiMwMDBcIn0sXG4gICAgd2hpdGVTdHlsZTogeyBmb250OiBcIjE2cHggSUJNIFBsZXggTW9ub1wiLCBmb250V2VpZ2h0OiBcIjUwMFwiLCBmaWxsOlwiI2ZmZlwifSxcbn1cblxuZnVuY3Rpb24gc2tpbGxJc0F2YWlsYWJsZShuYW1lKSB7XG4gIGlmIChuYW1lID09PSAnb2JuaW1hc2hraScgJiYgaGVhbHRoID49IDk5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gIXNraWxsSXNBY3RpdmUobmFtZSkgJiYgc2NvcmUgPj0gc2tpbGxzW25hbWVdLnByaWNlO1xufVxuXG5mdW5jdGlvbiBza2lsbElzQWN0aXZlKG5hbWUpIHtcbiAgaWYgKHNraWxsc1tuYW1lXS5sYXN0X3VzZWQgIT0gbnVsbCkge1xuICAgIHJldHVybiAoc3RhdGljdGljcy5nZXRUaW1lKCkqMTAwMCAtIHNraWxsc1tuYW1lXS5sYXN0X3VzZWQpIDwgMzAgKiAxMDAwO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYnV5KHNraWxsKSB7XG4gIHZhciBza2lsbF9kYXRhID0gc2tpbGxzW3NraWxsXTtcbiAgdmFyIHByaWNlID0gc2tpbGxfZGF0YS5wcmljZTtcblxuICBpZiAoc2NvcmUgPCBwcmljZSkgcmV0dXJuO1xuICBzY29yZSAtPSBwcmljZTtcbiAgc2tpbGxfZGF0YS5sYXN0X3VzZWQgPSBzdGF0aWN0aWNzLmdldFRpbWUoKSoxMDAwO1xufVxuXG5mdW5jdGlvbiBidXlSb29mZXJzKCkge1xuICBidXkoJ3Jvb2ZlcnMnKTtcblxuICB2YXIgZW5tID0gZW5lbWllcy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGVubS5sZW5ndGg7IGkrKykge1xuICAgIGVubVtpXS5mcmVlemUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBidXlPYm5pbWFzaGtpKCkge1xuICBpZiAoaGVhbHRoID49IDk5KSByZXR1cm47XG5cbiAgYnV5KCdvYm5pbWFzaGtpJyk7XG5cbiAgaGVhbCgzMCwgMik7XG59XG5cbmZ1bmN0aW9uIGJ1eVJvaXptYW4oKSB7XG4gIGJ1eSgncm9pem1hbicpO1xuXG4gIGVwaWMoKTtcblxuICB2YXIgZW5tID0gZW5lbWllcy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGVubS5sZW5ndGg7IGkrKykge1xuICAgIGVubVtpXS5kZXN0cm95KCk7XG4gIH1cbn1cblxudmFyIHRpbWVyO1xuXG52YXIgd2F0ZXIgPSBbXTtcblxudmFyIHRvd2VyO1xuXG52YXIgaGVhbHRoYmFyRW5lbXlDb25maWcgPSB7XG4gICAgd2lkdGg6IDMwLFxuICAgIGhlaWdodDogMyxcbiAgICBiZzoge1xuICAgICAgY29sb3I6ICcjOGUyMDIwJ1xuICAgIH0sXG4gICAgYmFyOiB7XG4gICAgICBjb2xvcjogJyNmZTAwMDAnXG4gICAgfSxcbiAgICBhbmltYXRpb25EdXJhdGlvbjogMTAwLFxuICAgIGZsaXBwZWQ6IGZhbHNlXG59O1xuQmFzaWNHYW1lLkJvb3QucHJvdG90eXBlID1cbntcbiAgICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vINCU0LAt0LTQsCwg0Y3RgtC+INGG0LXQvdGLXG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTEwMDAnLCAnLi4vaW1nL2J1eS9idXktMTAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMjAwMCcsICcuLi9pbWcvYnV5L2J1eS0yMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0zMDAwJywgJy4uL2ltZy9idXkvYnV5LTMwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTUwMDAnLCAnLi4vaW1nL2J1eS9idXktNTAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMTAwMDAnLCAnLi4vaW1nL2J1eS9idXktMTAwMDAucG5nJyk7XG4gICAgICAgIC8vINCU0LAt0LTQsCwg0LTQuNC30Y3QudCx0LtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtMTAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0xMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0yMDAwJywgJy4uL2ltZy9idXkvYnV5LWRpc2FibGVkLTIwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTMwMDAnLCAnLi4vaW1nL2J1eS9idXktZGlzYWJsZWQtMzAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtNTAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC01MDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0xMDAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0xMDAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0cmVlMScsICcuLi9pbWcvdHJlZTEucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndHJlZTInLCAnLi4vaW1nL3RyZWUyLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3JvYWQnLCAnLi4vaW1nL3JvYWQucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZ3Jhc3MnLCAnLi4vaW1nL2dyYXNzLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2dyYXNzX2FjdGl2ZScsICcuLi9pbWcvZ3Jhc3NfYWN0aXZlLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3dhdGVyJywgJy4uL2ltZy93YXRlci5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0b3dlcicsICcuLi9pbWcvdG93ZXIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndG93ZXItZmxhZycsICcuLi9pbWcvdG93ZXItZmxhZy5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdwaWNrdXAtYnVybmluZycsICcuLi9pbWcvcGlja3VwLWJ1cm5pbmcucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZGV2eWF0a2EnLCAnLi4vaW1nL2RldnlhdGthLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vbmV5JywgJy4uL2ltZy9tb25leS5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdoZWFydCcsICcuLi9pbWcvaGVhcnQucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZnJpZW5kcycsICcuLi9pbWcvZnJpZW5kcy5wbmcnKTtcblxuICAgICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2FjdGl2aXN0JywgJy4uL2ltZy9hY3RpdmlzdC5wbmcnLCAzMiwgNjQsIDgpO1xuICAgICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3RoaWVmJywgJy4uL2ltZy90aGllZi5wbmcnLCAxMjgsIDE4NCwgMjgpO1xuICAgICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ3BvbGljZScsICcuLi9pbWcvcG9saWNlLnBuZycsIDEyOCwgMjE4LCA1KTtcblxuICAgICAgICBnYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuICAgICAgICBnYW1lLnBsdWdpbnMuYWRkKG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYyhnYW1lKSk7XG5cbiAgICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QbHVnaW4uSXNvbWV0cmljLklTT0FSQ0FERSk7XG4gICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBzZXQgYSBnYW1lIGNhbnZhcy1iYXNlZCBvZmZzZXQgZm9yIHRoZSAwLCAwLCAwIGlzb21ldHJpYyBjb29yZGluYXRlIC0gYnkgZGVmYXVsdFxuICAgICAgICAvLyB0aGlzIHBvaW50IHdvdWxkIGJlIGF0IHNjcmVlbiBjb29yZGluYXRlcyAwLCAwICh0b3AgbGVmdCkgd2hpY2ggaXMgdXN1YWxseSB1bmRlc2lyYWJsZS5cbiAgICAgICAgZ2FtZS5pc28uYW5jaG9yLnNldFRvKDAuNSwgMC4zKTtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGF0aWN0aWNzID0gbmV3IFN0YXRpY3RpY3MoKTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZ3JvdXAgZm9yIG91ciB0aWxlcy5cbiAgICAgICAgaXNvR3JvdXAgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICBpc29Hcm91cC5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgaXNvR3JvdXAucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSVNPQVJDQURFO1xuXG4gICAgICAgIHVuaXRHcm91cCA9IGdhbWUuYWRkLmdyb3VwKCk7XG5cbiAgICAgICAgLy8gTGV0J3MgbWFrZSBhIGxvYWQgb2YgdGlsZXMgb24gYSBncmlkLlxuICAgICAgICB0aGlzLnNwYXduVGlsZXMoKTtcblxuICAgICAgICAvLyBQcm92aWRlIGEgM0QgcG9zaXRpb24gZm9yIHRoZSBjdXJzb3JcbiAgICAgICAgY3Vyc29yUG9zID0gbmV3IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljLlBvaW50MygpO1xuXG4gICAgICAgIHZhciByZWN0YW5nbGUgPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShnYW1lLndpZHRoIC0gMjMwLCAxMCwgMTcwLCAyMCk7XG4gICAgICAgIHZhciBibWQgPSBnYW1lLmFkZC5iaXRtYXBEYXRhKGdhbWUud2lkdGgsIGdhbWUuaGVpZ2h0KTtcbiAgICAgICAgYm1kLnJlY3QocmVjdGFuZ2xlLngsIHJlY3RhbmdsZS55LCByZWN0YW5nbGUud2lkdGgsIHJlY3RhbmdsZS5oZWlnaHQsICcjMmQyZDJkJyk7XG4gICAgICAgIGJtZC5hZGRUb1dvcmxkKCk7XG5cbiAgICAgICAgdmFyIGhlYWx0aGJhckNvbmZpZyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxNjYsXG4gICAgICAgICAgICBoZWlnaHQ6IDE2LFxuICAgICAgICAgICAgeDogZ2FtZS53aWR0aCAtIDE0NSxcbiAgICAgICAgICAgIHk6IDIwLFxuICAgICAgICAgICAgYmc6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjOGUyMDIwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhcjoge1xuICAgICAgICAgICAgICBjb2xvcjogJyNmZTAwMDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDYwMCxcbiAgICAgICAgICAgIGZsaXBwZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGdhbWUuaW5wdXQubW91c2UuY2FwdHVyZSA9IHRydWU7XG4gICAgICAgIGhlYWx0aEJhciA9IG5ldyBIZWFsdGhCYXIoZ2FtZSwgaGVhbHRoYmFyQ29uZmlnKTtcbiAgICAgICAgaGVhbHRoQmFyLnNldFBlcmNlbnQoaGVhbHRoKTtcblxuICAgICAgICBnYW1lLmFkZC5pbWFnZSgyMTAsIDYwLCBcImJ1eS1kaXNhYmxlZC0zMDAwXCIpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZSgyMTAsIDEwNSwgXCJidXktZGlzYWJsZWQtNTAwMFwiKTtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMjEwLCAxNTAsIFwiYnV5LWRpc2FibGVkLTEwMDAwXCIpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZShnYW1lLndpZHRoIC0gMjc1LCA1LCAnaGVhcnQnKTtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoZ2FtZS53aWR0aCAtIDI3NywgNTUsIFwibW9uZXlcIik7XG4gICAgICAgIHNraWxsc1sncm9vZmVycyddWydidXR0b24nXSA9IGdhbWUuYWRkLmJ1dHRvbigyMTAsIDYwLCAnYnV5LTMwMDAnLCBidXlSb29mZXJzLCB0aGlzLCAyLCAxLCAwKTtcbiAgICAgICAgc2tpbGxzWydvYm5pbWFzaGtpJ11bJ2J1dHRvbiddID0gZ2FtZS5hZGQuYnV0dG9uKDIxMCwgMTA1LCAnYnV5LTUwMDAnLCBidXlPYm5pbWFzaGtpLCB0aGlzLCAyLCAxLCAwKTtcbiAgICAgICAgc2tpbGxzWydyb2l6bWFuJ11bJ2J1dHRvbiddID0gZ2FtZS5hZGQuYnV0dG9uKDIxMCwgMTUwLCAnYnV5LTEwMDAwJywgYnV5Um9pem1hbiwgdGhpcywgMiwgMSwgMCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN0YXJ0R2FtZVwiLCBzdGFydEdhbWUpO1xuXG4gICAgICAgIGdhbWUuYWRkLnRleHQoMiwgMjAsIFwi0KHRg9C/0LXRgNGB0L/QvtGB0L7QsdC90L7RgdGC0LhcIiwgZ3VpVGV4dC5ib2xkU3R5bGUpO1xuICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDY1LCBcItCg0YPRhNC10YDRiyAoRnJlZXplKVwiLCBndWlUZXh0LnN0eWxlKTtcbiAgICAgICAgZ2FtZS5hZGQudGV4dCgyLCAxMTAsIFwi0J7QsdC90LjQvNCw0YjQutC4ICgrMzAgaHApXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDE1NSwgXCLQoNC+0LnQt9C80LDQvVwiLCBndWlUZXh0LnN0eWxlKTtcblxuICAgICAgICB0aW1lVGV4dCA9IGdhbWUuYWRkLnRleHQoMiwgNjUwIC0gMTUwLCBcIlwiLCBndWlUZXh0LmxhcmdlU3R5bGUpO1xuICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDY1MCAtIDMwLCBcItCR0LDRiNC90Y8g0L/RgNC+0LTQtdGA0LbQsNC70LDRgdGMXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICBcbiAgICAgICAgZ3VpVGV4dC5oZWFsdGggPSBnYW1lLmFkZC50ZXh0KGdhbWUud2lkdGggLSAxNjAsIDEwLCBoZWFsdGgsIGd1aVRleHQud2hpdGVTdHlsZSk7XG4gICAgICAgIGd1aVRleHQuc2NvcmUgPSBnYW1lLmFkZC50ZXh0KGdhbWUud2lkdGggLSAyMzAsIDYwLCBzY29yZSwgZ3VpVGV4dC5zdHlsZSk7XG5cbiAgICAgICAgZ3VpVGV4dC5za2lsbHMgPSB7fVxuICAgICAgICBmb3IgKHNraWxsIGluIHNraWxscykge1xuICAgICAgICAgICAgZ3VpVGV4dC5za2lsbHNbc2tpbGxdID0gZ2FtZS5hZGQudGV4dChza2lsbHNbc2tpbGxdLnRpbWVyX2Nvb3Jkc1swXSwgc2tpbGxzW3NraWxsXS50aW1lcl9jb29yZHNbMV0sIFwiXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aW1lciA9IGdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuICAgICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHVuZGVyc3RhbmQgdGhhdCBzY3JlZW4tdG8taXNvbWV0cmljIHByb2plY3Rpb24gbWVhbnMgeW91IGhhdmUgdG8gc3BlY2lmeSBhIHogcG9zaXRpb24gbWFudWFsbHksIGFzIHRoaXMgY2Fubm90IGJlIGVhc2lseVxuICAgICAgICAvLyBkZXRlcm1pbmVkIGZyb20gdGhlIDJEIHBvaW50ZXIgcG9zaXRpb24gd2l0aG91dCBleHRyYSB0cmlja2VyeS4gQnkgZGVmYXVsdCwgdGhlIHogcG9zaXRpb24gaXMgMCBpZiBub3Qgc2V0LlxuICAgICAgICBnYW1lLmlzby51bnByb2plY3QoZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLnBvc2l0aW9uLCBjdXJzb3JQb3MpO1xuXG4gICAgICAgIHdhdGVyLmZvckVhY2goZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICB3Lmlzb1ogPSAtMSArICgtMSAqIE1hdGguc2luKChnYW1lLnRpbWUubm93ICsgKHcuaXNvWCAqIDUpKSAqIDAuMDA0KSkgKyAoLTEgKiBNYXRoLnNpbigoZ2FtZS50aW1lLm5vdyArICh3Lmlzb1kgKiA4KSkgKiAwLjAwNSkpO1xuICAgICAgICAgIHcuYWxwaGEgPSBQaGFzZXIuTWF0aC5jbGFtcCgxICsgKHcuaXNvWiAqIDAuMSksIDAuMSwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRpbGVzIGFuZCB0ZXN0IHRvIHNlZSBpZiB0aGUgM0QgcG9zaXRpb24gZnJvbSBhYm92ZSBpbnRlcnNlY3RzIHdpdGggdGhlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIElzb1Nwcml0ZSB0aWxlIGJvdW5kcy5cbiAgICAgICAgaXNvR3JvdXAuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgdmFyIGluQm91bmRzID0gdGlsZS5pc29Cb3VuZHMuY29udGFpbnNYWShjdXJzb3JQb3MueCwgY3Vyc29yUG9zLnkpO1xuICAgICAgICAgICAgLy8gSWYgaXQgZG9lcywgZG8gYSBsaXR0bGUgYW5pbWF0aW9uIGFuZCB0aW50IGNoYW5nZS5cbiAgICAgICAgICAgIGlmICghdGlsZS5zZWxlY3RlZCAmJiBpbkJvdW5kcyAmJiB0aWxlLmtleT09XCJncmFzc19hY3RpdmVcIikge1xuICAgICAgICAgICAgICAgIHRpbGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRpbGUudGludCA9IDB4ODZiZmRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgbm90LCByZXZlcnQgYmFjayB0byBob3cgaXQgd2FzLlxuICAgICAgICAgICAgZWxzZSBpZiAodGlsZS5zZWxlY3RlZCAmJiAhaW5Cb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aWxlLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGlsZS50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aWxlLnNlbGVjdGVkICYmIGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPj0gZGVmZW5kZXJfcHJpY2UgJiYgIShbdGlsZS5pc29Cb3VuZHMueCwgdGlsZS5pc29Cb3VuZHMueV0gaW4gbWFwKSAmJiB0aWxlLmtleSA9PSAnZ3Jhc3NfYWN0aXZlJyl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlIC09IGRlZmVuZGVyX3ByaWNlO1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGVmZW5kZXIodGlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZ2FtZS5pc28uc2ltcGxlU29ydCh1bml0R3JvdXApO1xuXG4gICAgICAgIGlmIChoZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgZW5kKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc3RhdGljdGljcy51cGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2tpbGxJc0FjdGl2ZSgncm9vZmVycycpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbmVtaWVzW2ldLnVuZnJlZXplKCk7XG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ3VpVGV4dC5oZWFsdGgudGV4dCA9IGhlYWx0aDtcbiAgICAgICAgZ3VpVGV4dC5zY29yZS50ZXh0ID0gc2NvcmU7XG5cbiAgICAgICAgdGltZVRleHQuc2V0VGV4dChzdGF0aWN0aWNzLmdldFRpbWUoKSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHNraWxsIGluIHNraWxscykge1xuICAgICAgICAgIHNraWxsc1tza2lsbF0uYnV0dG9uLnZpc2libGUgPSBza2lsbElzQXZhaWxhYmxlKHNraWxsKTtcbiAgICAgICAgICBpZihza2lsbHNbc2tpbGxdLmJ1dHRvbi5pbnB1dC5wb2ludGVyT3ZlcigpKXtcbiAgICAgICAgICAgIHNraWxsc1tza2lsbF0uYnV0dG9uLnRpbnQgPSAweGJiZmZiYjtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNraWxsc1tza2lsbF0uYnV0dG9uLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3VpVGV4dC5za2lsbHNbc2tpbGxdLnRleHQgPSBcIlwiO1xuICAgICAgICAgIGlmIChza2lsbElzQWN0aXZlKHNraWxsKSAmJiBza2lsbHNbc2tpbGxdLmxhc3RfdXNlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdyb29mZXJzJykge1xuICAgICAgICAgICAgICBpZiAoc2tpbGxzW3NraWxsXS5zcHJpdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNzYsIDc2LCAwLCAndG93ZXItZmxhZycsIDAsIGlzb0dyb3VwKTtcbiAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZSA9IHRpbGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNraWxsID09PSAnb2JuaW1hc2hraScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxzW3NraWxsXS5zcHJpdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDEwNSwgMTEwLCAwLCAnZnJpZW5kcycsIDAsIGlzb0dyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlID0gdGlsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBndWlUZXh0LnNraWxsc1tza2lsbF0udGV4dCA9IDMwLU1hdGguZmxvb3IoKHN0YXRpY3RpY3MuZ2V0VGltZSgpKjEwMDAgLSBza2lsbHNbc2tpbGxdLmxhc3RfdXNlZCkgLyAxMDAwKSArIFwi0YFcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNraWxsID09PSAncm9vZmVycycgJiYgc2tpbGxzW3NraWxsXS5zcHJpdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdvYm5pbWFzaGtpJyAmJiBza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBzcGF3blRpbGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hcEg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtYXBXOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSB0aWxlIHVzaW5nIHRoZSBuZXcgZ2FtZS5hZGQuaXNvU3ByaXRlIGZhY3RvcnkgbWV0aG9kIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgLy8gVGhlIGxhc3QgcGFyYW1ldGVyIGlzIHRoZSBncm91cCB5b3Ugd2FudCB0byBhZGQgaXQgdG8gKGp1c3QgbGlrZSBnYW1lLmFkZC5zcHJpdGUpXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0aWxlc1soaSsxKSptYXBXLShqKzEpXTtcbiAgICAgICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKGkgKiAxOSwgaiAqIDE5LCAwLCB0aWxlVHlwZXNbdHlwZV0sIDAsIGlzb0dyb3VwKTtcbiAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgdG93ZXIgPSB0aWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICB3YXRlci5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3OCwgNDUwLCAwLCAncGlja3VwLWJ1cm5pbmcnLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxNDAsIDMwLCAwLCAnZGV2eWF0a2EnLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzNDUsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxOTAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgyNjAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgyODAsIDAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzAwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzEwLCA0MDAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzkwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNDAwLCA0NSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg1MjAsIDI5MCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTMwLCAzMjAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgfVxufTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBCYXNpY0dhbWUuQm9vdCk7XG5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XG5cbi8qIFVuaXRzICovXG5mdW5jdGlvbiBFbmVteSh4LCB5KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5zcGVlZCA9IDYwO1xuICAgIHRoaXMuZGFtYWdlID0gMTA7XG4gICAgdGhpcy5yZXdhcmQgPSAxMDA7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHZhciBtYXhIZWFsdGggPSAwO1xuICAgIHRoaXMuaGVhbHRoYmFyID0gbmV3IEhlYWx0aEJhcihnYW1lLCBoZWFsdGhiYXJFbmVteUNvbmZpZyk7XG4gICAgdGhpcy5oZWFsdGhiYXIuc2V0UGVyY2VudCgxMDApO1xuICAgIHZhciBwYXRoID0gbWFwUm9hZC5zbGljZSgpO1xuICAgIHZhciB0YXJnZXQgPSBwYXRoWzBdIHx8IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICB9O1xuICAgIHZhciBtb3ZlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIXNlbGYuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIHZhciB2ZWMgPSB7XG4gICAgICAgICAgICB4OiB0YXJnZXQueCAtIHNlbGYuc3ByaXRlLngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueSAtIHNlbGYuc3ByaXRlLnksXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IGRpc3RhbmNlKHRhcmdldCwgc2VsZi5zcHJpdGUpXG4gICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgaWYobGVuID4gc2VsZi5zcGVlZCpkZWx0YVRpbWUpe1xuICAgICAgICAgICAgc2VsZi5zcHJpdGUueCArPSB2ZWMueCAqIHNlbGYuc3BlZWQgLyBsZW4qZGVsdGFUaW1lO1xuICAgICAgICAgICAgc2VsZi5zcHJpdGUueSArPSB2ZWMueSAqIHNlbGYuc3BlZWQgLyBsZW4qZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYodmVjLnggPiAwKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS5zY2FsZS54ID0gTWF0aC5hYnMoc2VsZi5zcHJpdGUuc2NhbGUueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2ZWMueCA8IDApe1xuICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnNjYWxlLnggPSAtTWF0aC5hYnMoc2VsZi5zcHJpdGUuc2NhbGUueCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvcz17eDowLHk6MH07XG4gICAgICAgIGdhbWUuaXNvLnVucHJvamVjdChzZWxmLnNwcml0ZSwgcG9zKTtcbiAgICAgICAgc2VsZi5zcHJpdGUuaXNvWCA9IHBvcy54O1xuICAgICAgICBzZWxmLnNwcml0ZS5pc29ZID0gcG9zLnk7XG4gICAgICAgIHNlbGYuaGVhbHRoYmFyLnNldFBvc2l0aW9uKHNlbGYuc3ByaXRlLngsIHNlbGYuc3ByaXRlLnktNDApXG4gICAgICAgIC8vIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAndGhpZWYnLCAyOCwgdW5pdEdyb3VwKTtcbiAgICAgICAgfTtcbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgaWR4ID0gZW5lbWllcy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGVuZW1pZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zcHJpdGUuZGVzdHJveSgpO1xuICAgICAgICBzZWxmLmhlYWx0aGJhci5raWxsKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxlbiA9IGRpc3RhbmNlKHRhcmdldCwgc2VsZi5zcHJpdGUpXG4gICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgaWYobGVuIDw9IHNlbGYuc3BlZWQqZGVsdGFUaW1lKXtcbiAgICAgICAgICAgIHBhdGguc2hpZnQoKTtcbiAgICAgICAgICAgIHRhcmdldCA9IHBhdGhbMF0gfHwgdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmKHBhdGgubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuICAgICAgICAgICAgaHVydChzZWxmLmRhbWFnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5mcmVlemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRhcmdldC54ID09PSA0NzUgJiYgdGFyZ2V0LnkgPT09IDU5MCkgcmV0dXJuO1xuICAgICAgICBzZWxmLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudW5mcmVlemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMubW92ZVRvID0gZnVuY3Rpb24oeCwgeSl7XG4gICAgICAgIHRhcmdldC54ID0geDtcbiAgICAgICAgdGFyZ2V0LnkgPSB5O1xuICAgIH07XG4gICAgdGhpcy5odXJ0ID0gZnVuY3Rpb24ocG9pbnRzKSB7XG4gICAgICAgIG1heEhlYWx0aCA9IE1hdGgubWF4KG1heEhlYWx0aCwgc2VsZi5oZWFsdGgpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5oZWFsdGggLSBwb2ludHM7XG4gICAgICAgIHNlbGYuaGVhbHRoID0gKHJlc3VsdCA+PSAwKSA/IHJlc3VsdCA6IDA7XG4gICAgICAgIHNlbGYuaGVhbHRoYmFyLnNldFBlcmNlbnQoc2VsZi5oZWFsdGgvbWF4SGVhbHRoKjEwMCk7XG4gICAgICAgIGlmKHNlbGYuaGVhbHRoPD0wKXtcbiAgICAgICAgICAgIHNlbGYuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIHNjb3JlICs9IHNlbGYucmV3YXJkO1xuICAgICAgICAgICAgc3RhdGljdGljcy5tb25leSArPSBzZWxmLnJld2FyZDtcbiAgICAgICAgICAgIHRhcmdldCA9IHt4OjQ3NSwgeTo1OTB9O1xuICAgICAgICAgICAgcGF0aCA9IFt0YXJnZXRdO1xuICAgICAgICAgICAgc2VsZi51bmZyZWV6ZSgpO1xuICAgICAgICAgICAgLy8gZGVzdHJveSgpO1xuICAgICAgICAgICAgc2VsZi5oZWFsdGhiYXIuYmdTcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5oZWFsdGhiYXIuYmFyU3ByaXRlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0YXRpY3RpY3Mua2lsbHMrKztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZihzZWxmLnNwcml0ZS50aW50ID09IDB4ZmZmZmZmKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmICYmIHNlbGYuc3ByaXRlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zcHJpdGUudGludCA9IDB4ZmYwMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sMTAwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmICYmIHNlbGYuc3ByaXRlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zcHJpdGUudGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sMzAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNwcml0ZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoc2VsZi5hY3RpdmUpe1xuICAgICAgICAgICAgIXNlbGYuYW5pbS5pc1BsYXlpbmcgJiYgc2VsZi5hbmltLnBsYXkoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmFuaW0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGdldFRhcmdldCgpO1xuICAgICAgICBtb3ZlKCk7XG4gICAgfVxuICAgIGVuZW1pZXMucHVzaCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gVGhpZWYoeCwgeSl7XG4gICAgdmFyIHBvcyA9IHt4OiAwLCB5OiAwfTtcbiAgICBnYW1lLmlzby51bnByb2plY3Qoe3g6eCx5Onl9LCBwb3MpO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3RoaWVmJywgMjgsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUud2lkdGggPSAyNDtcbiAgICB0aGlzLnNwcml0ZS5oZWlnaHQgPSAzNjtcbiAgICB0aGlzLnNwcml0ZS5hbmNob3Iuc2V0KDAuNSwgMC45KTtcbiAgICB0aGlzLmFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgnd2FsaycpO1xuICAgIHRoaXMuYW5pbS5wbGF5KDEwLCB0cnVlKTtcbiAgICBFbmVteS5jYWxsKHRoaXMsIHgsIHkpO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuZGFtYWdlID0gNDA7XG4gICAgdGhpcy5yZXdhcmQgPSA4MDtcbiAgICB0aGlzLnNwZWVkID0gNjA7XG59XG5cbmZ1bmN0aW9uIFBvbGljZSh4LCB5KXtcbiAgICB2YXIgcG9zID0ge3g6IDAsIHk6IDB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh7eDp4LHk6eX0sIHBvcyk7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAncG9saWNlJywgNSwgdW5pdEdyb3VwKTtcbiAgICB0aGlzLnNwcml0ZS53aWR0aCA9IDI0O1xuICAgIHRoaXMuc3ByaXRlLmhlaWdodCA9IDM2O1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAwLjkpO1xuICAgIHRoaXMuYW5pbSA9IHRoaXMuc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCd3YWxrJyk7XG4gICAgdGhpcy5hbmltLnBsYXkoMTAsIHRydWUpO1xuICAgIEVuZW15LmNhbGwodGhpcywgeCwgeSk7XG4gICAgdGhpcy5oZWFsdGggPSAyMDA7XG4gICAgdGhpcy5kYW1hZ2UgPSAyMDtcbiAgICB0aGlzLnJld2FyZCA9IDIwMDtcbiAgICB0aGlzLnNwZWVkID0gOTA7XG59XG5cbmZ1bmN0aW9uIEJvc3MoeCwgeSl7XG4gICAgdmFyIHBvcyA9IHt4OiAwLCB5OiAwfTtcbiAgICBnYW1lLmlzby51bnByb2plY3Qoe3g6eCx5Onl9LCBwb3MpO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3BvbGljZScsIDUsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUud2lkdGggPSAyNDtcbiAgICB0aGlzLnNwcml0ZS5oZWlnaHQgPSAzNjtcbiAgICB0aGlzLnNwcml0ZS5hbmNob3Iuc2V0KDAuNSwgMC45KTtcbiAgICB0aGlzLmFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgnd2FsaycpO1xuICAgIHRoaXMuYW5pbS5wbGF5KDEwLCB0cnVlKTtcbiAgICBFbmVteS5jYWxsKHRoaXMsIHgsIHkpO1xuICAgIHRoaXMuaGVhbHRoID0gMjAwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDQwO1xuICAgIHRoaXMucmV3YXJkID0gMjAwMDtcbiAgICB0aGlzLnNwZWVkID0gMjA7XG59XG5cbmZ1bmN0aW9uIERlZmVuZGVyKHRpbGUpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBtYXBbW3RpbGUuaXNvQm91bmRzLngsIHRpbGUuaXNvQm91bmRzLnldXSA9ICdhY3RpdmlzdCc7XG4gICAgdGhpcy5kYW1hZ2UgPSA0NTtcbiAgICB0aGlzLnJhZGl1cyA9IDcwO1xuICAgIHRoaXMuc3ByaXRlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHRpbGUuaXNvQm91bmRzLnggKyAxMCwgdGlsZS5pc29Cb3VuZHMueSArIDEwLCAwLCAnYWN0aXZpc3QnLCA4LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAxKTtcblxuICAgIHZhciBhbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3Bvc3QnKTtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGlkeCA9IGRlZmVuZGVycy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGRlZmVuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgICB2YXIgYXR0YWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGFyZ2V0KXtcbiAgICAgICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZC8xMDAwOyBcbiAgICAgICAgICAgIHRhcmdldC5odXJ0KHNlbGYuZGFtYWdlKmRlbHRhVGltZSk7XG4gICAgICAgICAgICBpZighYW5pbS5pc1BsYXlpbmcpe1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheSgzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGlzdCA9IGRpc3RhbmNlKGVuZW1pZXNbaV0uc3ByaXRlLCBzZWxmLnNwcml0ZSk7XG4gICAgICAgICAgICBpZihkaXN0IDwgc2VsZi5yYWRpdXMpe1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQgfHwgZGlzdGFuY2UodGFyZ2V0LnNwcml0ZSwgc2VsZi5zcHJpdGUpIDwgZGlzdCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuZW1pZXNbaV0uaGVhbHRoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBlbmVtaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0YXJnZXQpe1xuICAgICAgICAgICAgYW5pbS5zdG9wKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNwcml0ZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2V0VGFyZ2V0KCk7XG4gICAgICAgIGF0dGFjaygpO1xuICAgIH1cbiAgICBkZWZlbmRlcnMucHVzaCh0aGlzKTtcbn1cblxuXG4vKiBIZWFsdGggKi9cbmZ1bmN0aW9uIGh1cnQocG9pbnRzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGhlYWx0aCAtIHBvaW50cztcbiAgICBoZWFsdGggPSAocmVzdWx0ID49IDApID8gcmVzdWx0IDogMDtcbiAgICBoZWFsdGhCYXIuc2V0UGVyY2VudChoZWFsdGgpO1xuICAgIHZhciBzZWxmID0gdG93ZXI7XG4gICAgaWYocG9pbnRzID4gMCAmJiBzZWxmICYmIHNlbGYudGludCA9PSAweGZmZmZmZil7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKHNlbGYgJiYgc2VsZil7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMTAwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmKXtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwzMDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGVhbChwb2ludHMsIHNwZWVkKSB7XG4gICAgaWYocG9pbnRzID4gMCl7XG4gICAgICAgIHZhciByZXN1bHQgPSBoZWFsdGggKyBzcGVlZDtcbiAgICAgICAgaGVhbHRoID0gKHJlc3VsdCA8IDEwMCkgPyByZXN1bHQgOiAxMDA7XG4gICAgICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG4gICAgICAgIHRpbWVyLmFkZCgxMDAwLCBoZWFsLmJpbmQodGhpcywgcG9pbnRzLXNwZWVkLCBzcGVlZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3Bhd25FbmVteShnYW1lQ2xhc3Mpe1xuICAgIHJldHVybiBuZXcgZ2FtZUNsYXNzKG1hcFJvYWRbMF0ueCxtYXBSb2FkWzBdLnkpO1xufVxuXG5cbmZ1bmN0aW9uIGRpc3RhbmNlKHZlYzEsIHZlYzIpIHtcbiAgICB2YXIgaXNvMT17eDowLHk6MH07XG4gICAgdmFyIGlzbzI9e3g6MCx5OjB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh2ZWMxLCBpc28xKTtcbiAgICBnYW1lLmlzby51bnByb2plY3QodmVjMiwgaXNvMik7XG4gICAgdmFyIHZlYyA9IHtcbiAgICAgICAgeDogaXNvMS54IC0gaXNvMi54LFxuICAgICAgICB5OiBpc28xLnkgLSBpc28yLnksXG4gICAgfVxuICAgIHJldHVybiBNYXRoLnNxcnQodmVjLngqdmVjLnggKyB2ZWMueSp2ZWMueSk7XG59XG5cbndpbmRvdy5XYXZlPVdhdmU7XG53aW5kb3cuVGhpZWY9VGhpZWY7XG53aW5kb3cuUG9saWNlPVBvbGljZTtcblxuZnVuY3Rpb24gV2F2ZShlbmVtaWVzLCByYXRlLCBwYXVzZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcGFjayA9IFtdO1xuICAgIHZhciBjdXJyZW50O1xuICAgIHRoaXMuZmFjdG9yID0gMTtcbiAgICB0aGlzLmZpbmlzaCA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XG5cbiAgICBmdW5jdGlvbiBzcGF3bigpIHtcbiAgICAgICAgcGFjayA9IHBhY2suZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBhLmNvdW50PjB9KTtcbiAgICAgICAgaWYocGFjay5sZW5ndGgpe1xuICAgICAgICAgICAgY3VycmVudCA9IHBhY2tbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnBhY2subGVuZ3RoKV07XG4gICAgICAgICAgICBjdXJyZW50LmNvdW50LT0xO1xuICAgICAgICAgICAgdmFyIGVuZW15ID0gc3Bhd25FbmVteShjdXJyZW50LmNsYXNzKTtcbiAgICAgICAgICAgIGVuZW15LmhlYWx0aCA9IGVuZW15LmhlYWx0aCAqIHNlbGYuZmFjdG9yO1xuICAgICAgICAgICAgdGltZXIuYWRkKChyYXRlWzBdICsgKHJhdGVbMV0tcmF0ZVswXSkqTWF0aC5yYW5kb20oKSksIHNwYXduKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZWxmLmZpbmlzaC5kaXNwYXRjaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBwYWNrID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGgvMjsgaSsrKSB7XG4gICAgICAgICAgICBwYWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogZW5lbWllc1syKmldLFxuICAgICAgICAgICAgICAgIFwiY291bnRcIjogZW5lbWllc1syKmkrMV0gKiBzZWxmLmZhY3RvcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGltZXIuYWRkKHBhdXNlIC8gTWF0aC5zcXJ0KHNlbGYuZmFjdG9yKSwgc3Bhd24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hhaW4od2F2ZXMsIHJlcGVhdHMsIHBhdXNlLCBjb3VudF9mYWN0b3IpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHF1ZXVlID0gd2F2ZXMuc2xpY2UoKTtcbiAgICB2YXIgY3VycmVudDtcbiAgICB0aGlzLmZhY3RvciA9IDE7XG4gICAgZnVuY3Rpb24gc3RhcnRXYXZlKCkge1xuICAgICAgICBpZihxdWV1ZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBxdWV1ZVswXTtcbiAgICAgICAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBjdXJyZW50LmZpbmlzaC5hZGQoc3RhcnRXYXZlKTtcbiAgICAgICAgICAgIGN1cnJlbnQuZmFjdG9yID0gc2VsZi5mYWN0b3I7XG4gICAgICAgICAgICBjdXJyZW50LnN0YXJ0KCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihyZXBlYXRzICE9IDApe1xuICAgICAgICAgICAgICAgIHNlbGYuZmFjdG9yID0gc2VsZi5mYWN0b3IgKiBjb3VudF9mYWN0b3I7XG4gICAgICAgICAgICAgICAgdGltZXIuYWRkKHBhdXNlLCBzdGFydFdhdmUpO1xuICAgICAgICAgICAgICAgIHJlcGVhdHMtLTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IHdhdmVzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGltZXIuYWRkKDAsIHN0YXJ0V2F2ZSk7XG59XG5cbmZ1bmN0aW9uIFN0YXRpY3RpY3MoKXtcbiAgICB2YXIgdGltZSA9IDA7XG4gICAgdGhpcy5nZXRUaW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvIDEwMDApO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRpbWUgKz0gZ2FtZS50aW1lLmVsYXBzZWQ7XG4gICAgfVxuICAgIHRoaXMubW9uZXkgPSAwO1xuICAgIHRoaXMua2lsbHMgPSAwO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKXtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0XCIpO1xuICAgIHZhciB3YXZlcyA9IFtcbiAgICAgICAgbmV3IFdhdmUoW1RoaWVmLCAyXSwgWzEwMDAsIDIwMDBdLCAxMDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW1RoaWVmLCA0XSwgWzEwMDAsIDIwMDBdLCA4MDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW1BvbGljZSwgNF0sIFsxMDAwLCAyMDAwXSwgODAwMCksXG4gICAgICAgIG5ldyBXYXZlKFtUaGllZiwgOCwgUG9saWNlLCA0XSwgWzEwMDAsIDIwMDBdLCA4MDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW0Jvc3MsIDFdLCBbMjAwMCwgNDAwMF0sIDgwMDApLFxuICAgICAgICBuZXcgV2F2ZShbXSwgW10sIDE2MDAwKSxcbiAgICBdO1xuICAgIHdpbmRvdy5jaGFpbiA9IG5ldyBDaGFpbih3YXZlcywgLTEsIDEwMDAwLCAyKTtcblxuICAgIHRpbWVyLnN0YXJ0KCk7XG59XG4iXX0=
