import React from "react";
import Body from "./body";
import DaysOfWeek from "./daysOfWeek";
import Options from "./options";
import { SelectDayProps } from "./types";

const SelectDay: React.FC<SelectDayProps> = ({
  setCurrentDate,
  currentDate,
  setState,
  onChange,
  value,
}) => {
  return (
    <>
      <Options
        setCurrentDate={setCurrentDate}
        setState={setState}
        currentDate={currentDate}
      />
      <DaysOfWeek />
      <Body value={value} onChange={onChange} currentDate={currentDate} />
    </>
  );
};

export default SelectDay;
