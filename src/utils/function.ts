import moment, { Moment } from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

type TState = "day" | "month" | "year";

const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

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

const isInCurrentMonth = (month: Moment, day: moment.Moment) => {
  return month.jMonth() === day.jMonth();
};

const isToday = (date: moment.Moment): boolean => {
  return moment().isSame(date, "day");
};
const e2p = (s: number) =>
  s.toString().replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹".split("")[+d]);

const p2e = (s: string) =>
  s.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

const getAllYears = (startYear: number, endYear: number): string[] => {
  let years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years.map(year => e2p(year));
};

const findIndexOfYear = (years: string[], currentYear: string) =>
  years.indexOf(currentYear);

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export {
  type Moment,
  type TState,
  getDayOfWeek,
  daysOfWeek,
  isInCurrentMonth,
  getPrevMonthDays,
  getNextMonthDays,
  isToday,
  months,
  getAllYears,
  e2p,
  p2e,
  findIndexOfYear,
  moment,
  classNames,
};
