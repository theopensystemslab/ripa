import * as React from "react";

import MyApplication from "./MyApplication";

export default (
  <MyApplication
    sections={{
      "About the property": "Complete",
      Ownership: "Complete",
      "Applicant details": "In progress",
      "Agent details": "In progress",
      "Materials & appearance": "Not started",
      Heritage: "Not started"
    }}
    percentageComplete={12}
  />
);
