import Input from "@material-ui/core/Input";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: "currentColor",
      fontWeight: "inherit",
      letterSpacing: "inherit",
      minWidth: "10rem",
      fontSize: "1em",
      boxSizing: "border-box",
      position: "relative",
      border: 0,
      boxShadow: "none !important",
      "&:before": {
        content: '""',
        backgroundColor: "currentColor",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        zIndex: "0",
        opacity: "0",
        transform: "scaleY(0.85)",
        transformOrigin: "bottom",
        transition: "all 0.25s ease-out"
      },
      "&$focused": {
        backgroundColor: "transparent"
      }
    },
    focused: {
      backgroundColor: "transparent",
      "&:before": {
        opacity: "0.1",
        transform: "scaleY(1)"
      }
    },
    input: {
      backgroundColor: "transparent",
      border: 0,
      color: "currentColor",
      height: "auto",
      fontSize: "1em",
      padding: theme.spacing(0.5, 1),
      borderBottom: `0.12em solid currentColor`
    }
  })
);

const TextQuestion = ({ value = "", children = null as any, ...props }) => {
  const classes = useStyles();
  return (
    <Input
      disableUnderline
      spellCheck="false"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      classes={{
        root: classes.root,
        input: classes.input,
        focused: classes.focused
      }}
      {...props}
    >
      {children}
    </Input>
  );
};

export default TextQuestion;
