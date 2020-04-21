import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles({
  root: {
    "&:focus": {
      outline: "none"
    }
  }
});

const FocusHandler = ({ tabIndex = 0, children, ...props }) => {
  const container = React.useRef(null);
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      tabIndex={tabIndex}
      {...props}
      ref={container}
    >
      {children}
    </div>
  );
};

export default FocusHandler;
