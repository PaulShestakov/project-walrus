import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';

import './styles/style.scss';

export default class Footer extends React.Component {
	render() {
		return (
			<footer className={ ['footerWrapper', this.props.className || '' ].join(' ') }>
				<Grid>
					<Row className='topHeader'>
						<Col md={12}>
							Footer
						</Col>
					</Row>
				</Grid>
			</footer>
		);
	}
};
