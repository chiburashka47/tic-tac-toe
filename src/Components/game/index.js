import React from "react";
import background_sound from "./public/background_sound.mp3";
import BackBtn from "../backBtn";
import xImg from "../game/public/x.png";
import oImg from "../game/public/0.png";

export const audio = new Audio(background_sound);

const createMatrix = (size) => {
  const matrix = [[]];

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = null;
    }
  }

  return matrix;
};

const copyMatrix = (oldMatrix, size) => {
  const matrix = createMatrix(size);

  for (let i = 0; i < oldMatrix.length; i++) {
    for (let j = 0; j < oldMatrix.length; j++) {
      matrix[i][j] = oldMatrix[i][j];
    }
  }

  return matrix;
};

const checkWinner = (y, x, matrix) => {
  const value = matrix[y][x];

  // check positive diag
  if (matrix[y + 1] ? matrix[y + 1][x + 1] === value : false) {
    if (matrix[y + 2] ? matrix[y + 2][x + 2] === value : false) {
      return value;
    } else if (matrix[y - 1] ? matrix[y - 1][x - 1] === value : false) {
      return value;
    }
  }

  // check negativ diag
  if (matrix[y - 1] ? matrix[y - 1][x - 1] === value : false) {
    if (matrix[y - 2] ? matrix[y - 2][x - 2] === value : false) {
      return value;
    }
  }

  // check positive underDiag
  if (matrix[y - 1] ? matrix[y - 1][x + 1] === value : false) {
    if (matrix[y - 2] ? matrix[y - 2][x + 2] === value : false) {
      return value;
    } else if (matrix[y + 1] ? matrix[y + 1][x - 1] === value : false) {
      return value;
    }
  }

  // check negativ underDiag
  if (matrix[y + 1] ? matrix[y + 1][x - 1] === value : false) {
    if (matrix[y + 2] ? matrix[y + 2][x - 2] === value : false) {
      return value;
    }
  }

  // check positive horisontal
  if (matrix[y][x + 1] === value) {
    if (matrix[y][x + 2] === value || matrix[y][x - 1] === value) {
      return value;
    }
  }

  // check negativ horisontal
  if (matrix[y][x - 1] === value) {
    if (matrix[y][x - 2] === value) {
      return value;
    }
  }

  // check positive verical
  if (matrix[y + 1] ? matrix[y + 1][x] === value : false) {
    if (matrix[y + 2] ? matrix[y + 2][x] === value : false) {
      return value;
    } else if (matrix[y - 1] ? matrix[y - 1][x] === value : false) {
      return value;
    }
  }

  // check negativ verical
  if (matrix[y - 1] ? matrix[y - 1][x] === value : false) {
    if (matrix[y - 2] ? matrix[y - 2][x] === value : false) {
      return value;
    }
  }

  return null;
};

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.size = this.data.setting.boardSize + 3;
    this.state = {
      history: [
        {
          matrix: createMatrix(this.size),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
    };
  }

  handleClick(indexColumn, indexRow) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const matrix = copyMatrix(current.matrix, this.size);

    if (this.state.winner || matrix[indexColumn][indexRow]) {
      return;
    }

    matrix[indexColumn][indexRow] = this.state.xIsNext ? "X" : "0";

    const winner = checkWinner(indexColumn, indexRow, matrix);

    this.setState({
      history: history.concat([
        {
          matrix: matrix,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      winner: winner,
    });
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
    console.log(this.state, "last state render");
    console.log(
      this.state.history[this.state.stepNumber].matrix,
      "last state render"
    );
    const history = this.state.history;
    let current = history[this.state.stepNumber];

    return (
      <div className="game">
        <BackBtn />
        <div className="game__nav">
          <div
            onClick={() => {
              this.setState({ stepNumber: this.state.stepNumber - 1 });
              current = history[this.state.stepNumber];
            }}
            className="game__nav__btn"
          >
            Undo
          </div>
          <div
            onClick={() => {
              this.setState({
                history: [
                  {
                    matrix: createMatrix(this.size),
                  },
                ],
                stepNumber: 0,
                xIsNext: true,
                winner: null,
              });
            }}
            className="game__nav__btn"
          >
            Reset
          </div>
          <div className="game__nav__btn">Redo</div>
        </div>
        <div className="game__status">
          {this.state.winner
            ? `${this.state.winner} is won!!!`
            : `Turn ${this.state.xIsNext ? "X" : "0"}`}
        </div>
        <div className="game__board">
          {current.matrix.map((item, indexColumn) => {
            console.log(this.state.stepNumber);
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
                      {item === "X" ? (
                        <img
                          alt=""
                          src={xImg}
                          className="game__board__row__square__img"
                        ></img>
                      ) : item === "0" ? (
                        <img
                          alt=""
                          src={oImg}
                          className="game__board__row__square__img"
                        ></img>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
