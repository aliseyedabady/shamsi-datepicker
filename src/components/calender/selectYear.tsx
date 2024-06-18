import React, { useEffect, useRef } from "react";
import {
  Moment,
  TState,
  findIndexOfYear,
  moment,
  p2e,
} from "../../utils/function";
interface SelectYearProps {
  setState: React.Dispatch<React.SetStateAction<TState>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Moment>>;
  allYears: string[];
  currentYear: string;
}
const SelectYear: React.FC<SelectYearProps> = ({
  setState,
  setCurrentDate,
  allYears,
  currentYear,
}) => {
  const yearsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const back = () => setState("day");
  const handleSelectYear = (year: string) => {
    setCurrentDate(moment().jYear(+p2e(year)));
    setState("day");
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
};

export default SelectYear;
