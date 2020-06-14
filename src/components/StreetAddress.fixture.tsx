import Box from "@material-ui/core/Box";
import * as React from "react";

import StreetAddress from "./StreetAddress";

export default (
  <Box bgcolor="background.paper" px={4} maxWidth={500}>
    <StreetAddress
      title="Street Address"
      type="text"
      topSpacing={1}
      options={["building", "street", "city", "country", "nation", "postcode"]}
      includeLookup={false}
    />
  </Box>
);
