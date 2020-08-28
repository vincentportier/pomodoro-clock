import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const TimerLengthControl = ({
  title,
  titleID,
  decrementID,
  incrementID,
  lengthID,
  length,
  onClick,
}) => {
  return (
    <div id="length-control">
      <div id={titleID}>{title}</div>
      <div id="controls-wrapper">
        <button id={decrementID} value="-" onClick={() => onClick("-")}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div id={lengthID}>{length}</div>
        <button id={incrementID} value="+" onClick={() => onClick("+")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default TimerLengthControl;
