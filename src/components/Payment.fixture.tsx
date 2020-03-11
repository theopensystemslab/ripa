import * as React from "react";

import Payment, { CardDetails, Receipt } from "./Payment";

export default {
  fee: <Payment fee={204} />,
  cardDetails: <CardDetails />,
  receipt: (
    <Receipt fee={204} paidOn={new Date(2020, 0, 1)} reference={"0271911328"} />
  )
};
