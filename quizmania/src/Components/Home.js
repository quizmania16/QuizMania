import React from "react";

import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {

  constructor(){
    super();
    this.state = {
      createQuiz: false,
      joinQuiz:false,
      
    }
  }

  componentDidMount(){
    if(this.props.msg){
      alert(this.props.msg)
    }
  }

  createQuiz = () => {
      (localStorage.getItem('token')) ? this.setState({createQuiz:true,joinQuiz:false}) 
       : alert('Please Sign In ...')
  }

  joinQuiz = () => {
    (localStorage.getItem('token')) ? this.setState({createQuiz:false,joinQuiz:true})
    : alert('Please Sign In ...')
  }
    
  render() {
    
    if(this.state.createQuiz) return <Redirect to={{pathname:'/createQuiz'}} />
    if(this.state.joinQuiz) return <Redirect to={{pathname:'/joinQuiz'}} />
    return (
      <div className="home-container-buttons" >
        <div>
          <span style={{ padding: "20px" }}>
              <button onClick={this.createQuiz} className="btn btn-general">Create a Quiz</button>
          </span>
          <span style={{ padding: "20px" }}>
              <button onClick={this.joinQuiz} className="btn btn-general">Join a Quiz</button>
          </span>
        </div>
      </div>
    );
  }
}
