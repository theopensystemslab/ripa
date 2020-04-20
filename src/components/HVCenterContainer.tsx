import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

import { scrollIn } from "../lib/scrollIn";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    "&:first-child": {
      minHeight: "calc(100vh - 168px)" // 100vh - header
    },
    "&:only-child": {
      minHeight: "calc(100vh - 220px)" // 100vh - header + footer
    },
    "&:last-child:not(:first-child)": {
      minHeight: "calc(100vh - 116px)" // 100vh - small header + footer
    }
  },
  py: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {}
  }
}));

const HVCenterContainer = ({
  children,
  light = false,
  verticalCenter = false,
  disableScroll = false
}) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!disableScroll) {
      scrollIn(ref.current, {
        block: verticalCenter ? "center" : "start"
      });
    }
  });
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      color={light ? "#000" : "#fff"}
      bgcolor={light ? "#fff" : "primary.main"}
      style={{
        alignItems: verticalCenter && "center",
        display: verticalCenter && "flex"
      }}
    >
      <Container
        className={verticalCenter ? "vertical-center" : classes.py}
        maxWidth="md"
        ref={ref}
      >
        {children}
      </Container>
    </Box>
  );
};

export default HVCenterContainer;
