import React from 'react';
import { translate, Interpolate, Trans } from 'react-i18next';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import logo from './img/Logo.svg';
import './styles/style.scss';

@translate(['header'], { wait: true })
class Header extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<header className={ ['headerWrapper', this.props.className || '' ].join(' ') }
				itemType="http://schema.org/Header" itemScope>
				<Grid>
					<Row className='topHeader'>
						<Col md={2}>
							<Image src={logo} alt="Logo" itemProp="logo" responsive />
						</Col>
						<Col md={2}>
							{t('SEARCH')}
						</Col>
						<Col md={2}>
							<Link to="/promoCreation">
								<FontAwesome name="bullhorn" className='headerIcon' />
								{t('PROMOS')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="comments" className='headerIcon' />
								{t('BLOG')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="paw" className='headerIcon' />
								{t('AFFICHE')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="sign-in" className='headerIcon' />
								{t('ENTER')}
							</Link>
						</Col>
					</Row>

					<Row className='bottomHeader'>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="bars" className='headerIcon' />
								{t('ALL_SECTIONS')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								{t('GUIDE')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								{t('ZOOCALLS')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								{t('LIFE_WITH_PET')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								{t('SPECIALISTS')}
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								{t('POSITIVE')}
							</Link>
						</Col>
					</Row>
				</Grid>
			</header>
		);
	}
}

export default Header;
