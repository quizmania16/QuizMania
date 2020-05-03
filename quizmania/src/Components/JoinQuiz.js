import React from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import AllQuizQuestions from "./AllQuizQuestions";
import EachAvailableQuiz from "./EachAvailableQuiz";

export default class JoinQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      quizID: "",
      canStart: false,
      quiz: [],
      allAvailableQuizes: null,
    };
  }

  componentDidMount() {
    axios
      .get("/getAllQuiz")
      .then((res) =>
        this.setState({ ...this.state, allAvailableQuizes: res.data })
      )
      .catch((err) => console.log(err, err.response));
  }

  validateFields = () => {
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

  startQuiz = (id, quiz) => {
    this.setState({ ...this.state, quizID: id, quiz: [quiz], canStart: true });
  };

  generateRows = () => {
    let results = this.state.allAvailableQuizes;
    let rows = [];
    if (results.length > 0) {
      results.map((data, index) =>
        rows.push(
          <EachAvailableQuiz
            initiateQuiz={this.startQuiz}
            currentQuiz={data}
            quizIndex={index + 1}
            key={index}
          />
        )
      );
    } else {
      rows.push(
        <tr key={0}>
          <td className="table-display" colSpan="5">
            Not attended any Quiz
          </td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    let rows = this.state.allAvailableQuizes ? this.generateRows() : [];
    return (
      <div className="join-quiz-box">
        {!this.state.canStart && (
          <div>
            <div style={{ padding: 15 }}>
              <div style={{ padding: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "25vw", marginLeft: "40rem" }}
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
                  disabled={this.state.quizID === ""}
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
            <div style={{ padding: "10px" }}></div>
            <div
              className="container"
              style={{ textAlign: "center", marginLeft: "10em" }}
            >
              <table className="table">
                <thead className="table-heading-display">
                  <tr>
                    <th style={{ textAlign: "center" }} colSpan="5">
                      All Available Quizes
                    </th>
                  </tr>
                  {this.state.allAvailableQuizes ? (
                    <tr>
                      <th style={{ textAlign: "center" }}>S.No</th>
                      <th style={{ textAlign: "center" }}>Quiz</th>
                      <th style={{ textAlign: "center" }}>No.of.Questions</th>
                      <th style={{ textAlign: "center" }}>Pass mark</th>
                      <th style={{ textAlign: "center" }}>Quiz ID</th>
                    </tr>
                  ) : (
                    <tr>
                      <th style={{ textAlign: "center" }} colSpan="5">
                        No Available Quizes Currently ...{" "}
                      </th>
                    </tr>
                  )}
                </thead>
                {this.state.allAvailableQuizes && <tbody>{rows}</tbody>}
              </table>
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
