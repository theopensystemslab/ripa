import * as React from "react";

import StreetAddress from "./StreetAddress";

export default (
  <StreetAddress
    title="Street Address"
    type="text"
    name="address"
    options={["building", "street", "city", "county", "postcode"]}
  />
);
