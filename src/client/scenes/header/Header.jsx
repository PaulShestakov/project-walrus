import React from 'react';
import CSSModules from 'react-css-modules';
import { translate, Interpolate, Trans } from 'react-i18next';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import logo from './img/Logo.svg';
import styles from './style.module.scss';
import {Grid} from "material-ui";
import {Image} from "react-bootstrap";

@translate(['header'])
@CSSModules(styles)
class Header extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<header className={this.props.className} styleName="headerWrapper" itemType="http://schema.org/Header" itemScope>
				<Grid container justify="center" className="py-3">
					<Grid item xs={8}>
						<Grid container styleName="topHeader" className='mb-4'>
							<Grid item xs={2}>
								<Image src={logo} alt="Logo" itemProp="logo" style={{width: '100%'}} />
							</Grid>
							<Grid item xs={10} className='d-flex align-items-center justify-content-between'>
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
							</Grid>
						</Grid>

						<Grid container styleName='bottomHeader'>
							<Grid item xs={12} className='d-flex align-items-center justify-content-between'>
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
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</header>
		);
	}
}

export default Header;
