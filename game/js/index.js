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
                if (score >= 50 && !([tile.isoBounds.x, tile.isoBounds.y] in map) && tile.key == 'grass_active'){
                    score -= 50;
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
        game.debug.text("Ройзман (???)", 2, 142, "#a7aebe");

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
    var path = mapRoad.slice();
    var target = path[0] || {
        x: x,
        y: y,
    };
    var move = function(){
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