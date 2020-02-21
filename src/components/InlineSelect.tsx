import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowDown } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      verticalAlign: "middle"
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      color: theme.palette.primary.contrastText,
      fontWeight: "inherit",
      letterSpacing: "inherit",
      minWidth: "10rem",
      fontSize: "1em",
      textAlign: "left",
      boxSizing: "border-box",
      position: "relative",
      boxShadow: "none !important",
      border: 0,
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
      "& ~ svg": {
        color: "currentColor"
      },
      "&:focus": {
        background: "none",
        "&:before": {
          opacity: "0.1",
          transform: "scaleY(1)"
        }
      }
    },
    selectInput: {
      fontSize: "1em",
      boxShadow: "none !important",
      background: "none",
      boxSizing: "border-box",
      width: "100%",
      whiteSpace: "normal",
      minHeight: "1.5em",
      paddingTop: "0.1em",
      paddingBottom: "0.1em",
      lineHeight: 1.3,
      "& option": {
        color: "currentColor",
        backgroundColor: theme.palette.primary.main
      }
    },
    paper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: `2px solid ${theme.palette.primary.contrastText}`,
      boxShadow: "none",
      "& ul": {
        padding: "0"
      },
      "& li": {
        color: "currentColor",
        fontSize: theme.typography.pxToRem(20),
        fontWeight: "500",
        whiteSpace: "normal",
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        lineHeight: 1.2,
        height: "auto"
      }
    },
    helpText: {
      color: "currentColor"
    },
    icon: {
      color: "currentColor",
      [theme.breakpoints.down("sm")]: {
        opacity: 0.65
      }
    },
    formControl: {
      backgroundColor: "transparent",
      border: "0",
      height: "auto",
      fontSize: "1em",
      borderBottom: `0.12em solid currentColor`,
      boxShadow: "none !important"
    },
    native: {
      minWidth: "12em",
      maxWidth: "100%",
      "& option": {
        color: "#000"
      }
    },
    inputLabel: {
      fontSize: "1em",
      fontWeight: 700,
      display: "inline"
    }
  })
);

const SelectQuestion = (
  {
    value = "",
    children = null as any,
    name = "select",
    native = false,
    onChange = undefined
  },
  ...props
) => {
  const classes = useStyles();
  return (
    <FormControl margin="none" className={classes.container}>
      <Select
        value={value}
        displayEmpty
        className={classNames(classes.formControl, native && classes.native)}
        disableUnderline
        IconComponent={KeyboardArrowDown}
        onChange={onChange}
        inputProps={{
          name: name,
          classes: {
            selectMenu: classes.root,
            select: classes.selectInput,
            icon: classes.icon
          }
        }}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          classes: {
            paper: classes.paper
          }
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectQuestion;
