import React from 'react';
import {Link} from "react-router-dom";
import {translate} from 'react-i18next';
import {Input, Button, Separator, Grid, Card} from 'components';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import styles from './styles';

@translate(['footer'])
@withStyles(styles)
class Footer extends React.Component {
	render() {
		const {t, classes} = this.props;

		return (
			<footer className={classNames(this.props.className, classes.c, 'mt-4')}>
				<Card>
					<Grid container justify="center">
						<Grid item xs={11} md={9} className="pt-4">
							<Grid container justify="center" direction="column">
								<Grid item>
									<Grid container direction="row">
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('ABOUT_US')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('EDITORIAL_POLICY')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('PUBLIC_OFFER_CONTRACT')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('CONTACTS')}</Link>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('PETS_MEINTENANCE_LEGAL_ISSUES')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('SPECIAL_PROJECTS')}</Link>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('INSTAGRAM')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('VK')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('FB')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('O')}</Link>
												</Grid>
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('YOUTUBE')}</Link>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<Link to="/" className={classes.linkStyle}>{t('SUBSCRIBE_FOR_NEWSLETTER')}</Link>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Separator />
								</Grid>
								<Grid item>
									<Grid container justify="center">
										<Grid item>
											{t('BOTTOM_INFO')}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Card>
			</footer>
		);
	}
}

export default Footer;
