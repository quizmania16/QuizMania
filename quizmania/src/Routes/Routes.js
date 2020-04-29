import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../Components/Home'
import CreateQuiz from '../Components/CreateQuiz';
import JoinQuiz from '../Components/JoinQuiz';
import Result from '../Components/Result';
import ShowCreatedQuiz from '../Components/ShowCreatedQuiz';

export default class Routes extends React.Component {
    render() {
        return (
        <Switch>
            <Route path = "/" exact component={Home} />
            <Route path = "/createQuiz" exact component={CreateQuiz} />
            <Route path = "/joinQuiz" exact component={JoinQuiz} />
            <Route path = "/result" exact component={Result} />
            <Route path = "/showCreatedQuiz" exact component={ShowCreatedQuiz} />
        </Switch>        
        )
    }    
}