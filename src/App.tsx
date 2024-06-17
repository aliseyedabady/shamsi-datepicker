import moment, { Moment } from "moment-jalaali";
import "./global.css";
import { useState } from "react";
import {
  daysOfWeek,
  getDayOfWeek,
  getNextMonthDays,
  getPrevMonthDays,
  isInCurrentMonth,
} from "./utils/function";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const App = () => {
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
    let currentWeek: moment.Moment[] = Array(7).fill(null);

    weeks.push(currentWeek);

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
    <div className="flex h-screen items-center justify-center">
      <div>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map(day => (
            <div className="col-span-1 text-center" key={day}>
              <span>{day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {renderDays().map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2 ">
              {week.map((day, dayIndex) => {
                console.log(isInCurrentMonth(currentDate, day));
                return (
                  <div
                    className={`text-center col-span-1 ${
                      isInCurrentMonth(currentDate, day)
                        ? "bg-red-100"
                        : "bg-yellow-100"
                    }`}
                    key={dayIndex}
                  >
                    <span>{day ? day.format("jDD") : ""}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
