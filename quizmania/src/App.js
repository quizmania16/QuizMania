import React from "react";
import "./CSS/styles.css";
import axios from "axios";

import Routes from "./Routes/Routes";
import QuizNavbar from "./Routes/QuizNavbar";

axios.defaults.baseURL =
  "https://us-central1-quizmania-43a2e.cloudfunctions.net/api";

export default class App extends React.Component {

  render() {
    return (
      <div>
        <QuizNavbar />
        <div className="body-bg">
          <Routes />
        </div>
      </div>
    );
  }
}

/*
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showLogin: true,
    };
  }

  toogleLogin = (flag) => {
    this.setState({...this.state, showLogin:flag})
  };

  render() {
    return <div>{this.state.showLogin ? <Login toogle = {this.toogleLogin} /> : <Register toogle = {this.toogleLogin} />}</div>;
  }
}

*/
