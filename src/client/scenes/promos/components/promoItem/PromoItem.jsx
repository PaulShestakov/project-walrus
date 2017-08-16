import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import classNames from 'classnames';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class PromoItem extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		return (
			<Card>
				<Grid container>
					<Grid item md={3}>
						<img src={imgSrc} />
					</Grid>
					<Grid item md={9}>
					</Grid>
				</Grid>
			</Card>
		);
	}
}

PromoItem.propTypes = {
	imgSrc: PropTypes.string,
	onImageAdde: PropTypes.func,
	onImageDelete: PropTypes.func
};
