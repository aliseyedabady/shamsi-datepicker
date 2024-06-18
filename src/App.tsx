import { useState } from "react";
import Calender from "./components/calender/calender";
import { Moment, moment } from "./utils/function";
import "./global.css";

const App = () => {
  const [date, setDate] = useState<Moment[]>([moment()]);
  return (
    <div className="main-wrapper">
      <Calender
        onChange={newDate => setDate([...date, newDate])}
        value={date}
      />
    </div>
  );
};

export default App;
