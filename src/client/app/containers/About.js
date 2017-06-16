import About        from './../components/About.jsx';
import { connect }  from 'react-redux';

export default connect(
  state => state.about,
  dispatch => {}
)(About);
