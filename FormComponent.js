import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Toggle from "material-ui/Toggle";
import Checkbox from "material-ui/Checkbox";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import DateTime from "./DateTime";
import ImageUpload from "./ImageUpload";

const width = "100%";

export const FormTextField = ({ input, label, defaultValue, meta: { touched, error }, ...custom }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom}
		defaultValue={defaultValue}
		style={{ width: width }}
	/>
);

export const FormPasswordField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		type="password"
		errorText={touched && error}
		{...input}
		{...custom}
		style={{ width: width }}
	/>
);

const radioGroupDefaultStyle = {
	display: "flex",
	flexDirection: "row",
	width: width,
	paddingTop: 15
};
export const FormRadioGroup = ({ input, ...rest }) => (
	<RadioButtonGroup
		{...input}
		{...rest}
		valueSelected={input.value}
		onChange={(event, value) => input.onChange(value)}
		style={radioGroupDefaultStyle}
	/>
);

export const FormToggle = ({ input, label, meta: { touched, error }, ...custom }) => (
	<Toggle label={label} {...input} {...custom} onToggle={(event, value) => input.onChange(value)} />
);

export const FormDateTime = props => {
	return <DateTime {...props} />;
};

export const FormDropzoneInput = field => {
	return <ImageUpload field={field} aspectRatio={field.aspectRatio} action={field.action} />;
};

export const FormCheckbox = ({ input, label }) => {
	return <Checkbox label={label} checked={input.value ? true : false} onCheck={input.onChange} />;
};
