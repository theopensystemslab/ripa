import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(theme => ({
  question: {
    width: "100%",
    padding: 0,
    zIndex: 10,
    position: "relative"
  }
}));

const Question = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Typography
      className={classes.question}
      variant="h4"
      component="div"
      {...props}
    >
      <strong>{children}</strong>
    </Typography>
  );
};

export default Question;
