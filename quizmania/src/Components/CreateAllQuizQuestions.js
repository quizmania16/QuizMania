import React from 'react';
import CreateQuizQuestions from './CreateQuizQuestions';

export default class CreateAllQuizQuestions extends React.Component {
    constructor() {
      super();
      this.state = {
        currentQuestionNumber: 0,
        quiz:null,
        quizQuestions:[],
      };
    }
  
    getCurrentQuestionNumber = (number, question) => {
      if (number < this.props.totalQuestions) {
        this.setState({
          ...this.state,
          currentQuestionNumber: number,
          quizQuestions:[...this.state.quizQuestions,question]
        });
      }
    };


    render() {
    let currentQuestionNumber = this.state.currentQuestionNumber;
    let quizQuestions = this.state.quizQuestions;
        return(
          <div>
            { currentQuestionNumber < this.props.totalQuestions &&
            <CreateQuizQuestions
                questionNumber = {currentQuestionNumber}
                inputNextQuestion = {this.getCurrentQuestionNumber}
                allQuestions = {quizQuestions}
                totalQuestions = {this.props.totalQuestions}
                quizName = {this.props.quizName}
            />
            }
            </div>
        )
    }
}