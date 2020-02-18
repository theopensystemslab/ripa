import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ArrowForward from "@material-ui/icons/ArrowForward";
import * as React from "react";

import Stepper from "../components/Stepper";

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

export default {
  default: (
    <Breadcrumbs active={2} list={["My applications", "30 Lake Road"]} />
  ),
  stepper: (
    <Breadcrumbs
      numbered={true}
      list={[
        "Property location",
        "About the works",
        "Application",
        "Declaration",
        "Pay fee"
      ]}
      Divider={ArrowForward}
    />
  )
};
