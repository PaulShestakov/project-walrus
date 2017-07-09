import React from 'react';
import './styles/style.scss';

class Separator extends React.Component {
	render() {
		return (
			<div className={["separator", this.props.className].join(' ')}></div>
		);
	}
}

export default Separator;