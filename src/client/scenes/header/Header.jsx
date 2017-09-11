import React from 'react';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Grid, Card } from 'components';
import { withStyles } from 'material-ui/styles';

import logo from './img/Logo.svg';

import styles from './styles';

@translate(['header'])
@withStyles(styles)
class Header extends React.Component {
	render() {
		const { t, classes } = this.props;

		return (
			<header className={this.props.className} itemType="http://schema.org/Header" itemScope>
				<Card>
					<Grid container justify="center" className="py-3">
						<Grid item md={9}>
							<Grid container className='my-2'>
								<Grid item md={2}>
									<img src={logo} alt="Logo" style={{width: '100%'}} />
								</Grid>
								<Grid item md={10} className='d-flex align-items-center justify-content-between'>
									<Link to="/" className={classes.topLink}>
										<FontAwesome name="search" className='mr-1' />
										{t('SEARCH')}
									</Link>

									<Link to="/promosList" className={classes.topLink}>
										<FontAwesome name="bullhorn" className='mr-1' />
										{t('PROMOS')}
									</Link>

									<Link to="/" className={classes.topLink}>
										<FontAwesome name="comments" className='mr-1' />
										{t('BLOG')}
									</Link>

									<Link to="/" className={classes.topLink}>
										<FontAwesome name="paw" className='mr-1' />
										{t('AFFICHE')}
									</Link>

									<Link to="/" className={classes.topLink}>
										<FontAwesome name="sign-in" className='mr-1' />
										{t('ENTER')}
									</Link>
								</Grid>
							</Grid>

							<Grid container className='mb-2'>
								<Grid item md={12} className='d-flex align-items-center justify-content-between'>
									<Link to='/' className={classes.bottomLink}>
										{t('GUIDE')}
									</Link>

									<Link to='/' className={classes.bottomLink}>
										{t('ZOOCALLS')}
									</Link>

									<Link to='/' className={classes.bottomLink}>
										{t('LIFE_WITH_PET')}
									</Link>

									<Link to='/' className={classes.bottomLink}>
										{t('SPECIALISTS')}
									</Link>

									<Link to='/' className={classes.bottomLink}>
										{t('POSITIVE')}
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Card>
			</header>
		);
	}
}

export default Header;
