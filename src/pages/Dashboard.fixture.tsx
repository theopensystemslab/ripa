import { subDays } from "date-fns";
import * as React from "react";

import Dashboard from "./Dashboard";

export default (
  <Dashboard
    applications={[
      {
        id: 1,
        thumbnail: "https://i.imgur.com/S16hH4J.png",
        description: "30 Lake Road",
        updatedAt: subDays(new Date(), Math.ceil(Math.random() * 10)),
        status: "In progress"
      }
    ]}
  />
);
