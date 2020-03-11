import ArrowForward from "@material-ui/icons/ArrowForward";
import * as React from "react";

import Breadcrumbs from "./Breadcrumbs";

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
