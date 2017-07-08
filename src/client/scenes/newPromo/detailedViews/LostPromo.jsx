import React from 'react';
import { translate } from 'react-i18next';

import { Grid, Row, FormControl } from 'react-bootstrap';
import Separator from '../../../components/separator/Separator';
import Title from '../../../components/title/Title.jsx';


@translate(['newPromo'])
class SellPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				<Row>
					<Title text={t('CITY')} />
					<FormControl type='text'
						name="city"
						onChange={this.props.handleInputChange} />
				</Row>

				<Row><Separator className="mediumMarginTopBottom"/></Row>

				<Row>
					<Title text={t('FOUND_ADDRESS')} />
					<FormControl type='text'
						name="foundAddress"
						onChange={this.props.handleInputChange} />
				</Row>

				<Row>
					<Title text={t('FOUND_TIME')} />
					<FormControl type='text'
						name="foundTime"
						onChange={this.props.handleInputChange} />
				</Row>

				<Row>
					<Title text={t('GENDER')} />
					<FormControl componentClass="select"
						placeholder={t('SELECT_GENDER')}
						name="gender"
						onChange={this.props.handleInputChange}>

						<option value="BOY">{t('BOY')}</option>
						<option value="GIRL">{t('GIRL')}</option>
					</FormControl>
				</Row>

				<Row>
					<Title text={t('APPROXIMATE_AGE')} />
					<FormControl type='text'
						 name="approximateAge"
						 onChange={this.props.handleInputChange}/>
				</Row>

				<Row>
					<Title text={t('DESCRIPTION')} />
					<FormControl type='text'
						 name="description"
						 onChange={this.props.handleInputChange}/>
				</Row>

				<Row>
					<Title text={t('YOUR_NAME')} />
					<FormControl type='text'
						 name="personName"
						 onChange={this.props.handleInputChange}/>
				</Row>

				<Row>
					<Title text={t('YOUR_PHONE')} />
					<FormControl type='text'
						 name="personPhone"
						 onChange={this.props.handleInputChange}/>
				</Row>
			</div>
		);
	}
}

export default SellPromo

