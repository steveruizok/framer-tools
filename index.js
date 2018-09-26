#!/usr/bin/env node

const chalk = require("chalk");
const pkg = require("./package.json");
const clear = require("clear");
const files = require("./lib/files");
const prompt = require("./lib/prompt");
const create = require("./lib/create");
const { conf } = require("./lib/config");

const msg = (string, color = "yellow") => {
	console.log(chalk[color](string));
};

// Do intro stuff

const runIntroduction = async () => {
	clear();
	console.log(
		chalk.blueBright.bold(`
Framer Tools`)
	);
	msg(`v${pkg.version}`, "blue");
};

// Check to see if we're in a Framer X project folder

const checkForFolder = async () => {
	if (files.getCurrentDirectoryBase() !== "container") {
		msg(`
⚠️  Hey, it looks like you're not in a Framer X project folder. 
		`);

		const { willContinue } = await prompt.continue();
		if (!willContinue) {
			msg(
				`
Ok, exiting process. 👋

Try running this command again after opening your Framer X 
project's project folder (File > Show Proejct Folder). 
		`,
				"green"
			);
			process.exit();
		}
	}

	return;
};

// Create a component

const createNewComponent = async () => {
	const { componentName } = await prompt.askComponentName();
	await create.createComponent(componentName);
	msg(
		`
📦  Component created at ./code/${componentName}.tsx!
`,
		"green"
	);
	return componentName;
};

// Get the first action
const getFirstAction = async () => {
	const { firstAction } = await prompt.getFirstAction();

	if (firstAction === "Create a component") {
		let componentName = await createNewComponent();
		getNextAction(componentName);
	} else if (firstAction === "Set default configuration") {
		await setDefaultConfiguration();
		getFirstAction();
	} else {
		exitProcess();
	}
};

// Get the next action

const getNextAction = async lastComponentName => {
	const { nextAction } = await prompt.followUp(lastComponentName);

	if (nextAction === `Open component (${lastComponentName})`) {
		await files.openComponent(lastComponentName);
		getNextAction(lastComponentName);
	} else if (nextAction === `Create another`) {
		let componentName = await createNewComponent();
		getNextAction(componentName);
	} else {
		exitProcess();
	}
};

// Setup configuration for first time users

const setupConfig = async () => {
	conf.delete("saved");

	if (Object.keys(conf.all).length === 0) {
		msg("No config found, creating config... ");
	} else {
		msg("Loading config... ");
	}

	if (!conf.get("saved")) {
		msg("Creating defaults... ");
		conf.set("saved", {});
		conf.set("saved", [
			{
				name: "Default",
				installs: "",
				imports: ""
			},
			{
				name: "Emotion",
				installs: "npm install emotion",
				imports: `import { css } from "emotion"`
			}
		]);
		conf.set("selectedConfig", "Default");
		conf.set("defaultConfig", "Default");
	}

	return;
};

// Exit

const exitProcess = () => {
	msg(`
👋  Ciao! 
`);
	process.exit();
};

// Choose a configuration

const selectConfig = async () => {
	const { configToUse } = await prompt.askForConfig();
	if (configToUse === "Create new") {
		msg("Creating a new action...");
		return;
	}

	conf.set("selectedConfig", configToUse);
	return;
};

const setDefaultConfig = async () => {
	msg(`
Your current default configuration is ${conf.get("defaultConfig")}.
`);
	const { newDefault } = await prompt.changeDefaultConfig();

	if (newDefault === "Go back") {
		msg(`
Keeping ${conf.get("defaultConfig")} as default config.
		`);
		return;
	}

	conf.set("defaultConfig", newDefault);
	msg(`
Setting ${conf.get("defaultConfig")} as new default config.
		`);
};

const run = async () => {
	// await runIntroduction();
	// await checkForFolder();
	await setupConfig();
	await setDefaultConfig();
	// install npm packages
	await getFirstAction();

	// await selectConfig();
	// let lastComponentName = await createNewComponent();
	// getNextAction(lastComponentName);
	msg("Ending");
	process.exit();
};

clear();
run();
