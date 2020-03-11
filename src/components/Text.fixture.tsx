import * as React from "react";

import Text from "./Text";

export default {
  "Short Text": (
    <Text
      title="Short Text Input"
      multiline={false}
      type="text"
      name="textFieldShort"
      label="label"
      placeholder=""
      required={false}
    />
  ),
  "Long Text": (
    <Text
      title="Long Text Input"
      multiline
      fullWidth
      type="text"
      name="textFieldLong"
      label="label"
      placeholder="instruction"
      required={false}
      maxWords={5}
    />
  ),
  Email: (
    <Text
      title="Email"
      label="Email Address"
      placeholder="you@example.com"
      name="email"
      type="email"
      required={false}
    />
  ),
  Number: (
    <Text
      title="Number"
      label="Number"
      fullWidth={false}
      placeholder="Number Input"
      name="number"
      type="number"
      unit="specified unit"
      required={false}
      inputProps={{ min: 2, max: 10 }}
    />
  )
};
