import React from "react";
import { Link } from "react-router-dom";
import { audio } from "../game";

export default function BackBtn() {
  return (
    <Link
      to="/"
      className="backBtn"
      onClick={() => {
        audio.pause();
        audio.currentTime = 0;
      }}
    >
      Back
    </Link>
  );
}
