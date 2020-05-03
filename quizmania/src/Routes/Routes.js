import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "../Components/Home";
import CreateQuiz from "../Components/CreateQuiz";
import JoinQuiz from "../Components/JoinQuiz";
import Result from "../Components/Result";
import ShowCreatedQuiz from "../Components/ShowCreatedQuiz";
import Register from "../Commons/Register";
import Login from "../Commons/Login";
import Profile from "../Components/Profile";
import ShowAllQuizResults from "../Components/ShowAllQuizResults";
import ShowAllUserQuiz from "../Components/ShowAllUserQuiz";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" exact component={Login} />
        <Route path="/signUp" exact component={Register} />
        <Route path="/createQuiz" exact component={CreateQuiz} />
        <Route path="/joinQuiz" exact component={JoinQuiz} />
        <Route path="/showCreatedQuiz" exact component={ShowCreatedQuiz} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/result" exact component={Result} />
        <Route path="/myQuiz" exact component={ShowAllUserQuiz} />
        <Route path="/showUserQuizResult" exact component={ShowAllQuizResults} />
        <Route path="/logout" exact component={Home} />
      </Switch>
    );
  }
}
