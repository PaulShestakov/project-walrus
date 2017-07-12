import React from 'react';
import { translate } from 'react-i18next';

import { Grid, Row, Col, Form } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';
import Button from '../../components/button/Button';


import PromoItem from './components/promoItem/PromoItem';
import SearchInput from './components/searchInput/SearchInput';


@translate(['promos'])
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row>
					<Col md={12}>
						<SearchInput placeholder={t('ENTER_REQUEST')} />

						<Button text={t('FIND')} />

						<Button type="submit"
							text={t('FIND')}
							className="my-5"
							bsSize="large"
							buttonType="active"/>
					</Col>
				</Row>

				<Row>
					<Col md={12}>
						{
							this.props.promos.map(promo => {
								return (
									<PromoItem title={promo.title}
										type={promo.type}
										imageSrc={promo.imageSrc}
										date={promo.date}
										description={promo.description}
										price={promo.price} />
							   );
							})
						}
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

