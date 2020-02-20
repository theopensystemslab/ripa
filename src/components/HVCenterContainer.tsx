import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    "align-items": "center",
    "justify-content": "center"
  },
  lightContainer: {
    background: "white",
    color: "black",
    width: "100%",
    display: "flex",
    "align-items": "center",
    "justify-content": "center"
  },
  innerContainer: {
    margin: "0 auto"
  }
}));

const HVCenterContainer = ({ children, light = false }) => {
  const classes = useStyles();
  return (
    <div className={light ? classes.lightContainer : classes.container}>
      <div>{children}</div>
    </div>
  );
};

export default HVCenterContainer;
