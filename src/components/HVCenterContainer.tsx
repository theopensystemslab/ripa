import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

import { scrollIn } from "../lib/scrollIn";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    "&:first-child": {
      minHeight: "calc(100vh - 144px)"
    },
    "&:last-child:first-child": {
      minHeight: "calc(100vh - 196px)"
    },
    "&:last-child:not(:first-child)": {
      minHeight: "calc(100vh - 52px)"
    }
  }
}));

const HVCenterContainer = ({
  children,
  light = false,
  verticalCenter = false
}) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    scrollIn(ref.current, {
      block: verticalCenter ? "center" : "start"
    });
  });
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      color={light ? "#000" : "#fff"}
      bgcolor={light ? "#fff" : "secondary.main"}
      py={verticalCenter ? 0 : 3}
      style={{
        alignItems: verticalCenter && "center",
        display: verticalCenter && "flex"
      }}
    >
      <Container maxWidth="md" ref={ref}>
        {children}
      </Container>
    </Box>
  );
};

export default HVCenterContainer;
