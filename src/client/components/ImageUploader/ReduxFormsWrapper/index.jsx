import React from 'react';
import StandartImageUploader from "../Default";

const ReduxFormsImageUploader = (props) => (
	<StandartImageUploader  {...props} {...props.input} />
);

export default ReduxFormsImageUploader;