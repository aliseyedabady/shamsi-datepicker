import { useState } from "react";
import Calender from "./components/calender/calender";
import { Moment, moment } from "./utils/function";
import "./global.css";

const App = () => {
  const [date, setDate] = useState<Moment>(moment());
  console.log({ date });
  return (
    <div className="main-wrapper">
      <p>{date.format("jYYYY/jMM/jDD")}</p>
      <Calender onChange={newDate => setDate(newDate)} value={date} />
    </div>
  );
};

export default App;
