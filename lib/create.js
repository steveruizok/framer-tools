const boilerplate = require("./boilerplate");
const chalk = require("chalk");
const _ = require("lodash");
const fs = require("fs");
const { conf } = require("./config");

writeComponentFile = async componentName => {
	const defaultConfig = conf.get("defaultConfig");
	console.log(defaultConfig);

	const config = _.find(conf.get(`saved`), { name: defaultConfig });

	console.log(config);

	fs.writeFileSync(
		`./code/${componentName}.tsx`,
		boilerplate.getBoilerplate(componentName, config ? config.imports : null)
	);
};

writeUtils = async () => {
	fs.writeFileSync(`./code/utils.tsx`, boilerplate.copyUtils());
};

createUtils = async () => {
	const filelist = fs.readdirSync("./code");
	try {
		if (_.includes(filelist, "utils.tsx")) {
			console.log(chalk.grey(`🔍  Found a Utils file`));
		} else {
			console.log(chalk.grey(`🛠  Created Utils file at ./code/utils.ts`));
			await writeUtils();
		}
	} catch (err) {
		throw "😧  Couldn't create utils: " + err;
	} finally {
		return;
	}
};

module.exports = {
	createComponent: async componentName => {
		console.log(
			chalk.grey(`
🛠  Creating component`)
		);
		const filelist = fs.readdirSync(".");

		try {
			if (!_.includes(filelist, "code")) {
				fs.mkdirSync("code");
				console.log(chalk.grey(`📂  Created code folder at ./code`));
			}
			await writeComponentFile(componentName);
		} catch (err) {
			throw "😧  That didn't work: " + err;
		} finally {
			await createUtils();
			return;
		}
	}
};
