import React from 'react';
import { translate } from 'react-i18next';

import { Title, Input } from 'components';

@translate(['newPromo'])
class BuyPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				{/*
				<Title text={t('YOUR_NAME')} className="mt-4" />
				<Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

				<Title text={t('ADDRESS')} className="mt-5" />
				<Input name="personAddress" placeholder={t('ENTER_ADDRESS')} />

				<Title text={t('YOUR_EMAIL')} className="mt-4" />
				<Input name="personEmail" placeholder={t('ENTER_YOUR_EMAIL')} />

				<Title text={t('YOUR_PHONE')} className="mt-4" />
				<Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />
				*/}
			</div>
		);
	}
}

export default BuyPromo;



