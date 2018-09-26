const inquirer = require("inquirer");
const { conf } = require("./config");
const _ = require("lodash");

module.exports = {
	askForConfig: () => {
		const saved = conf.get("saved");
		const options = _.map(saved, "name");
		const def = conf.get("defaultConfig");
		const question = {
			name: "configToUse",
			type: "list",
			default: def,
			message: "Which configuration would you like to use?",
			choices: _.concat(options, "Create new")
		};
		return inquirer.prompt(question);
	},

	changeDefaultConfig: () => {
		const saved = conf.get("saved");
		const options = _.map(saved, "name");
		const def = conf.get("defaultConfig");
		const question = {
			name: "newDefault",
			type: "list",
			default: def,
			message: "Which configuration would you like make your new default?",
			choices: _.concat(options, "Go back")
		};
		return inquirer.prompt(question);
	},

	askComponentName: () => {
		const questions = {
			name: "componentName",
			type: "input",
			message: "What should we name your component?",
			validate: function(value) {
				if (value.length) {
					return true;
				} else {
					return "Please enter a name for your component.";
				}
			}
		};
		return inquirer.prompt(questions);
	},
	continue: () => {
		const question = {
			name: "willContinue",
			type: "confirm",
			default: false,
			message: "Continue anyway?"
		};
		return inquirer.prompt(question);
	},
	followUp: lastComponentName => {
		const question = {
			name: "nextAction",
			type: "list",
			default: false,
			message: "What's next?",
			choices: [
				`Open component (${lastComponentName})`,
				`Create another`,
				`Exit`
			]
		};
		return inquirer.prompt(question);
	},
	getFirstAction: () => {
		const question = {
			name: "firstAction",
			type: "list",
			default: false,
			message: "What would you like to do?",
			choices: [`Create a component`, `Set default configuration`, `Exit`]
		};
		return inquirer.prompt(question);
	}
};
