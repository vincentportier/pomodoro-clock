import React, { useState } from "react";
import "./App.css";
import TimerLengthControl from "./TimerLengthControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import accurateInterval from "../node_modules/accurate-interval/index";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerState, setTimerState] = useState("stopped");
  const [timerType, setTimerType] = useState("Session");
  const [timer, setTimer] = useState(3);
  const [intervalID, setIntervalID] = useState("");
  const [timerStyle, setTimerStyle] = useState({ color: "white" });

  const setBkLength = (e) => {
    if (timerState === "running") return;
    if (breakLength === 1 && e === "-") return;
    if (breakLength === 60 && e === "+") return;
    e === "-"
      ? setBreakLength(breakLength - 1)
      : setBreakLength(breakLength + 1);
  };
  const setSessLength = (e) => {
    if (timerState === "running") return;
    if (sessionLength === 1 && e === "-") return;
    if (sessionLength === 60 && e === "+") return;
    e === "-"
      ? setSessionLength(sessionLength - 1)
      : setSessionLength(sessionLength + 1);
  };

  useEffect(() => {
    if (timerType === "Session") setTimer(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (timer <= 10) {
      setTimerStyle({ color: "red" });
    } else {
      setTimerStyle({ color: "white" });
    }
  }, [timer]);

  const reset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimerState("stopped");
    setTimerType("Session");
    setTimer(1500);
    setIntervalID("");
    if (intervalID) intervalID.clear();
    const sound = document.getElementById(`beep`);
    sound.pause();
    sound.currentTime = 0;
  };

  const toClockFormat = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  const timerControl = () => {
    if (timerState === "stopped") {
      setTimerState("running");
      beginCountdown();
    }
    if (timerState === "running" && intervalID) {
      setTimerState("stopped");
      intervalID.clear();
    }
  };

  useEffect(() => {
    const sound = document.getElementById(`beep`);

    if (timer === 0 && timerType === "Session") {
      intervalID.clear();
      sound.currentTime = 0;
      sound.play();
      setTimerType("Break");
      setTimer(breakLength * 60);
      beginCountdown();
    } else if (timer === 0 && timerType === "Break") {
      intervalID.clear();
      sound.currentTime = 0;
      sound.play();
      setTimerType("Session");
      setTimer(sessionLength * 60);
      beginCountdown();
    }
  }, [timer === 0]);

  const beginCountdown = () => {
    setIntervalID(
      accurateInterval(() => {
        decrementTimer();
      }, 1000)
    );
  };

  const decrementTimer = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  return (
    <div id="app-container">
      <div className="app">
        <div id="app-title">
          <h1>Pomodoro Clock</h1>
        </div>
        <div id="timer-length-controls-wrapper">
          <TimerLengthControl
            titleID="break-label"
            title="break-length"
            decrementID="break-decrement"
            incrementID="break-increment"
            lengthID="break-length"
            length={breakLength}
            onClick={setBkLength}
          />
          <TimerLengthControl
            titleID="session-label"
            title="session-length"
            decrementID="session-decrement"
            incrementID="session-increment"
            lengthID="session-length"
            length={sessionLength}
            onClick={setSessLength}
          />
        </div>
        <div id="timer">
          <div id="time-wrapper">
            <div id="timer-label">{timerType}</div>
            <div id="time-left" style={timerStyle}>
              {toClockFormat()}
            </div>
          </div>
        </div>
        <div id="timer-controls">
          <button id="start_stop" onClick={timerControl}>
            <FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} />
          </button>
          <button id="reset" onClick={reset}>
            <FontAwesomeIcon icon={faUndo} />
          </button>
        </div>
        <div id="author">
          Design and coded by
          <br />
          <span style={{ color: "orangered" }}>Vincent Portier</span>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
