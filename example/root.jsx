import React, { Component, PropTypes as t } from "react";
import Q from "../src/index";
import _some from "lodash.some";

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

const ExampleThree = ({ isWrapped }) => {
	return (
		<h1>Did I Wrap? Did I Wrap? Did I Wrap? Did I Wrap? {isWrapped ? "Yes!" : "No!"}</h1>
	);
};

const getOtherStuff = (el) => {
	const computed = getComputedStyle(el);
	return {
		borderColor: computed.borderColor
	};
}

const didWrap = (el) => {
	const flatChildren = el.querySelectorAll("*");
	const anyMultiRects = _some(flatChildren, (c) => c.getClientRects().length > 1);
	return {
		isWrapped: anyMultiRects
	};
};

const didOverflow = (el) => {
	const flatChildren = el.querySelectorAll("*");
	const anyBiggies = _some(flatChildren, (c) => c.clientWidth > el.clientWidth);
	return {
		isOverflow: anyBiggies
	};
}

const ExampleFour = ({ isOverflow }) => {
	return (
		<div>
			<p>Did overflow?</p>
			<h1>{isOverflow ? "Yes" : "No"}</h1>
		</div>
	);
}

const Root = () => (
	<div>
		<style>{`
			.animateWidth {
				animation: animateWidth 1.8s infinite alternate;
			}

			.animateWidthTooMuch p {
				animation: animateWidthTooMuch 1.8s infinite alternate;
				border: 3px solid;
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

			@keyframes animateWidthTooMuch {
				0% {
					width: 75%;
				}
				100% {
					width: 120%;
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
			<Q className="animateWidth well" poll callback={didWrap}>
				<ExampleThree />
			</Q>
			<Q className="animateWidthTooMuch well" poll callback={didOverflow}>
				<ExampleFour />
			</Q>
	</div>
);

export default Root
