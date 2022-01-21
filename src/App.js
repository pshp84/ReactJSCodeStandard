
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SeasonalGamesComponent from "./components/seasonalGames/SeasonalGames";
import DailyGames from "./components/dailyGames/DailyGames";
import SeasonalGamesLog from "./components/seasonalGamesLog/SeasonalGamesLog";

import 'antd/dist/antd.css';

export default class App extends Component {
  render() {
    return (
 
        <Router>
          <Header />
          <Menu />
          <Switch>
            <Route exact path="/seasonalGames" component={SeasonalGamesComponent}></Route>
            <Route exact path="/dailyGames" component={DailyGames}></Route>
            <Route exact path="/sesonalGameslogs" component={SeasonalGamesLog}></Route>
            <Redirect to="/seasonalGames" />
          </Switch>
          <Footer />
        </Router>
       
    );
  }
}
