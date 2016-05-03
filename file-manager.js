;
(function nodeProjectOne() {

	var fs = require('fs');

	var useStdin = function () {
		var input = process.stdin.read();
		if (input !== null) {
			var inputSplit = input.toString().trim().split(" ");
			console.log(inputSplit);
			if (inputSplit[0] == "cat") {
				//cat <filename>
				catFile(inputSplit[1]);
			} else if (inputSplit[0] == "touch") {
				//touch <filename>
				createNewFile(inputSplit[1]);
			} else if (inputSplit[0] == "rm") {
				removeFile(inputSplit[1]);
			} else if (inputSplit[0] == "replace") {
				findReplaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
			} else if (inputSplit[0] == "grep") {
				findLine(inputSplit[1], inputSplit[2]);
			}
		}
	};

	//create a file (touch)
	function createNewFile(fileName) {
		fs.writeFile(fileName, "", function (err) {
			if (err) {
				console.log("Could not write to file");
			} else {
				console.log("File created and saved");
			}
		});
	}

	//read from a file (cat)
	function catFile(fileName) {
		fs.readFile(fileName, function (err, data) {
			if (err) {
				console.log("Unable to read from file");
			} else {
				console.log(data.toString());
			}
		});
	}

	/* 
	Your assignment is to implement the following functionality: 
	// 1.  remove a file
			"rm" <file name>
			> rm hello.txt
				entirely delete the file hello.txt */
	function removeFile(fileName) {
		fs.unlink(fileName, function (err) {
			if (err) {
				console.log("Could not delete file");
			} else {
				console.log("File deleted");
			}
		})
	}

	/* 2.  find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their */
	function findReplaceWord(fileName, oldWord, newWord) {
		fs.readFile(fileName, "", function (err, data) {
			if (err) {
				console.log("Help me! I can't read!");
				console.log (err); 
			} else {
				console.log(data);

				var result = data.toString().split(oldWord).join(newWord);

				fs.writeFile(fileName, result, function (err) {
					if (err) {
						console.log("Cannot write file");
					}
					console.log("Writing Complete!");
				});
			}
		});
	}

	/* 3. find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there" */
	function findLine(fileName, findWord) {
		fs.readFile(fileName, "", function (err, data) {
			if (err) {
				console.log("Not Literate");
			}
			var result = data.toString().split("\n");

			for (var i = 0; i < result.length; i++) {
				if (result[i].indexOf(findWord) !== -1) {
					console.log(result[i]);
				}
			}
		});
	}

	/* Bonus work:
	 * Ask for confirmation before deleting a file
	 * Don't let people delete files that are above the current working directory (i.e. disallow "../")
	 * Have grep take a regular expression as the word to find
	 * Create mkdir and rmdir */

	process.stdin.on('readable', useStdin);

}());