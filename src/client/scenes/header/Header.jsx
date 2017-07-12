import React from 'react';
import CSSModules from 'react-css-modules';
import { translate, Interpolate, Trans } from 'react-i18next';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import logo from './img/Logo.svg';
import styles from './style.scss';

@translate(['header'])
@CSSModules(styles)
class Header extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<header className={this.props.className} styleName="headerWrapper"
				itemType="http://schema.org/Header" itemScope>
				<Grid className="py-4">
					<Row styleName="topHeader" className='mb-4'>
						<Col md={2}>
							<Image src={logo} alt="Logo" itemProp="logo" style={{width: '100%'}} />
						</Col>

						<Col md={10} className='d-flex align-items-center justify-content-between'>
							<Link to="/">
								<FontAwesome name="search" className='mr-1' />
								{t('SEARCH')}
							</Link>

							<Link to="/promos">
								<FontAwesome name="bullhorn" className='mr-1' />
								{t('PROMOS')}
							</Link>

							<Link to="/">
								<FontAwesome name="comments" className='mr-1' />
								{t('BLOG')}
							</Link>

							<Link to="/">
								<FontAwesome name="paw" className='mr-1' />
								{t('AFFICHE')}
							</Link>

							<Link to="/">
								<FontAwesome name="sign-in" className='mr-1' />
								{t('ENTER')}
							</Link>
						</Col>
					</Row>

					<Row styleName='bottomHeader'>
						<Col md={12} className='d-flex align-items-center justify-content-between'>
							<Link to='/'>
								{t('GUIDE')}
							</Link>

							<Link to='/'>
								{t('ZOOCALLS')}
							</Link>

							<Link to='/'>
								{t('LIFE_WITH_PET')}
							</Link>

							<Link to='/'>
								{t('SPECIALISTS')}
							</Link>

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
