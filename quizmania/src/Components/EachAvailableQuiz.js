import React from 'react';

export default class EachAvailableQuiz extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quiz : this.props.currentQuiz
        }
    }

    startQuiz = () => {
        this.props.initiateQuiz(this.state.quiz.quiz_id, this.state.quiz)
    }

    render(){
        let quiz = this.state.quiz;

        return(
            <tr className='table-display'>
                <td className='table-display'>
                    {this.props.quizIndex}
                </td>
                <td className='table-display'>
                    {quiz.quiz_name}
                </td>
                <td className='table-display'>
                    {quiz.quiz_questions.length}
                </td>
                <td className='table-display'>
                    {quiz.quiz_max_mark}
                </td>
                <td className='table-display'>
                    {quiz.quiz_id}
                </td>
                <td className='table-display'>
                    <button className='btn' onClick={this.startQuiz} >Start</button>
                </td>
            </tr>
        )
    }
}