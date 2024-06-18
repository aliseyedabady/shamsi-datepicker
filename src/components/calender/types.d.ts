import React from "react";
import { Moment, TState } from "../../utils/function";

interface CalenderProps {
  wrapperClassName?: string;
  year?: {
    from?: number;
    to?: number;
  };
  day?: {
    format?: string;
  };
  onChange?: (date: Moment) => void;
  value?: Moment;
}
interface BackProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
}
interface BodyProps {
  currentDate: Moment;
  onChange?: (date: Moment) => void;
  value?: Moment;
}
interface OptionsProps {
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  currentDate: Moment;
  setState: React.Dispatch<React.SetStateAction<TState>>;
}
interface SelectDayProps {
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  currentDate: Moment;
  setState: React.Dispatch<React.SetStateAction<TState>>;
  onChange?: (date: Moment) => void;
  value?: Moment;
}
interface SelectMonthProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  currentDate: Moment;
}
interface SelectYearProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  allYears: string[];
  currentYear: string;
}
interface WrapperCalenderProps {
  wrapperClassName?: string;
  children: React.ReactNode | React.ReactNode[];
}
export {
  BackProps,
  BodyProps,
  CalenderProps,
  OptionsProps,
  SelectDayProps,
  SelectMonthProps,
  SelectYearProps,
  WrapperCalenderProps,
};
