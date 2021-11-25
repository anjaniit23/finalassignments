import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/Signin');
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul>
        <li><Link to="/dashboard" ><span className="links">Post-Section!</span></Link></li>
        <li className="linklogout" onClick={this.onLogoutClick.bind(this)}>logout</li>
        <li className="avatar"><div ><img src={user.avatar} alt={user.name} width="100%" height="100%" /></div></li>
        heyman
      </ul>

    );
    const guestLinks = (

      <ul>
        <li><Link to="/signup"><span className="links">Sign-Up</span></Link></li>
        <li><Link to="/signin"><span className="links">Sign-In</span></Link></li>
      </ul>

    );
    return (

      <div className="navbar">
        {isAuthenticated === true ? authLinks : guestLinks}
      </div>);
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
