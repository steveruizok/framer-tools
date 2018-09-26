const inquirer = require("inquirer");

module.exports = {
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
	}
};
