import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import Checkboxes from "../Checkboxes";

afterEach(cleanup);

/* TO DO 
  1 - Add test for the success scenario when form submits and there is a success message
  2- Add test for the fail scenario when the form doesn't submit and thee is an error message
*/

describe("Checkboxes Component", () => {
  it("should render items correctly", async () => {
    const title = "test title";
    const name = "test name";
    const options = {};
    const { findByText } = render(
      <Checkboxes title={title} options={options} name={name} />
    );
    expect(await findByText(/test title/i)).toBeInTheDocument();
  });

  it("should render snapshot", () => {
    const title = "test title";
    const name = "test name";
    const options = {
      oak: "option 1",
      plane: "option 2",
      redwood: "option 3",
      other: "option 4"
    };
    const { asFragment } = render(
      <Checkboxes title={title} options={options} name={name} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
