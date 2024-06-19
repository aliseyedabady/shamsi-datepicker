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
  onChange?: onChange;
  value?: Moment | Moment[] | null;
  range?: Range;
}
interface BackProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
}
interface BodyProps {
  currentDate: Moment;
  onChange?: onChange;
  value?: Moment | Moment[] | null;
  range?: Range;
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
  onChange?: onChange;
  value?: Moment | Moment[] | null;
  range?: Range;
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
interface Range {
  setValue: React.Dispatch<React.SetStateAction<RangeValue>>;
  value: RangeValue;
}
type RangeValue = [Moment | null, Moment | null];
type onChange = (date: Moment | null) => void;
export {
  BackProps,
  BodyProps,
  CalenderProps,
  OptionsProps,
  SelectDayProps,
  SelectMonthProps,
  SelectYearProps,
  WrapperCalenderProps,
  RangeValue,
  onChange,
};
