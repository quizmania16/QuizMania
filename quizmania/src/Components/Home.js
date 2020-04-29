import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container" >
        <div >
          <span style={{ padding:'20px' }}>
            <Link to="/createQuiz">
              <button className="btn btn-general">Create a Quiz</button>
            </Link>
          </span>
          <span style={{ padding:'20px' }}>
            <Link to="/joinQuiz">
              <button className="btn btn-general">Join a Quiz</button>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}
