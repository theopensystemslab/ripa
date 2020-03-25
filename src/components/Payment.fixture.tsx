import Box from "@material-ui/core/Box";
import * as React from "react";

import Payment, { CardDetails, Receipt } from "./Payment";

export default {
  fee: <Payment fee={204} />,
  cardDetails: (
    <Box bgcolor="background.paper" px={4}>
      <CardDetails />
    </Box>
  ),
  receipt: (
    <Receipt fee={204} paidOn={new Date(2020, 0, 1)} reference={"0271911328"} />
  )
};
