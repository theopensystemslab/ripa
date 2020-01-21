import Select from "@material-ui/core/Select";
import React from "react";
import { ChevronDown } from "react-feather";

import { useStyles } from "../form";

export default ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Select
      classes={{
        root: classes.select,
        icon: classes.selectIcon
      }}
      IconComponent={ChevronDown}
      disableUnderline
      {...props}
    >
      {children}
    </Select>
  );
};
