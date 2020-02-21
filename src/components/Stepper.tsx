import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: 0,
    alignItems: "center",
    color: "currentColor",
    flexWrap: "nowrap",
    "& li": {
      color: "currentColor",
      fontSize: "inherit",
      listStyle: "none",
      whiteSpace: "nowrap"
    }
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    fontWeight: 400,
    opacity: 0.75
  },
  active: {
    fontWeight: 700,
    opacity: 1,
    "& $divider": {
      opacity: 0.75
    }
  },
  icon: {
    color: "currentColor",
    margin: "0 0.5em",
    width: "0.75em",
    height: "0.75em"
  },
  divider: {
    color: "currentColor",
    margin: "0 0.5em",
    fontSize: "1em",
    lineHeight: 1,
    textAlign: "center",
    fontWeight: 400
  }
});

const Stepper = ({
  active = 0,
  list,
  numbered = false,
  Divider = false as any
}) => {
  const classes = useStyles();
  return (
    <Box component="ol" className={classes.root} p={0}>
      {list.map((child, i) => (
        <li
          className={classNames(
            classes.breadcrumb,
            i + 1 === active && classes.active
          )}
          key={i}
        >
          {numbered && `${i + 1}.`} {child}
          {i + 1 < list.length && (
            <>
              {Divider ? (
                <Divider className={classes.icon} />
              ) : (
                <span className={classes.divider}>/</span>
              )}
            </>
          )}
        </li>
      ))}
    </Box>
  );
};

export default Stepper;
