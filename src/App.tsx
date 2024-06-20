import React from "react";
import { useState } from "react";
import Calender from "./components/calender/calender";
import { Moment, isEqualTwoDate, moment } from "./utils/function";
import "./global.css";
import { RangeValue } from "./components/calender/types";

const App = () => {
  const [date, setDate] = useState<Moment | null>(moment());
  const [range, setRange] = useState<RangeValue>([null, null]);
  return (
    <div className="main-wrapper">
      <Calender
        onChange={newDate => {
          setDate(isEqualTwoDate(newDate, date) ? null : newDate);
        }}
        range={{
          setValue: setRange,
          value: range,
        }}
        value={date}
      />
    </div>
  );
};

export default App;
