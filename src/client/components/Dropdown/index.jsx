import React from 'react';
import ReactDropdown from 'react-dropdown';

import './styles.scss';

class Dropdown extends React.Component {

    render() {
		const {className, meta, input, ...other} = this.props;

        return (
            <div className={className}>
                <ReactDropdown {...input} {...other} />
            </div>
        );
    }
}

export default Dropdown;