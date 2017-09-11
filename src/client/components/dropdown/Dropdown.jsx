import React from 'react';
import ReactDropdown from 'react-dropdown';

import './styles.scss';

class Dropdown extends React.Component {

    render() {
		const {className, ...other} = this.props;

        return (
            <div className={className}>
                <ReactDropdown {...other} />
            </div>
        );
    }
}

export default Dropdown;