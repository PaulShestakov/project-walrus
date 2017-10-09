import React from 'react';

import styles from './styles';

class Input extends React.Component {
	render() {
		return (
			<Input placeholder={t('SECTION_SEARCH')} className={classNames(classes.searchInput, 'w-100')} />


		);
	}
}

export default withStyles(styles)(Input);