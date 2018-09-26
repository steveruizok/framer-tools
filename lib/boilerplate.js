module.exports = {
	getBoilerplate: componentName => {
		return `
import * as React from "react";
import { PropertyControls, ControlType } from "framer";

export class ${componentName} extends React.Component {

		// Set default properties
		static defaultProps = {
		text: "Hello World, I'm ${componentName}!"
		}

		// Items shown in property panel
		static propertyControls: PropertyControls = {
		text: { type: ControlType.String, title: "Text" },
		}

		render() {
			const style = {
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				color: "rgba(37, 50, 57, 1)",
				background: "rgba(41, 102, 195, 0.21)",
				overflow: "hidden",
			};

			return <div style={style}>{this.props.text}</div>;
		}
}
		`;
	}
};
