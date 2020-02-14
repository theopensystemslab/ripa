import * as React from "react";

import PropertyInformation from "./PropertyInformation";

export default (
  <PropertyInformation
    streetAddress="30 Lake Road"
    information={{
      District: "Southwark",
      Postcode: "SE22 9HL",
      "Property type": "Terrace",
      "Site area": "100m2"
    }}
    constraints={[
      "It is not in a Conservation area",
      "It does not include any Listed buildings",
      "It is not in a Flood Risk Area"
    ]}
  />
);
