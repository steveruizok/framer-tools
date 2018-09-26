module.exports = {
	getBoilerplate: (componentName, imports = "") => {
		return `
import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import * as Utils from "./utils";
${imports}

const Props = {
	text: {
		default: "Hello world!",
		control: { type: ControlType.String, title: "Text" }
	}
};

export class ${componentName} extends React.Component<any> {
	static defaultProps = Utils.mapObj(Props, "default");
	static propertyControls: PropertyControls = Utils.mapObj(Props, "control");

	render() {
		const style: React.CSSProperties = {
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			color: "#FFFFFF",
			background: "rgba(136, 85, 255, 0.1)",
			overflow: "hidden"
		};

		return (
			<div style={style}>
				{this.props.text}, I'm ${componentName}
			</div>
		);
	}
}
		`;
	},
	copyUtils: () => {
		return `
// Create a new object of properties pulled from a source object
//
// @example
// 	const myBuddies = { dana: { name: "Dana", age: 32 }, kyle: { name: "Kyle", age: 28 }}
// 	console.log(mapObj(myBuddies, "name"))
//
// 	> { dana: "Dana", kyle: "Kyle"}

export const mapObj = (object: Object, key: string) =>
	Object.keys(object).reduce(function(result, k) {
		if (object[k][key]) {
			result[k] = object[k][key];
		}
		return result;
	}, {});
		`;
	}
};
