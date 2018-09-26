
import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import * as Utils from "./utils";
import { css } from "emotion"

const Props = {
	text: {
		default: "Hello world!",
		control: { type: ControlType.String, title: "Text" }
	}
};

export class Kek extends React.Component<any> {
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
				{this.props.text}, I'm Kek
			</div>
		);
	}
}
		