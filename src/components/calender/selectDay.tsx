import React from "react";
import {
  Moment,
  TState,
  daysOfWeek,
  getNextMonthDays,
  getPrevMonthDays,
  isInCurrentMonth,
  isToday,
  moment,
} from "../../utils/function";

interface SelectDayProps {
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  currentDate: Moment;
  setState: React.Dispatch<React.SetStateAction<TState>>;
}
const SelectDay: React.FC<SelectDayProps> = ({
  setCurrentDate,
  currentDate,
  setState,
}) => {
  const handleNextMonth = () =>
    setCurrentDate(currentDate.clone().add(1, "jMonth"));

  const handlePreviousMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));
  const renderDays = () => {
    const daysInCurrentMonth =
      currentDate.endOf("jMonth").jDayOfYear() -
      currentDate.startOf("jMonth").jDayOfYear() +
      1;

    const startOfMonth = currentDate.startOf("jMonth");
    const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => {
      return startOfMonth.clone().add(i, "days");
    });
    const weeks: moment.Moment[][] = [];

    const allDaysArray = [
      ...getPrevMonthDays(daysArray),
      ...daysArray,
      ...getNextMonthDays(daysArray, daysInCurrentMonth),
    ];

    for (let i = 0; i < allDaysArray.length; i += 7) {
      weeks.push(allDaysArray.slice(i, i + 7));
    }

    return weeks;
  };
  return (
    <>
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
          <button
            className="select-year-button"
            onClick={() => setState("year")}
          >
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
      <div className="header-wrapper">
        {daysOfWeek.map(day => (
          <div className="header-item" key={day}>
            <span>{day}</span>
          </div>
        ))}
      </div>
      <div className="body-calender-wrapper">
        {renderDays().map(week =>
          week.map((day, dayIndex) => {
            return (
              <div
                className={`day-item ${
                  isInCurrentMonth(currentDate, day)
                    ? "current-month-day-item"
                    : "incurrent-month-day-item"
                } ${isToday(day) ? "today-day-item" : ""}`}
                key={dayIndex}
              >
                <span>{day ? day.format("jDD") : ""}</span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default SelectDay;
