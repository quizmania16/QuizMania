import React from "react";

import axios from "axios";

const max = 9999;
const min = 1111;

const RANDOM_VALUE = Math.floor(Math.random() * (+max - +min)) + +min;

export default class ShowCreatedQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      showQuizID: false,
    };
  }

  generateQuiz = () => {
    let pass_mark = this.state.pass_mark;
    let newQuizID = this.props.location.quizName + "@" + RANDOM_VALUE;
    let questions = this.props.location.quizQuestions;
    questions.push(this.props.location.lastQuestion);
    let quiz = {
      quiz_id: newQuizID,
      quiz_name: this.props.location.quizName,
      quiz_max_mark: pass_mark,
      quiz_questions: questions,
    };

    console.log(quiz);
    axios
      .post("/createQuiz", quiz, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      })
      .then((res) => {
        this.setState({
          ...this.state,
          showQuizID:true,
          newQuizID
        })        
      document.getElementById('pass_mark').value = '';
      })  
      .catch((err) => console.log("Error", err));
  };

  render() {
    let showQuizID = this.state.showQuizID;
    return (
      <div className="container" style={{ width: "50vw" }}>
        <div className="row">
          <div className="col-md-5">
            <h3 style={{ paddingLeft: "20px" }} className="show-quiz-name">
              Pass Mark &nbsp;&nbsp;:
            </h3>
          </div>
          <div className="col-xs-2">
            <h3 className="show-quiz-name">
              <input
                type="text"
                style={{ width: "7vw" }}
                id = "pass_mark"
                className="form-control option-input"
                name="pass_mark"
                onChange={(event) =>
                  this.setState({
                    ...this.state,
                    [event.target.name]: Number(event.target.value),
                  })
                }
              />
            </h3>
          </div>
        </div>
        <div className="btn-center">
          <button
            className="btn start-btn btn-general"
            onClick={this.generateQuiz}
          >
            Create Quiz
          </button>
        </div>
        {showQuizID && (
          <div>
            <h3 style={{ paddingLeft: "20px" }} className="show-quiz-name">
              Quiz ID &nbsp;&nbsp;: {this.state.newQuizID}
            </h3>
          </div>
        )}
      </div>
    );
  }
}
