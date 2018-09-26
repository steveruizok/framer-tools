const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const _ = require("lodash");
const prompt = require("./prompt");

const { exec } = require("child_process");

module.exports = {
	getCurrentDirectoryBase: () => {
		return path.basename(process.cwd());
	},

	directoryExists: filePath => {
		try {
			return fs.statSync(filePath).isDirectory();
		} catch (err) {
			return false;
		}
	},

	isFramerDirectory: () => {
		const directory = path.basename(process.cwd());
		return directory === "container";
	},

	openComponent: componentName =>
		new Promise((resolve, reject) => {
			exec(
				`cd code && open -a "Visual Studio Code" ${componentName}.tsx`,
				async err => {
					if (err) {
						if (err.toString().includes("Code")) {
							console.log(
								chalk.green(`
⚠️  Hey, it looks like you don't have Visual Studio Code installed!
`)
							);

							const { willContinue } = await prompt.continue();

							if (willContinue) {
								exec(`cd code && open -t ${componentName}.tsx`);
								console.log(
									chalk.green(`
📄  Opened ${componentName} in default text editor.
`)
								);
							}
							resolve();
						}
					} else {
						console.log(
							chalk.green(`
📄  Opened ${componentName} in Visual Studio Code.
`)
						);
					}
					resolve();
				}
			);
		})
};
