import { daysOfWeek } from "../../utils/function";

const DaysOfWeek = () => {
  return (
    <div className="header-wrapper">
      {daysOfWeek.map(day => (
        <div className="header-item" key={day}>
          <span>{day}</span>
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
