import React from 'react';
import { translate } from 'react-i18next';

import { FormControl } from 'react-bootstrap';
import Separator from '../../../components/separator/Separator';
import Title from '../../../components/title/Title.jsx';
import Input from '../../../components/input/Input';

@translate(['newPromo'])
class BuyPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				<Title text={t('PROMO_NAME')} className="mt-5"/>
				<Input name="promoName" placeholder={t('ENTER_PROMO_NAME')} />

				<Title text={t('CITY')} className="mt-5" />
				<Input name="city" placeholder={t('ENTER_CITY')} />

				<Title text={t('YOUR_NAME')} className="mt-4" />
				<Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

				<Title text={t('ADDRESS')} className="mt-5" />
				<Input name="personAddress" placeholder={t('ENTER_ADDRESS')} />

				<Title text={t('YOUR_EMAIL')} className="mt-4" />
				<Input name="personEmail" placeholder={t('ENTER_YOUR_EMAIL')} />

				<Title text={t('YOUR_PHONE')} className="mt-4" />
				<Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />

				<Title text={t('DESCRIPTION')} className="mt-4" />
				<Input name="description" placeholder={t('ENTER_DESCRIPTION')} />
			</div>
		);
	}
}

export default BuyPromo;



