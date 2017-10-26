import React from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Grid, Button, Title, Label, Textarea, TextField, Input, Text} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles';
import {Paper} from "material-ui";
import defaultImage from '../../../../assets/img/company-default.png';
import {ModeEdit as ModeEditIcon, DeleteForever as Delete, Block} from 'material-ui-icons';


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.Component {

	handleAction = (company, action) => {
		let value = undefined;
		if (action === 'delete') {
			value = {
                companyId: company.companyId,
				action: this.props.deleteAction,
				title: 'Удаление компании',
				message: `Вы действительно хотите удалить ${company.name}?`,
			}
		} else {
			value = {
                companyId: company.companyId,
				action: this.props.blockAction,
				title: 'Блокировка компании',
				message: `Вы действительно хотите заблокировать ${company.name}?`,
			}
		}
		this.props.handleAction(value);
	};

	render() {
		const {t, classes, className, company, ...other} = this.props;
		const imageSrc = company.logo ? company.logo : defaultImage;

		return (
			<Card className={classNames(classes.card, 'mt-3', 'p-4')}>
				<Link to={`/company/${company.companyId}`}>
					<Paper>
						<CardMedia className={classes.cardImage} image={imageSrc} />
					</Paper>
				</Link>

				<CardContent className={classNames(classes.cardContent, 'p-0', 'pl-4')}>
					<div className={classNames(classes.flexRow, classes.spaceBetween)}>
						<Label uppercase bold fontSize="2rem">{company.name}</Label>
						<div>
							<Button fab className={classNames(classes.editButton, 'mr-3')}>
								<Link to={`/company/edit/${company.companyId}`}>
									<ModeEditIcon className={classes.editIcon} />
								</Link>
							</Button>
							<Button fab
									className={classNames(classes.editButton, 'mr-3')}
									onClick={this.handleAction.bind(null, company, 'block')}>
								<Block className={classes.editIcon} />
							</Button>
							<Button fab
									className={classes.editButton}
									onClick={this.handleAction.bind(null, company, 'delete')}>
								<Delete className={classes.editIcon} />
							</Button>
						</div>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						{
							company.locations.map(location => {
								return (
									<div key={location.id} className={classes.flexRow}>
										<FontAwesome name="map-marker" className={classes.icon} />
										<Text>{location.cityName + ': ' + location.address}</Text>
									</div>
								);
							})
						}
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="globe" className={classes.icon} />
						<Text>{company.websiteUrl}</Text>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="phone" className={classes.icon} />
						<Text>{company.phones ? company.phones.map(item => item.phone).join(', ') : 'Телефонов нет'}</Text>
					</div>

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" accent="white"
							onClick={this.props.handleOpenWorkingTimeDialog.bind(null, company.daysOfWeekWorkingTime)}>
							{t('WORKING_TIME')}
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}
}
