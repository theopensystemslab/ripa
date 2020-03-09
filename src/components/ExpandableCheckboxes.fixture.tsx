import * as React from "react";

import ExpandableCheckboxes from "./ExpandableCheckboxes";

export default {
  default: (
    <ExpandableCheckboxes
      title="Expandable Checkboxes"
      name="ExpandableCheckboxes"
      panelsOptions={[
        {
          sectionTitle: "section A",
          values: ["Response A1", "Response A2", "Response A3"]
        },
        {
          sectionTitle: "section B",
          values: ["Response B1", "Response B2", "Response B3"]
        },
        {
          sectionTitle: "section C",
          values: ["Response C1", "Response C2", "Response C3"]
        }
      ]}
    />
  )
};
