import React from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Grid, Button, Title, Label, Textarea, TextField, Input, Text, Rating} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles';
import {Paper} from "material-ui";
import defaultImage from '../../../../../assets/img/company-default.png';
import {ModeEdit as ModeEditIcon, DeleteForever as Delete, Block} from 'material-ui-icons';
import Authorized from "../../../../Authorized";


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
				message: `Вы действительно хотите заблокировать ${company.name}? (Функция не реализована пока что)`,
			}
		}
		this.props.handleAction(value);
	};

	getImageSrc() {
		return encodeURI((this.props.company.logo || defaultImage).split('\\').join('\/'));
	}

	render() {
		const { t, classes, company } = this.props;
		const mainLocations = company.locations.filter(item => (item.isMain === 1));
		let mainLocation;
		if (mainLocations.length === 0) {
			mainLocation = company.locations[0];
		} else {
			mainLocation = mainLocations[0];
		}

		return (
			<Card className={classNames(classes.card, 'mt-3', 'p-4')}>
				<Link to={`/company/${company.companyId}`}>
					<Paper>
						<CardMedia
						className={classes.cardImage}
						image={this.getImageSrc()} />
					</Paper>
				</Link>

				<CardContent className={classNames(classes.cardContent, 'p-0', 'pl-4')}>
					<div className={classes.headerWrapper}>
						<Link to={`/company/${company.companyId}`} className={classes.headerLink}>
							<Label uppercase bold fontSize="2rem">
								{company.name}
							</Label>
						</Link>

						<Authorized allowedRoles={[5]} className={classes.editButtonsBlock}>
							<Button fab className={classes.editButton}>
								<Link to={`/company/edit/${company.companyId}`}>
									<ModeEditIcon className={classes.editIcon} />
								</Link>
							</Button>
							<Button fab className={classes.editButton}
									onClick={this.handleAction.bind(null, company, 'block')}>
								<Block className={classes.editIcon} />
							</Button>
							<Button fab className={classes.editButton}
									onClick={this.handleAction.bind(null, company, 'delete')}>
								<Delete className={classes.editIcon} />
							</Button>
						</Authorized>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<div className={classes.flexRow}>
							<FontAwesome name="map-marker"
										 className={classes.icon} />
							<Text>{mainLocation.cityName + ': ' + mainLocation.address}</Text>
						</div>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<div className={classes.flexRow}>
							<FontAwesome name="globe" className={classes.icon} />
							<Text>{company.url}</Text>
						</div>
					</div>
					<div className={classNames(classes.flexRow, 'mt-2')}>
						<div className={classes.flexRow}>
							<Rating 
								readOnly
								value={company.averageRating}/>
							<Text>{company.numberOfFeedbacks} отзывов</Text>
						</div>
					</div>

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" accent="white"
							onClick={this.props.handleOpenWorkingTimeDialog.bind(null, mainLocation.workingTimes)}>
							{t('WORKING_TIME')}
						</Button>
						<Button className="mr-2 text-white" accent="white"
								onClick={this.props.handleOpenPhonesDialog.bind(null, mainLocation.phones)}>
                            Телефоны
						</Button>
						{
							company.numerOfLocations > 0 &&
							<Link to={`/company/${company.companyId}/contacts`}>
								<Button className="mr-2 text-white" accent="white">
									Филиалы ({ company.numerOfLocations })
								</Button>
							</Link>
						}
						
					</div>
				</CardContent>
			</Card>
		);
	}
}
