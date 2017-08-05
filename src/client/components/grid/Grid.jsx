import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MaterialGrid from 'material-ui/Grid';

const styleSheet = createStyleSheet({
	MuiGrid: {
		width: '100%'
	}
});

@withStyles(styleSheet)
export default class Grid extends React.Component {
	render() {
		return (
			<MaterialGrid {...this.props}
				classes={{
					MuiGrid: this.props.classes.MuiGrid
				}}
			>
				{this.props.children}
			</MaterialGrid>
		);
	}
}

Grid.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};