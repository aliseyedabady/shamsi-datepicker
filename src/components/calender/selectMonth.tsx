import React from "react";
import { moment, months } from "../../utils/function";
import Back from "./back";
import { SelectMonthProps } from "./types";

const SelectMonth: React.FC<SelectMonthProps> = ({
  setState,
  setCurrentDate,
  currentDate,
}) => {
  const handleSelectMonth = (month: string) => {
    setCurrentDate(moment().jMonth(months.indexOf(month)));
    setState("day");
  };

  return (
    <div className="select-month-wrapper">
      <Back setState={setState} />
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
