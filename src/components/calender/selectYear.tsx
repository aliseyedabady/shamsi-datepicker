import React, { useEffect, useRef } from "react";
import { findIndexOfYear, moment, p2e } from "../../utils/function";
import Back from "./back";
import { SelectYearProps } from "./types";

const SelectYear: React.FC<SelectYearProps> = ({
  setState,
  setCurrentDate,
  allYears,
  currentYear,
}) => {
  const yearsRef = useRef<(HTMLButtonElement | null)[]>([]);

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
      <Back setState={setState} />
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
