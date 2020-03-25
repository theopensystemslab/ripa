import * as React from "react";

import { Header } from "./Application";

export default (
  <Header
    team="Council"
    address="30 Lake Road"
    currentUser
    breadcrumbs={[
      "Property location",
      "About the works",
      "My application",
      "Declaration",
      "Pay & submit"
    ]}
  />
);
