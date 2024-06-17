import moment, { Moment } from "moment-jalaali";
import { useEffect, useRef, useState } from "react";
import {
  daysOfWeek,
  getNextMonthDays,
  getPrevMonthDays,
  isInCurrentMonth,
  isToday,
} from "../utils/function";
import "./style.css";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const Calender = () => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const contentRef = useRef<HTMLDivElement>(null);

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
  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "jMonth"));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));
  };

  return (
    <div className="shamsi-date-picker">
      <div className="calender-wrapper" ref={contentRef}>
        <div className="options-wrapper">
          <button className="next-month-button" onClick={handleNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.22 13.024c-1.752 1.401-3.897 3.534-5.338 6.417l2.236 1.118c1.226-2.45 3.081-4.317 4.663-5.583a20 20 0 0 1 2-1.411 15 15 0 0 1 .74-.427l.033-.017.005-.003v-2.235l-.005-.003-.034-.018-.15-.081c-.136-.075-.337-.19-.59-.346a20 20 0 0 1-1.999-1.411c-1.582-1.266-3.437-3.132-4.663-5.583L7.882 4.559c1.441 2.883 3.586 5.016 5.337 6.417.496.397.965.738 1.382 1.024a23 23 0 0 0-1.382 1.024"
                fill="#000"
              />
            </svg>
          </button>
          <div className="selects-wrapper">
            <button className="select-month-button">
              {currentDate.format("jMMMM")}
            </button>
            <button className="select-year-button">
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
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.78 13.024c1.752 1.401 3.897 3.534 5.338 6.417l-2.236 1.118c-1.225-2.45-3.08-4.317-4.663-5.583-.786-.63-1.493-1.1-2-1.411a15 15 0 0 0-.74-.427l-.033-.017-.005-.003v-2.235l.005-.003.034-.018.15-.081c.136-.075.337-.19.59-.346a20 20 0 0 0 2-1.411c1.581-1.266 3.437-3.132 4.662-5.583l2.236 1.118c-1.441 2.883-3.586 5.016-5.337 6.417-.496.397-.965.738-1.382 1.024.417.286.886.627 1.382 1.024"
                fill="#000"
              />
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
      </div>
    </div>
  );
};

export default Calender;
