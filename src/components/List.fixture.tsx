import Box from "@material-ui/core/Box";
import * as React from "react";

import List from "./List";

export default {
  "Default list": (
    <Box bgcolor="background.paper" p={3}>
      <List />
    </Box>
  ),
  "List With total bar": (
    <Box bgcolor="background.paper" p={3}>
      <List total />
    </Box>
  )
};
