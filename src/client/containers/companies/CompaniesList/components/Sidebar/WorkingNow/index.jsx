import React from 'react';
import { FormControlLabel, Switch } from 'material-ui';
import classNames from 'classnames';

export default (props) => (
	<div>
		<FormControlLabel className={classNames(props.classes.switchFormControlWrapper, 'm-3')}
			control={
				<Switch
					checked={props.filter.isWorkingNow}
					onChange={props.handleIsWorkingNowChange}
				/>
			}
			label="Работает сейчас"
		/>
	</div>
);