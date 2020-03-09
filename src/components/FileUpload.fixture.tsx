import React from "react";

import FileUpload from "./FileUpload";

export default {
  default: (
    <FileUpload maxSize={40000} accept={["image/*"]} title="File upload" />
  )
};
