import React from 'react';
import { CheckboxesBlock } from  'components';

export default ({ item, props }) => (
    <CheckboxesBlock
        formGroupName={item.name}
        title={item.title}
        showMoreLabel={item.showMoreLabel}
        numberOfItemsToShowDefault={item.numberOfItemsToShowDefault}
        items={item.getItems(props)}
        selectedIds={item.getSelectedIds(props)}
        //handleCheckboxPressed={handleCheckboxPressed}
    />
);