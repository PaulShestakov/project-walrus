import React from 'react';
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        Footer
        <Link to='/'>link to /</Link>
      </div>
    );
  }
};
