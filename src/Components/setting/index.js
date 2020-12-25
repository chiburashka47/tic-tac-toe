import React, { Component } from "react";
import BackBtn from "../backBtn";
import ListMenu from "./components/listMenu";
import robotSound from "../game/public/robot.mp3";

export default class Setting extends Component {
  choiseBoard = (item, size) => {
    const container = document.querySelectorAll(".setting__row__container")[0];
    container
      .querySelector(".setting__row__container__elem.active")
      .classList.remove("active");

    item.classList.add("active");
    const data = JSON.parse(window.localStorage.getItem("data"));
    data.setting.boardSize = size;
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  choisePlayer = (item, opponent) => {
    const container = document.querySelectorAll(".setting__row__container")[1],
      audio = new Audio(robotSound);
    if (opponent === 1) audio.play();
    container
      .querySelector(".setting__row__container__elem.active")
      .classList.remove("active");

    item.classList.add("active");
    const data = JSON.parse(window.localStorage.getItem("data"));
    data.setting.opponent = opponent;
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  data = JSON.parse(window.localStorage.getItem("data")).setting;
  list = document.querySelectorAll(".setting__row__container__elem");

  render() {
    return (
      <>
        <div className="setting">
          <BackBtn />

          <ListMenu
            setItem={this.choiseBoard}
            tittle="Board size:"
            items={["3x3", "4x4", "5x5"]}
            data={this.data.boardSize}
          />
          <ListMenu
            setItem={this.choisePlayer}
            tittle="Opponent:"
            items={["Player", "SkyNet"]}
            data={this.data.opponent}
          />
        </div>
      </>
    );
  }
}
