import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import { translate, Interpolate, Trans } from 'react-i18next';

import Separator from '../../components/separator/Separator';

import './style.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import styles from './style.scss';

@translate(['footer'])
@CSSModules(styles)
class Footer extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<footer className={this.props.className} styleName="footerWrapper">
				<Grid>
					<Row>
						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('ABOUT_US')}
							</Link>
							<Link to="/" className="my-2">
								{t('EDITORIAL_POLICY')}
							</Link>
							<Link to="/" className="my-2">
								{t('PUBLIC_OFFER_CONTRACT')}
							</Link>
							<Link to="/" className="my-2">
								{t('CONTACTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('PETS_MEINTENANCE_LEGAL_ISSUES')}
							</Link>
							<Separator/>
							<Link to="/" className="my-2">
								{t('SPECIAL_PROJECTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('INSTAGRAM')}
							</Link>
							<Link to="/" className="my-2">
								{t('VK')}
							</Link>
							<Link to="/" className="my-2">
								{t('FB')}
							</Link>
							<Link to="/" className="my-2">
								{t('O')}
							</Link>
							<Link to="/" className="my-2">
								{t('YOUTUBE')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column align-items-start">
							<Link to="/" className="my-2">
								{t('SUBSCRIBE_FOR_NEWSLETTER')}
							</Link>
							<Input placeholder={t('ENTER_EMAIL')} className="my-2" />
							<Button text={t('SUBSCRIBE')}
								accent="red"
								className="my-2" />
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Separator />
						</Col>
					</Row>

					<Row>
						<Col md={12} className="d-flex justify-content-around my-2">
							{t('BOTTOM_INFO')}
						</Col>
					</Row>
				</Grid>
			</footer>
		);
	}
}

export default Footer;
