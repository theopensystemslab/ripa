import * as React from "react";

import Checkboxes from "./Checkboxes";

export default {
  default: (
    <Checkboxes
      title="What types of street trees will you plant?"
      name="default_boxes"
      required
      options={{
        oak: "English Oak",
        plane: "London Plane Tree",
        redwood: "Redwood",
        other: "Other species"
      }}
    />
  )
};
