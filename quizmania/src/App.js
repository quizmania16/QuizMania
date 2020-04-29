import React from "react";
import './CSS/styles.css'
import Routes from "./Routes/Routes";
import axios from 'axios';

axios.defaults.baseURL = "https://us-central1-quizmania-43a2e.cloudfunctions.net/api"

export default class App extends React.Component {
  render() {
    return(
    <div>
      <Routes />      
      </div>
    )
  }
}
