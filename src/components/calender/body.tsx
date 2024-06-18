import {
  classNames,
  getNextMonthDays,
  getPrevMonthDays,
  isEqualTwoDate,
  isInCurrentMonth,
  isToday,
  moment,
} from "../../utils/function";
import { BodyProps } from "./types";

const Body: React.FC<BodyProps> = ({ currentDate, onChange, value }) => {
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
    <div className="body-calender-wrapper">
      {renderDays().map(week =>
        week.map((day, dayIndex) => {
          console.log(day.format("jDD/jMM/jYYYY"));
          return (
            <button
              onClick={() => onChange && onChange(day)}
              className={classNames(
                "day-item",
                isInCurrentMonth(currentDate, day)
                  ? "current-month-day-item"
                  : "incurrent-month-day-item",
                value
                  ? isEqualTwoDate(value, day)
                    ? "today-day-item"
                    : ""
                  : isToday(day)
                  ? "today-day-item"
                  : ""
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
