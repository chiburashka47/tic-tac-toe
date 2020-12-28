import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainPage extends Component {
  render() {
    return (
      <div className="mainPage">
        <Link to="/game" className="mainPage__btn">
          Game
        </Link>
        <Link to="setting" className="mainPage__btn">
          Setting
        </Link>
      </div>
    );
  }
}
