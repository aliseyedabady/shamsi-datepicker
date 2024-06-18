import { useState } from "react";
import Calender from "./components/calender/calender";
import { Moment, isEqualTwoDate, moment } from "./utils/function";
import "./global.css";

const App = () => {
  const [date, setDate] = useState<Moment | undefined>(moment());
  return (
    <div className="main-wrapper">
      <Calender
        onChange={newDate => {
          setDate(isEqualTwoDate(newDate, date) ? undefined : newDate);
        }}
        value={date}
      />
    </div>
  );
};

export default App;
