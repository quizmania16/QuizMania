import React from "react";

import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="quiz-result-title">All My Quiz </h3>
        <div className="row" style={{ marginLeft: "20em" }}>
          <div className="col-md-5">
            <Link to="/showUserQuizResult">
              <button className="btn start-btn">All Results</button>
            </Link>
          </div>
          <div className="col-md-5">
            <Link to="/myQuiz">
              <button className="btn start-btn">My Quiz</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <button
              className="btn start-btn btn-right"
              onClick={() => window.history.go(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
