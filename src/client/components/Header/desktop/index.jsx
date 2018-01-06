import React from 'react';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Grid, Card } from 'components';
import { withStyles } from 'material-ui/styles';
import logo from '../img/Logo.svg';
import styles from './styles';


@translate(['header'])
@withStyles(styles)
export default class MobileHeader extends React.PureComponent {

	render() {
		const { t, classes } = this.props;

		return (
			<Card>
				<Grid container justify="center" className="py-3 pb-4"
					spacing={0}>
					<Grid item xs={11} md={9}>
						<Grid container className="mb-1">
							<Grid item xs={2}>
								<a href="https://wikipet.by/">
									<img src={logo} alt="Logo" className="w-100" />
								</a>
							</Grid>
							<Grid item xs={2} />
							<Grid item xs={8} className="d-flex align-items-center justify-content-between">

								<a href="https://wikipet.by/developing.html" className={classes.topLink}>
									<FontAwesome name="bullhorn" className="mr-1" />
									{t('PROMOS')}
								</a>

								<a href="https://wikipet.by/blog/" className={classes.topLink}>
									<FontAwesome name="comments" className="mr-1" />
									{t('BLOG')}
								</a>

								<a href="https://wikipet.by/afisha/" className={classes.topLink}>
									<FontAwesome name="paw" className="mr-1" />
									{t('AFFICHE')}
								</a>

								{
									!this.props.isAuthorized
										?
										<a href="https://wikipet.by/#login" className={classes.topLink}>
											<FontAwesome name="sign-in" className="mr-1" />
											{t('ENTER')}
										</a>
										:
										<a href="https://wikipet.by/index.php?action=logout" className={classes.topLink}>
											<FontAwesome name="paw" className="mr-1" />
											Выйти
										</a>
								}
							</Grid>
						</Grid>

						<Grid container>
							<Grid item xs={12} className="d-flex align-items-center justify-content-between">
								<a href="https://wikipet.by/enciklopediya/" className={classes.bottomLink}>
									{t('GUIDE')}
								</a>

								<Link to="/company/health"
									  className={classes.bottomLink}>
									{t('CATALOGUES')}
								</Link>

								<a href="https://wikipet.by/zdorove-i-pitanie-sobaki/" className={classes.bottomLink}>
									{t('LIFE_WITH_PET')}
								</a>

								<a href="https://wikipet.by/zdorove-i-pitanie-sobaki/govoryat-specialisti/" className={classes.bottomLink}>
									{t('SPECIALISTS')}
								</a>

								<a href="https://wikipet.by/positive/" className={classes.bottomLink}>
									{t('POSITIVE')}
								</a>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		);
	}
}
