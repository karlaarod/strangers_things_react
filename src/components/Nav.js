import React from "react";
import { Link, useHistory } from "react-router-dom";

const Nav = ({ userData, setUserData, setToken }) => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    setUserData({});
    setToken("");
    history.push("/");
  };

  return (
    <header>
      <nav>
        <img src="/logo.png"></img>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/dashboard">Profile</Link>
          {userData._id ? (
            <Link to="/" onClick={() => logOut()}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
