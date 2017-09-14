
function executeCommandsOnSprite(sprite, commands) {
	for(var a=0; a<commands.length; a++) {
		var command = commands[a];

		if (command == "forward") {
			sprite.body.velocity.y = 300;
		} else if(command == "backwards") {
			sprite.body.velocity.y = -300;
		} else if(command == "left") {
			sprite.body.velocity.x = -300;
		} else if(command == "right") {
			sprite.body.velocity.x = 300;
		}
	}
}
