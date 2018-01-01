import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/es/TextField/TextField';
import styles from './styles';
import Avatar from 'material-ui/Avatar';
import SearchIcon from 'material-ui-icons/Search';
import {Label} from 'components';
import {Link} from 'react-router-dom';


function Transition(props) {
	return <Slide direction="up" {...props} />;
}

@withStyles(styles)
export default class FyzzySearchDialog extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isOpened: false
		};
	}

	handleClose = () => {
		this.setState({
			isOpened: false
		});

	};

	handleOpen = () => {
		this.setState({
			isOpened: true
		});
	};

	render() {
		const { inputValue, companies, onChange, classes } = this.props;
		const { isOpened } = this.state;

		return (
			<div>
				<Button onClick={this.handleOpen} className={classes.searchButton}>
					<SearchIcon />
					<span className={classes.searchButtonText}>
						Search
					</span>
				</Button>


				<Dialog
					fullScreen={true}
					open={isOpened}
					onClose={this.handleClose}
					transition={Transition}>

					<AppBar className={classes.appBar}>
						<Toolbar>
							<TextField
								autoFocus={true}
								fullWidth={true}
								value={inputValue}

								InputProps={{
									classes: {
										input: classes.input,
										underline: classes.inputUnderline
									},
								}}
								onChange={onChange} />

							<IconButton color="contrast" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>

					<List className={classes.companiesList}>
						{
							companies.map(company => (
								<Link key={company.companyId}
									  to={`/company/${company.categoryId.toLowerCase()}/${company.subcategoryId.toLowerCase()}/company/${company.url_id}`}>
									<ListItem>
										<Avatar src={company.logo} className={classes.companyLogo} />
										<ListItemText primary={company.name} secondary={company.description} />
									</ListItem>
								</Link>
							))
						}
					</List>
				</Dialog>
			</div>
		);
	}
}


FyzzySearchDialog.propTypes = {
	inputValue: PropTypes.string.isRequired,
	companies: PropTypes.arrayOf(PropTypes.shape({
		companyId: PropTypes.string.isRequired,
		subcategoryId: PropTypes.string.isRequired,
		url_id: PropTypes.string.isRequired,
		logo: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})),
	onChange: PropTypes.func.isRequired,
};
