import * as React from "react";

import Date from "./Date";

export default {
  default: (
    <Date
      title="Date"
      type="number"
      name="date"
      options={["day", "month", "year"]}
      inputProps={{
        day: {
          min: 1,
          max: 31
        },
        month: {
          min: 1,
          max: 12
        },
        year: {
          min: 1920,
          max: 2020
        }
      }}
    />
  )
};
