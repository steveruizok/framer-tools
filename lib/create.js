const boilerplate = require("./boilerplate");
const chalk = require("chalk");
const _ = require("lodash");
const fs = require("fs");

const filelist = fs.readdirSync(".");

writeComponentFile = async componentName => {
	fs.writeFileSync(
		`./code/${componentName}.tsx`,
		boilerplate.getBoilerplate(componentName)
	);
};

module.exports = {
	createComponent: async componentName => {
		// Kickoff

		// Try to create the component
		try {
			if (_.includes(filelist, "code")) {
				await writeComponentFile(componentName);
				return true;
			} else {
				fs.mkdirSync("code");
				console.log(
					chalk.yellow(`
📂  No code folder found, so we created one.
`)
				);
			}
		} catch (err) {
			throw "😧  That didn't work: " + err;
		} finally {
		}
	}
};
