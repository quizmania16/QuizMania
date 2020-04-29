import React from "react";
import CreateAllQuizQuestions from "./CreateAllQuizQuestions";

export default class CreateQuiz extends React.Component {

  constructor(){
    super();
    this.state = {
      quizTitle:"",
      noOfQuestions:0,
      showQuestionPage:false
    }
  }

  validateFields = () => {
    if (this.state.quizName === "") {
      alert("Enter Quiz Title");
      return;
    }
    if (
      this.state.noOfQuestions <= 0 ||
      this.state.noOfQuestions > 10 ||
      isNaN(this.state.noOfQuestions)
    ) {
      alert("Total number of questions below 10");
      return;
    }
    console.log(this.state);
    this.setState({ ...this.state, showQuestionPage: true });
  };

  render() {
    let showQuestionPage = this.state.showQuestionPage;
    let totalQuestions = this.state.noOfQuestions;
    let quizTitle = this.state.quizName;
    return (
      <div className="container" style={{ paddingBottom: "15px" }}>
        {!showQuestionPage && (
          <>
            <div className="row">
              <div className="col-xs-4">
                <h3 className="show-quiz-name">Enter Quiz Title</h3>
              </div>
              <div className="col-xs-2">
                <h3 className="show-quiz-name">
                  <input
                    type="text"
                    required
                    className="form-control title-input"
                    name="quizName"
                    onChange={(event) =>
                      this.setState({
                        ...this.state,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <h3 className="show-quiz-name">Total Questions</h3>
              </div>
              <div className="col-xs-2">
                <h3 className="show-quiz-name">
                  <input
                    type="text"
                    required
                    name="noOfQuestions"
                    className="form-control no-questions-input"
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
            <button
              type="submit"
              className="btn start-btn btn-right"
              onClick={this.validateFields}
            >
              Create Quiz Questions
            </button>
          </>
        )}
        {showQuestionPage && (
          <CreateAllQuizQuestions
            totalQuestions={totalQuestions}
            quizName={quizTitle}
          />
        )}
      </div>
    );
  }
}

/**
 <div>
            <Link to="/">
              <button className="btn btn-general">BACK</button>
            </Link>
          </div>
 */
