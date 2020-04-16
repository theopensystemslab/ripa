import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import * as marked from "marked";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: theme.palette.text.primary,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: -drawerWidth,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginRight: "-100%"
    }
  },
  drawerShift: {
    marginRight: 0
  },
  drawerTitle: {
    marginTop: theme.spacing(1),
    fontWeight: 700,
    fontSize: "1.15rem",
    flexGrow: 1
  },
  drawerContent: {
    padding: "0.5rem 1.75rem 1rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    "& a": {
      color: theme.palette.grey[500],
      "&:hover": {
        color: theme.palette.grey[700]
      }
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    },
    padding: theme.spacing(1)
  },
  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
}));

const drawerWidth = 400;
const MoreInfo = ({ content, open = false, handleClose }) => {
  const html = { __html: marked(content, { sanitize: true }) };
  const classes = useStyles();
  return (
    <>
      <Drawer
        className={classNames(classes.drawer, {
          [classes.drawerShift]: open
        })}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.close}>
          <IconButton onClick={handleClose} aria-label="Close Panel">
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.drawerContent}>
          <div dangerouslySetInnerHTML={html} />
        </div>
      </Drawer>
    </>
  );
};

export default MoreInfo;
