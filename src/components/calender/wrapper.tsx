import React from "react";
import { classNames } from "../../utils/function";
import { WrapperCalenderProps } from "./types";

const WrapperCalender: React.FC<WrapperCalenderProps> = ({
  wrapperClassName,
  children,
}) => {
  return (
    <div className="shamsi-date-picker">
      <div className={classNames("calender-wrapper", wrapperClassName)}>
        {children}
      </div>
    </div>
  );
};

export default WrapperCalender;
