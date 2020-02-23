import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import { scrollIn } from "../lib/scrollIn";

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

  return (
    <Box
      color={light ? "#000" : "#fff"}
      bgcolor={light ? "#fff" : "secondary.main"}
      py={verticalCenter ? 0 : 3}
      style={{
        alignItems: verticalCenter && "center",
        display: verticalCenter && "flex",
        minHeight: "calc(100vh - 204px)"
      }}
    >
      <Container maxWidth="md" ref={ref}>
        {children}
      </Container>
    </Box>
  );
};

export default HVCenterContainer;
