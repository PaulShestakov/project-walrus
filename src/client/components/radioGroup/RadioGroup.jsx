import React from 'react'
import PropTypes from 'prop-types';
import { Checkbox, Grid, Row, FormControl, FormGroup, Radio, Form, Button } from 'react-bootstrap';

import Text from '../text/Text'

class RadioGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: props.selectedOption
		};
	}

	handleRadioChecked(selectedId) {
		this.setState({
			selectedOption: selectedId
		});
		this.props.onChange(selectedId);
	};

	render() {
		return (
			<Grid>
				{
					this.props.options.map(option => {
						return (
							<Row key={option.id}
								 className="mediumMarginTopBottom">
								<label>
									<input
										type="radio"
										checked={this.state.selectedOption === option.id}
										onChange={this.handleRadioChecked.bind(this, option.id)}
										className="mediumMarginRight"
									/>
									<Text text={option.labelText} />
								</label>
							</Row>
						);
					})
				}
			</Grid>
		);
	}
}

RadioGroup.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			labelText: PropTypes.string
		})
	),
	onChange: PropTypes.func
};

export default RadioGroup;