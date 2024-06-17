import { useEffect, useRef, useState } from "react";
import {
  Moment,
  TState,
  classNames,
  daysOfWeek,
  findIndexOfYear,
  getAllYears,
  getNextMonthDays,
  getPrevMonthDays,
  isInCurrentMonth,
  isToday,
  jalaliMonths,
  moment,
  p2e,
} from "../utils/function";
import "./style.css";

interface CalenderProps {
  wrapperClassName?: string;
}

const Calender: React.FC<CalenderProps> = ({ wrapperClassName }) => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [state, setState] = useState<TState>("normal");
  const yearsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const allYears = getAllYears(1360, 1440);
  const currentYear = currentDate.format("jYYYY");

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
  const handleNextMonth = () =>
    setCurrentDate(currentDate.clone().add(1, "jMonth"));

  const handlePreviousMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));

  const back = () => setState("normal");

  const changeState = (newState: TState) => setState(newState);

  const handleSelectMonth = (month: string) => {
    setCurrentDate(moment().jMonth(jalaliMonths.indexOf(month)));
    changeState("normal");
  };
  const handleSelectYear = (year: string) => {
    setCurrentDate(moment().jYear(+p2e(year)));
    changeState("normal");
  };

  useEffect(() => {
    const currentYearIndex = findIndexOfYear(allYears, currentYear);
    if (yearsRef.current[currentYearIndex]) {
      yearsRef.current[currentYearIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentYear, allYears]);

  const render = () => {
    switch (state) {
      case "normal":
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
                  onClick={() => changeState("month")}
                >
                  {currentDate.format("jMMMM")}
                </button>
                <button
                  className="select-year-button"
                  onClick={() => changeState("year")}
                >
                  {currentDate.format("jYYYY")}
                </button>
              </div>
              <button
                className="prev-month-button"
                onClick={handlePreviousMonth}
              >
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

      case "month":
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
              {jalaliMonths.map(month => (
                <button
                  onClick={() => handleSelectMonth(month)}
                  key={month}
                  className={`select-month-item ${
                    month === currentDate.format("jMMMM")
                      ? "active-month-item"
                      : ""
                  }`}
                >
                  <span>{month}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "year":
        return (
          <div className="select-year-wrapper">
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
            <div className="select-years-items-wrapper">
              {allYears.map((year, index) => (
                <button
                  onClick={() => handleSelectYear(year)}
                  ref={el => (yearsRef.current[index] = el)}
                  className={`select-year-item  ${
                    year === currentYear ? "active-year-item" : ""
                  }`}
                >
                  <span>{year}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div className="shamsi-date-picker">
      <div className={classNames("calender-wrapper", wrapperClassName)}>
        {render()}
      </div>
    </div>
  );
};

export default Calender;
