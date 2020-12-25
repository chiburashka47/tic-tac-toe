import React from "react";
import background_sound from "./public/background_sound.mp3";
import BackBtn from "../backBtn";

export const audio = new Audio(background_sound);

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.size = this.data.setting.boardSize + 3;
    this.state = {
      history: [
        {
          matrix: Array(this.size).fill(Array(this.size).fill(null)),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(indexColumn, indexRow) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const matrix = history[this.state.stepNumber].matrix;

    console.log(matrix[indexColumn][indexRow]);
    console.log(this.state.history[this.state.stepNumber].matrix);
    console.log(matrix);

    // this.setState({ history: history });
  }

  render() {
    // audio.play();
    // var playPromise = audio.play();

    // //111111111111111111111111111111111111111111111111111
    // if (playPromise !== undefined) {
    //   playPromise
    //     .then((_) => {

    //       console.log("audio played auto");
    //     })
    //     .catch((error) => {

    //       console.log("playback prevented");
    //     });
    // }
    // audio.addEventListener("ended", () => audio.play());

    return (
      <div className="game">
        <BackBtn />
        <div className="game__board">
          {this.state.history[this.state.stepNumber].matrix.map(
            (item, indexColumn) => {
              return (
                <div key={indexColumn} className="game__board__row">
                  {item.map((item, indexRow) => {
                    return (
                      <div
                        key={indexRow}
                        onClick={(event) => {
                          this.handleClick(indexColumn, indexRow);
                        }}
                        className="game__board__row__square"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}
