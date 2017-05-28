import React from 'react';
import {Link} from 'react-router';
require("../../scss/style.scss");

export const Header = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            <li><Link to="/home" ><button className="btn btn-link">Home</button></Link></li>
            <li><Link to="/user" ><button className="btn btn-link">User</button></Link></li>
            <li><Link to="/getAllUsers" ><button className="btn btn-link">List Users</button></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;