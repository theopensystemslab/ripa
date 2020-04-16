import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";

import ExpandableCheckboxes from "../ExpandableCheckboxes";

afterEach(cleanup);

describe("Expandable Checkboxes Component", () => {
  let title: string;
  let name: string;
  let panelsOptions: { sectionTitle: string; values: string[] }[];
  beforeEach(() => {
    title = "Expandable Checkboxes";
    name = "ExpandableCheckboxes";
    panelsOptions = [
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
  });
  it("should render success message when submitted ", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ExpandableCheckboxes
        title={title}
        name={name}
        panelsOptions={panelsOptions}
      />
    );
    fireEvent.click(getByLabelText("Response A1"));
    fireEvent.submit(getByTestId("expandableForm"));
    expect(await findByText(/form submitted successfully/i)).toBeInTheDocument;
  });
  it("should render snapshot", () => {
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
