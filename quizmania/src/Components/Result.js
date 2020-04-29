import React from "react";
import { Link } from "react-router-dom";

export default class Result extends React.Component {
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
