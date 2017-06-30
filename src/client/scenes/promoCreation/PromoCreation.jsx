import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';

export default class PromoCreation extends React.Component {
	render() {
		return (
			<Grid>
				<Row className='topHeader'>
					<Title tag='h4' text='Тип объявления' />
				</Row>
			</Grid>
		);
	}
};

