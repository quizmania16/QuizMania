import React from "react";

import axios from "axios";

const TABLE_HEADINGS = ["S.No", "Username", "scored", "result"];

export default class ShowAllUserQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      allQuiz: [],
      results: [],
      showTable: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/getAllQuiz/${localStorage.getItem("user")}`)
      .then((res) => {
        this.setState({
          ...this.state,
          allQuiz: res.data,
        });
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  }

  getQuizes = () => {
    let options = [];
    let allQuiz = this.state.allQuiz;
    options.push(
      <option value="" className="form-control table-display" hidden>
        ---Select Quiz---
      </option>
    );
    let quizNames = [];
    if (allQuiz.length > 0) {
      allQuiz.map((quiz, index) => quizNames.push(quiz.quiz_name));
    }
    if (quizNames.length > 0) {
      quizNames.map((name, index) =>
        options.push(
          <option
            value={name}
            className="form-control table-display"
            key={index}
          >
            {name}
          </option>
        )
      );
    }
    return options;
  };

  getQuizDetails = () => {
    axios
      .post("/getAllQuizResults", { quizname: this.state.currentQuizName })
      .then((res) =>
        this.setState({ ...this.state, results: res.data, showTable: true })
      )
      .catch((err) => console.log(err));
  };

  generateTableHeadingsName = (heading) => {
    return <th className="table-heading-display">{heading}</th>;
  };

  generateTableHeadings = () => {
    return (
      <tr key={0}>
        {TABLE_HEADINGS.map((heading, index) =>
          this.generateTableHeadingsName(heading)
        )}
      </tr>
    );
  };

  generateRows = () => {
    let results = this.state.results;
    let rows = [];
    if (results.length > 0) {
      results.map((data, index) =>
        rows.push(
          <tr key={index} className="table-display">
            <td className="table-display">{index + 1}</td>
            <td className="table-display">{data.username}</td>
            <td className="table-display">{data.results.score}</td>
            <td className="table-display">{data.results.result}</td>
          </tr>
        )
      );
    } else {
      rows.push(
        <tr key={0}>
          <td className="table-display" colSpan="5">
            Not attended any Quiz
          </td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    let options = this.getQuizes();
    let rows = this.generateRows();
    let headings = this.generateTableHeadings();
    return (
      <div className="container" style={{ width: "50em" }}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <select
              className="form-control table-display"
              onChange={(event) =>
                this.setState({
                  ...this.state,
                  currentQuizName: event.target.value,
                })
              }
            >
              {options}
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-general" onClick={this.getQuizDetails}>
              Get Results
            </button>
          </div>
        </div>
        {this.state.showTable && (
          <>
            <div className="quiz-resultbox">
              <div className="row">
                <div className="col-md-5">
                  <b className="table-heading-display">
                    {this.state.currentQuizName}{" "}
                  </b>
                </div>
              </div>
            </div>
            <div className="quiz-resultbox">
              <div className="row">
                <div className="col-md-7">
                  <table className="table table-bordered">
                    <thead>{headings}</thead>
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
