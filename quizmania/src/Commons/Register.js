import React from "react";
import { Link, Redirect } from "react-router-dom";
import ReactLoading from "react-loading";

import axios from "axios";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isUserRegistered: false,
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      handle: "",
      errors: {
        email: null,
        password: null,
        username: null,
        confirmPassword: null,
        general: null,
        handle: null,
      },
    };
  }

  isEmail = (email) => {
    let emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(emailRegEx) === null) return true;
    return false;
  };

  isEmpty = (string) => {
    if (string.trim() === "") return true;
    return false;
  };

  signUpUser = () => {
    let errors = {};

    if (this.isEmail(this.state.email)) errors.email = "Not a valid Email";
    if (this.isEmpty(this.state.email)) errors.email = "Must not be empty";
    if (this.isEmpty(this.state.password))
      errors.password = "Must not be empty";
    if (this.isEmpty(this.state.username))
      errors.username = "Must not be empty";
    if (this.state.password !== this.state.confirmPassword)
      errors.confirmPassword = "Passwords must match";

    if (Object.keys(errors).length > 0) {
      this.setState({ ...this.state, errors });
      return;
    }

    let user = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
      handle: `user-${this.state.username.substring(0, 3)}`,
    };
    this.setState({ ...this.state, isLoading: true });
    axios
      .post("/signUp", user)
      .then((res) =>
        this.setState({
          ...this.state,
          isLoading: false,
          isUserRegistered: true,
        })
      )
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          isLoading: false,
          errors: {
            email: null,
            password: null,
            username: null,
            confirmPassword: null,
            general: null,
            handle: null,
          },
          ...err.response.data,
        });
      });
  };

  render() {
    if (this.state.isUserRegistered) return <Redirect to={{pathname:"/", msg:"Registered Successfully..."}} />;

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
      <div className="center-body">
        <div className="login-container  heading">
          <div className="row">
            <h2 className="show-quiz-name">Sign Up</h2>
          </div>
          <div className="row" style={{ paddingBottom: "10px" }}>
            <div className="col-xs-3"></div>
            <div className="col-xs-7">
              <h5 className="show-question-number" style={{ float: "left" }}>
                Username :
              </h5>
              <input
                type="text"
                className="form-control option-input"
                name="username"
                onChange={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
              />
              {this.state.errors.username && (
                <span className="field-error">
                  {this.state.errors.username}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-7">
              <h5 className="show-question-number" style={{ float: "left" }}>
                Email
              </h5>
              <input
                type="email"
                className="form-control option-input"
                name="email"
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
                className="form-control option-input"
                name="password"
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
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-7">
              <h5 className="show-question-number" style={{ float: "left" }}>
                Confirm Password :
              </h5>
              <input
                type="password"
                className="form-control option-input"
                name="confirmPassword"
                onChange={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
              />
              {this.state.errors.confirmPassword && (
                <span className="field-error">
                  {this.state.errors.confirmPassword}
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
            {this.state.errors.handle && (
              <div className="field-error" style={{ paddingBottom: "1.5rem" }}>
                {this.state.username} is {this.state.errors.handle}
              </div>
            )}
            <button
              className="btn start-btn btn-general"
              onClick={this.signUpUser}
            >
              Sign Up
            </button>
          </div>
          <div className="row sign-up-link">
            Registered User ? Please{" "}
            <Link to="/signIn">
              <span className="sign-up">Sign In </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
