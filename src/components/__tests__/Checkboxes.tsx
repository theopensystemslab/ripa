import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import Checkboxes from "../Checkboxes";

describe("Checkboxes Component", () => {
  let title: string;
  let name: string;
  let options: object;
  beforeEach(() => {
    title = "test title";
    name = "test name";
    options = {
      oak: "option 1",
      plane: "option 2",
      redwood: "option 3",
      other: "option 4"
    };
  });
  it("should render items correctly", () => {
    const { getByText } = render(
      <Checkboxes title={title} options={options} name={name} />
    );
    expect(getByText(/test title/i)).toBeInTheDocument();
  });

  it("should render snapshot", () => {
    const { asFragment } = render(
      <Checkboxes title={title} options={options} name={name} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render success message when selected and enable the submit button", async () => {
    const { getByTestId, getByLabelText, findByText, getByText } = render(
      <Checkboxes
        title={title}
        includeSubmit={true}
        options={options}
        name={name}
      />
    );
    expect(getByText(/save and continue/i).closest("button")).toHaveAttribute(
      "disabled"
    );
    fireEvent.click(getByLabelText(/option 2/i));
    expect(
      getByText(/save and continue/i).closest("button")
    ).not.toHaveAttribute("disabled");
    fireEvent.submit(getByTestId("checkboxesComponent"));
    expect(
      await findByText(/form submitted successfully/i)
    ).toBeInTheDocument();
  });
  it("should render fail message when nothing is selected and disable the submit button", async () => {
    const { getByLabelText, findByText, getByText } = render(
      <Checkboxes
        title={title}
        includeSubmit={true}
        options={options}
        name={name}
      />
    );
    fireEvent.click(getByLabelText(/option 2/i));
    fireEvent.click(getByLabelText(/option 2/i));
    expect(getByText(/save and continue/i).closest("button")).toHaveAttribute(
      "disabled"
    );
    expect(
      await findByText(/please choose at least one option/i)
    ).toBeInTheDocument();
  });
});
