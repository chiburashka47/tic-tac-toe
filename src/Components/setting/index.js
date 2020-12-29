import React, { Component } from "react";
import BackBtn from "../backBtn";
import ListMenu from "./components/listMenu";
import robotSound from "../game/public/robot.mp3";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(window.localStorage.getItem("data")),
    };
  }

  choiseBoard = (size) => {
    const data = this.state.data;

    data.setting.boardSize = size;
    this.setState({ data });
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  choisePlayer = (opponent) => {
    const audio = new Audio(robotSound),
      data = this.state.data;

    if (opponent === 1) audio.play();
    data.setting.opponent = opponent;
    this.setState({ data });
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  render() {
    const setting = this.state.data.setting;
    return (
      <>
        <div className="setting">
          <BackBtn />

          <ListMenu
            setItem={this.choiseBoard}
            tittle="Board size:"
            items={["3x3", "4x4", "5x5"]}
            data={setting.boardSize}
          />
          <ListMenu
            setItem={this.choisePlayer}
            tittle="Opponent:"
            items={["Player", "SkyNet"]}
            data={setting.opponent}
          />
        </div>
      </>
    );
  }
}
