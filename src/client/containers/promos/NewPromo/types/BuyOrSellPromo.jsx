import React from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";

@translate(['newPromo'])
class BuyOrSellPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<Grid container spacing={24} md={12}>
				<Grid item md={12}>

					<Title>{t('PRICE_IN_BYR')}</Title>
					<Input name="price" placeholder={t('ENTER_PRICE_IN_BYR')} className="mt-2" fullWidth />

					{/*
						<Title text={t('YOUR_NAME')} className="mt-4"/>
						< Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

						<Title text={t('ADDRESS')} className="mt-5" />
						<Input name="personAddress" placeholder={t('ENTER_ADDRESS')} />

						<Title text={t('YOUR_EMAIL')} className="mt-4" />
						<Input name="personEmail" placeholder={t('ENTER_YOUR_EMAIL')} />

						<Title text={t('YOUR_PHONE')} className="mt-4" />
						<Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />
					*/}
				</Grid>
			</Grid>
		);
	}
}

export default BuyOrSellPromo;



