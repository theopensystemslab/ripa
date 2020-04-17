import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    border: 0,
    color: "currentColor",
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    position: "relative",
    fontSize: 20,
    fontFamily: "inherit",
    transition: "background-color 0.3s ease-out",
    maxWidth: theme.spacing(1) * 60,
    padding: theme.spacing(2, 3),
    backgroundColor: "rgba(255,255,255,0)",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1.5, 2)
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(1) * 60
    },
    "&:not(:last-of-type)": {
      marginBottom: theme.spacing(1)
    },
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
  key: {
    opacity: 0.5,
    width: "1em",
    wordBreak: "keep-all",
    textAlign: "center",
    flexShrink: 1,
    marginRight: theme.spacing(3)
  },
  selected: {
    color: theme.palette.primary.contrastText,
    "&::before": {
      backgroundColor: theme.palette.primary.main,
      opacity: 1
    },
    "&:focus, &:hover": {
      "&::before": {
        opacity: 1
      }
    }
  },
  text: {
    color: "currentColor",
    zIndex: 1,
    wordBreak: "break-word"
  }
}));

const ResponseButton = ({
  children,
  selected = false,
  handleClick,
  responseKey = "",
  ...props
}) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={classNames(classes.root, selected && classes.selected)}
      onClick={handleClick}
      {...props}
    >
      <Box className={classes.key}>{responseKey}</Box>
      <Box className={classes.text}>{children}</Box>
    </ButtonBase>
  );
};
export default ResponseButton;
