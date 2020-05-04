import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    // overflow: "hidden",
    "&::before": {
      content: "''",
      position: "absolute",
      display: "block",
      left: 1,
      height: "100%",
      transition: "opacity 0.15s ease-out",
      top: 0,
      opacity: 0,
      borderLeft: `0.35em solid ${theme.palette.primary.light}`
    }
  },
  question: {
    width: "100%",
    padding: 0,
    paddingRight: "0.65em",
    zIndex: 10,
    transition: "transform 0.15s ease-out",
    [theme.breakpoints.only("xs")]: {
      fontSize: 18
    }
  },
  inFocus: {
    "&::before": {
      opacity: 1,
      transition: "opacity 0.15s 0.15s ease-out"
    },
    "& $question": {
      transform: "translateX(0.65em)"
    }
  }
}));

const Question = ({ children, inFocus = true, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root, inFocus && classes.inFocus)}>
      <Typography
        className={classNames(classes.question, inFocus && classes.inFocus)}
        variant="h4"
        component="div"
        {...props}
      >
        <strong>{children}</strong>
      </Typography>
    </div>
  );
};

export default Question;
