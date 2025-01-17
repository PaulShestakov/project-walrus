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
export default class Header extends React.Component {
	render() {
		const { t, classes } = this.props;

		return (
			<header className={this.props.className} itemType="http://schema.org/Header" itemScope>
				<Card>
					<Grid container justify="center" className="py-3" spacing={0}>
						<Grid item xs={11} md={9}>
							<Grid container className='my-2'>
								<Grid item xs={2}>
									<a href="https://wikipet.by/">
										<img src={logo} alt="Logo" style={{width: '100%'}} />
									</a>
								</Grid>
								<Grid item xs={10} className='d-flex align-items-center justify-content-between'>
									<a href="/" className={classes.topLink}>
										<FontAwesome name="search" className='mr-1' />
										{t('SEARCH')}
									</a>

									<a href="https://wikipet.by/developing.html" className={classes.topLink}>
										<FontAwesome name="bullhorn" className='mr-1' />
										{t('PROMOS')}
									</a>

									<a href="https://wikipet.by/blog/" className={classes.topLink}>
										<FontAwesome name="comments" className='mr-1' />
										{t('BLOG')}
									</a>

									<a href="https://wikipet.by/afisha/" className={classes.topLink}>
										<FontAwesome name="paw" className='mr-1' />
										{t('AFFICHE')}
									</a>

									<a href="/" className={classes.topLink}>
										<FontAwesome name="sign-in" className='mr-1' />
										{t('ENTER')}
									</a>
								</Grid>
							</Grid>

							<Grid container className='mb-2'>
								<Grid item xs={12} className='d-flex align-items-center justify-content-between'>
									<a href='https://wikipet.by/enciklopediya/' className={classes.bottomLink}>
										{t('GUIDE')}
									</a>

									<Link to='/company/health'
										  className={classes.bottomLink}>
										{t('CATALOGUES')}
									</Link>

									<a href='https://wikipet.by/zdorove-i-pitanie-sobaki/' className={classes.bottomLink}>
										{t('LIFE_WITH_PET')}
									</a>

									<a href='https://wikipet.by/zdorove-i-pitanie-sobaki/govoryat-specialisti/' className={classes.bottomLink}>
										{t('SPECIALISTS')}
									</a>

									<a href='https://wikipet.by/positive/' className={classes.bottomLink}>
										{t('POSITIVE')}
									</a>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Card>
			</header>
		);
	}
}
