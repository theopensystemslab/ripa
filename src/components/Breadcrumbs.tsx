import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import Stepper from "./Stepper";

interface IBreadcrumbs {
  active?: number;
  list?: string[];
  numbered?: boolean;
  Divider?: any;
}

const Breadcrumbs: React.FC<IBreadcrumbs> = ({
  active = 1,
  list = [],
  numbered = false,
  Divider = false
}) => {
  return (
    <Box bgcolor="background.paper" fontSize="h6.fontSize" py={4}>
      <Container maxWidth="lg">
        <Stepper
          active={active}
          list={list}
          numbered={numbered}
          Divider={Divider}
        />
      </Container>
    </Box>
  );
};

export default Breadcrumbs;
