import { useState } from "react";
import { Moment, TState, getAllYears, moment } from "../../utils/function";
import SelectDay from "./selectDay";
import SelectMonth from "./selectMonth";
import SelectYear from "./selectYear";
import "./style.css";
import WrapperCalender from "./wrapper";
import { CalenderProps } from "./types";

const Calender: React.FC<CalenderProps> = ({
  wrapperClassName,
  year,
  day,
  onChange,
  value,
  range,
}) => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [state, setState] = useState<TState>("day");
  const allYears = getAllYears(year?.from || 1360, year?.to || 1440);
  const currentYear = currentDate.format("jYYYY");

  const props = {
    day: {
      currentDate,
      setCurrentDate,
      setState,
      onChange,
      value,
      range,
    },
    month: {
      currentDate,
      setCurrentDate,
      setState,
    },
    year: {
      allYears,
      setCurrentDate,
      setState,
      currentYear,
    },
  };

  const renderCalendar = () => {
    switch (state) {
      case "day":
        return <SelectDay {...props.day} {...day} />;
      case "month":
        return <SelectMonth {...props.month} />;
      case "year":
        return <SelectYear {...props.year} />;
      default:
        return <></>;
    }
  };
  return (
    <WrapperCalender wrapperClassName={wrapperClassName}>
      {renderCalendar()}
    </WrapperCalender>
  );
};

export default Calender;
