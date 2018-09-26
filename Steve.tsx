
import * as React from "react";
import { PropertyControls, ControlType } from "framer";

const style: React.CSSProperties = {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		color: "#8855FF",
		background: "rgba(136, 85, 255, 0.1)",
		overflow: "hidden",
};

// Define type of property
interface Props {
		text: string;
}

export class Steve extends React.Component<Props> {

		// Set default properties
		static defaultProps = {
		text: "Hello World, I'm Steve!"
		}

		// Items shown in property panel
		static propertyControls: PropertyControls = {
		text: { type: ControlType.String, title: "Text" },
		}

		render() {
		return <div style={style}>{this.props.text}</div>;
		}
}
		