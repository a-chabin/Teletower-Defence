var game = new Phaser.Game(1024, 800, Phaser.AUTO, 'test', null, true, false);

var health = 0;
var score = 0;

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor;

BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('tile', '../img/tile.png');
        game.load.image('tower', '../img/tower.png');

        game.time.advancedTiming = true;
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);
    },
    create: function () {

        // Create a group for our tiles.
        isoGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
    },
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        });
    },
    render: function () {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
        game.debug.text(health + " / 100" || '--', 2, 36, "#a7aebe");
        game.debug.text("$ " + score || '--', 2, 54, "#a7aebe");
      },
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 512; xx += 19) {
            for (var yy = 0; yy < 512; yy += 19) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0);
            }
        }

        tile = game.add.isoSprite(-72, -72, 0, 'tower', 0, isoGroup);
        tile.anchor.set(0.5, 0.5);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');