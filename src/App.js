import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Game from "./Components/game";
import MainPage from "./Components/mainPage";
import Setting from "./Components/setting";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/setting">
          <Setting />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
