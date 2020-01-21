import InputBase from "@material-ui/core/InputBase";
import React from "react";

import { useStyles } from "../form";

export default ({ ...props }) => {
  const classes = useStyles();
  return (
    <InputBase
      classes={{
        root: classes.inputRoot,
        input: classes.input,
        focused: classes.inputFocused,
        multiline: classes.inputMultiline
      }}
      {...props}
    />
  );
};
