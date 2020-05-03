import React from "react";
import ReactLoading from "react-loading";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isValidUser: false,
      isLoading: false,
      email: "",
      password: "",
      errors: {
        email: null,
        password: null,
        general: null,
      },
    };
  }

  componentDidMount(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isEmail = (email) => {
    let emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(emailRegEx) === null) return true;
    return false;
  };

  signInUser = () => {
    if (this.isEmail(this.state.email)) {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, email: "Not a valid Email" },
      });
      return;
    }

    this.setState({ ...this.state, isLoading: true });
    let user = { email: this.state.email, password: this.state.password };
    axios
      .post("/signIn", user)
      .then((res) => {
        console.log('ins')
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.username);
        this.setState({ ...this.state, isLoading: false, isValidUser: true });
        this.props.location.isValidUser(true);
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          isLoading: false,
          errors: { email: null, password: null, general: null },
          ...err.response.data,
        });
      });
  };

  render() {
    console.log(this.state);
    if (this.state.isValidUser) return <Redirect to={{ pathname: "/", fromLogin:true, msg:"Login Successfull !!!" }} />;
    return this.state.isLoading ? (
      <div className="container-fluid">
        <div className="center-body" style={{ textAlign: "center" }}>
          <ReactLoading
            type={"bars"}
            color={"white"}
            height={150}
            width={150}
          />
        </div>
      </div>
    ) : (
      <div className="center-body ">
        <div className="login-container heading">
          <div className="row">
            <h2 className="show-quiz-name">Quiz Mania</h2>
          </div>
          <div className="row" style={{ paddingBottom: "10px" }}>
            <div className="col-xs-3"></div>
            <div className="col-xs-7">
              <h5 className="show-question-number" style={{ float: "left" }}>
                Email :
              </h5>
              <input
                type="text"
                name="email"
                className="form-control option-input"
                onChange={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
              />
              {this.state.errors.email && (
                <span className="field-error">{this.state.errors.email}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-7">
              <h5 className="show-question-number" style={{ float: "left" }}>
                Password :
              </h5>
              <input
                type="password"
                name="password"
                className="form-control option-input"
                onChange={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
              />
              {this.state.errors.password && (
                <span className="field-error">
                  {this.state.errors.password}
                </span>
              )}
            </div>
          </div>
          <div
            className="row"
            style={{
              paddingLeft: "25px",
              paddingTop: "15px",
              textAlign: "center",
            }}
          >
            {this.state.errors.general && (
              <div className="field-error" style={{ paddingBottom: "1.5rem" }}>
                {this.state.errors.general}
              </div>
            )}
            <button
              className="btn start-btn btn-general"
              onClick={this.signInUser}
            >
              Login
            </button>
          </div>
          <div className="row sign-up-link">
            New User ? Please{" "}
            <Link to="/signUp">
              <span className="sign-up">Sign Up </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
