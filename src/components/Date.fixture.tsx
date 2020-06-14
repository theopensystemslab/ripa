import Box from "@material-ui/core/Box";
import * as React from "react";

import Date from "./Date";

export default (
  <Box bgcolor="background.paper" px={4}>
    <Date
      includeSubmit={false}
      title="Date"
      type="number"
      topSpacing={0}
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
  </Box>
);
