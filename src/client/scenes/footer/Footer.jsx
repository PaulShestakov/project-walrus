import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import { translate, Interpolate, Trans } from 'react-i18next';

import Separator from '../../components/separator/Separator';

import './styles/style.scss';

@translate(['footer'])
class Footer extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<footer className={ ['footerWrapper', this.props.className || '' ].join(' ') }>
				<Grid>
					<Row>
						<Col md={3} className="d-flex flex-column">
							<Link to="/">
								{t('ABOUT_US')}
							</Link>
							<Link to="/">
								{t('EDITORIAL_POLICY')}
							</Link>
							<Link to="/">
								{t('PUBLIC_OFFER_CONTRACT')}
							</Link>
							<Link to="/">
								{t('CONTACTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/">
								{t('PETS_MEINTENANCE_LEGAL_ISSUES')}
							</Link>
							<Link to="/">
								{t('SPECIAL_PROJECTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/">
								{t('INSTAGRAM')}
							</Link>
							<Link to="/">
								{t('VK')}
							</Link>
							<Link to="/">
								{t('FB')}
							</Link>
							<Link to="/">
								{t('O')}
							</Link>
							<Link to="/">
								{t('YOUTUBE')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/">
								{t('SUBSCRIBE_FOR_NEWSLETTER')}
							</Link>
							<Link to="/">
								{t('ENTER_EMAIL')}
							</Link>
							<Link to="/">
								{t('SUBSCRIBE')}
							</Link>
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Separator />
							{t('BOTTOM_INFO')}
						</Col>
					</Row>
				</Grid>
			</footer>
		);
	}
}

export default Footer;
