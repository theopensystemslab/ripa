import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";
import classNames from "classnames";
import * as React from "react";
import { Link } from "react-navi";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: 0,
    alignItems: "center",
    color: "currentColor",
    padding: 0,
    flexWrap: "nowrap",
    maxWidth: "100%",
    overflow: "hidden",
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
    opacity: 0.75,
    cursor: "default",
    "&:hover": {
      opacity: 1
    },
    "& a": {
      textDecoration: "none"
    }
  },
  numbered: {
    listStyle: "decimal !important"
  },
  active: {
    fontWeight: 700,
    opacity: 1,
    display: "flex",
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
  },
  moreBtn: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(0, 1),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    }
  },
  menu: {
    width: 240,
    backgroundColor: theme.palette.grey[200]
  },
  menuBtn: {
    display: "block",
    fontFamily: "inherit",
    padding: theme.spacing(1.5, 2),
    fontSize: 16,
    width: "100%",
    textAlign: "left",
    "&:hover": {
      backgroundColor: theme.palette.grey[100]
    }
  },
  menuBtnDisabled: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[100],
    opacity: 0.75
  },
  menuBtnActive: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: 700
  }
}));

const Stepper = ({
  active = 0,
  list,
  numbered = false,
  Divider = false as any
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (matches) {
    return (
      <ol className={classes.root}>
        {list.map((child, i) => (
          <li
            className={classNames(
              classes.breadcrumb,
              i + 1 === active && classes.active,
              numbered && classes.numbered
            )}
            key={i}
          >
            {typeof child === "object" ? (
              <>
                {child.link ? (
                  <Link href={child.link}>
                    {numbered && `${i + 1}.`}
                    {child.text}
                  </Link>
                ) : (
                  <>
                    {numbered && `${i + 1}.`}
                    {child.text}
                  </>
                )}
              </>
            ) : (
              <>
                {numbered && `${i + 1}. `}
                {child}
              </>
            )}
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
      </ol>
    );
  } else {
    return (
      <Box component="div" className={classes.root} p={0}>
        <ButtonBase
          className={classes.moreBtn}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {numbered ? <MoreIcon /> : <ExpandIcon />}
        </ButtonBase>
        <Popover
          id="mobile-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: numbered ? "top" : "bottom",
            horizontal: numbered ? "right" : "left"
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={0}
          PaperProps={{
            classes: {
              root: classes.menu
            }
          }}
        >
          {list.map((child, i) => (
            <ButtonBase
              classes={{
                root: classNames(
                  classes.menuBtn,
                  i + 1 === active && classes.menuBtnActive
                ),
                disabled: classes.menuBtnDisabled
              }}
              onClick={handleClose}
              disabled={i + 1 >= active}
              key={i}
            >
              {typeof child !== "object" ? (
                <>
                  {numbered && `${i + 1}.`} {child}
                </>
              ) : (
                <>
                  {numbered && `${i + 1}.`} {child.text}
                </>
              )}
            </ButtonBase>
          ))}
        </Popover>
        {numbered && (
          <Box display="inline-block">
            {`${active} of ${list.length} - `}
            <strong>{list[active - 1]}</strong>
          </Box>
        )}
      </Box>
    );
  }
};

export default Stepper;
