import { useState } from "react";
import {
  Moment,
  classNames,
  isAfter,
  isBetweenTwoDate,
  isEqualTwoDate,
  isInCurrentMonth,
  isToday,
  renderDays,
} from "../../utils/function";
import { BodyProps } from "./types";

const Body: React.FC<BodyProps> = ({ currentDate, onChange, value, range }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [stepRange, setStepRange] = useState<1 | 2 | 3>(1);
  console.log(range?.value, stepRange);
  const renderDayItemClassName = (day: Moment): string => {
    const isInCurrentMonthValue = isInCurrentMonth(currentDate, day);

    if (range?.value[0] && range.value[1]) {
      return isBetweenTwoDate(range.value, day) && isInCurrentMonthValue
        ? "today-day-item"
        : "";
    }
    if (isSelected) {
      if (range) {
        return isEqualTwoDate(range.value[0] || range.value[1], day)
          ? "today-day-item"
          : "";
      }
      return value && isEqualTwoDate(value, day) ? "today-day-item" : "";
    }
    return isToday(day) ? "today-day-item" : "";
  };
  const handleOnClick = (day: Moment) => {
    const isInCurrentMonthValue = isInCurrentMonth(currentDate, day);
    if (isInCurrentMonthValue) {
      if (range) {
        if (range.value[0] && range.value[1]) {
          range.setValue([day, null]);
          setStepRange(2);
        } else if (range.value[0] && isAfter(range.value[0], day)) {
          range.setValue([day, null]);
          setStepRange(2);
        } else {
          range.setValue(
            stepRange === 1 ? [day, range.value[1]] : [range.value[0], day]
          );
          setStepRange(prev => (prev === 1 ? 2 : 1));
        }
      } else if (onChange) {
        onChange(isToday(day) ? null : day);
      }
      setIsSelected(true);
    }
  };
  return (
    <div className="body-calender-wrapper">
      {renderDays(currentDate).map(week =>
        week.map((day, dayIndex) => {
          const isInCurrentMonthValue = isInCurrentMonth(currentDate, day);

          return (
            <button
              onClick={() => handleOnClick(day)}
              className={classNames(
                "day-item",
                isInCurrentMonthValue
                  ? "current-month-day-item"
                  : "incurrent-month-day-item",
                renderDayItemClassName(day)
              )}
              key={dayIndex}
            >
              <span>{day ? day.format("jDD") : ""}</span>
            </button>
          );
        })
      )}
    </div>
  );
};

export default Body;
