import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';

import logo from './img/Logo.svg';
import './styles/style.scss';

export default class Header extends React.Component {
	render() {
		return (
			<header className={ ['headerWrapper', this.props.className || '' ].join(' ') }
				itemType="http://schema.org/Header" itemScope>
				<Grid>
					<Row className='topHeader'>
						<Col md={2}>
							<Image src={logo} alt="Logo" itemProp="logo" responsive />
						</Col>
						<Col md={2}>
							Search
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="bullhorn" className='headerIcon' />
								Объявления
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="comments" className='headerIcon' />
								Блог
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="paw" className='headerIcon' />
								Афиша
							</Link>
						</Col>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="sign-in" className='headerIcon' />
								Войти
							</Link>
						</Col>
					</Row>

					<Row className='bottomHeader'>
						<Col md={2}>
							<Link to="/">
								<FontAwesome name="bars" className='headerIcon' />
								Все разделы
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								Гид по видам и породам
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								Зоокаталоги
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								Жизнь с питомцем
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								Говорят специалисты
							</Link>
						</Col>
						<Col md={2}>
							<Link to='/'>
								Позитив
							</Link>
						</Col>
					</Row>
				</Grid>
			</header>
		);
	}
};
