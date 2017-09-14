
function executeCommandsOnSprite(sprite, commands) {
	for(var a=0; a<commands.length; a++) {
		var command = commands[a];
		console.log(sprite, command);

		if (command == "forward") {
			console.log(command);
			sprite.body.velocity.y = 1000;
		} else if(command == "backwards") {
			sprite.body.velocity.y = -1000;
		} else if(command == "left") {
			sprite.body.velocity.x = -1000;
		} else if(command == "right") {
			sprite.body.velocity.x = 1000;
		}
	}
}
