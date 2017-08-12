import React from 'react';

import styles from './styles';

export default class Input extends React.Component {
	render() {
		return (
			<Input placeholder={t('SECTION_SEARCH')} className={classNames(classes.searchInput, 'w-100')} />


		);
	}
}