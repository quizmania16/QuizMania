import React from "react";

import { Link } from "react-router-dom";

const OPTIONS = { A: 0, B: 1, C: 2, D: 3 };

export default class CreateQuizQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct_answer: null,
    };
  }  

  handleCorrectAnswer = (event) => {
    let answer = event.target.value;
    if (Object.keys(OPTIONS).indexOf(answer) < 0) {
      alert("Invalid Answer Option - allowed ' A, B, C, D ' ");
      let correctAnswer = document.getElementById("correct_answer");
      correctAnswer.value = "";
      return false;
    }
    this.setState({ ...this.state, correct_answer: OPTIONS[answer] });
    return true;
  };

  loadNextQuestion = () => {
    if ([0, 1, 2, 3].indexOf(this.state.correct_answer) < 0) {
      alert("Invalid Answer Option - allowed ' A, B, C, D ' ");
      return;
    }
    let question = {
      question_id: this.props.questionNumber,
      question_type: "mcqs",
      question_text: this.state.question_text,
      options: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
      correct_answer: [this.state.correct_answer],
    };
    this.props.inputNextQuestion(this.props.questionNumber + 1, question);
    document.getElementById("question_text").value = "";
    document.getElementById("correct_answer").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
  };

  render() {
    let submitQuiz =
      this.props.questionNumber === this.props.totalQuestions - 1;
    console.log(this.props.allQuestions);
    return (
      <div id="question-container">
        <div>
          <h3 className="question-number">{this.props.questionNumber + 1}. </h3>
          <input
            type="text"
            placeholder="Question"
            name="question_text"
            className="question-input form-control"
            id="question_text"
            onChange={(event) =>
              this.setState({ [event.target.name]: event.target.value })
            }
          />
        </div>
        <div id="answer-buttons" className="btn-grid">
          <input
            type="text"
            name="option1"
            id="option1"
            placeholder="Option - 1"
            className="option-input"
            onChange={(event) =>
              this.setState({ [event.target.name]: event.target.value })
            }
          />
          <input
            type="text"
            name="option2"
            id="option2"
            className="option-input"
            placeholder="Option - 2"
            onChange={(event) =>
              this.setState({ [event.target.name]: event.target.value })
            }
          />
          <input
            type="text"
            name="option3"
            id="option3"
            className="option-input"
            placeholder="Option - 3"
            onChange={(event) =>
              this.setState({ [event.target.name]: event.target.value })
            }
          />
          <input
            type="text"
            name="option4"
            id="option4"
            className="option-input"
            placeholder="Option - 4"
            onChange={(event) =>
              this.setState({ [event.target.name]: event.target.value })
            }
          />
        </div>
        <span className="question-number">Correct Answer : </span>
        <input
          type="text"
          name="correct_answer"
          className="option-input"
          id="correct_answer"
          placeholder="A, B, C, D"
          onBlur={this.handleCorrectAnswer}
          onChange={(event) =>
            this.setState({ [event.target.name]: event.target.value })
          }
        />
        {!submitQuiz && (
          <button
            className="btn btn-general btn-right"
            onClick={this.loadNextQuestion}
          >
            Next Question
          </button>
        )}
        {submitQuiz && (
          <Link
            to={{
              pathname: "/showCreatedQuiz",
              quizQuestions: this.props.allQuestions,
              lastQuestion: {
                question_id: this.props.questionNumber,
                question_type: "mcqs",
                question_text: this.state.question_text,
                options: [
                  this.state.option1,
                  this.state.option2,
                  this.state.option3,
                  this.state.option4,
                ],
                correct_answer: [this.state.correct_answer],
              },
              totalQuestions: this.props.totalQuestions,
              quizName: this.props.quizName,
            }}

            onClick = {this.testClick}
          >
            <button className="btn btn-general btn-right" >Submit Quiz</button>
          </Link>
        )}
      </div>
    );
  }
}
