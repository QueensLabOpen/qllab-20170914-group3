var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, update: update, render: render});

function preload() {
	game.load.tilemap('map', 'assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON);

	game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1_grey.png');
	game.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
	game.load.image('tiles2', 'assets/tilemaps/tiles/tiles2_go.png');
	game.load.image('background', 'assets/water_1.jpeg');

	game.load.image('phaser', 'assets/sprites/shark.png');
	game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
}

var cursors;
var map;
var coins;

var backgroundLayer;
var layer;
var sprite;

function create() {
	map = game.add.tilemap('map');
	this.background = this.add.tileSprite(0, 0, 32*50, 32*18, 'background');

	map.addTilesetImage('ground_1x1');
	map.addTilesetImage('walls_1x2');
	map.addTilesetImage('tiles2');

	map.setCollisionBetween(1, 12);

	backgroundLayer = map.createLayer('Background Layer 1');
	layer = map.createLayer('Tile Layer 1');

	layer.resizeWorld();

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  Here we create our coins group
	coins = game.add.group();
	coins.enableBody = true;


	//  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
	map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);

	//  Add animations to all of the coin sprites
	coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
	coins.callAll('animations.play', 'animations', 'spin');

	sprite = game.add.sprite(260, 100, 'phaser');
	sprite.anchor.set(0.5);

	game.physics.arcade.enable(sprite);

	//  This adjusts the collision body size.
	sprite.body.setSize(64, 64, 0, 0);

	//  We'll set a lower max angular velocity here to keep it from going totally nuts
	sprite.body.maxAngular = 500;

	//  Apply a drag otherwise the sprite will just spin and never slow down
	sprite.body.angularDrag = 50;

	// game.camera.follow(sprite);

	cursors = game.input.keyboard.createCursorKeys();

}

function update() {
	game.physics.arcade.collide(sprite, layer);
	game.physics.arcade.overlap(sprite, coins, collectCoin, null, this);

	sprite.body.velocity.x = 0;
	sprite.body.velocity.y = 0;
	sprite.body.angularVelocity = 0;

	if (cursors.left.isDown) {
		sprite.body.angularVelocity = -300;
	}
	else if (cursors.right.isDown) {
		sprite.body.angularVelocity = 300;
	}

	if (cursors.up.isDown) {
		game.physics.arcade.velocityFromAngle(sprite.angle, 300, sprite.body.velocity);
	}

}

function collectCoin(player, coin) {
	coin.kill();

}

function render() {
	game.debug.body(sprite);

}
window.sprite = sprite;
function test() {
	var code = "f f f f l f b b b r r";
	var commands = interpret(code);
	executeCommandsOnSprite(window.sprite, commands);
}
setTimeout(test, 5000);
