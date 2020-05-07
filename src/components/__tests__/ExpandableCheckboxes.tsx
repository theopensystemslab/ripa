import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import ExpandableCheckboxes from "../ExpandableCheckboxes";

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
  it("should render success message when submitted and component is not required", async () => {
    const { getByLabelText, findByText, getByTestId } = render(
      <ExpandableCheckboxes
        title={title}
        name={name}
        includeSubmit={true}
        panelsOptions={panelsOptions}
      />
    );
    fireEvent.click(getByLabelText("Response A1"));
    fireEvent.click(getByLabelText("Response B2"));
    fireEvent.click(getByLabelText("Response C2"));
    fireEvent.click(getByLabelText("Response A1"));
    fireEvent.submit(getByTestId("expandableForm"));
    expect(await findByText(/form submitted successfully/i)).toBeInTheDocument;
  });
  it("should render error message when submitted and component is required", async () => {
    const { getByLabelText, findByText, getByText, getByTestId } = render(
      <ExpandableCheckboxes
        title={title}
        name={name}
        required
        includeSubmit={true}
        panelsOptions={panelsOptions}
      />
    );
    expect(getByText(/save and continue/i).closest("button")).toHaveAttribute(
      "disabled"
    );
    fireEvent.click(getByLabelText("Response A1"));
    fireEvent.click(getByLabelText("Response B1"));
    fireEvent.click(getByLabelText("Response C1"));
    expect(
      getByText(/save and continue/i).closest("button")
    ).not.toHaveAttribute("disabled");
    fireEvent.submit(getByTestId("expandableForm"));
    expect(
      await findByText(/form submitted successfully/i)
    ).toBeInTheDocument();
  });
  it("should render snapshot", () => {
    const { asFragment } = render(
      <ExpandableCheckboxes
        title={title}
        includeSubmit={true}
        name={name}
        panelsOptions={panelsOptions}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
