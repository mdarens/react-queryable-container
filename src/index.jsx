import React, { Component, PropTypes as t } from "react";
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
		window.addEventListener("resize", this.queryContainerThrottled);
		if (this.props.poll) {
			this.setState({
				timer: setInterval(this.queryContainerThrottled, this.props.throttle)
			});
		}
	}

	componentDidMount() {
		setTimeout(this.queryContainer, 0);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.queryContainerThrottled);
		if (this.state.timer) {
			clearInterval(this.state.timer);
		}
	}

	queryContainer() {
		const { callback } = this.props;

		this.setState(callback(this._container));
	}

	render() {

		return (
			<div {...this.props} ref={(ref) => this._container = ref}>
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

QueryableContainer.propTypes = {
	throttle: t.number,
	callback: t.func,
	poll: t.bool
};