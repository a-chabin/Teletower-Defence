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
}

function buyObnimashki() {
  buy('obnimashki');
}

function buyRoizman() {
  buy('roizman');
}

function addActivist(tile) {
  
}

var water = [];

var tower;

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
        spawnEnemy();

        game.add.image(190, 55, "buy-disabled-3000");
        game.add.image(190, 90, "buy-disabled-5000");
        game.add.image(190, 125, "buy-disabled-10000");
        skills['roofers']['button'] = game.add.button(190, 55, 'buy-3000', buyRoofers, this, 2, 1, 0);
        skills['obnimashki']['button'] = game.add.button(190, 90, 'buy-5000', buyObnimashki, this, 2, 1, 0);
        skills['roizman']['button'] = game.add.button(190, 125, 'buy-10000', buyRoizman, this, 2, 1, 0);

        document.addEventListener("startGame", startGame);
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

            var x = skills[skill].timer_coords[0];
            var y = skills[skill].timer_coords[1];

            game.debug.text(Math.floor((Date.now() - skills[skill].last_used) / 1000) + " / 30", x, y, "#a7aebe");
          } else {
            if (skill === 'roofers' && skills[skill].sprite != null) {
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
    this.speed = 1;
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
        if(len > self.speed){
            self.sprite.x += vec.x * self.speed / len;
            self.sprite.y += vec.y * self.speed / len;
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
    var destroy = function(){
        var idx = enemies.indexOf(self);
        if(idx!=-1){
            enemies.splice(idx, 1);
        }
        self.sprite.destroy();
    };
    var getTarget = function(){
        var len = distance(target, self.sprite)
        if(len <= self.speed){
            path.shift();
            target = path[0] || target;
        }
        if(path.length==0){
            destroy();
            hurt(self.damage);
        }
    };

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
    this.damage = 30;
    this.reward = 1000;
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
    this.reward = 2000;
}

function Defender(tile){
    var self = this;
    map[[tile.isoBounds.x, tile.isoBounds.y]] = 'activist';
    this.damage = 10;
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
    var result = health - points;
    health = (result < 100) ? result : 100;
    healthBar.setPercent(health);
}

function spawnEnemy(type){
    new Thief(mapRoad[0].x,mapRoad[0].y);
    setTimeout(function(){
        new Police(mapRoad[0].x,mapRoad[0].y);
    },1000)
}
function startGame(){
    console.log("start");
}


function distance(vec1, vec2) {
    var vec = {
        x: vec1.x - vec2.x,
        y: vec1.y - vec2.y,
    }
    return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3BoYXNlci1ub2RlLWtpdC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnVpbGQvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEwMjQsIDY1MCwgUGhhc2VyLkFVVE8sICd0ZXN0JywgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xudmFyIGhlYWx0aCA9IDEwMCxcbiAgICBzY29yZSA9IDUwMDAsXG4gICAgbWFwID0ge307XG5cbnZhciBCYXNpY0dhbWUgPSBmdW5jdGlvbiAoZ2FtZSkge307XG5CYXNpY0dhbWUuQm9vdCA9IGZ1bmN0aW9uIChnYW1lKSB7fTtcblxudmFyIGlzb0dyb3VwLCB1bml0R3JvdXAsIGN1cnNvclBvcywgY3Vyc29yLCBoZWFsdGhCYXI7XG52YXIgdGlsZXMgID0gW1xuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDMsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsIFxuICAgIDAsIDAsIDAsIDAsIDIsIDEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMiwgMSwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgNCwgNCwgNCwgNCwgNCwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCxcbiAgICA0LCA0LCA0LCA0LCA0LCAxLCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LFxuICAgIDQsIDQsIDQsIDQsIDQsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsXG4gICAgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gICAgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgXG4gIF1cbnZhciB0aWxlVHlwZXMgPSB7XG4gICAgMDogJ2dyYXNzJyxcbiAgICAxOiAncm9hZCcsXG4gICAgMjogJ2dyYXNzX2FjdGl2ZScsXG4gICAgMzogJ3Rvd2VyJyxcbiAgICA0OiAnd2F0ZXInXG59XG52YXIgbWFwVyA9IDI1O1xudmFyIG1hcEggPSB0aWxlcy5sZW5ndGggLyBtYXBXO1xuLy8gd2luZG93Lm1hcEVkaXRvciA9IFtdO1xudmFyIG1hcFJvYWQgPSBbe3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NjY1LjUsIHk6NTgzfSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NTI5LjUsIHk6NTE1fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6NzY3LjUsIHk6Mzk2fSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6Njk3LjUsIHk6MzYxfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6NDYxLjUsIHk6NDgwfSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6Mzk0LjUsIHk6NDQ2fSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjY0LjUsIHk6MzExfSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6NjEzLjUsIHk6Mjg2fSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MzQyLjUsIHk6NDIxfSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6MjU1LjUsIHk6Mzc3fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fSwge3g6NTAzLjUsIHk6MjU2fV07XG5cbnZhciBza2lsbHMgPSB7XG4gICdyb29mZXJzJzoge1xuICAgICdwcmljZSc6IDMwMDAsXG4gICAgJ2xhc3RfdXNlZCc6IG51bGwsXG4gICAgJ2J1dHRvbic6IG51bGwsXG4gICAgJ3RpbWVyX2Nvb3Jkcyc6IFsyODUsIDcyXSxcbiAgICAnc3ByaXRlJzogbnVsbFxuICB9LFxuICAnb2JuaW1hc2hraSc6IHtcbiAgICAncHJpY2UnOiA1MDAwLFxuICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICdidXR0b24nOiBudWxsLFxuICAgICd0aW1lcl9jb29yZHMnOiBbMjg1LCAxMDhdLFxuICB9LFxuICAncm9pem1hbic6IHtcbiAgICAncHJpY2UnOiAxMDAwMCxcbiAgICAnbGFzdF91c2VkJzogbnVsbCxcbiAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAndGltZXJfY29vcmRzJzogWzI4NSwgMTQyXVxuICB9XG59O1xudmFyIGRlZmVuZGVyX3ByaWNlID0gNTAwXG52YXIgZW5lbWllcyA9IFtdO1xudmFyIGRlZmVuZGVycyA9IFtdO1xuXG5mdW5jdGlvbiBza2lsbElzQXZhaWxhYmxlKG5hbWUpIHtcbiAgcmV0dXJuICFza2lsbElzQWN0aXZlKG5hbWUpICYmIHNjb3JlID49IHNraWxsc1tuYW1lXS5wcmljZTtcbn1cblxuZnVuY3Rpb24gc2tpbGxJc0FjdGl2ZShuYW1lKSB7XG4gIGlmIChza2lsbHNbbmFtZV0ubGFzdF91c2VkICE9IG51bGwpIHtcbiAgICByZXR1cm4gKERhdGUubm93KCkgLSBza2lsbHNbbmFtZV0ubGFzdF91c2VkKSA8IDMwICogMTAwMDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJ1eShza2lsbCkge1xuICB2YXIgc2tpbGxfZGF0YSA9IHNraWxsc1tza2lsbF07XG4gIHZhciBwcmljZSA9IHNraWxsX2RhdGEucHJpY2U7XG5cbiAgaWYgKHNjb3JlIDwgcHJpY2UpIHJldHVybjtcbiAgc2NvcmUgLT0gcHJpY2U7XG4gIHNraWxsX2RhdGEubGFzdF91c2VkID0gRGF0ZS5ub3coKTtcbn1cblxuZnVuY3Rpb24gYnV5Um9vZmVycygpIHtcbiAgYnV5KCdyb29mZXJzJyk7XG59XG5cbmZ1bmN0aW9uIGJ1eU9ibmltYXNoa2koKSB7XG4gIGJ1eSgnb2JuaW1hc2hraScpO1xufVxuXG5mdW5jdGlvbiBidXlSb2l6bWFuKCkge1xuICBidXkoJ3JvaXptYW4nKTtcbn1cblxuZnVuY3Rpb24gYWRkQWN0aXZpc3QodGlsZSkge1xuICBcbn1cblxudmFyIHdhdGVyID0gW107XG5cbnZhciB0b3dlcjtcblxuQmFzaWNHYW1lLkJvb3QucHJvdG90eXBlID1cbntcbiAgICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vINCU0LAt0LTQsCwg0Y3RgtC+INGG0LXQvdGLXG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTEwMDAnLCAnLi4vaW1nL2J1eS9idXktMTAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMjAwMCcsICcuLi9pbWcvYnV5L2J1eS0yMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0zMDAwJywgJy4uL2ltZy9idXkvYnV5LTMwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTUwMDAnLCAnLi4vaW1nL2J1eS9idXktNTAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMTAwMDAnLCAnLi4vaW1nL2J1eS9idXktMTAwMDAucG5nJyk7XG4gICAgICAgIC8vINCU0LAt0LTQsCwg0LTQuNC30Y3QudCx0LtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtMTAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0xMDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0yMDAwJywgJy4uL2ltZy9idXkvYnV5LWRpc2FibGVkLTIwMDAucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTMwMDAnLCAnLi4vaW1nL2J1eS9idXktZGlzYWJsZWQtMzAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtNTAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC01MDAwLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0xMDAwMCcsICcuLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0xMDAwMC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0cmVlMScsICcuLi9pbWcvdHJlZTEucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndHJlZTInLCAnLi4vaW1nL3RyZWUyLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3JvYWQnLCAnLi4vaW1nL3JvYWQucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZ3Jhc3MnLCAnLi4vaW1nL2dyYXNzLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2dyYXNzX2FjdGl2ZScsICcuLi9pbWcvZ3Jhc3NfYWN0aXZlLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3dhdGVyJywgJy4uL2ltZy93YXRlci5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0b3dlcicsICcuLi9pbWcvdG93ZXIucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgndG93ZXItZmxhZycsICcuLi9pbWcvdG93ZXItZmxhZy5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdwaWNrdXAtYnVybmluZycsICcuLi9pbWcvcGlja3VwLWJ1cm5pbmcucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZGV2eWF0a2EnLCAnLi4vaW1nL2RldnlhdGthLnBuZycpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ21vbmV5JywgJy4uL2ltZy9tb25leS5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdoZWFydCcsICcuLi9pbWcvaGVhcnQucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYWN0aXZpc3QnLCAnLi4vaW1nL2FjdGl2aXN0LnBuZycsIDMyLCA2NCwgOCk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgndGhpZWYnLCAnLi4vaW1nL3RoaWVmLnBuZycsIDEyOCwgMTg0LCAyOCk7XG4gICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncG9saWNlJywgJy4uL2ltZy9wb2xpY2UucG5nJywgMTI4LCAyMTgsIDUpO1xuXG4gICAgICAgIGdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XG4gICAgICAgIGdhbWUucGx1Z2lucy5hZGQobmV3IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljKGdhbWUpKTtcblxuICAgICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSVNPQVJDQURFKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHNldCBhIGdhbWUgY2FudmFzLWJhc2VkIG9mZnNldCBmb3IgdGhlIDAsIDAsIDAgaXNvbWV0cmljIGNvb3JkaW5hdGUgLSBieSBkZWZhdWx0XG4gICAgICAgIC8vIHRoaXMgcG9pbnQgd291bGQgYmUgYXQgc2NyZWVuIGNvb3JkaW5hdGVzIDAsIDAgKHRvcCBsZWZ0KSB3aGljaCBpcyB1c3VhbGx5IHVuZGVzaXJhYmxlLlxuICAgICAgICBnYW1lLmlzby5hbmNob3Iuc2V0VG8oMC41LCAwLjMpO1xuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIGdyb3VwIGZvciBvdXIgdGlsZXMuXG4gICAgICAgIGlzb0dyb3VwID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgaXNvR3JvdXAuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIGlzb0dyb3VwLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljLklTT0FSQ0FERTtcblxuICAgICAgICB1bml0R3JvdXAgPSBnYW1lLmFkZC5ncm91cCgpO1xuXG4gICAgICAgIC8vIExldCdzIG1ha2UgYSBsb2FkIG9mIHRpbGVzIG9uIGEgZ3JpZC5cbiAgICAgICAgdGhpcy5zcGF3blRpbGVzKCk7XG5cbiAgICAgICAgLy8gUHJvdmlkZSBhIDNEIHBvc2l0aW9uIGZvciB0aGUgY3Vyc29yXG4gICAgICAgIGN1cnNvclBvcyA9IG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYy5Qb2ludDMoKTtcblxuICAgICAgICB2YXIgcmVjdGFuZ2xlID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoZ2FtZS53aWR0aCAtIDIzMCwgMTAsIDE3MCwgMjApO1xuICAgICAgICB2YXIgYm1kID0gZ2FtZS5hZGQuYml0bWFwRGF0YShnYW1lLndpZHRoLCBnYW1lLmhlaWdodCk7XG4gICAgICAgIGJtZC5yZWN0KHJlY3RhbmdsZS54LCByZWN0YW5nbGUueSwgcmVjdGFuZ2xlLndpZHRoLCByZWN0YW5nbGUuaGVpZ2h0LCAnIzJkMmQyZCcpO1xuICAgICAgICBibWQuYWRkVG9Xb3JsZCgpO1xuXG4gICAgICAgIHZhciBiYXJDb25maWcgPSB7XG4gICAgICAgICAgICB3aWR0aDogMTY2LFxuICAgICAgICAgICAgaGVpZ2h0OiAxNixcbiAgICAgICAgICAgIHg6IGdhbWUud2lkdGggLSAxNDUsXG4gICAgICAgICAgICB5OiAyMCxcbiAgICAgICAgICAgIGJnOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzhlMjAyMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXI6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjZmUwMDAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiA2MDAsXG4gICAgICAgICAgICBmbGlwcGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBnYW1lLmlucHV0Lm1vdXNlLmNhcHR1cmUgPSB0cnVlO1xuICAgICAgICBoZWFsdGhCYXIgPSBuZXcgSGVhbHRoQmFyKGdhbWUsIGJhckNvbmZpZyk7XG4gICAgICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG4gICAgICAgIHNwYXduRW5lbXkoKTtcblxuICAgICAgICBnYW1lLmFkZC5pbWFnZSgxOTAsIDU1LCBcImJ1eS1kaXNhYmxlZC0zMDAwXCIpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZSgxOTAsIDkwLCBcImJ1eS1kaXNhYmxlZC01MDAwXCIpO1xuICAgICAgICBnYW1lLmFkZC5pbWFnZSgxOTAsIDEyNSwgXCJidXktZGlzYWJsZWQtMTAwMDBcIik7XG4gICAgICAgIHNraWxsc1sncm9vZmVycyddWydidXR0b24nXSA9IGdhbWUuYWRkLmJ1dHRvbigxOTAsIDU1LCAnYnV5LTMwMDAnLCBidXlSb29mZXJzLCB0aGlzLCAyLCAxLCAwKTtcbiAgICAgICAgc2tpbGxzWydvYm5pbWFzaGtpJ11bJ2J1dHRvbiddID0gZ2FtZS5hZGQuYnV0dG9uKDE5MCwgOTAsICdidXktNTAwMCcsIGJ1eU9ibmltYXNoa2ksIHRoaXMsIDIsIDEsIDApO1xuICAgICAgICBza2lsbHNbJ3JvaXptYW4nXVsnYnV0dG9uJ10gPSBnYW1lLmFkZC5idXR0b24oMTkwLCAxMjUsICdidXktMTAwMDAnLCBidXlSb2l6bWFuLCB0aGlzLCAyLCAxLCAwKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic3RhcnRHYW1lXCIsIHN0YXJ0R2FtZSk7XG4gICAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnNvciBwb3NpdGlvbi5cbiAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdW5kZXJzdGFuZCB0aGF0IHNjcmVlbi10by1pc29tZXRyaWMgcHJvamVjdGlvbiBtZWFucyB5b3UgaGF2ZSB0byBzcGVjaWZ5IGEgeiBwb3NpdGlvbiBtYW51YWxseSwgYXMgdGhpcyBjYW5ub3QgYmUgZWFzaWx5XG4gICAgICAgIC8vIGRldGVybWluZWQgZnJvbSB0aGUgMkQgcG9pbnRlciBwb3NpdGlvbiB3aXRob3V0IGV4dHJhIHRyaWNrZXJ5LiBCeSBkZWZhdWx0LCB0aGUgeiBwb3NpdGlvbiBpcyAwIGlmIG5vdCBzZXQuXG4gICAgICAgIGdhbWUuaXNvLnVucHJvamVjdChnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIucG9zaXRpb24sIGN1cnNvclBvcyk7XG5cbiAgICAgICAgd2F0ZXIuZm9yRWFjaChmdW5jdGlvbiAodykge1xuICAgICAgICAgIHcuaXNvWiA9IC0xICsgKC0xICogTWF0aC5zaW4oKGdhbWUudGltZS5ub3cgKyAody5pc29YICogNSkpICogMC4wMDQpKSArICgtMSAqIE1hdGguc2luKChnYW1lLnRpbWUubm93ICsgKHcuaXNvWSAqIDgpKSAqIDAuMDA1KSk7XG4gICAgICAgICAgdy5hbHBoYSA9IFBoYXNlci5NYXRoLmNsYW1wKDEgKyAody5pc29aICogMC4xKSwgMC4xLCAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGlsZXMgYW5kIHRlc3QgdG8gc2VlIGlmIHRoZSAzRCBwb3NpdGlvbiBmcm9tIGFib3ZlIGludGVyc2VjdHMgd2l0aCB0aGUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgSXNvU3ByaXRlIHRpbGUgYm91bmRzLlxuICAgICAgICBpc29Hcm91cC5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICB2YXIgaW5Cb3VuZHMgPSB0aWxlLmlzb0JvdW5kcy5jb250YWluc1hZKGN1cnNvclBvcy54LCBjdXJzb3JQb3MueSk7XG4gICAgICAgICAgICAvLyBJZiBpdCBkb2VzLCBkbyBhIGxpdHRsZSBhbmltYXRpb24gYW5kIHRpbnQgY2hhbmdlLlxuICAgICAgICAgICAgaWYgKCF0aWxlLnNlbGVjdGVkICYmIGluQm91bmRzICYmIHRpbGUua2V5PT1cImdyYXNzX2FjdGl2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGlsZS50aW50ID0gMHg4NmJmZGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBub3QsIHJldmVydCBiYWNrIHRvIGhvdyBpdCB3YXMuXG4gICAgICAgICAgICBlbHNlIGlmICh0aWxlLnNlbGVjdGVkICYmICFpbkJvdW5kcykge1xuICAgICAgICAgICAgICAgIHRpbGUuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aWxlLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRpbGUuc2VsZWN0ZWQgJiYgZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmxlZnRCdXR0b24uaXNEb3duKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlID49IGRlZmVuZGVyX3ByaWNlICYmICEoW3RpbGUuaXNvQm91bmRzLngsIHRpbGUuaXNvQm91bmRzLnldIGluIG1hcCkgJiYgdGlsZS5rZXkgPT0gJ2dyYXNzX2FjdGl2ZScpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZSAtPSBkZWZlbmRlcl9wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IERlZmVuZGVyKHRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGdhbWUuaXNvLnNpbXBsZVNvcnQodW5pdEdyb3VwKTtcblxuICAgICAgICBpZiAoaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIGVuZCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoZ2FtZS53aWR0aCAtIDI3NSwgNSwgJ2hlYXJ0Jyk7XG4gICAgICAgIGdhbWUuYWRkLmltYWdlKGdhbWUud2lkdGggLSAyNzcsIDU1LCBcIm1vbmV5XCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoaGVhbHRoLCBnYW1lLndpZHRoIC0gMTYwLCAyNSwgXCIjZmZmXCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoc2NvcmUsIGdhbWUud2lkdGggLSAyMzAsIDc0LCBcIiNhN2FlYmVcIik7XG5cbiAgICAgICAgZ2FtZS5kZWJ1Zy50ZXh0KFwi0KHRg9C/0LXRgNGB0L/QvtGB0L7QsdC90L7RgdGC0Lg6XCIsIDIsIDI1LCBcIiNhN2FlYmVcIik7XG4gICAgICAgIGdhbWUuZGVidWcudGV4dChcItCg0YPRhNC10YDRiyAoRnJlZXplKVwiLCAyLCA3MiwgXCIjYTdhZWJlXCIpO1xuICAgICAgICBnYW1lLmRlYnVnLnRleHQoXCLQntCx0L3QuNC80LDRiNC60LggKCsyMCBocClcIiwgMiwgMTA4LCBcIiNhN2FlYmVcIik7XG4gICAgICAgIGdhbWUuZGVidWcudGV4dChcItCg0L7QudC30LzQsNC9XCIsIDIsIDE0MiwgXCIjYTdhZWJlXCIpO1xuXG4gICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udmlzaWJsZSA9IHNraWxsSXNBdmFpbGFibGUoc2tpbGwpO1xuXG4gICAgICAgICAgaWYgKHNraWxsSXNBY3RpdmUoc2tpbGwpICYmIHNraWxsc1tza2lsbF0ubGFzdF91c2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ3Jvb2ZlcnMnKSB7XG4gICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5zcHJpdGUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3NiwgNzYsIDAsICd0b3dlci1mbGFnJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlID0gdGlsZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgeCA9IHNraWxsc1tza2lsbF0udGltZXJfY29vcmRzWzBdO1xuICAgICAgICAgICAgdmFyIHkgPSBza2lsbHNbc2tpbGxdLnRpbWVyX2Nvb3Jkc1sxXTtcblxuICAgICAgICAgICAgZ2FtZS5kZWJ1Zy50ZXh0KE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBza2lsbHNbc2tpbGxdLmxhc3RfdXNlZCkgLyAxMDAwKSArIFwiIC8gMzBcIiwgeCwgeSwgXCIjYTdhZWJlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdyb29mZXJzJyAmJiBza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgc3Bhd25UaWxlczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGlsZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXBIOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWFwVzsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgdGlsZSB1c2luZyB0aGUgbmV3IGdhbWUuYWRkLmlzb1Nwcml0ZSBmYWN0b3J5IG1ldGhvZCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IHBhcmFtZXRlciBpcyB0aGUgZ3JvdXAgeW91IHdhbnQgdG8gYWRkIGl0IHRvIChqdXN0IGxpa2UgZ2FtZS5hZGQuc3ByaXRlKVxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdGlsZXNbKGkrMSkqbWFwVy0oaisxKV07XG4gICAgICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShpICogMTksIGogKiAxOSwgMCwgdGlsZVR5cGVzW3R5cGVdLCAwLCBpc29Hcm91cCk7XG4gICAgICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgIHRvd2VyID0gdGlsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2F0ZXIucHVzaCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNzgsIDQ1MCwgMCwgJ3BpY2t1cC1idXJuaW5nJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTQwLCAzMCwgMCwgJ2RldnlhdGthJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzQ1LCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMTkwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMjYwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMjgwLCAwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDMwMCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDMxMCwgNDAwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDM5MCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDQwMCwgNDUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNTIwLCAyOTAsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDEzMCwgMzIwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgIH1cbn07XG5cbmdhbWUuc3RhdGUuYWRkKCdCb290JywgQmFzaWNHYW1lLkJvb3QpO1xuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xuXG4vKiBVbml0cyAqL1xuZnVuY3Rpb24gRW5lbXkoeCwgeSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgIHRoaXMuZGFtYWdlID0gMTA7XG4gICAgdGhpcy5yZXdhcmQgPSAxMDA7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHZhciBwYXRoID0gbWFwUm9hZC5zbGljZSgpO1xuICAgIHZhciB0YXJnZXQgPSBwYXRoWzBdIHx8IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICB9O1xuICAgIHZhciBtb3ZlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIXNlbGYuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIHZhciB2ZWMgPSB7XG4gICAgICAgICAgICB4OiB0YXJnZXQueCAtIHNlbGYuc3ByaXRlLngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueSAtIHNlbGYuc3ByaXRlLnksXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IGRpc3RhbmNlKHRhcmdldCwgc2VsZi5zcHJpdGUpXG4gICAgICAgIGlmKGxlbiA+IHNlbGYuc3BlZWQpe1xuICAgICAgICAgICAgc2VsZi5zcHJpdGUueCArPSB2ZWMueCAqIHNlbGYuc3BlZWQgLyBsZW47XG4gICAgICAgICAgICBzZWxmLnNwcml0ZS55ICs9IHZlYy55ICogc2VsZi5zcGVlZCAvIGxlbjtcbiAgICAgICAgICAgIGlmKHZlYy54ID4gMCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zcHJpdGUuc2NhbGUueCA9IE1hdGguYWJzKHNlbGYuc3ByaXRlLnNjYWxlLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodmVjLnggPCAwKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS5zY2FsZS54ID0gLU1hdGguYWJzKHNlbGYuc3ByaXRlLnNjYWxlLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBwb3M9e3g6MCx5OjB9O1xuICAgICAgICBnYW1lLmlzby51bnByb2plY3Qoc2VsZi5zcHJpdGUsIHBvcyk7XG4gICAgICAgIHNlbGYuc3ByaXRlLmlzb1ggPSBwb3MueDtcbiAgICAgICAgc2VsZi5zcHJpdGUuaXNvWSA9IHBvcy55O1xuICAgICAgICAvLyB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3RoaWVmJywgMjgsIHVuaXRHcm91cCk7XG4gICAgICAgIH07XG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgaWR4ID0gZW5lbWllcy5pbmRleE9mKHNlbGYpO1xuICAgICAgICBpZihpZHghPS0xKXtcbiAgICAgICAgICAgIGVuZW1pZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zcHJpdGUuZGVzdHJveSgpO1xuICAgIH07XG4gICAgdmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBsZW4gPSBkaXN0YW5jZSh0YXJnZXQsIHNlbGYuc3ByaXRlKVxuICAgICAgICBpZihsZW4gPD0gc2VsZi5zcGVlZCl7XG4gICAgICAgICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICB0YXJnZXQgPSBwYXRoWzBdIHx8IHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBpZihwYXRoLmxlbmd0aD09MCl7XG4gICAgICAgICAgICBkZXN0cm95KCk7XG4gICAgICAgICAgICBodXJ0KHNlbGYuZGFtYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm1vdmVUbyA9IGZ1bmN0aW9uKHgsIHkpe1xuICAgICAgICB0YXJnZXQueCA9IHg7XG4gICAgICAgIHRhcmdldC55ID0geTtcbiAgICB9O1xuICAgIHRoaXMuaHVydCA9IGZ1bmN0aW9uKHBvaW50cykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gc2VsZi5oZWFsdGggLSBwb2ludHM7XG4gICAgICAgIHNlbGYuaGVhbHRoID0gKHJlc3VsdCA+PSAwKSA/IHJlc3VsdCA6IDA7XG4gICAgICAgIGlmKHNlbGYuaGVhbHRoPD0wKXtcbiAgICAgICAgICAgIHNlbGYuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIHNjb3JlICs9IHNlbGYucmV3YXJkO1xuICAgICAgICAgICAgdGFyZ2V0ID0ge3g6NDc1LCB5OjU5MH07XG4gICAgICAgICAgICBwYXRoID0gW3RhcmdldF07XG4gICAgICAgICAgICAvLyBkZXN0cm95KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2VsZi5zcHJpdGUudGludCA9PSAweGZmZmZmZil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmLnNwcml0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LDEwMCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmLnNwcml0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zcHJpdGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHNlbGYuYWN0aXZlKXtcbiAgICAgICAgICAgICFzZWxmLmFuaW0uaXNQbGF5aW5nICYmIHNlbGYuYW5pbS5wbGF5KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc2VsZi5hbmltLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRUYXJnZXQoKTtcbiAgICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBlbmVtaWVzLnB1c2godGhpcyk7XG59XG5cbmZ1bmN0aW9uIFRoaWVmKHgsIHkpe1xuICAgIHZhciBwb3MgPSB7eDogMCwgeTogMH07XG4gICAgZ2FtZS5pc28udW5wcm9qZWN0KHt4OngseTp5fSwgcG9zKTtcbiAgICB0aGlzLnNwcml0ZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICd0aGllZicsIDI4LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gMjQ7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gMzY7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDAuOSk7XG4gICAgdGhpcy5hbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnKTtcbiAgICB0aGlzLmFuaW0ucGxheSgxMCwgdHJ1ZSk7XG4gICAgRW5lbXkuY2FsbCh0aGlzLCB4LCB5KTtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDMwO1xuICAgIHRoaXMucmV3YXJkID0gMTAwMDtcbn1cblxuZnVuY3Rpb24gUG9saWNlKHgsIHkpe1xuICAgIHZhciBwb3MgPSB7eDogMCwgeTogMH07XG4gICAgZ2FtZS5pc28udW5wcm9qZWN0KHt4OngseTp5fSwgcG9zKTtcbiAgICB0aGlzLnNwcml0ZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICdwb2xpY2UnLCA1LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gMjQ7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gMzY7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDAuOSk7XG4gICAgdGhpcy5hbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnKTtcbiAgICB0aGlzLmFuaW0ucGxheSgxMCwgdHJ1ZSk7XG4gICAgRW5lbXkuY2FsbCh0aGlzLCB4LCB5KTtcbiAgICB0aGlzLmhlYWx0aCA9IDIwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDIwO1xuICAgIHRoaXMucmV3YXJkID0gMjAwMDtcbn1cblxuZnVuY3Rpb24gRGVmZW5kZXIodGlsZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIG1hcFtbdGlsZS5pc29Cb3VuZHMueCwgdGlsZS5pc29Cb3VuZHMueV1dID0gJ2FjdGl2aXN0JztcbiAgICB0aGlzLmRhbWFnZSA9IDEwO1xuICAgIHRoaXMucmFkaXVzID0gNzA7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUodGlsZS5pc29Cb3VuZHMueCArIDEwLCB0aWxlLmlzb0JvdW5kcy55ICsgMTAsIDAsICdhY3RpdmlzdCcsIDgsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuXG4gICAgdmFyIGFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgncG9zdCcpO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgaWR4ID0gZGVmZW5kZXJzLmluZGV4T2Yoc2VsZik7XG4gICAgICAgIGlmKGlkeCE9LTEpe1xuICAgICAgICAgICAgZGVmZW5kZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc3ByaXRlLmRlc3Ryb3koKTtcbiAgICB9O1xuICAgIHZhciBhdHRhY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZih0YXJnZXQpe1xuICAgICAgICAgICAgdmFyIGRlbHRhVGltZSA9IGdhbWUudGltZS5lbGFwc2VkLzEwMDA7IFxuICAgICAgICAgICAgdGFyZ2V0Lmh1cnQoc2VsZi5kYW1hZ2UqZGVsdGFUaW1lKTtcbiAgICAgICAgICAgIGlmKCFhbmltLmlzUGxheWluZyl7XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KDMsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaXN0ID0gZGlzdGFuY2UoZW5lbWllc1tpXS5zcHJpdGUsIHNlbGYuc3ByaXRlKTtcbiAgICAgICAgICAgIGlmKGRpc3QgPCBzZWxmLnJhZGl1cyl7XG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldCB8fCBkaXN0YW5jZSh0YXJnZXQuc3ByaXRlLCBzZWxmLnNwcml0ZSkgPCBkaXN0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZW5lbWllc1tpXS5oZWFsdGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGVuZW1pZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRhcmdldCl7XG4gICAgICAgICAgICBhbmltLnN0b3AodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBnZXRUYXJnZXQoKTtcbiAgICAgICAgYXR0YWNrKCk7XG4gICAgfVxuICAgIGRlZmVuZGVycy5wdXNoKHRoaXMpO1xufVxuXG5cbi8qIEhlYWx0aCAqL1xuZnVuY3Rpb24gaHVydChwb2ludHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gaGVhbHRoIC0gcG9pbnRzO1xuICAgIGhlYWx0aCA9IChyZXN1bHQgPj0gMCkgPyByZXN1bHQgOiAwO1xuICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG4gICAgdmFyIHNlbGYgPSB0b3dlcjtcbiAgICBpZihwb2ludHMgPiAwICYmIHNlbGYgJiYgc2VsZi50aW50ID09IDB4ZmZmZmZmKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoc2VsZiAmJiBzZWxmKXtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwxMDApO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihzZWxmICYmIHNlbGYpe1xuICAgICAgICAgICAgICAgIHNlbGYudGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LDMwMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoZWFsKHBvaW50cykge1xuICAgIHZhciByZXN1bHQgPSBoZWFsdGggLSBwb2ludHM7XG4gICAgaGVhbHRoID0gKHJlc3VsdCA8IDEwMCkgPyByZXN1bHQgOiAxMDA7XG4gICAgaGVhbHRoQmFyLnNldFBlcmNlbnQoaGVhbHRoKTtcbn1cblxuZnVuY3Rpb24gc3Bhd25FbmVteSh0eXBlKXtcbiAgICBuZXcgVGhpZWYobWFwUm9hZFswXS54LG1hcFJvYWRbMF0ueSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBuZXcgUG9saWNlKG1hcFJvYWRbMF0ueCxtYXBSb2FkWzBdLnkpO1xuICAgIH0sMTAwMClcbn1cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRcIik7XG59XG5cblxuZnVuY3Rpb24gZGlzdGFuY2UodmVjMSwgdmVjMikge1xuICAgIHZhciB2ZWMgPSB7XG4gICAgICAgIHg6IHZlYzEueCAtIHZlYzIueCxcbiAgICAgICAgeTogdmVjMS55IC0gdmVjMi55LFxuICAgIH1cbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZlYy54KnZlYy54ICsgdmVjLnkqdmVjLnkpO1xufSJdfQ==
