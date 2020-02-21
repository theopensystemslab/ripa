import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import { scrollIn } from "../lib/scrollIn";

const HVCenterContainer = ({
  children,
  light = false,
  verticalCenter = true
}) => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    scrollIn(ref.current);
  });

  return (
    <Box
      color={light ? "#000" : "#fff"}
      bgcolor={light ? "#fff" : "secondary.main"}
      minHeight={"calc(100vh - 204px)"}
      display={verticalCenter && "flex"}
      alignItems={verticalCenter && "center"}
      py={!verticalCenter && 3}
    >
      <Container maxWidth="md" ref={ref}>
        {children}
      </Container>
    </Box>
  );
};

export default HVCenterContainer;
