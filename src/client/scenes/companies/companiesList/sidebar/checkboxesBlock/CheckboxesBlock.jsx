import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Button, Label, Grid, Card, Popover, Checkbox, Separator, ButtonMore} from "components";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';


@translate(['companiesList'])
@withStyles(styles)
export default class CheckboxesBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isPopoverOpened: false,
		};
	}

	handleOpenPopover = () => {
		this.setState({
			isPopoverOpened: !this.state.isPopoverOpened
		});
	};

	handlePopoverOuterAction = () => {
		this.setState({
			isPopoverOpened: false
		});
	};

	render() {
		const {classes, title, showMoreLabel, formGroupName, items, selectedIds, ...other} = this.props;

		const otherItemsPopover = (
			<Card className={classes.popoverCard}>
			{
				items.map((item, index) => (
					<FormControlLabel
						label={item.label}
						className={classNames(classes.checkboxWrapper, 'mt-2')}
						control={
							<Checkbox name={formGroupName}
								className="ml-3"
								value={item.value}
								checked={selectedIds.indexOf(item.value) !== -1}
								onChange={this.props.handleCheckboxPressed}
							/>
						} />
				))
			}
			</Card>
		);

		const numberOfItemsToShow = this.props.numberOfItemsToShowDefault +
				items.slice(this.props.numberOfItemsToShowDefault).filter(item => selectedIds.indexOf(item.value) > -1).length;

		return (
			<div>
				<Label uppercase bold fontSize="1.5rem" className="m-3">{title}</Label>
				<Separator />
				<div className={classNames(
					classes.checkboxesContainer,
					numberOfItemsToShow > 0 ? 'm-3 mb-2' : ''
				)}>
					{
						items.slice(0, this.props.numberOfItemsToShowDefault)
							.concat(
								items.slice(this.props.numberOfItemsToShowDefault).filter(item => selectedIds.indexOf(item.value) > -1)
							)
							.map((item, index) => {
								const checked = selectedIds.indexOf(item.value) !== -1;

								return (
									<FormControlLabel className={classNames(classes.checkboxWrapper, 'mt-2')}
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
				<Popover isOpen={this.state.isPopoverOpened}
					 body={otherItemsPopover}
					 preferPlace="left"
					 onOuterAction={this.handlePopoverOuterAction}>

					<ButtonMore onClick={this.handleOpenPopover} label={showMoreLabel} />
				</Popover>
				<Separator className="pb-2" />
			</div>
		);
	}
}