import React from "react";
import { OptionsProps } from "./types";

const Options: React.FC<OptionsProps> = ({
  setCurrentDate,
  currentDate,
  setState,
}) => {
  const handleNextMonth = () =>
    setCurrentDate(currentDate.clone().add(1, "jMonth"));

  const handlePreviousMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));
  return (
    <div className="options-wrapper">
      <button className="next-month-button" onClick={handleNextMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
      <div className="selects-wrapper">
        <button
          className="select-month-button"
          onClick={() => setState("month")}
        >
          {currentDate.format("jMMMM")}
        </button>
        <button className="select-year-button" onClick={() => setState("year")}>
          {currentDate.format("jYYYY")}
        </button>
      </div>
      <button className="prev-month-button" onClick={handlePreviousMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>
    </div>
  );
};

export default Options;
