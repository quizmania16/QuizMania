import React from "react";

import { Link } from "react-router-dom";
export default class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      disableButton: false,
      btnColor: ["btn btn-general", "btn btn-general", "btn btn-general", "btn btn-general"],
      submitQuiz: false,
    };
  }

  loadNextQuestion = () => {
    this.setState({
      disableButton: false,
      btnColor: ["btn btn-general", "btn btn-general", "btn btn-general", "btn btn-general"],
      submitQuiz: false,
    });
    this.props.getNextQuestion(this.props.questionNumber + 1);
  };

  validateAnswer = (event) => {
    let btnColors = this.state.btnColor;
    let givenAnswer = event.target.id;
    let marks = 0;
    if (event.target.id === this.props.answer) {
      btnColors[givenAnswer] += " btn-correct";
      marks = 1;
    } else {
      btnColors[givenAnswer] += " btn-wrong";
    }
    btnColors[this.props.answer] += " btn-correct";

    this.setState({ ...this.state, disableButton: true, btnColor: btnColors,lastQues : marks });
    this.props.updateMark(marks);
  };

  render() {
    let submitQuiz =
      this.props.questionNumber === this.props.allQuestions.length - 1;

    console.log("marks-", this.props.allQuestions);
    return (
      <div>
        <div id="question-container">
          <div id="question"><span className="show-question-number">{this.props.questionNumber + 1}. {this.props.question}</span></div>
          <div id="answer-buttons" className="btn-grid">
            <button
              id="0"
              disabled={this.state.disableButton}
              className={this.state.btnColor[0]}
              onClick={this.validateAnswer}
            >
              {this.props.options[0]}
            </button>
            <button
              id="1"
              disabled={this.state.disableButton}
              className={this.state.btnColor[1]}
              onClick={this.validateAnswer}
            >
              {this.props.options[1]}
            </button>
            <button
              id="2"
              disabled={this.state.disableButton}
              className={this.state.btnColor[2]}
              onClick={this.validateAnswer}
            >
              {this.props.options[2]}
            </button>
            <button
              id="3"
              disabled={this.state.disableButton}
              className={this.state.btnColor[3]}
              onClick={this.validateAnswer}
            >
              {this.props.options[3]}
            </button>
          </div>
        </div>
        {!submitQuiz && (
          <button
            id="next-btn"
            className="next-btn btn btn-general btn-right"
            onClick={this.loadNextQuestion}
          >
            Next
          </button>
        )}
        {submitQuiz && (
          <Link
            to={{
              pathname: "/result",
              totalMarks: this.props.totalMarks,
              totalQuizQuestions:this.props.allQuestions.length,
              name:this.props.quizName,
              result:
                (this.props.totalMarks+this.state.lastQues >= this.props.passMark)
                  ? "Passed"
                  : "Failed",
            }}
          >
            <button id="next-btn" className="next-btn btn btn-general btn-right">
              Submit Quiz &nbsp;&nbsp; =>
            </button>
          </Link>
        )}
      </div>
    );
  }
}
