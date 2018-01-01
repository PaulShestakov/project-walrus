import React from 'react';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import { Divider } from 'material-ui';
import { Clear } from 'material-ui-icons';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

@withStyles(styles)
export default class InfoDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.open === 'boolean') {
			this.setState({ open: nextProps.open });
		}
	}

	handleClose = () => {
		const { closeCallback } = this.props;
		if (closeCallback) {
			closeCallback();
		}
	};

	render() {
		const { title = '', classes, message = '', children } = this.props;

		return (
			<Dialog open={this.state.open}
					fullWidth
					onRequestClose={this.handleClose}
					classes={{ paper: classes.paper}}>
				<Grid container className="d-flex-row">
					<Grid item className={classes.closeButton}>
						<Clear onClick={this.handleClose}
							   className={classNames(classes.closeImg)}/>
					</Grid>
					<Grid item style={{flexGrow: 1}}>
						<DialogTitle>{ title }</DialogTitle>
					</Grid>
				</Grid>
				<Divider />
				<DialogContent >
					{
						children ? children : (
							<DialogContentText>
								{
									message
								}
							</DialogContentText>
						)
					}
				</DialogContent>
			</Dialog>
		);
	}
}