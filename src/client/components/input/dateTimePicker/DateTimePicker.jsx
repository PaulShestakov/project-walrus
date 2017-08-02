import React from 'react';
import PropTypes from 'prop-types';

import Datetime from 'react-datetime';

class DateTimePicker extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Datetime inputProps={{"name" : this.props.name}}
                    dateFormat='YYYY-MM-DD'
                    timeFormat='HH:MM:SS'
                    locale={this.props.locale}
                    onChange={this.props.handleInputChange}/>
            </div>
        );
    }
}

Datetime.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default DateTimePicker;