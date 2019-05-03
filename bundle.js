(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Screens (DOM)
var startScreen = document.getElementById('start-screen'),
    endScreen = document.getElementById('end-screen'),
    audio = new Audio('./audio/karliki.mp3'),
    audioPrivet = new Audio('./audio/vsemprivet.mp3'),
    videoContainer = document.getElementById('video');

document.querySelector('.js-button-start').addEventListener('click', () => start());

function start() {
    document.dispatchEvent(new CustomEvent('startGame'));
    startScreen.classList.add('hide');
    endScreen.classList.add('hide');
    audio.play();
}

function end() {
    document.querySelector('video').play();
    startScreen.classList.add('hide');
    endScreen.classList.remove('hide');
}

function epic() {
    audioPrivet.play();
    document.body.classList.add('roizman');
    setTimeout(function () {
        document.body.classList.remove('roizman');
    }, 2200);
}


// Phaser
var game = new Phaser.Game(1024, 650, Phaser.AUTO, 'gameContainer', null, true, false);

var health = 100,
    score = 2000,
    map = {};

var BasicGame = function (game) { };
BasicGame.Boot = function (game) { };

var isGameStart = false;
var statictics;
var timeText;

var isoGroup, unitGroup, cursorPos, cursor, healthBar;
var tiles = [
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
var mapRoad = [{ x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 665.5, y: 583 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 529.5, y: 515 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 767.5, y: 396 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 697.5, y: 361 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 461.5, y: 480 }, { x: 394.5, y: 446 }, { x: 394.5, y: 446 }, { x: 394.5, y: 446 }, { x: 394.5, y: 446 }, { x: 394.5, y: 446 }, { x: 394.5, y: 446 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 664.5, y: 311 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 613.5, y: 286 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 342.5, y: 421 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 255.5, y: 377 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }, { x: 503.5, y: 256 }];

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
    style: { font: "16px IBM Plex Mono", fontWeight: "500", fill: "#fff" },
    boldStyle: { font: "16px IBM Plex Mono", fontWeight: "700", fill: "#fff" },
    largeStyle: { font: "80px IBM Plex Mono", fontWeight: "700", fill: "#fff" },
    whiteStyle: { font: "16px IBM Plex Mono", fontWeight: "500", fill: "#fff" },
}

function skillIsAvailable(name) {
    if (name === 'obnimashki' && health >= 99) {
        return false;
    }

    return !skillIsActive(name) && score >= skills[name].price;
}

function skillIsActive(name) {
    if (skills[name].last_used != null) {
        return (statictics.getTime() * 1000 - skills[name].last_used) < 30 * 1000;
    }
    return false;
}

function buy(skill) {
    var skill_data = skills[skill];
    var price = skill_data.price;

    if (score < price) return;
    score -= price;
    skill_data.last_used = statictics.getTime() * 1000;
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
        init: function () {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        },
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
                if (!tile.selected && inBounds && tile.key == "grass_active") {
                    tile.selected = true;
                    tile.tint = 0x86bfda;
                }
                // If not, revert back to how it was.
                else if (tile.selected && !inBounds) {
                    tile.selected = false;
                    tile.tint = 0xffffff;
                }

                if (tile.selected && game.input.activePointer.isDown) {
                    if (score >= defender_price && !([tile.isoBounds.x, tile.isoBounds.y] in map) && tile.key == 'grass_active') {
                        score -= defender_price;
                        new Defender(tile);
                    }
                }
            });
            game.iso.simpleSort(unitGroup);

            if (health <= 0) {
                end();
            } else {
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
                if (skills[skill].button.input.pointerOver()) {
                    skills[skill].button.tint = 0xbbffbb;
                } else {
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
                    guiText.skills[skill].text = 30 - Math.floor((statictics.getTime() * 1000 - skills[skill].last_used) / 1000) + "с";
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
                    var type = tiles[(i + 1) * mapW - (j + 1)];
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
function Enemy(x, y) {
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
    var move = function () {
        if (!self.active) return;
        var vec = {
            x: target.x - self.sprite.x,
            y: target.y - self.sprite.y,
        }
        var len = distance(target, self.sprite)
        var deltaTime = game.time.elapsed / 1000;
        if (len > self.speed * deltaTime) {
            self.sprite.x += vec.x * self.speed / len * deltaTime;
            self.sprite.y += vec.y * self.speed / len * deltaTime;
            if (vec.x > 0) {
                self.sprite.scale.x = Math.abs(self.sprite.scale.x);
            }
            if (vec.x < 0) {
                self.sprite.scale.x = -Math.abs(self.sprite.scale.x);
            }
        }
        var pos = { x: 0, y: 0 };
        game.iso.unproject(self.sprite, pos);
        self.sprite.isoX = pos.x;
        self.sprite.isoY = pos.y;
        self.healthbar.setPosition(self.sprite.x, self.sprite.y - 40)
        // tile = game.add.isoSprite(pos.x, pos.y, 0, 'thief', 28, unitGroup);
    };
    this.destroy = function () {
        var idx = enemies.indexOf(self);
        if (idx != -1) {
            enemies.splice(idx, 1);
        }
        self.sprite.destroy();
        self.healthbar.kill();
    };
    var getTarget = function () {
        var len = distance(target, self.sprite)
        var deltaTime = game.time.elapsed / 1000;
        if (len <= self.speed * deltaTime) {
            path.shift();
            target = path[0] || target;
        }
        if (path.length == 0) {
            self.destroy();
            hurt(self.damage);
        }
    };

    this.freeze = function () {
        if (target.x === 475 && target.y === 590) return;
        self.active = false;
    }

    this.unfreeze = function () {
        self.active = true;
    }

    this.moveTo = function (x, y) {
        target.x = x;
        target.y = y;
    };
    this.hurt = function (points) {
        maxHealth = Math.max(maxHealth, self.health);
        var result = self.health - points;
        self.health = (result >= 0) ? result : 0;
        self.healthbar.setPercent(self.health / maxHealth * 100);
        if (self.health <= 0) {
            self.damage = 0;
            score += self.reward;
            statictics.money += self.reward;
            target = { x: 475, y: 590 };
            path = [target];
            self.unfreeze();
            // destroy();
            self.healthbar.bgSprite.visible = false;
            self.healthbar.barSprite.visible = false;
            statictics.kills++;
            return;
        }
        if (self.sprite.tint == 0xffffff) {
            setTimeout(function () {
                if (self && self.sprite) {
                    self.sprite.tint = 0xff0000;
                }
            }, 100);
            setTimeout(function () {
                if (self && self.sprite) {
                    self.sprite.tint = 0xffffff;
                }
            }, 300);
        }
    }
    this.sprite.update = function () {
        if (self.active) {
            !self.anim.isPlaying && self.anim.play();
        } else {
            self.anim.stop();
        }
        getTarget();
        move();
    }
    enemies.push(this);
}

function Thief(x, y) {
    var pos = { x: 0, y: 0 };
    game.iso.unproject({ x: x, y: y }, pos);
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

function Police(x, y) {
    var pos = { x: 0, y: 0 };
    game.iso.unproject({ x: x, y: y }, pos);
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

function Boss(x, y) {
    var pos = { x: 0, y: 0 };
    game.iso.unproject({ x: x, y: y }, pos);
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

function Defender(tile) {
    var self = this;
    map[[tile.isoBounds.x, tile.isoBounds.y]] = 'activist';
    this.damage = 45;
    this.radius = 70;
    this.sprite = game.add.isoSprite(tile.isoBounds.x + 10, tile.isoBounds.y + 10, 0, 'activist', 8, unitGroup);
    this.sprite.anchor.set(0.5, 1);

    var anim = this.sprite.animations.add('post');
    var target;
    var destroy = function () {
        var idx = defenders.indexOf(self);
        if (idx != -1) {
            defenders.splice(idx, 1);
        }
        self.sprite.destroy();
    };
    var attack = function () {
        if (target) {
            var deltaTime = game.time.elapsed / 1000;
            target.hurt(self.damage * deltaTime);
            if (!anim.isPlaying) {
                anim.play(3, true);
            }
        }
    };
    var getTarget = function () {
        var dist;
        target = undefined;
        for (var i = 0; i < enemies.length; i++) {
            dist = distance(enemies[i].sprite, self.sprite);
            if (dist < self.radius) {
                if (!target || distance(target.sprite, self.sprite) < dist) {
                    if (enemies[i].health > 0) {
                        target = enemies[i];
                    }
                }
            }
        }
        if (!target) {
            anim.stop(true);
        }
    };
    this.sprite.update = function () {
        getTarget();
        attack();
    }
    defenders.push(this);
}


function startGame() {
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


function hurt(points) {
    var result = health - points;
    health = (result >= 0) ? result : 0;
    healthBar.setPercent(health);
    var self = tower;
    if (points > 0 && self && self.tint == 0xffffff) {
        setTimeout(function () {
            if (self && self) {
                self.tint = 0xff0000;
            }
        }, 100);
        setTimeout(function () {
            if (self && self) {
                self.tint = 0xffffff;
            }
        }, 300);
    }
}

function heal(points, speed) {
    if (points > 0) {
        var result = health + speed;
        health = (result < 100) ? result : 100;
        healthBar.setPercent(health);
        timer.add(1000, heal.bind(this, points - speed, speed));
    }
}

function spawnEnemy(gameClass) {
    return new gameClass(mapRoad[0].x, mapRoad[0].y);
}


function distance(vec1, vec2) {
    var iso1 = { x: 0, y: 0 };
    var iso2 = { x: 0, y: 0 };
    game.iso.unproject(vec1, iso1);
    game.iso.unproject(vec2, iso2);
    var vec = {
        x: iso1.x - iso2.x,
        y: iso1.y - iso2.y,
    }
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

window.Wave = Wave;
window.Thief = Thief;
window.Police = Police;

function Wave(enemies, rate, pause) {
    var self = this;
    var pack = [];
    var current;
    this.factor = 1;
    this.finish = new Phaser.Signal();

    function spawn() {
        pack = pack.filter(function (a) { return a.count > 0 });
        if (pack.length) {
            current = pack[Math.floor(Math.random() * pack.length)];
            current.count -= 1;
            var enemy = spawnEnemy(current.class);
            enemy.health = enemy.health * self.factor;
            timer.add((rate[0] + (rate[1] - rate[0]) * Math.random()), spawn);
        } else {
            self.finish.dispatch();
        }
    }
    this.start = function () {
        pack = [];
        for (var i = 0; i < enemies.length / 2; i++) {
            pack.push({
                "class": enemies[2 * i],
                "count": enemies[2 * i + 1] * self.factor,
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
        if (queue.length > 0) {
            current = queue[0];
            queue.shift();
            current.finish.add(startWave);
            current.factor = self.factor;
            current.start();

        } else {
            if (repeats != 0) {
                self.factor = self.factor * count_factor;
                timer.add(pause, startWave);
                repeats--;
                queue = waves.slice();
            }
        }
    }
    timer.add(0, startWave);
}

function Statictics() {
    var time = 0;
    this.getTime = function () {
        return Math.floor(time / 1000);
    }
    this.update = function () {
        time += game.time.elapsed;
    }
    this.money = 0;
    this.kills = 0;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gU2NyZWVucyAoRE9NKVxudmFyIHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpLFxuICAgIGVuZFNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtc2NyZWVuJyksXG4gICAgYXVkaW8gPSBuZXcgQXVkaW8oJy4vYXVkaW8va2FybGlraS5tcDMnKSxcbiAgICBhdWRpb1ByaXZldCA9IG5ldyBBdWRpbygnLi9hdWRpby92c2VtcHJpdmV0Lm1wMycpLFxuICAgIHZpZGVvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvJyk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1idXR0b24tc3RhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHN0YXJ0KCkpO1xuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc3RhcnRHYW1lJykpO1xuICAgIHN0YXJ0U2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIGF1ZGlvLnBsYXkoKTtcbn1cblxuZnVuY3Rpb24gZW5kKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykucGxheSgpO1xuICAgIHN0YXJ0U2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xufVxuXG5mdW5jdGlvbiBlcGljKCkge1xuICAgIGF1ZGlvUHJpdmV0LnBsYXkoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JvaXptYW4nKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyb2l6bWFuJyk7XG4gICAgfSwgMjIwMCk7XG59XG5cblxuLy8gUGhhc2VyXG52YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMDI0LCA2NTAsIFBoYXNlci5BVVRPLCAnZ2FtZUNvbnRhaW5lcicsIG51bGwsIHRydWUsIGZhbHNlKTtcblxudmFyIGhlYWx0aCA9IDEwMCxcbiAgICBzY29yZSA9IDIwMDAsXG4gICAgbWFwID0ge307XG5cbnZhciBCYXNpY0dhbWUgPSBmdW5jdGlvbiAoZ2FtZSkgeyB9O1xuQmFzaWNHYW1lLkJvb3QgPSBmdW5jdGlvbiAoZ2FtZSkgeyB9O1xuXG52YXIgaXNHYW1lU3RhcnQgPSBmYWxzZTtcbnZhciBzdGF0aWN0aWNzO1xudmFyIHRpbWVUZXh0O1xuXG52YXIgaXNvR3JvdXAsIHVuaXRHcm91cCwgY3Vyc29yUG9zLCBjdXJzb3IsIGhlYWx0aEJhcjtcbnZhciB0aWxlcyA9IFtcbiAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG4gICAgMCwgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCxcbiAgICAwLCAwLCAwLCAwLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAxLCAxLCAxLCAxLCAwLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDMsIDEsIDEsIDAsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMSwgMSwgMSwgMCwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAxLCAxLCAxLCAxLCAwLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDEsIDEsIDEsIDAsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMCwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDAsIDAsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAxLCAyLCAyLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDEsIDIsIDIsIDAsIDAsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMCwgMCwgMCxcbiAgICAwLCAwLCAwLCAyLCAyLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAyLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDIsIDIsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDAsIDAsIDAsIDAsXG4gICAgMCwgMCwgMCwgMiwgMiwgMSwgMiwgMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgICA0LCA0LCA0LCA0LCA0LCAxLCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LFxuICAgIDQsIDQsIDQsIDQsIDQsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsXG4gICAgNCwgNCwgNCwgNCwgNCwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCxcbiAgICAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuICAgIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5dXG52YXIgdGlsZVR5cGVzID0ge1xuICAgIDA6ICdncmFzcycsXG4gICAgMTogJ3JvYWQnLFxuICAgIDI6ICdncmFzc19hY3RpdmUnLFxuICAgIDM6ICd0b3dlcicsXG4gICAgNDogJ3dhdGVyJ1xufVxudmFyIG1hcFcgPSAyNTtcbnZhciBtYXBIID0gdGlsZXMubGVuZ3RoIC8gbWFwVztcbi8vIHdpbmRvdy5tYXBFZGl0b3IgPSBbXTtcbnZhciBtYXBSb2FkID0gW3sgeDogNjY1LjUsIHk6IDU4MyB9LCB7IHg6IDY2NS41LCB5OiA1ODMgfSwgeyB4OiA2NjUuNSwgeTogNTgzIH0sIHsgeDogNjY1LjUsIHk6IDU4MyB9LCB7IHg6IDY2NS41LCB5OiA1ODMgfSwgeyB4OiA2NjUuNSwgeTogNTgzIH0sIHsgeDogNjY1LjUsIHk6IDU4MyB9LCB7IHg6IDY2NS41LCB5OiA1ODMgfSwgeyB4OiA1MjkuNSwgeTogNTE1IH0sIHsgeDogNTI5LjUsIHk6IDUxNSB9LCB7IHg6IDUyOS41LCB5OiA1MTUgfSwgeyB4OiA1MjkuNSwgeTogNTE1IH0sIHsgeDogNTI5LjUsIHk6IDUxNSB9LCB7IHg6IDUyOS41LCB5OiA1MTUgfSwgeyB4OiA1MjkuNSwgeTogNTE1IH0sIHsgeDogNzY3LjUsIHk6IDM5NiB9LCB7IHg6IDc2Ny41LCB5OiAzOTYgfSwgeyB4OiA3NjcuNSwgeTogMzk2IH0sIHsgeDogNzY3LjUsIHk6IDM5NiB9LCB7IHg6IDc2Ny41LCB5OiAzOTYgfSwgeyB4OiA3NjcuNSwgeTogMzk2IH0sIHsgeDogNzY3LjUsIHk6IDM5NiB9LCB7IHg6IDc2Ny41LCB5OiAzOTYgfSwgeyB4OiA3NjcuNSwgeTogMzk2IH0sIHsgeDogNzY3LjUsIHk6IDM5NiB9LCB7IHg6IDc2Ny41LCB5OiAzOTYgfSwgeyB4OiA2OTcuNSwgeTogMzYxIH0sIHsgeDogNjk3LjUsIHk6IDM2MSB9LCB7IHg6IDY5Ny41LCB5OiAzNjEgfSwgeyB4OiA2OTcuNSwgeTogMzYxIH0sIHsgeDogNjk3LjUsIHk6IDM2MSB9LCB7IHg6IDY5Ny41LCB5OiAzNjEgfSwgeyB4OiA2OTcuNSwgeTogMzYxIH0sIHsgeDogNjk3LjUsIHk6IDM2MSB9LCB7IHg6IDY5Ny41LCB5OiAzNjEgfSwgeyB4OiA2OTcuNSwgeTogMzYxIH0sIHsgeDogNDYxLjUsIHk6IDQ4MCB9LCB7IHg6IDQ2MS41LCB5OiA0ODAgfSwgeyB4OiA0NjEuNSwgeTogNDgwIH0sIHsgeDogNDYxLjUsIHk6IDQ4MCB9LCB7IHg6IDQ2MS41LCB5OiA0ODAgfSwgeyB4OiA0NjEuNSwgeTogNDgwIH0sIHsgeDogNDYxLjUsIHk6IDQ4MCB9LCB7IHg6IDQ2MS41LCB5OiA0ODAgfSwgeyB4OiAzOTQuNSwgeTogNDQ2IH0sIHsgeDogMzk0LjUsIHk6IDQ0NiB9LCB7IHg6IDM5NC41LCB5OiA0NDYgfSwgeyB4OiAzOTQuNSwgeTogNDQ2IH0sIHsgeDogMzk0LjUsIHk6IDQ0NiB9LCB7IHg6IDM5NC41LCB5OiA0NDYgfSwgeyB4OiA2NjQuNSwgeTogMzExIH0sIHsgeDogNjY0LjUsIHk6IDMxMSB9LCB7IHg6IDY2NC41LCB5OiAzMTEgfSwgeyB4OiA2NjQuNSwgeTogMzExIH0sIHsgeDogNjY0LjUsIHk6IDMxMSB9LCB7IHg6IDY2NC41LCB5OiAzMTEgfSwgeyB4OiA2NjQuNSwgeTogMzExIH0sIHsgeDogNjEzLjUsIHk6IDI4NiB9LCB7IHg6IDYxMy41LCB5OiAyODYgfSwgeyB4OiA2MTMuNSwgeTogMjg2IH0sIHsgeDogNjEzLjUsIHk6IDI4NiB9LCB7IHg6IDYxMy41LCB5OiAyODYgfSwgeyB4OiA2MTMuNSwgeTogMjg2IH0sIHsgeDogNjEzLjUsIHk6IDI4NiB9LCB7IHg6IDM0Mi41LCB5OiA0MjEgfSwgeyB4OiAzNDIuNSwgeTogNDIxIH0sIHsgeDogMzQyLjUsIHk6IDQyMSB9LCB7IHg6IDM0Mi41LCB5OiA0MjEgfSwgeyB4OiAzNDIuNSwgeTogNDIxIH0sIHsgeDogMzQyLjUsIHk6IDQyMSB9LCB7IHg6IDM0Mi41LCB5OiA0MjEgfSwgeyB4OiAyNTUuNSwgeTogMzc3IH0sIHsgeDogMjU1LjUsIHk6IDM3NyB9LCB7IHg6IDI1NS41LCB5OiAzNzcgfSwgeyB4OiAyNTUuNSwgeTogMzc3IH0sIHsgeDogMjU1LjUsIHk6IDM3NyB9LCB7IHg6IDI1NS41LCB5OiAzNzcgfSwgeyB4OiAyNTUuNSwgeTogMzc3IH0sIHsgeDogNTAzLjUsIHk6IDI1NiB9LCB7IHg6IDUwMy41LCB5OiAyNTYgfSwgeyB4OiA1MDMuNSwgeTogMjU2IH0sIHsgeDogNTAzLjUsIHk6IDI1NiB9LCB7IHg6IDUwMy41LCB5OiAyNTYgfSwgeyB4OiA1MDMuNSwgeTogMjU2IH0sIHsgeDogNTAzLjUsIHk6IDI1NiB9XTtcblxudmFyIHNraWxscyA9IHtcbiAgICAncm9vZmVycyc6IHtcbiAgICAgICAgJ3ByaWNlJzogMzAwMCxcbiAgICAgICAgJ2xhc3RfdXNlZCc6IG51bGwsXG4gICAgICAgICdidXR0b24nOiBudWxsLFxuICAgICAgICAndGltZXJfY29vcmRzJzogWzMwMCwgNjVdLFxuICAgICAgICAnc3ByaXRlJzogbnVsbFxuICAgIH0sXG4gICAgJ29ibmltYXNoa2knOiB7XG4gICAgICAgICdwcmljZSc6IDUwMDAsXG4gICAgICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAgICAgJ3RpbWVyX2Nvb3Jkcyc6IFszMDAsIDExMF0sXG4gICAgICAgICdzcHJpdGUnOiBudWxsXG4gICAgfSxcbiAgICAncm9pem1hbic6IHtcbiAgICAgICAgJ3ByaWNlJzogMTAwMDAsXG4gICAgICAgICdsYXN0X3VzZWQnOiBudWxsLFxuICAgICAgICAnYnV0dG9uJzogbnVsbCxcbiAgICAgICAgJ3RpbWVyX2Nvb3Jkcyc6IFszMDAsIDE1NV1cbiAgICB9XG59O1xudmFyIGRlZmVuZGVyX3ByaWNlID0gMTAwMFxudmFyIGVuZW1pZXMgPSBbXTtcbnZhciBkZWZlbmRlcnMgPSBbXTtcblxudmFyIGd1aVRleHQgPSB7XG4gICAgc3R5bGU6IHsgZm9udDogXCIxNnB4IElCTSBQbGV4IE1vbm9cIiwgZm9udFdlaWdodDogXCI1MDBcIiwgZmlsbDogXCIjZmZmXCIgfSxcbiAgICBib2xkU3R5bGU6IHsgZm9udDogXCIxNnB4IElCTSBQbGV4IE1vbm9cIiwgZm9udFdlaWdodDogXCI3MDBcIiwgZmlsbDogXCIjZmZmXCIgfSxcbiAgICBsYXJnZVN0eWxlOiB7IGZvbnQ6IFwiODBweCBJQk0gUGxleCBNb25vXCIsIGZvbnRXZWlnaHQ6IFwiNzAwXCIsIGZpbGw6IFwiI2ZmZlwiIH0sXG4gICAgd2hpdGVTdHlsZTogeyBmb250OiBcIjE2cHggSUJNIFBsZXggTW9ub1wiLCBmb250V2VpZ2h0OiBcIjUwMFwiLCBmaWxsOiBcIiNmZmZcIiB9LFxufVxuXG5mdW5jdGlvbiBza2lsbElzQXZhaWxhYmxlKG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PT0gJ29ibmltYXNoa2knICYmIGhlYWx0aCA+PSA5OSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICFza2lsbElzQWN0aXZlKG5hbWUpICYmIHNjb3JlID49IHNraWxsc1tuYW1lXS5wcmljZTtcbn1cblxuZnVuY3Rpb24gc2tpbGxJc0FjdGl2ZShuYW1lKSB7XG4gICAgaWYgKHNraWxsc1tuYW1lXS5sYXN0X3VzZWQgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gKHN0YXRpY3RpY3MuZ2V0VGltZSgpICogMTAwMCAtIHNraWxsc1tuYW1lXS5sYXN0X3VzZWQpIDwgMzAgKiAxMDAwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJ1eShza2lsbCkge1xuICAgIHZhciBza2lsbF9kYXRhID0gc2tpbGxzW3NraWxsXTtcbiAgICB2YXIgcHJpY2UgPSBza2lsbF9kYXRhLnByaWNlO1xuXG4gICAgaWYgKHNjb3JlIDwgcHJpY2UpIHJldHVybjtcbiAgICBzY29yZSAtPSBwcmljZTtcbiAgICBza2lsbF9kYXRhLmxhc3RfdXNlZCA9IHN0YXRpY3RpY3MuZ2V0VGltZSgpICogMTAwMDtcbn1cblxuZnVuY3Rpb24gYnV5Um9vZmVycygpIHtcbiAgICBidXkoJ3Jvb2ZlcnMnKTtcblxuICAgIHZhciBlbm0gPSBlbmVtaWVzLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbm0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZW5tW2ldLmZyZWV6ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYnV5T2JuaW1hc2hraSgpIHtcbiAgICBpZiAoaGVhbHRoID49IDk5KSByZXR1cm47XG5cbiAgICBidXkoJ29ibmltYXNoa2knKTtcblxuICAgIGhlYWwoMzAsIDIpO1xufVxuXG5mdW5jdGlvbiBidXlSb2l6bWFuKCkge1xuICAgIGJ1eSgncm9pem1hbicpO1xuXG4gICAgZXBpYygpO1xuXG4gICAgdmFyIGVubSA9IGVuZW1pZXMuc2xpY2UoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVubS5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbm1baV0uZGVzdHJveSgpO1xuICAgIH1cbn1cblxudmFyIHRpbWVyO1xuXG52YXIgd2F0ZXIgPSBbXTtcblxudmFyIHRvd2VyO1xuXG52YXIgaGVhbHRoYmFyRW5lbXlDb25maWcgPSB7XG4gICAgd2lkdGg6IDMwLFxuICAgIGhlaWdodDogMyxcbiAgICBiZzoge1xuICAgICAgICBjb2xvcjogJyM4ZTIwMjAnXG4gICAgfSxcbiAgICBiYXI6IHtcbiAgICAgICAgY29sb3I6ICcjZmUwMDAwJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uRHVyYXRpb246IDEwMCxcbiAgICBmbGlwcGVkOiBmYWxzZVxufTtcbkJhc2ljR2FtZS5Cb290LnByb3RvdHlwZSA9XG4gICAge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgICAgIH0sXG4gICAgICAgIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vINCU0LAt0LTQsCwg0Y3RgtC+INGG0LXQvdGLXG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS0xMDAwJywgJy4vaW1nL2J1eS9idXktMTAwMC5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTIwMDAnLCAnLi9pbWcvYnV5L2J1eS0yMDAwLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktMzAwMCcsICcuL2ltZy9idXkvYnV5LTMwMDAucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS01MDAwJywgJy4vaW1nL2J1eS9idXktNTAwMC5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LTEwMDAwJywgJy4vaW1nL2J1eS9idXktMTAwMDAucG5nJyk7XG4gICAgICAgICAgICAvLyDQlNCwLdC00LAsINC00LjQt9GN0LnQsdC7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC0xMDAwJywgJy4vaW1nL2J1eS9idXktZGlzYWJsZWQtMTAwMC5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTIwMDAnLCAnLi9pbWcvYnV5L2J1eS1kaXNhYmxlZC0yMDAwLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdidXktZGlzYWJsZWQtMzAwMCcsICcuL2ltZy9idXkvYnV5LWRpc2FibGVkLTMwMDAucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2J1eS1kaXNhYmxlZC01MDAwJywgJy4vaW1nL2J1eS9idXktZGlzYWJsZWQtNTAwMC5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnYnV5LWRpc2FibGVkLTEwMDAwJywgJy4vaW1nL2J1eS9idXktZGlzYWJsZWQtMTAwMDAucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3RyZWUxJywgJy4vaW1nL3RyZWUxLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0cmVlMicsICcuL2ltZy90cmVlMi5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgncm9hZCcsICcuL2ltZy9yb2FkLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdncmFzcycsICcuL2ltZy9ncmFzcy5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnZ3Jhc3NfYWN0aXZlJywgJy4vaW1nL2dyYXNzX2FjdGl2ZS5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnd2F0ZXInLCAnLi9pbWcvd2F0ZXIucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3Rvd2VyJywgJy4vaW1nL3Rvd2VyLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0b3dlci1mbGFnJywgJy4vaW1nL3Rvd2VyLWZsYWcucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BpY2t1cC1idXJuaW5nJywgJy4vaW1nL3BpY2t1cC1idXJuaW5nLnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdkZXZ5YXRrYScsICcuL2ltZy9kZXZ5YXRrYS5wbmcnKTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZSgnbW9uZXknLCAnLi9pbWcvbW9uZXkucG5nJyk7XG4gICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2hlYXJ0JywgJy4vaW1nL2hlYXJ0LnBuZycpO1xuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdmcmllbmRzJywgJy4vaW1nL2ZyaWVuZHMucG5nJyk7XG5cbiAgICAgICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnYWN0aXZpc3QnLCAnLi9pbWcvYWN0aXZpc3QucG5nJywgMzIsIDY0LCA4KTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgndGhpZWYnLCAnLi9pbWcvdGhpZWYucG5nJywgMTI4LCAxODQsIDI4KTtcbiAgICAgICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncG9saWNlJywgJy4vaW1nL3BvbGljZS5wbmcnLCAxMjgsIDIxOCwgNSk7XG5cbiAgICAgICAgICAgIGdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XG4gICAgICAgICAgICBnYW1lLnBsdWdpbnMuYWRkKG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYyhnYW1lKSk7XG5cbiAgICAgICAgICAgIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGx1Z2luLklzb21ldHJpYy5JU09BUkNBREUpO1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIHNldCBhIGdhbWUgY2FudmFzLWJhc2VkIG9mZnNldCBmb3IgdGhlIDAsIDAsIDAgaXNvbWV0cmljIGNvb3JkaW5hdGUgLSBieSBkZWZhdWx0XG4gICAgICAgICAgICAvLyB0aGlzIHBvaW50IHdvdWxkIGJlIGF0IHNjcmVlbiBjb29yZGluYXRlcyAwLCAwICh0b3AgbGVmdCkgd2hpY2ggaXMgdXN1YWxseSB1bmRlc2lyYWJsZS5cbiAgICAgICAgICAgIGdhbWUuaXNvLmFuY2hvci5zZXRUbygwLjUsIDAuMyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZ3JvdXAgZm9yIG91ciB0aWxlcy5cbiAgICAgICAgICAgIGlzb0dyb3VwID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgICAgIGlzb0dyb3VwLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICAgICAgaXNvR3JvdXAucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSVNPQVJDQURFO1xuXG4gICAgICAgICAgICB1bml0R3JvdXAgPSBnYW1lLmFkZC5ncm91cCgpO1xuXG4gICAgICAgICAgICAvLyBMZXQncyBtYWtlIGEgbG9hZCBvZiB0aWxlcyBvbiBhIGdyaWQuXG4gICAgICAgICAgICB0aGlzLnNwYXduVGlsZXMoKTtcblxuICAgICAgICAgICAgLy8gUHJvdmlkZSBhIDNEIHBvc2l0aW9uIGZvciB0aGUgY3Vyc29yXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuZXcgUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuUG9pbnQzKCk7XG5cbiAgICAgICAgICAgIHZhciByZWN0YW5nbGUgPSBuZXcgUGhhc2VyLlJlY3RhbmdsZShnYW1lLndpZHRoIC0gMjMwLCAxMCwgMTcwLCAyMCk7XG4gICAgICAgICAgICB2YXIgYm1kID0gZ2FtZS5hZGQuYml0bWFwRGF0YShnYW1lLndpZHRoLCBnYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBibWQucmVjdChyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIHJlY3RhbmdsZS53aWR0aCwgcmVjdGFuZ2xlLmhlaWdodCwgJyMyZDJkMmQnKTtcbiAgICAgICAgICAgIGJtZC5hZGRUb1dvcmxkKCk7XG5cbiAgICAgICAgICAgIHZhciBoZWFsdGhiYXJDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE2NixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE2LFxuICAgICAgICAgICAgICAgIHg6IGdhbWUud2lkdGggLSAxNDUsXG4gICAgICAgICAgICAgICAgeTogMjAsXG4gICAgICAgICAgICAgICAgYmc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjOGUyMDIwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmFyOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZlMDAwMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiA2MDAsXG4gICAgICAgICAgICAgICAgZmxpcHBlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnYW1lLmlucHV0Lm1vdXNlLmNhcHR1cmUgPSB0cnVlO1xuICAgICAgICAgICAgaGVhbHRoQmFyID0gbmV3IEhlYWx0aEJhcihnYW1lLCBoZWFsdGhiYXJDb25maWcpO1xuICAgICAgICAgICAgaGVhbHRoQmFyLnNldFBlcmNlbnQoaGVhbHRoKTtcblxuICAgICAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMjEwLCA2MCwgXCJidXktZGlzYWJsZWQtMzAwMFwiKTtcbiAgICAgICAgICAgIGdhbWUuYWRkLmltYWdlKDIxMCwgMTA1LCBcImJ1eS1kaXNhYmxlZC01MDAwXCIpO1xuICAgICAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoMjEwLCAxNTAsIFwiYnV5LWRpc2FibGVkLTEwMDAwXCIpO1xuICAgICAgICAgICAgZ2FtZS5hZGQuaW1hZ2UoZ2FtZS53aWR0aCAtIDI3NSwgNSwgJ2hlYXJ0Jyk7XG4gICAgICAgICAgICBnYW1lLmFkZC5pbWFnZShnYW1lLndpZHRoIC0gMjc3LCA1NSwgXCJtb25leVwiKTtcbiAgICAgICAgICAgIHNraWxsc1sncm9vZmVycyddWydidXR0b24nXSA9IGdhbWUuYWRkLmJ1dHRvbigyMTAsIDYwLCAnYnV5LTMwMDAnLCBidXlSb29mZXJzLCB0aGlzLCAyLCAxLCAwKTtcbiAgICAgICAgICAgIHNraWxsc1snb2JuaW1hc2hraSddWydidXR0b24nXSA9IGdhbWUuYWRkLmJ1dHRvbigyMTAsIDEwNSwgJ2J1eS01MDAwJywgYnV5T2JuaW1hc2hraSwgdGhpcywgMiwgMSwgMCk7XG4gICAgICAgICAgICBza2lsbHNbJ3JvaXptYW4nXVsnYnV0dG9uJ10gPSBnYW1lLmFkZC5idXR0b24oMjEwLCAxNTAsICdidXktMTAwMDAnLCBidXlSb2l6bWFuLCB0aGlzLCAyLCAxLCAwKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN0YXJ0R2FtZVwiLCBzdGFydEdhbWUpO1xuXG4gICAgICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDIwLCBcItCh0YPQv9C10YDRgdC/0L7RgdC+0LHQvdC+0YHRgtC4XCIsIGd1aVRleHQuYm9sZFN0eWxlKTtcbiAgICAgICAgICAgIGdhbWUuYWRkLnRleHQoMiwgNjUsIFwi0KDRg9GE0LXRgNGLIChGcmVlemUpXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICAgICAgZ2FtZS5hZGQudGV4dCgyLCAxMTAsIFwi0J7QsdC90LjQvNCw0YjQutC4ICgrMzAgaHApXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICAgICAgZ2FtZS5hZGQudGV4dCgyLCAxNTUsIFwi0KDQvtC50LfQvNCw0L1cIiwgZ3VpVGV4dC5zdHlsZSk7XG5cbiAgICAgICAgICAgIHRpbWVUZXh0ID0gZ2FtZS5hZGQudGV4dCgyLCA2NTAgLSAxNTAsIFwiXCIsIGd1aVRleHQubGFyZ2VTdHlsZSk7XG4gICAgICAgICAgICBnYW1lLmFkZC50ZXh0KDIsIDY1MCAtIDMwLCBcItCR0LDRiNC90Y8g0L/RgNC+0LTQtdGA0LbQsNC70LDRgdGMXCIsIGd1aVRleHQuc3R5bGUpO1xuXG4gICAgICAgICAgICBndWlUZXh0LmhlYWx0aCA9IGdhbWUuYWRkLnRleHQoZ2FtZS53aWR0aCAtIDE2MCwgMTAsIGhlYWx0aCwgZ3VpVGV4dC53aGl0ZVN0eWxlKTtcbiAgICAgICAgICAgIGd1aVRleHQuc2NvcmUgPSBnYW1lLmFkZC50ZXh0KGdhbWUud2lkdGggLSAyMzAsIDYwLCBzY29yZSwgZ3VpVGV4dC5zdHlsZSk7XG5cbiAgICAgICAgICAgIGd1aVRleHQuc2tpbGxzID0ge31cbiAgICAgICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgICAgICAgZ3VpVGV4dC5za2lsbHNbc2tpbGxdID0gZ2FtZS5hZGQudGV4dChza2lsbHNbc2tpbGxdLnRpbWVyX2Nvb3Jkc1swXSwgc2tpbGxzW3NraWxsXS50aW1lcl9jb29yZHNbMV0sIFwiXCIsIGd1aVRleHQuc3R5bGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aW1lciA9IGdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdW5kZXJzdGFuZCB0aGF0IHNjcmVlbi10by1pc29tZXRyaWMgcHJvamVjdGlvbiBtZWFucyB5b3UgaGF2ZSB0byBzcGVjaWZ5IGEgeiBwb3NpdGlvbiBtYW51YWxseSwgYXMgdGhpcyBjYW5ub3QgYmUgZWFzaWx5XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVkIGZyb20gdGhlIDJEIHBvaW50ZXIgcG9zaXRpb24gd2l0aG91dCBleHRyYSB0cmlja2VyeS4gQnkgZGVmYXVsdCwgdGhlIHogcG9zaXRpb24gaXMgMCBpZiBub3Qgc2V0LlxuICAgICAgICAgICAgZ2FtZS5pc28udW5wcm9qZWN0KGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5wb3NpdGlvbiwgY3Vyc29yUG9zKTtcblxuICAgICAgICAgICAgd2F0ZXIuZm9yRWFjaChmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgICAgIHcuaXNvWiA9IC0xICsgKC0xICogTWF0aC5zaW4oKGdhbWUudGltZS5ub3cgKyAody5pc29YICogNSkpICogMC4wMDQpKSArICgtMSAqIE1hdGguc2luKChnYW1lLnRpbWUubm93ICsgKHcuaXNvWSAqIDgpKSAqIDAuMDA1KSk7XG4gICAgICAgICAgICAgICAgdy5hbHBoYSA9IFBoYXNlci5NYXRoLmNsYW1wKDEgKyAody5pc29aICogMC4xKSwgMC4xLCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aWxlcyBhbmQgdGVzdCB0byBzZWUgaWYgdGhlIDNEIHBvc2l0aW9uIGZyb20gYWJvdmUgaW50ZXJzZWN0cyB3aXRoIHRoZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBJc29TcHJpdGUgdGlsZSBib3VuZHMuXG4gICAgICAgICAgICBpc29Hcm91cC5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluQm91bmRzID0gdGlsZS5pc29Cb3VuZHMuY29udGFpbnNYWShjdXJzb3JQb3MueCwgY3Vyc29yUG9zLnkpO1xuICAgICAgICAgICAgICAgIC8vIElmIGl0IGRvZXMsIGRvIGEgbGl0dGxlIGFuaW1hdGlvbiBhbmQgdGludCBjaGFuZ2UuXG4gICAgICAgICAgICAgICAgaWYgKCF0aWxlLnNlbGVjdGVkICYmIGluQm91bmRzICYmIHRpbGUua2V5ID09IFwiZ3Jhc3NfYWN0aXZlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRpbGUudGludCA9IDB4ODZiZmRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiBub3QsIHJldmVydCBiYWNrIHRvIGhvdyBpdCB3YXMuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGlsZS5zZWxlY3RlZCAmJiAhaW5Cb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGlsZS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLnRpbnQgPSAweGZmZmZmZjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGlsZS5zZWxlY3RlZCAmJiBnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZSA+PSBkZWZlbmRlcl9wcmljZSAmJiAhKFt0aWxlLmlzb0JvdW5kcy54LCB0aWxlLmlzb0JvdW5kcy55XSBpbiBtYXApICYmIHRpbGUua2V5ID09ICdncmFzc19hY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSAtPSBkZWZlbmRlcl9wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEZWZlbmRlcih0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2FtZS5pc28uc2ltcGxlU29ydCh1bml0R3JvdXApO1xuXG4gICAgICAgICAgICBpZiAoaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgICBlbmQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzR2FtZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY3RpY3MudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXNraWxsSXNBY3RpdmUoJ3Jvb2ZlcnMnKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBlbmVtaWVzW2ldLnVuZnJlZXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGd1aVRleHQuaGVhbHRoLnRleHQgPSBoZWFsdGg7XG4gICAgICAgICAgICBndWlUZXh0LnNjb3JlLnRleHQgPSBzY29yZTtcblxuICAgICAgICAgICAgaWYgKGlzR2FtZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGltZVRleHQuc2V0VGV4dChzdGF0aWN0aWNzLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoc2tpbGwgaW4gc2tpbGxzKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxzW3NraWxsXS5idXR0b24udmlzaWJsZSA9IHNraWxsSXNBdmFpbGFibGUoc2tpbGwpO1xuICAgICAgICAgICAgICAgIGlmIChza2lsbHNbc2tpbGxdLmJ1dHRvbi5pbnB1dC5wb2ludGVyT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uYnV0dG9uLnRpbnQgPSAweGJiZmZiYjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLmJ1dHRvbi50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGd1aVRleHQuc2tpbGxzW3NraWxsXS50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxJc0FjdGl2ZShza2lsbCkgJiYgc2tpbGxzW3NraWxsXS5sYXN0X3VzZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdyb29mZXJzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsc1tza2lsbF0uc3ByaXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3NiwgNzYsIDAsICd0b3dlci1mbGFnJywgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlID0gdGlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ29ibmltYXNoa2knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxzW3NraWxsXS5zcHJpdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDEwNSwgMTEwLCAwLCAnZnJpZW5kcycsIDAsIGlzb0dyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZSA9IHRpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ3VpVGV4dC5za2lsbHNbc2tpbGxdLnRleHQgPSAzMCAtIE1hdGguZmxvb3IoKHN0YXRpY3RpY3MuZ2V0VGltZSgpICogMTAwMCAtIHNraWxsc1tza2lsbF0ubGFzdF91c2VkKSAvIDEwMDApICsgXCLRgVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lsbCA9PT0gJ3Jvb2ZlcnMnICYmIHNraWxsc1tza2lsbF0uc3ByaXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsc1tza2lsbF0uc3ByaXRlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGwgPT09ICdvYm5pbWFzaGtpJyAmJiBza2lsbHNbc2tpbGxdLnNwcml0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBza2lsbHNbc2tpbGxdLnNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNwYXduVGlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0aWxlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXBIOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1hcFc7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSB0aWxlIHVzaW5nIHRoZSBuZXcgZ2FtZS5hZGQuaXNvU3ByaXRlIGZhY3RvcnkgbWV0aG9kIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IHBhcmFtZXRlciBpcyB0aGUgZ3JvdXAgeW91IHdhbnQgdG8gYWRkIGl0IHRvIChqdXN0IGxpa2UgZ2FtZS5hZGQuc3ByaXRlKVxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHRpbGVzWyhpICsgMSkgKiBtYXBXIC0gKGogKyAxKV07XG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoaSAqIDE5LCBqICogMTksIDAsIHRpbGVUeXBlc1t0eXBlXSwgMCwgaXNvR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VyID0gdGlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2F0ZXIucHVzaCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSg3OCwgNDUwLCAwLCAncGlja3VwLWJ1cm5pbmcnLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDE0MCwgMzAsIDAsICdkZXZ5YXRrYScsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAxKTtcbiAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzQ1LCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgxOTAsIC0yNSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDI2MCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMjgwLCAwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoMzAwLCAtMjUsIDAsICd0cmVlMicsIDAsIHVuaXRHcm91cCk7XG4gICAgICAgICAgICB0aWxlLmFuY2hvci5zZXQoMC41LCAwLjUpO1xuICAgICAgICAgICAgdGlsZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZSgzMTAsIDQwMCwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDM5MCwgLTI1LCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgICAgIHRpbGUgPSBnYW1lLmFkZC5pc29TcHJpdGUoNDAwLCA0NSwgMCwgJ3RyZWUyJywgMCwgdW5pdEdyb3VwKTtcbiAgICAgICAgICAgIHRpbGUuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDUyMCwgMjkwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgICAgICB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKDEzMCwgMzIwLCAwLCAndHJlZTInLCAwLCB1bml0R3JvdXApO1xuICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEJhc2ljR2FtZS5Cb290KTtcbmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcblxuLyogVW5pdHMgKi9cbmZ1bmN0aW9uIEVuZW15KHgsIHkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5zcGVlZCA9IDYwO1xuICAgIHRoaXMuZGFtYWdlID0gMTA7XG4gICAgdGhpcy5yZXdhcmQgPSAxMDA7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHZhciBtYXhIZWFsdGggPSAwO1xuICAgIHRoaXMuaGVhbHRoYmFyID0gbmV3IEhlYWx0aEJhcihnYW1lLCBoZWFsdGhiYXJFbmVteUNvbmZpZyk7XG4gICAgdGhpcy5oZWFsdGhiYXIuc2V0UGVyY2VudCgxMDApO1xuICAgIHZhciBwYXRoID0gbWFwUm9hZC5zbGljZSgpO1xuICAgIHZhciB0YXJnZXQgPSBwYXRoWzBdIHx8IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICB9O1xuICAgIHZhciBtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNlbGYuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIHZhciB2ZWMgPSB7XG4gICAgICAgICAgICB4OiB0YXJnZXQueCAtIHNlbGYuc3ByaXRlLngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueSAtIHNlbGYuc3ByaXRlLnksXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IGRpc3RhbmNlKHRhcmdldCwgc2VsZi5zcHJpdGUpXG4gICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZCAvIDEwMDA7XG4gICAgICAgIGlmIChsZW4gPiBzZWxmLnNwZWVkICogZGVsdGFUaW1lKSB7XG4gICAgICAgICAgICBzZWxmLnNwcml0ZS54ICs9IHZlYy54ICogc2VsZi5zcGVlZCAvIGxlbiAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIHNlbGYuc3ByaXRlLnkgKz0gdmVjLnkgKiBzZWxmLnNwZWVkIC8gbGVuICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKHZlYy54ID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnNjYWxlLnggPSBNYXRoLmFicyhzZWxmLnNwcml0ZS5zY2FsZS54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2ZWMueCA8IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZS5zY2FsZS54ID0gLU1hdGguYWJzKHNlbGYuc3ByaXRlLnNjYWxlLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBwb3MgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgZ2FtZS5pc28udW5wcm9qZWN0KHNlbGYuc3ByaXRlLCBwb3MpO1xuICAgICAgICBzZWxmLnNwcml0ZS5pc29YID0gcG9zLng7XG4gICAgICAgIHNlbGYuc3ByaXRlLmlzb1kgPSBwb3MueTtcbiAgICAgICAgc2VsZi5oZWFsdGhiYXIuc2V0UG9zaXRpb24oc2VsZi5zcHJpdGUueCwgc2VsZi5zcHJpdGUueSAtIDQwKVxuICAgICAgICAvLyB0aWxlID0gZ2FtZS5hZGQuaXNvU3ByaXRlKHBvcy54LCBwb3MueSwgMCwgJ3RoaWVmJywgMjgsIHVuaXRHcm91cCk7XG4gICAgfTtcbiAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZHggPSBlbmVtaWVzLmluZGV4T2Yoc2VsZik7XG4gICAgICAgIGlmIChpZHggIT0gLTEpIHtcbiAgICAgICAgICAgIGVuZW1pZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5zcHJpdGUuZGVzdHJveSgpO1xuICAgICAgICBzZWxmLmhlYWx0aGJhci5raWxsKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGVuID0gZGlzdGFuY2UodGFyZ2V0LCBzZWxmLnNwcml0ZSlcbiAgICAgICAgdmFyIGRlbHRhVGltZSA9IGdhbWUudGltZS5lbGFwc2VkIC8gMTAwMDtcbiAgICAgICAgaWYgKGxlbiA8PSBzZWxmLnNwZWVkICogZGVsdGFUaW1lKSB7XG4gICAgICAgICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICB0YXJnZXQgPSBwYXRoWzBdIHx8IHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4gICAgICAgICAgICBodXJ0KHNlbGYuZGFtYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmZyZWV6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRhcmdldC54ID09PSA0NzUgJiYgdGFyZ2V0LnkgPT09IDU5MCkgcmV0dXJuO1xuICAgICAgICBzZWxmLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudW5mcmVlemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRhcmdldC54ID0geDtcbiAgICAgICAgdGFyZ2V0LnkgPSB5O1xuICAgIH07XG4gICAgdGhpcy5odXJ0ID0gZnVuY3Rpb24gKHBvaW50cykge1xuICAgICAgICBtYXhIZWFsdGggPSBNYXRoLm1heChtYXhIZWFsdGgsIHNlbGYuaGVhbHRoKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHNlbGYuaGVhbHRoIC0gcG9pbnRzO1xuICAgICAgICBzZWxmLmhlYWx0aCA9IChyZXN1bHQgPj0gMCkgPyByZXN1bHQgOiAwO1xuICAgICAgICBzZWxmLmhlYWx0aGJhci5zZXRQZXJjZW50KHNlbGYuaGVhbHRoIC8gbWF4SGVhbHRoICogMTAwKTtcbiAgICAgICAgaWYgKHNlbGYuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHNlbGYuZGFtYWdlID0gMDtcbiAgICAgICAgICAgIHNjb3JlICs9IHNlbGYucmV3YXJkO1xuICAgICAgICAgICAgc3RhdGljdGljcy5tb25leSArPSBzZWxmLnJld2FyZDtcbiAgICAgICAgICAgIHRhcmdldCA9IHsgeDogNDc1LCB5OiA1OTAgfTtcbiAgICAgICAgICAgIHBhdGggPSBbdGFyZ2V0XTtcbiAgICAgICAgICAgIHNlbGYudW5mcmVlemUoKTtcbiAgICAgICAgICAgIC8vIGRlc3Ryb3koKTtcbiAgICAgICAgICAgIHNlbGYuaGVhbHRoYmFyLmJnU3ByaXRlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaGVhbHRoYmFyLmJhclNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBzdGF0aWN0aWNzLmtpbGxzKys7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuc3ByaXRlLnRpbnQgPT0gMHhmZmZmZmYpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIHNlbGYuc3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3ByaXRlLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5zcHJpdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zcHJpdGUudGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zcHJpdGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VsZi5hY3RpdmUpIHtcbiAgICAgICAgICAgICFzZWxmLmFuaW0uaXNQbGF5aW5nICYmIHNlbGYuYW5pbS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFuaW0uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGdldFRhcmdldCgpO1xuICAgICAgICBtb3ZlKCk7XG4gICAgfVxuICAgIGVuZW1pZXMucHVzaCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gVGhpZWYoeCwgeSkge1xuICAgIHZhciBwb3MgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBnYW1lLmlzby51bnByb2plY3QoeyB4OiB4LCB5OiB5IH0sIHBvcyk7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUocG9zLngsIHBvcy55LCAwLCAndGhpZWYnLCAyOCwgdW5pdEdyb3VwKTtcbiAgICB0aGlzLnNwcml0ZS53aWR0aCA9IDI0O1xuICAgIHRoaXMuc3ByaXRlLmhlaWdodCA9IDM2O1xuICAgIHRoaXMuc3ByaXRlLmFuY2hvci5zZXQoMC41LCAwLjkpO1xuICAgIHRoaXMuYW5pbSA9IHRoaXMuc3ByaXRlLmFuaW1hdGlvbnMuYWRkKCd3YWxrJyk7XG4gICAgdGhpcy5hbmltLnBsYXkoMTAsIHRydWUpO1xuICAgIEVuZW15LmNhbGwodGhpcywgeCwgeSk7XG4gICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgdGhpcy5kYW1hZ2UgPSA0MDtcbiAgICB0aGlzLnJld2FyZCA9IDEwMDtcbiAgICB0aGlzLnNwZWVkID0gNjA7XG59XG5cbmZ1bmN0aW9uIFBvbGljZSh4LCB5KSB7XG4gICAgdmFyIHBvcyA9IHsgeDogMCwgeTogMCB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh7IHg6IHgsIHk6IHkgfSwgcG9zKTtcbiAgICB0aGlzLnNwcml0ZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICdwb2xpY2UnLCA1LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gMjQ7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gMzY7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDAuOSk7XG4gICAgdGhpcy5hbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnKTtcbiAgICB0aGlzLmFuaW0ucGxheSgxMCwgdHJ1ZSk7XG4gICAgRW5lbXkuY2FsbCh0aGlzLCB4LCB5KTtcbiAgICB0aGlzLmhlYWx0aCA9IDIwMDtcbiAgICB0aGlzLmRhbWFnZSA9IDIwO1xuICAgIHRoaXMucmV3YXJkID0gMjAwO1xuICAgIHRoaXMuc3BlZWQgPSA5MDtcbn1cblxuZnVuY3Rpb24gQm9zcyh4LCB5KSB7XG4gICAgdmFyIHBvcyA9IHsgeDogMCwgeTogMCB9O1xuICAgIGdhbWUuaXNvLnVucHJvamVjdCh7IHg6IHgsIHk6IHkgfSwgcG9zKTtcbiAgICB0aGlzLnNwcml0ZSA9IGdhbWUuYWRkLmlzb1Nwcml0ZShwb3MueCwgcG9zLnksIDAsICdwb2xpY2UnLCA1LCB1bml0R3JvdXApO1xuICAgIHRoaXMuc3ByaXRlLndpZHRoID0gMjQ7XG4gICAgdGhpcy5zcHJpdGUuaGVpZ2h0ID0gMzY7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDAuOSk7XG4gICAgdGhpcy5hbmltID0gdGhpcy5zcHJpdGUuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnKTtcbiAgICB0aGlzLmFuaW0ucGxheSgxMCwgdHJ1ZSk7XG4gICAgRW5lbXkuY2FsbCh0aGlzLCB4LCB5KTtcbiAgICB0aGlzLmhlYWx0aCA9IDIwMDA7XG4gICAgdGhpcy5kYW1hZ2UgPSA0MDtcbiAgICB0aGlzLnJld2FyZCA9IDIwMDA7XG4gICAgdGhpcy5zcGVlZCA9IDIwO1xufVxuXG5mdW5jdGlvbiBEZWZlbmRlcih0aWxlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIG1hcFtbdGlsZS5pc29Cb3VuZHMueCwgdGlsZS5pc29Cb3VuZHMueV1dID0gJ2FjdGl2aXN0JztcbiAgICB0aGlzLmRhbWFnZSA9IDQ1O1xuICAgIHRoaXMucmFkaXVzID0gNzA7XG4gICAgdGhpcy5zcHJpdGUgPSBnYW1lLmFkZC5pc29TcHJpdGUodGlsZS5pc29Cb3VuZHMueCArIDEwLCB0aWxlLmlzb0JvdW5kcy55ICsgMTAsIDAsICdhY3RpdmlzdCcsIDgsIHVuaXRHcm91cCk7XG4gICAgdGhpcy5zcHJpdGUuYW5jaG9yLnNldCgwLjUsIDEpO1xuXG4gICAgdmFyIGFuaW0gPSB0aGlzLnNwcml0ZS5hbmltYXRpb25zLmFkZCgncG9zdCcpO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZHggPSBkZWZlbmRlcnMuaW5kZXhPZihzZWxmKTtcbiAgICAgICAgaWYgKGlkeCAhPSAtMSkge1xuICAgICAgICAgICAgZGVmZW5kZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc3ByaXRlLmRlc3Ryb3koKTtcbiAgICB9O1xuICAgIHZhciBhdHRhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBkZWx0YVRpbWUgPSBnYW1lLnRpbWUuZWxhcHNlZCAvIDEwMDA7XG4gICAgICAgICAgICB0YXJnZXQuaHVydChzZWxmLmRhbWFnZSAqIGRlbHRhVGltZSk7XG4gICAgICAgICAgICBpZiAoIWFuaW0uaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KDMsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGlzdDtcbiAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRpc3QgPSBkaXN0YW5jZShlbmVtaWVzW2ldLnNwcml0ZSwgc2VsZi5zcHJpdGUpO1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBzZWxmLnJhZGl1cykge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0IHx8IGRpc3RhbmNlKHRhcmdldC5zcHJpdGUsIHNlbGYuc3ByaXRlKSA8IGRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZW1pZXNbaV0uaGVhbHRoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZW5lbWllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgYW5pbS5zdG9wKHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnNwcml0ZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldFRhcmdldCgpO1xuICAgICAgICBhdHRhY2soKTtcbiAgICB9XG4gICAgZGVmZW5kZXJzLnB1c2godGhpcyk7XG59XG5cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgIGlzR2FtZVN0YXJ0ID0gdHJ1ZTtcbiAgICBzdGF0aWN0aWNzID0gbmV3IFN0YXRpY3RpY3MoKTtcblxuICAgIHZhciB3YXZlcyA9IFtcbiAgICAgICAgbmV3IFdhdmUoW1RoaWVmLCAyXSwgWzEwMDAsIDIwMDBdLCAxMDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW1RoaWVmLCA0XSwgWzEwMDAsIDIwMDBdLCA4MDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW1BvbGljZSwgNF0sIFsxMDAwLCAyMDAwXSwgODAwMCksXG4gICAgICAgIG5ldyBXYXZlKFtUaGllZiwgOCwgUG9saWNlLCA0XSwgWzEwMDAsIDIwMDBdLCA4MDAwKSxcbiAgICAgICAgbmV3IFdhdmUoW0Jvc3MsIDFdLCBbMjAwMCwgNDAwMF0sIDgwMDApLFxuICAgICAgICBuZXcgV2F2ZShbXSwgW10sIDE2MDAwKSxcbiAgICBdO1xuICAgIHdpbmRvdy5jaGFpbiA9IG5ldyBDaGFpbih3YXZlcywgLTEsIDEwMDAwLCAyKTtcblxuICAgIHRpbWVyLnN0YXJ0KCk7XG59XG5cblxuZnVuY3Rpb24gaHVydChwb2ludHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gaGVhbHRoIC0gcG9pbnRzO1xuICAgIGhlYWx0aCA9IChyZXN1bHQgPj0gMCkgPyByZXN1bHQgOiAwO1xuICAgIGhlYWx0aEJhci5zZXRQZXJjZW50KGhlYWx0aCk7XG4gICAgdmFyIHNlbGYgPSB0b3dlcjtcbiAgICBpZiAocG9pbnRzID4gMCAmJiBzZWxmICYmIHNlbGYudGludCA9PSAweGZmZmZmZikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmICYmIHNlbGYpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2VsZiAmJiBzZWxmKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoZWFsKHBvaW50cywgc3BlZWQpIHtcbiAgICBpZiAocG9pbnRzID4gMCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gaGVhbHRoICsgc3BlZWQ7XG4gICAgICAgIGhlYWx0aCA9IChyZXN1bHQgPCAxMDApID8gcmVzdWx0IDogMTAwO1xuICAgICAgICBoZWFsdGhCYXIuc2V0UGVyY2VudChoZWFsdGgpO1xuICAgICAgICB0aW1lci5hZGQoMTAwMCwgaGVhbC5iaW5kKHRoaXMsIHBvaW50cyAtIHNwZWVkLCBzcGVlZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3Bhd25FbmVteShnYW1lQ2xhc3MpIHtcbiAgICByZXR1cm4gbmV3IGdhbWVDbGFzcyhtYXBSb2FkWzBdLngsIG1hcFJvYWRbMF0ueSk7XG59XG5cblxuZnVuY3Rpb24gZGlzdGFuY2UodmVjMSwgdmVjMikge1xuICAgIHZhciBpc28xID0geyB4OiAwLCB5OiAwIH07XG4gICAgdmFyIGlzbzIgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICBnYW1lLmlzby51bnByb2plY3QodmVjMSwgaXNvMSk7XG4gICAgZ2FtZS5pc28udW5wcm9qZWN0KHZlYzIsIGlzbzIpO1xuICAgIHZhciB2ZWMgPSB7XG4gICAgICAgIHg6IGlzbzEueCAtIGlzbzIueCxcbiAgICAgICAgeTogaXNvMS55IC0gaXNvMi55LFxuICAgIH1cbiAgICByZXR1cm4gTWF0aC5zcXJ0KHZlYy54ICogdmVjLnggKyB2ZWMueSAqIHZlYy55KTtcbn1cblxud2luZG93LldhdmUgPSBXYXZlO1xud2luZG93LlRoaWVmID0gVGhpZWY7XG53aW5kb3cuUG9saWNlID0gUG9saWNlO1xuXG5mdW5jdGlvbiBXYXZlKGVuZW1pZXMsIHJhdGUsIHBhdXNlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwYWNrID0gW107XG4gICAgdmFyIGN1cnJlbnQ7XG4gICAgdGhpcy5mYWN0b3IgPSAxO1xuICAgIHRoaXMuZmluaXNoID0gbmV3IFBoYXNlci5TaWduYWwoKTtcblxuICAgIGZ1bmN0aW9uIHNwYXduKCkge1xuICAgICAgICBwYWNrID0gcGFjay5maWx0ZXIoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuY291bnQgPiAwIH0pO1xuICAgICAgICBpZiAocGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBwYWNrW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBhY2subGVuZ3RoKV07XG4gICAgICAgICAgICBjdXJyZW50LmNvdW50IC09IDE7XG4gICAgICAgICAgICB2YXIgZW5lbXkgPSBzcGF3bkVuZW15KGN1cnJlbnQuY2xhc3MpO1xuICAgICAgICAgICAgZW5lbXkuaGVhbHRoID0gZW5lbXkuaGVhbHRoICogc2VsZi5mYWN0b3I7XG4gICAgICAgICAgICB0aW1lci5hZGQoKHJhdGVbMF0gKyAocmF0ZVsxXSAtIHJhdGVbMF0pICogTWF0aC5yYW5kb20oKSksIHNwYXduKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZmluaXNoLmRpc3BhdGNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGFjayA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoIC8gMjsgaSsrKSB7XG4gICAgICAgICAgICBwYWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogZW5lbWllc1syICogaV0sXG4gICAgICAgICAgICAgICAgXCJjb3VudFwiOiBlbmVtaWVzWzIgKiBpICsgMV0gKiBzZWxmLmZhY3RvcixcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGltZXIuYWRkKHBhdXNlIC8gTWF0aC5zcXJ0KHNlbGYuZmFjdG9yKSwgc3Bhd24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hhaW4od2F2ZXMsIHJlcGVhdHMsIHBhdXNlLCBjb3VudF9mYWN0b3IpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHF1ZXVlID0gd2F2ZXMuc2xpY2UoKTtcbiAgICB2YXIgY3VycmVudDtcbiAgICB0aGlzLmZhY3RvciA9IDE7XG4gICAgZnVuY3Rpb24gc3RhcnRXYXZlKCkge1xuICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY3VycmVudCA9IHF1ZXVlWzBdO1xuICAgICAgICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGN1cnJlbnQuZmluaXNoLmFkZChzdGFydFdhdmUpO1xuICAgICAgICAgICAgY3VycmVudC5mYWN0b3IgPSBzZWxmLmZhY3RvcjtcbiAgICAgICAgICAgIGN1cnJlbnQuc3RhcnQoKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJlcGVhdHMgIT0gMCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZmFjdG9yID0gc2VsZi5mYWN0b3IgKiBjb3VudF9mYWN0b3I7XG4gICAgICAgICAgICAgICAgdGltZXIuYWRkKHBhdXNlLCBzdGFydFdhdmUpO1xuICAgICAgICAgICAgICAgIHJlcGVhdHMtLTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IHdhdmVzLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGltZXIuYWRkKDAsIHN0YXJ0V2F2ZSk7XG59XG5cbmZ1bmN0aW9uIFN0YXRpY3RpY3MoKSB7XG4gICAgdmFyIHRpbWUgPSAwO1xuICAgIHRoaXMuZ2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGltZSAvIDEwMDApO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGltZSArPSBnYW1lLnRpbWUuZWxhcHNlZDtcbiAgICB9XG4gICAgdGhpcy5tb25leSA9IDA7XG4gICAgdGhpcy5raWxscyA9IDA7XG59XG4iXX0=
