import moment, { Moment } from "moment-jalaali";
import { useState } from "react";
import {
  daysOfWeek,
  getNextMonthDays,
  getPrevMonthDays,
  isInCurrentMonth,
} from "../utils/function";
import "./style.css";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const Calender = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

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
    <div className="shamsi-date-picker">
      <div className="calender-wrapper">
        <div className="options-wrapper">
          <button></button>
          <div>
            <button></button>
            <button></button>
          </div>
          <button></button>
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
                  }`}
                  key={dayIndex}
                >
                  <span>{day ? day.format("jDD") : ""}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
