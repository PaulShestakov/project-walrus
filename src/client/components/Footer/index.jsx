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
			<footer className={classNames(this.props.className)}>
				<Card className="pb-3">
					<Grid container justify="center" spacing={0}>
						<Grid item xs={11} md={9} className="pt-4">
							<Grid container justify="center" direction="column">
								<Grid item>
									<Grid container direction="row">
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<a href="https://wikipet.by/o-nas/" className={classes.linkStyle}>{t('ABOUT_US')}</a>
												</Grid>
												<Grid item>
													<a href="https://wikipet.by/reklamodatelyam.html" className={classes.linkStyle}>{t('EDITORIAL_POLICY')}</a>
												</Grid>
												<Grid item>
													<a href="https://wikipet.by/dogovor-publichnoy-oferti.html" className={classes.linkStyle}>{t('PUBLIC_OFFER_CONTRACT')}</a>
												</Grid>
												<Grid item>
													<a href="https://wikipet.by/contact.html" className={classes.linkStyle}>{t('CONTACTS')}</a>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={4}>
											<Grid container direction="column">
												<Grid item>
													<a href="https://wikipet.by/pravovye-voprosy/" className={classes.linkStyle}>{t('PETS_MEINTENANCE_LEGAL_ISSUES')}</a>
												</Grid>
												<Grid item>
													<a href="https://wikipet.by/specproekty/" className={classes.linkStyle}>{t('SPECIAL_PROJECTS')}</a>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={2}>
											<Grid container direction="column">
												<Grid item>
													<a href="https://www.instagram.com/wikipet.by/" target="_blank" className={classes.linkStyle}>{t('INSTAGRAM')}</a>
												</Grid>
												<Grid item>
													<a href="https://vk.com/wikipet_by" target="_blank" className={classes.linkStyle}>{t('VK')}</a>
												</Grid>
												<Grid item>
													<a href="https://www.facebook.com/WikiPet.by/" target="_blank" className={classes.linkStyle}>{t('FB')}</a>
												</Grid>
												<Grid item>
													<a href="https://ok.ru/group/53392578379999" target="_blank" className={classes.linkStyle}>{t('O')}</a>
												</Grid>
												<Grid item>
													<a href="https://www.youtube.com/channel/UCne90hqBQQRD0exJDB7uGTA" target="_blank" className={classes.linkStyle}>{t('YOUTUBE')}</a>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={3}>
											<Grid container direction="column">
												<Grid item>
													<a href="/" className={classes.linkStyle}>{t('SUBSCRIBE_FOR_NEWSLETTER')}</a>
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
