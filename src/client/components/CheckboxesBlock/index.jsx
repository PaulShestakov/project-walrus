import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Button, Title, Label, Grid, Card, Popover, Checkbox, Separator, ButtonMore} from 'components';
import {FormControlLabel} from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
import {GridList, GridListTile} from 'material-ui/GridList';


@translate(['companiesList'])
@withStyles(styles)
export default class CheckboxesBlock extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isPopoverOpened: false
		};
	}

	handleClickShowMoreButton = () => {
		this.setState({
			isPopoverOpened: !this.state.isPopoverOpened,
			anchorEl: ReactDOM.findDOMNode(this.button),
		});
	};

	handleRequestPopoverClose = () => {
		this.setState({
			isPopoverOpened: false,
		});
	};

	render() {
		const {
			isEnabled,

			classes,
			className,

			items,
			selectedIds,

			title,
			showMoreLabel,
			formGroupName,
			numberOfItemsToShowDefault,
		} = this.props;


		const { isPopoverOpened, anchorEl } = this.state;

		const cols = (((items.length || 0) / 6) ^ 0) + 1;

		const visibleItems = items.slice(0, numberOfItemsToShowDefault)
			.concat(
				items.slice(numberOfItemsToShowDefault).filter(item => selectedIds.indexOf(item.value) > -1)
			);

		const visibleItemsCount = visibleItems.length;


		return (
			<div className={classNames(className, {[classes.disabled]: !isEnabled})}>
				<Label uppercase={true} bold={true} fontSize="1.25rem" className="py-2 pl-2">{title}</Label>

				<Separator />

				<div className={classNames(
					classes.checkboxesContainer,
					visibleItemsCount > 0 ? 'mx-2' : ''
				)}>
					{
						visibleItems.map((item, index) => {
							const checked = selectedIds.indexOf(item.value) !== -1;

							return (
								<FormControlLabel
									key={index}
									classes={{
										label: classes.checkboxLabel
									}}
									className={classNames(classes.checkboxWrapper, 'mt-2')}
									label={item.label}
									control={
										<Checkbox value={item.value}
											className="mr-2"
											name={formGroupName}
											checked={checked}
											onChange={this.props.handleCheckboxPressed} />
									} />
							);
						})
					}
				</div>

				{
					isEnabled && items.length > numberOfItemsToShowDefault

					&& (
						<div>
							<ButtonMore
								onClick={this.handleClickShowMoreButton}
								label={showMoreLabel}
								ref={node => {
									this.button = node;
								}} />

							<Popover
								open={isPopoverOpened}
								anchorEl={anchorEl}
								onClose={this.handleRequestPopoverClose}
								anchorOrigin={{
									vertical: 'center',
									horizontal: 'left',
								}}
								transformOrigin={{
									vertical: 'center',
									horizontal: 'right',
								}}>
								{
									<Card className={classes.popoverCard}>
										<GridList cellHeight="auto" cols={Math.min(cols, 4)}>
											{
												items && items.map(item => (
													<GridListTile key={item.value} cols={1} classes={{tile: classes.gridListTile}}>
														<FormControlLabel
															classes={{
																label: classes.checkboxLabel
															}}
															label={item.label}
															className={classNames(classes.checkboxWrapper, 'ml-2 mt-1')}
															control={
																<Checkbox name={formGroupName}
																	className="mr-2"
																	value={item.value}
																	checked={selectedIds.indexOf(item.value) !== -1}
																	onChange={this.props.handleCheckboxPressed} />
															} />
													</GridListTile>
												))
											}
										</GridList>
									</Card>
								}
							</Popover>
							<Separator />
						</div>
					)
				}
			</div>
		);
	}
}

CheckboxesBlock.propTypes = {
	isEnabled: PropTypes.bool,
	handleCheckboxPressed: PropTypes.func.isRequired
};

CheckboxesBlock.defaultProps = {
	isEnabled: true,
};


