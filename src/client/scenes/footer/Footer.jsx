import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from "react-router-dom";
import { translate, Interpolate, Trans } from 'react-i18next';
import { Input, Button, Separator } from 'components';

import styles from './style.module.scss';
import {Grid} from "material-ui";

@translate(['footer'])
@CSSModules(styles)
class Footer extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<footer className={this.props.className} styleName="footerWrapper">
				<Grid container justify="center">
					<Grid item xs={8}>
						<Grid container>
							<Grid item xs={3} className="d-flex flex-column">
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
							</Grid>
							<Grid item xs={3} className="d-flex flex-column">
								<Link to="/" className="my-2">
                                    {t('PETS_MEINTENANCE_LEGAL_ISSUES')}
								</Link>
								<Separator/>
								<Link to="/" className="my-2">
                                    {t('SPECIAL_PROJECTS')}
								</Link>
							</Grid>
							<Grid item xs={3} className="d-flex flex-column">
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
							</Grid>
							<Grid item xs={3} className="d-flex flex-column align-items-start">
								<Link to="/" className="my-2">
                                    {t('SUBSCRIBE_FOR_NEWSLETTER')}
								</Link>
								<Input placeholder={t('ENTER_EMAIL')} className="my-2" />
								<Button accent="red"
										className="my-2 text-white">
                                    {t('SUBSCRIBE')}
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Separator />
							</Grid>
							<Grid item xs={12} className="d-flex justify-content-around my-2">
                                {t('BOTTOM_INFO')}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</footer>
		);
	}
}

export default Footer;
