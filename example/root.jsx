import React, { Component, PropTypes as t } from "react";
import Q from "../src/index";

const ExampleOne = ({
	clientWidth
}) => (
	<h1>{clientWidth}</h1>
);

const ColorChip = ({color}) => {
	const style = {
		display: "inline-block",
		width: "1em",
		height: "1em",
		backgroundColor: color
	};

	return (
		<span style={style}></span>
	);
};

const ExampleTwo = ({
	borderColor
}) => (
	<h1><code>borderColor</code> is <span><ColorChip color={borderColor} /> {borderColor}</span></h1>
);

const getOtherStuff = (el) => {
	const computed = getComputedStyle(el);
	return {
		borderColor: computed.borderColor
	};
}

const Root = () => (
	<div>
		<style>{`
			.animateWidth {
				animation: animateWidth 1.8s infinite alternate;
			}
			.animateBorderColor {
				animation: animateBorderColor 1.8s infinite;
			}

			@keyframes animateWidth {
				0% {
					width: 50%;
				}
				100% {
					width: 100%;
				}
			}

			@keyframes animateBorderColor {
				0% {
					border-color: #f00;
				}
				25% {
					border-color: #cf0;
				}
				50% {
					border-color: #0fa;
				}
				75% {
					border-color: #0af;
				}
				100% {
					border-color: #80c;
				}
			}
		`}</style>
		<Q><ExampleOne /></Q>
		<div className="animateWidth well">
			<Q poll><ExampleOne /></Q>
		</div>
			<Q className="animateBorderColor well" poll callback={getOtherStuff}>
				<ExampleTwo />
			</Q>
	</div>
);

export default Root
