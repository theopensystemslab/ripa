import Box from "@material-ui/core/Box";
import * as React from "react";

import Checkboxes from "./Checkboxes";

export default (
  <Box bgcolor="background.paper" px={4}>
    <Checkboxes
      title="What types of street trees will you plant?"
      name="default_boxes"
      required
      options={{
        oak: "English Oak",
        plane: "London Plane Tree",
        redwood: "Redwood",
        other: "Other species"
      }}
    />
  </Box>
);
