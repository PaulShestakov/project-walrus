import React from 'react';
import { translate } from 'react-i18next';

import { Title, Input, DateTimePicker, Grid } from 'components';

@translate(['newPromo'])
class LostPromo extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<div>
				<Title className="mt-5">{t('LOST_ADDRESS')}</Title>
				<Input name="address" fullWidth placeholder={t('ENTER_LOST_ADDRESS')} />

				<Title className="mt-4">{t('LOST_TIME')}</Title>
				<DateTimePicker name="date" locale="ru" placeholder={t('ENTER_LOST_TIME')} />

				{/*<Title text={t('GENDER')} className="mt-4" />*/}
				{/*
				*/}

				<Title className="mt-4">{t('APPROXIMATE_AGE')}</Title>
				<Input name="age" fullWidth placeholder={t('ENTER_APPROXIMATE_AGE')} />

                {/*
					<Title text={t('YOUR_NAME')} className="mt-4"/>
                    < Input name="personName" placeholder={t('ENTER_YOUR_NAME')} />

                    <Title text={t('YOUR_PHONE')} className="mt-4" />
                    <Input name="personPhone" placeholder={t('ENTER_YOUR_PHONE')} />
                */}
			</div>
		);
	}
}

export default LostPromo;

