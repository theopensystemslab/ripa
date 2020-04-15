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
      },
      {
        id: 2,
        thumbnail: "https://i.imgur.com/w2txLmM.png",
        description: "45 River way",
        updatedAt: subDays(new Date(), Math.ceil(Math.random() * 10)),
        status: "In progress"
      },
      {
        id: 3,
        thumbnail: "https://i.imgur.com/S16hH4J.png",
        description: "69 Deverell Street",
        updatedAt: subDays(new Date(), Math.ceil(Math.random() * 10)),
        status: "Submitted"
      }
    ]}
  />
);
