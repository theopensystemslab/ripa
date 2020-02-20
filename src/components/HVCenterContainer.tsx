import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center"
  }
}));

const HVCenterContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export default HVCenterContainer;
