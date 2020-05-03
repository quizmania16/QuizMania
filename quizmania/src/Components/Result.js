import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Result extends React.Component {

  componentDidMount(){
    let user = localStorage.getItem('user');
    let data = {
      result:{
        quiz:this.props.location.name,
        total:this.props.location.totalQuizQuestions,
        score:this.props.location.totalMarks,
        result:this.props.location.result
      }
    }
    axios.put(`/getUser/${user}`, data)
      .then(res => console.log(res))
      .catch(err => console.log(err,err.response))
  }

  render() {
    return (
      <div className="container" style = {{textAlign:"center"}}>
        <div><h3>Total : {this.props.location.totalMarks}</h3></div>
        <div><h3>Result : {this.props.location.result}</h3> </div>
        <Link to = "/" ><button className="btn btn-general">Home</button></Link>
      </div>
    );
  }
}
