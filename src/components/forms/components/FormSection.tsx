import Box from "@material-ui/core/Box";
import React from "react";

import { useStyles } from "../form";

export default ({ children, label, icon, ...props }) => {
  const classes = useStyles();
  return (
    <Box
      px={{
        xs: 0,
        sm: 6
      }}
      mb={{
        xs: 4,
        sm: 6
      }}
      {...props}
      className={classes.formSection}
    >
      <Box fontWeight="700" fontSize="subtitle1.fontSize" mb={1}>
        <div className={classes.formSectionIcon}>{icon && icon}</div>
        {label}
      </Box>
      <Box mb={1}>{children}</Box>
    </Box>
  );
};
