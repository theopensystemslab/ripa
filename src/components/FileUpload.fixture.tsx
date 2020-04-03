import Box from "@material-ui/core/Box";
import React from "react";

import FileUpload from "./FileUpload";

export default (
  <Box bgcolor="background.paper" px={4}>
    <FileUpload maxSize={40000} accept={["image/*"]} title="File upload" />
  </Box>
);
