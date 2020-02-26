import * as React from "react";

import MyApplication from "./MyApplication";

export default (
  <MyApplication
    sections={[
      {
        id: 100,
        text: "About the property",
        status: 2
      },
      {
        id: 101,
        text: "Ownership",
        status: 2
      },
      {
        id: 102,
        text: "Applicant details",
        status: 1
      },
      {
        id: 103,
        text: "Agent details",
        status: 1
      },
      {
        id: 104,
        text: "Materials & appearance",
        status: 3
      },
      {
        id: 105,
        text: "Heritage",
        status: 0
      }
    ]}
  />
);
