import React, { Component } from "react";
import _throttle from "lodash.throttle";

export default class QueryableContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this._container = null;

		this.queryContainer = this.queryContainer.bind(this);
		this.queryContainerThrottled = _throttle(this.queryContainer, props.throttle, { "leading": false });
	}

	componentWillMount() {
		if (global.window) {
			global.window.addEventListener("resize", this.queryContainerThrottled);
		}
		if (this.props.poll) {
			this.setState({
				timer: setInterval(this.queryContainerThrottled, this.props.throttle)
			});
		}
	}

	componentDidMount() {
		this._mounted = true;
		this.queryContainer();
		setTimeout(this.queryContainer, 0);
	}

	componentWillUnmount() {
		this._mounted = false;
		if (global.window) {
			global.window.removeEventListener("resize", this.queryContainerThrottled);
		}
		if (this.state.timer) {
			clearInterval(this.state.timer);
		}
	}

	queryContainer() {
		if (this._mounted) {
			const queryResult = this.props.callback(this._container);

			if (queryResult) {
				this.setState(queryResult);
			}
		}
	}

	render() {
		/* eslint-disable no-unused-vars */
		const { throttle, callback, poll, ...props } = this.props;
		/* eslint-enable no-unused-vars */
		return (
			<div {...props} ref={(ref) => this._container = ref}>
				{
					React.Children.map(this.props.children, (child) => React.cloneElement(child, this.state))
				}
			</div>
		);
	}
}

QueryableContainer.defaultProps = {
	throttle: 150,
	callback: (el) => {
		return { clientWidth: el ? el.clientWidth : null };
	},
	poll: false
};
