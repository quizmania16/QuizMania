import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import AllQuizQuestions from "./AllQuizQuestions";

export default class JoinQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      quizID: "",
      userName: "",
      canStart: false,
      quiz: [],
    };
  }

  validateFields = () => {
    if (this.state.userName === "") {
      alert("Enter User Name");
      return false;
    }
    if (this.state.quizID === "") {
      alert("Enter Quiz ID");
      return false;
    }
    return true;
  };

  validateQuizID = () => {
    if (this.validateFields()) {
      let quiz = this.state.quiz[0];
      let quizId = this.state.quizID;
      console.log(quiz, this.state.quiz);
      axios
        .get(`/getQuiz/${quizId}`)
        .then((res) => {
          let quiz = res.data[0];
          console.log(res.data, quiz);
          if (quiz) {
            if (quizId === quiz.quiz_id) {
              this.setState({ ...this.state, canStart: true, quiz: res.data });
            }
          } else {
            alert("Invalid Quiz ID");
          }
        })
        .catch((err) => console.log("error from React ", err));
    }
  };
  render() {
    return (
      <div>
        {!this.state.canStart && (
          <div>
            <div style={{ padding: 15 }}>
              <div style={{ padding: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  onChange={(event) =>
                    this.setState({ userName: event.target.value })
                  }
                />
              </div>
              <div style={{ padding: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz ID"
                  onChange={(event) =>
                    this.setState({ quizID: event.target.value })
                  }
                />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ paddingRight: "15px" }}>
                <button
                  id="start-btn"
                  className="start-btn btn btn-general"
                  onClick={this.validateQuizID}
                  disabled={
                    this.state.userName === "" && this.state.quizID === ""
                  }
                >
                  Start
                </button>
              </span>
              <span style={{ paddingLeft: "15px" }}>
                <Link to="/">
                  <button className="start-btn btn">Back</button>
                </Link>
              </span>
            </div>
          </div>
        )}
        {this.state.canStart && (
            <AllQuizQuestions
              userName={this.state.userName}
              quizID={this.state.quizID}
              quiz={this.state.quiz[0]}
            />
        )}
      </div>
    );
  }
}
