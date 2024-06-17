import moment, { Moment } from "moment-jalaali";
import "./global.css";
import { useState } from "react";

const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

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
    daysArray.forEach(day => {
      console.log("day", day.jWeek());
      const dayOfWeek = daysOfWeek.indexOf(day.format("dd"));
      currentWeek[dayOfWeek] = day;
      if (dayOfWeek === 6) {
        currentWeek = Array(7).fill(null);
        weeks.push(currentWeek);
      }
    });
    if (weeks[weeks.length - 1].every(day => day === null)) {
      weeks.pop();
    }
    console.log({ weeks });

    return weeks;
  };
  const renderHeaders = () => {
    return daysOfWeek.map(day => (
      <div className="col-span-1" key={day}>
        {day}
      </div>
    ));
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <div className="grid grid-cols-7 gap-2">{renderHeaders()}</div>
        <div className="mt-4">
          {renderDays().map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2 ">
              {week.map((day, dayIndex) => (
                <div className="col-span-1" key={dayIndex}>
                  {day ? day.format("jDD") : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
