import React from 'react';
import { translate } from 'react-i18next';

import { Checkbox, Grid, Row, FormControl, ControlLabel } from 'react-bootstrap';



@translate(['newPromo'])
class BuyPromo extends React.Component {

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row>{t('CITY')}</Row>

			</Grid>
		);
	}
}

export default BuyPromo

