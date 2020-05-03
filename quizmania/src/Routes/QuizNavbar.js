import React from "react";

import { Link } from "react-router-dom";

export default class QuizNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: localStorage.getItem("token"),
      username: localStorage.getItem("user"),
    };
  }

  changeUser = (flag) => {
    console.log(flag);
    this.setState({
      ...this.state,
      userLoggedIn: localStorage.getItem("token"),
      username: localStorage.getItem("user"),
    });
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      ...this.state,
      userLoggedIn: null,
      username: null,
    });
  };

  render() {
    let userLoggedIn = this.state.userLoggedIn;
    let username = this.state.username;
    console.log(userLoggedIn, username);
    return (
      <div className="quizNavbar">
        <nav className="navbar">
          <div className="brand-title">
            <Link to="/">
              <b className="btn nav-button-title">Quiz Mania</b>
            </Link>
          </div>
          <div className="navbar-links">
            <ul>
              <li>
                {!userLoggedIn && (
                  <>
                    <Link
                      to={{ pathname: "/signIn", isValidUser: this.changeUser }}
                    >
                      <b className="btn nav-button">Sign In</b>
                    </Link>
                    <Link to="/signUp">
                      <b className="btn nav-button active">Sign Up</b>
                    </Link>
                  </>
                )}
                {userLoggedIn && (
                  <>
                    <Link to="/profile">
                      <b className="btn nav-button">{username}</b>
                    </Link>
                    <Link to="/">
                      <b className="btn nav-button" onClick={this.logoutUser}>
                        Logout
                      </b>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
