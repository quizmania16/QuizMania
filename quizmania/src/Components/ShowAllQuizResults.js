import React from "react";

import axios from "axios";

const TABLE_HEADINGS = ["S.No", "Quiz", "Total", "Score", "Result"];

export default class ShowAllQuizResults extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/getResult/${localStorage.getItem("user")}`)
      .then((res) => {
        this.setState({
          ...this.state,
          results: res.data.results.quiz_result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <td className="table-display">{data.quiz}</td>
            <td className="table-display">{data.total}</td>
            <td className="table-display">{data.score}</td>
            <td className="table-display">{data.result}</td>
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
    let results = this.state.results;
    let rows = this.generateRows();
    let headings = this.generateTableHeadings();

    console.log(results);
    return (
      <div className="container">
          <button className='btn start-btn' onClick={()=>window.history.go(-1)}>Back</button>
        {results && (
          <div>
            <table className="table">
              <thead>{headings}</thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
