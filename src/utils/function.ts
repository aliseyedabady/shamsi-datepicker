import moment, { Moment } from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const getDayOfWeek = (day: moment.Moment) => {
  return daysOfWeek.indexOf(day.format("dd"));
};

const getPrevMonthDays = (daysArray: moment.Moment[]) => {
  const firstDayOfMonth = daysArray[0];
  const firstDayOfWeek = getDayOfWeek(firstDayOfMonth);
  return Array.from({ length: firstDayOfWeek }, (_, i) => {
    return firstDayOfMonth.clone().subtract(firstDayOfWeek - i, "days");
  });
};

const getNextMonthDays = (
  daysArray: moment.Moment[],
  daysInCurrentMonth: number
) => {
  const lastDayOfMonth = daysArray[daysInCurrentMonth - 1];
  const lastDayOfWeek = getDayOfWeek(lastDayOfMonth);
  return Array.from({ length: 6 - lastDayOfWeek }, (_, i) => {
    return lastDayOfMonth.clone().add(i + 1, "days");
  });
};

const isInCurrentMonth = (month: Moment, day: moment.Moment | null) => {
  if (day) {
    return month.jMonth() === day.jMonth();
  }

  // if (day) {
  //   const startOfCurrentMonth = month.startOf("jMonth");
  //   const endOfCurrentMonth = month.endOf("jMonth");
  //   return day.isBetween(startOfCurrentMonth, endOfCurrentMonth, "day", "[]");
  // }
  // return null;
};

export {
  getDayOfWeek,
  daysOfWeek,
  isInCurrentMonth,
  getPrevMonthDays,
  getNextMonthDays,
};
