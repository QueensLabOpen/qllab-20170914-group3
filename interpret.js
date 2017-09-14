function inArray(item, arr) {
	for (var a = 0; a < arr.length; a++) {
		if (arr[a] == item) {
			return true;
		}
	}
	return false;
}

//Real basic function to transform the program text in to an array of commands to execute
function interpret(text) {
	var commands = {
		'f': 'forward',
		'b': 'backwards',
		'l': 'left',
		'r': 'right',
	}

	var buffer = "";
	var whitespace = [',', ' ', '\n'];

	var execute = [];
	for (var a = 0; a < text.length; a++) {
		var char = text[a];
		if (inArray(char, whitespace)) {
			//Whitespace found
			if (buffer in commands) {
				execute[execute.length] = commands[buffer];
				buffer = "";
			} else {
				throw("Invalid command: " + buffer);
			}
		} else {
			buffer += char;
		}
	}

	console.log("EXECUTE ARRAY", execute);

	return execute;
}