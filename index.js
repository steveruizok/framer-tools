#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const files = require("./lib/files");
const prompt = require("./lib/prompt");
const create = require("./lib/create");

clear();

const runIntroduction = async () => {
	clear();
	console.log(
		chalk.blue(
			figlet.textSync("F", {
				font: "trek",
				horizontalLayout: "controlled smushing"
			})
		)
	);
	console.log(`
Create Framer Component
v0.1
	`);

	if (files.getCurrentDirectoryBase() !== "container") {
		console.log(
			chalk.yellow(`
⚠️  Hey, it looks like you're not in a Framer X project folder. 
		`)
		);

		const { willContinue } = await prompt.continue();
		if (!willContinue) {
			console.log(
				chalk.green(`
Ok, exiting process. 👋

Try running this command again after opening your Framer X 
project's project folder (File > Show Proejct Folder). 
		`)
			);
			process.exit();
		}
	}
};

const createNewComponent = async () => {
	const { componentName } = await prompt.askComponentName();
	await create.createComponent(componentName);
	console.log(
		chalk.green(`
📦  Component created at ./code/${componentName}.tsx!
`)
	);
	return componentName;
};

const getNextAction = async lastComponentName => {
	const { nextAction } = await prompt.followUp(lastComponentName);

	if (nextAction === `Open component (${lastComponentName})`) {
		await files.openComponent(lastComponentName);
		getNextAction(lastComponentName);
		return;
	}

	if (nextAction === `Create another`) {
		let componentName = await createNewComponent();
		getNextAction(componentName);
		return;
	}

	console.log(
		chalk.yellow(`
Ciao! 👋
`)
	);
	process.exit();
};

const run = async () => {
	await runIntroduction();

	let lastComponentName = await createNewComponent();
	getNextAction(lastComponentName);
};

run();
