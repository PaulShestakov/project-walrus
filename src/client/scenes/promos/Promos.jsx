import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';

import { Grid, Row, Col, Form } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';
import Button from 'button/Button';
import Card from 'card/Card';
import Label from 'label/Label';
import Separator from 'separator/Separator';


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
			<Grid className="my-3">
				<Row>
					<Col md={10}>
						<Row>
							<Col md={12} className="d-flex">
								<SearchInput placeholder={t('ENTER_REQUEST')} />
								<Button accent="blue" className="ml-2">
									{t('FIND')}
								</Button>
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
					</Col>

					<Col md={2} className="pl-2">
						<Link to="/newPromo" className="mt-2">
							<Button accent="red">
								<FontAwesome name="plus" />
								{t('CREATE_PROMO')}
							</Button>
						</Link>

						<Card className="mt-2">
							<Label accent="blue" className="py-2 px-3">{t('FILTERS')}</Label>
						</Card>

						<Separator />



					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

