import React, { Component, PropTypes as t } from "react";
import _throttle from "lodash.throttle";

export default class QueryableContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.queryContainer = this.queryContainer.bind(this);
		this.queryContainerThrottled = _throttle(this.queryContainer, props.throttle, { 'leading': false });
	}

	queryContainer() {
		const { callback } = this.props;
		const { container } = this.refs;

		this.setState(callback(container));
	}

	componentDidMount() {
		setTimeout(this.queryContainer, 0);
		window.addEventListener("resize", this.queryContainerThrottled);
		if (this.props.poll) {
			this.setState({
				timer: setInterval(this.queryContainerThrottled, this.props.throttle)
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.queryContainerThrottled);
		if (this.state.timer) {
			clearInterval(this.state.timer);
		}
	}

	render() {

		return (
				<div {...this.props} ref="container">
					{
						React.Children.map(this.props.children, (child) => React.cloneElement(child, {...this.state}))
					}
				</div>
		);
	}
}

QueryableContainer.defaultProps = {
	throttle: 150,
	callback: (el) => {
		return { clientWidth: el.clientWidth };
	},
	poll: false
};
