# Samin DatePicker

This package is a Jalaali date picker for React app, with the ability to select several and a period of time (range of time)

## Installation

To install samin-datepicker, you will need to have [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) installed on your system. Once you have one of these package managers set up, you can install samin-datepicker by running the following command:

```bash
  npm install --save samin-datepicker
```

or

```bash
  yarn add samin-datepicker
```

## Usage/Examples

This will install the latest version of samin-datepicker and add it as a dependency to your project.

# DatePicker

The **DatePicker** component is a standalone calendar picker that allows the user to select a single date.

```typescript
import { useState } from "react";
import DatePicker from "samin-datepicker";
import { Moment } from "moment-jalaali";

function App() {
  const [date, setDate] = useState<Moment | null>(moment());

  return (
    <DatePicker
      onChange={newDate => {
        setDate(newDate);
      }}
      value={date}
    />
  );
}
```

# RangePicker

The **RangePicker** component is a calendar picker that allows the user to select a range of dates.

```typescript
import { useState } from "react";
import DatePicker from "samin-datepicker";
import { Moment } from "moment-jalaali";

function App() {
  const [range, setRange] = useState<RangeValue>([null, null]);

  return (
    <DatePicker
      range={{
        setValue: setRange,
        value: range,
      }}
    />
  );
}
```

## Authors

- [@aliseyedabady](https://github.com/aliseyedabady)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Dedicated

Dedicated to my dear Samin
