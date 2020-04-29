import React from "react";
// import quiz from "../Constants/QuizQuestions";
import Question from "./Question";

export default class AllQuizQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz : this.props.quiz,
      currentQuestionNumber: 0,
      totalMarks: 0,
    };
    console.log(this.props.quiz);
  }

  getCurrentQuestionNumber = (number) => {
    if (number < this.state.quiz.quiz_questions.length) {
      this.setState({
        ...this.state,
        currentQuestionNumber: number,
      });
    }
  };

  updateMarks = (mark) => {
    this.setState({ ...this.state, totalMarks: this.state.totalMarks + mark });
  };

  render() {
    let questions = this.state.quiz.quiz_questions;
    let questionNumber = this.state.currentQuestionNumber;
    let totalMarks = this.state.totalMarks;
    let passMark = this.state.quiz.quiz_max_mark;
    return (
      <div className="container">
        <h1 className="show-quiz-name">{this.state.quiz.quiz_name}</h1>
        {questions && questions.length > 0 && (
          <Question
            questionNumber={questions[questionNumber].question_id}
            question={questions[questionNumber].question_text}
            options={questions[questionNumber].options}
            answer={questions[questionNumber].correct_answer[0].toString()}
            nextQuestion={questions[questionNumber].question_id + 1}
            allQuestions={questions}
            getNextQuestion={this.getCurrentQuestionNumber}
            totalMarks={totalMarks}
            updateMark = {this.updateMarks}
            passMark = {passMark}
          />
        )}
      </div>
    );
  }
}
