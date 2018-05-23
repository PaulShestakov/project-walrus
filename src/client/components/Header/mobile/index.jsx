import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from 'components';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import logo from '../img/Logo.svg';
import IconButton from 'material-ui/IconButton';
import { Menu, PowerSettingsNew, AccountCircle, QuestionAnswer, Pets, Notifications } from 'material-ui-icons';
import styles from './styles';


@translate(['header'])
@withStyles(styles)
export default class MobileHeader extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isDrawerOpened: false
		};
	}

	handleOpenDrawer = () => {
		this.setState({
			isDrawerOpened: true
		});
	};

	handleCloseDrawer = () => {
		this.setState({
			isDrawerOpened: false
		});
	};

	render() {
		const { t, classes } = this.props;
		const { isDrawerOpened } = this.state;

		return (
			<div>
				<Card className={classes.cardWrapper}>
					<IconButton className={classes.menuButton}
						aria-label="Menu"
						onClick={this.handleOpenDrawer}>
						<Menu style={{ fontSize: '2rem' }} />
					</IconButton>

					<div className={classes.logoWrapper}>
						<img src={logo} alt="Logo" className={classes.logo} />
					</div>
				</Card>

				<Drawer open={isDrawerOpened}
					onClose={this.handleCloseDrawer}>
					<div onClick={this.handleCloseDrawer}>
						<List>
							{
								!this.props.isAuthorized ?
									<ListItem button component="a" href="https://wikipet.by/#login">
										<AccountCircle />
										<ListItemText primary={t('ENTER')} />
									</ListItem>
									:
									<ListItem button component="a" href="https://wikipet.by/index.php?action=logout">
										<ListItemIcon>
											<PowerSettingsNew />
										</ListItemIcon>
										<ListItemText primary={Выйти} />
									</ListItem>
							}

							<ListItem button component="a" href="https://wikipet.by/developing.html">
								<ListItemIcon>
									<Notifications />
								</ListItemIcon>
								<ListItemText primary={t('PROMOS')} />
							</ListItem>
							<ListItem button component="a" href="https://wikipet.by/blog/">
								<ListItemIcon>
									<QuestionAnswer />
								</ListItemIcon>
								<ListItemText primary={t('BLOG')} />
							</ListItem>
							<ListItem button component="a" href="https://wikipet.by/afisha/">
								<ListItemIcon>
									<Pets />
								</ListItemIcon>
								<ListItemText primary={t('AFFICHE')} />
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem button component="a" href="https://wikipet.by/enciklopediya/">
								<ListItemText primary={t('GUIDE')} />
							</ListItem>
							<ListItem button component={Link} to="/company/health">
								<ListItemText primary={t('CATALOGUES')} />
							</ListItem>
							<ListItem button component="a" href="https://wikipet.by/zdorove-i-pitanie-sobaki/">
								<ListItemText primary={t('LIFE_WITH_PET')} />
							</ListItem>
							<ListItem button component="a" href="https://wikipet.by/zdorove-i-pitanie-sobaki/govoryat-specialisti/">
								<ListItemText primary={t('SPECIALISTS')} />
							</ListItem>
							<ListItem button component="a" href="https://wikipet.by/positive/">
								<ListItemText primary={t('POSITIVE')} />
							</ListItem>
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}
