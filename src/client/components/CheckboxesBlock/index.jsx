import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Button, Title, Label, Grid, Card, Popover, Checkbox, Separator, ButtonMore} from "components";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
import { findDOMNode } from 'react-dom';

import { GridList, GridListTile } from 'material-ui/GridList';


@translate(['companiesList'])
@withStyles(styles)
export default class CheckboxesBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isPopoverOpened: false,
		};
	}

	handlePopoverOuterAction = () => {
		this.setState({
			isPopoverOpened: false
		});
	};

	handleClickButton = () => {
		this.setState({
			isPopoverOpened: !this.state.isPopoverOpened,
			anchorEl: findDOMNode(this.button),
		});
	};

	handleRequestClose = () => {
		this.setState({
			isPopoverOpened: false,
		});
	};

	render() {
		const {classes, title, showMoreLabel, formGroupName, items, selectedIds, numberOfItemsToShowDefault } = this.props;

		const cols = (((items.length || 0) / 6) ^ 0) + 1;

		const otherItemsPopover = (
			<Card className={classes.popoverCard}>
				<GridList cellHeight={36} className={''} cols={Math.min(cols, 4)}>
					{
						items && items.map(item => (
							<GridListTile key={item.value} cols={1}>
								<FormControlLabel
									label={item.label}
									className={classNames(classes.checkboxWrapper, 'mt-1')}
									control={
										<Checkbox name={formGroupName}
												  className="ml-3"
												  value={item.value}
												  checked={selectedIds.indexOf(item.value) !== -1}
												  onChange={this.props.handleCheckboxPressed}
										/>
									} />
							</GridListTile>
						))
					}
				</GridList>
			</Card>
		);

		let numberOfItemsToShow;
		if (items) {
            numberOfItemsToShow = numberOfItemsToShowDefault +
                items.slice(numberOfItemsToShowDefault).filter(item => selectedIds.indexOf(item.value) > -1).length
		} else {
			numberOfItemsToShow = 0;
		}
		return (
			<div>
				<Label uppercase bold fontSize="1.5rem" className="m-3 mt-4">{title}</Label>
				<Separator />
				<div className={classNames(
					classes.checkboxesContainer,
					numberOfItemsToShow > 0 ? 'm-3 mb-2' : ''
				)}>
					{
						items && items.slice(0, numberOfItemsToShowDefault)
							.concat(
								items.slice(numberOfItemsToShowDefault).filter(item => selectedIds.indexOf(item.value) > -1)
							)
							.map((item, index) => {
								const checked = selectedIds.indexOf(item.value) !== -1;

								return (
									<FormControlLabel
										key={index}
									    className={classNames(classes.checkboxWrapper, 'mt-2')}
										label={item.label}
										control={
											<Checkbox value={item.value}
												name={formGroupName}
												checked={checked}
												onChange={this.props.handleCheckboxPressed}
											/>
									}/>
								)
							})
					}
				</div>

				<ButtonMore onClick={this.handleClickButton}
					label={showMoreLabel}
					ref={node => {
						this.button = node;
					}} />

				<Popover
					open={this.state.isPopoverOpened}
					anchorEl={this.state.anchorEl}
					onRequestClose={this.handleRequestClose}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'right',
					}}
				>
					{otherItemsPopover}
				</Popover>

				<Separator />
			</div>
		);
	}
}