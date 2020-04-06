import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import ExpandableCheckboxes from "../ExpandableCheckboxes";

afterEach(cleanup);

describe("Expandable Checkboxes Component", () => {
  it("render snapshot", () => {
    const title = "Expandable Checkboxes";
    const name = "ExpandableCheckboxes";
    const panelsOptions = [
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
    ];
    const { asFragment } = render(
      <ExpandableCheckboxes
        title={title}
        name={name}
        panelsOptions={panelsOptions}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
