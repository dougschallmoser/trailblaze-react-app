import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import UserLogout from './UserLogout';

const NavMenu = () => {

  const currentUser = useSelector(state => state.currentUser);

  const loggedIn = () => {
    return Object.keys(currentUser).length > 0
  }

  return (
    <div id="menu-toggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <div id="menu">
        {loggedIn() && <div id="current-user">Signed in as:<br/>{currentUser.name}</div>}
        {!loggedIn() && <UserSignup />}
        {!loggedIn() && <UserLogin />}
        {loggedIn() && <Link to="/messages"><div>MESSAGES</div></Link>}
        {loggedIn() && <Link to="/favorites"><div>FAVORITES</div></Link>}
        {loggedIn() && <UserLogout />}
      </div>
    </div>
  )
}

export default NavMenu;