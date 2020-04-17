import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    border: 0,
    color: "currentColor",
    textAlign: "left",
    display: "block",
    position: "relative",
    padding: 0,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0)",
    transition: "background-color 0.3s ease-out",
    "&::before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "currentColor",
      transition: "opacity 0.2s ease-out",
      opacity: 0.1
    },
    "&:focus, &:hover": {
      "&::before": {
        opacity: 0.05
      }
    }
  },
  imageContainer: {
    paddingTop: "100%",
    position: "relative",
    backgroundColor: theme.palette.primary.contrastText,
    overflow: "hidden",
    "& img": {
      width: "100%",
      maxWidth: `calc(100% - ${theme.spacing(3)}px)`,
      display: "block",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5
    }
  },
  selected: {
    opacity: 1,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "& $imageContainer": {
      opacity: 1
    },
    "& $imageContainer img": {
      transform: "translate(-50%, -50%)"
    },
    "&:focus, &:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  current: {
    opacity: 1
  },
  key: {
    opacity: 0.5,
    paddingRight: 16
  },
  text: {
    padding: `8px 12px`,
    [theme.breakpoints.up("sm")]: {
      padding: "14px 18px"
    }
  },
  type: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(16)
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(20)
    }
  },
  buttonContent: {
    height: "100%"
  }
}));

const ResponseButton = ({
  children,
  selected = false,
  handleClick,
  image = null,
  responseKey,
  ...props
}) => {
  const classes = useStyles();
  return (
    <ButtonBase
      onClick={handleClick}
      disableRipple={selected}
      className={classNames(classes.root, {
        [classes.selected]: selected
      })}
      {...props}
    >
      <div className={classes.buttonContent}>
        <div className={classNames(classes.imageContainer)}>{image}</div>
        <Grid container wrap="nowrap" className={classes.text}>
          <Grid item className={classes.key}>
            <Typography className={classes.type} color="inherit">
              {responseKey}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.type} color="inherit">
              {children}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ButtonBase>
  );
};
export default ResponseButton;
