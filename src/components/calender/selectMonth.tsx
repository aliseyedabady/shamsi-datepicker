import React from "react";
import { Moment, TState, moment, months } from "../../utils/function";

interface SelectMonthProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  currentDate: Moment;
}
const SelectMonth: React.FC<SelectMonthProps> = ({
  setState,
  setCurrentDate,
  currentDate,
}) => {
  const back = () => setState("year");
  const handleSelectMonth = (month: string) => {
    setCurrentDate(moment().jMonth(months.indexOf(month)));
    setState("day");
  };

  return (
    <div className="select-month-wrapper">
      <div>
        <button onClick={back} className="select-back">
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
      </div>
      <div className="select-month-items-wrapper">
        {months.map(month => (
          <button
            onClick={() => handleSelectMonth(month)}
            key={month}
            className={`select-month-item ${
              month === currentDate.format("jMMMM") ? "active-month-item" : ""
            }`}
          >
            <span>{month}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectMonth;
