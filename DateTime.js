import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";

class DateTime extends Component {
	static propTypes = {
		type: React.PropTypes.string
	};
	static defaultProps = {
		type: "date"
	};

	constructor(props) {
		super(props);
		this.state = {
			time: null,
			date: null
		};
	}

	handleTime = (event, time) => {
		this.setState({ time: time });
		this.props.input.onChange(time);
	};
	handleDate = (event, date) => {
		this.setState({ date: date });
		this.props.input.onChange(date);
	};

	render() {
		const { input, label, meta: { touched, error }, ...custom } = this.props;
		return (
			<div>
				{this.props.type === "date" &&
					<DatePicker hintText={label} errorText={touched && error} onChange={this.handleDate} value={this.state.date} />}
				{this.props.type === "time" &&
					<TimePicker hintText={label} errorText={touched && error} onChange={this.handleTime} value={this.state.time} />}
			</div>
		);
	}
}

export default DateTime;
