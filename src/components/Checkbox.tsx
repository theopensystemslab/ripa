import Checkbox from "@material-ui/core/Checkbox";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as React from "react";

const useStyles = makeStyles(theme =>
  createStyles({
    checkBoxRoot: {
      borderRadius: 0,
      padding: 0,
      marginRight: theme.spacing(2),
      height: 32,
      width: 32,
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    icon: {
      height: 32,
      width: 32,
      border: "1px solid #000",
      display: "block",
      position: "relative"
    },
    checkedIcon: {
      "&::before": {
        content: "''",
        display: "block",
        position: "absolute",
        height: 18,
        width: 10,
        borderBottom: "2.5px solid #000",
        borderRight: "2.5px solid #000",
        left: "50%",
        top: "42%",
        transform: "translate(-50%, -50%) rotate(45deg)"
      }
    }
  })
);

const StyledCheckbox = props => {
  const classes = useStyles();
  return (
    <Checkbox
      classes={{ root: classes.checkBoxRoot }}
      icon={<span className={classes.icon} />}
      checkedIcon={
        <span className={classNames(classes.icon, classes.checkedIcon)} />
      }
      {...props}
    />
  );
};

export default StyledCheckbox;
