import Box from "@material-ui/core/Box";
import * as React from "react";

import Progress from "./Loading";

const Loading = () => {
  return (
    <Box bgcolor="primary.main">
      <Progress></Progress>
    </Box>
  );
};

export default Loading;
