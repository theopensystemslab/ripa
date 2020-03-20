import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    border: 0,
    backgroundColor: "#fff",
    textAlign: "center",
    display: "block",
    width: "100%",
    height: theme.spacing(1) * 35,
    marginBottom: theme.spacing(3),
    position: "relative",
    "& img": {
      maxWidth: `calc(100% - ${theme.spacing(2)}px)`,
      maxHeight: `calc(100% - ${theme.spacing(1)}px)`,
      display: "block",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      zIndex: 5
    }
  }
}));

const StatementImage = ({ src = null, alt = "" }) => {
  const classes = useStyles();
  if (!src) return null;
  return (
    <div className={classes.root}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default StatementImage;
