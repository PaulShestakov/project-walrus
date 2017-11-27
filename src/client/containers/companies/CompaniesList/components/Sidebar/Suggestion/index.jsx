import React from 'react';
import { Suggestion } from  'components';

export default ({ item, props }) => (
	<Suggestion
		title={item.title}
		items={item.getItems(props)}
	/>
);