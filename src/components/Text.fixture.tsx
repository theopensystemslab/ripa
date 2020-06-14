import Box from "@material-ui/core/Box";
import * as React from "react";

import Text from "./Text";

export default {
  "Short Text": (
    <Box bgcolor="background.paper" px={4}>
      <Text
        topSpacing={1}
        title="Short Text Input"
        multiline={false}
        type="text"
        name="textFieldShort"
        label="label"
        placeholder=""
        required={false}
        includeSubmit={false}
      />
    </Box>
  ),
  "Long Text": (
    <Box bgcolor="background.paper" px={4}>
      <Text
        topSpacing={1}
        title="Long Text Input"
        multiline
        fullWidth
        type="text"
        name="textFieldLong"
        label="label"
        placeholder="instruction"
        required={false}
        maxWords={5}
        includeSubmit={false}
      />
    </Box>
  ),
  Email: (
    <Box bgcolor="background.paper" px={4}>
      <Text
        topSpacing={1}
        title="Email"
        label="Email Address"
        placeholder="you@example.com"
        name="email"
        type="email"
        required={false}
        includeSubmit={false}
      />
    </Box>
  ),
  Number: (
    <Box bgcolor="background.paper" px={4}>
      <Text
        topSpacing={1}
        title="Number"
        label="Number"
        fullWidth={false}
        placeholder="Number Input"
        name="number"
        type="number"
        unit="specified unit"
        required={false}
        inputProps={{ min: 2, max: 10 }}
        includeSubmit={false}
      />
    </Box>
  )
};
