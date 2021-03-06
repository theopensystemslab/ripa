import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import Stepper from "../Stepper";

describe("Stepper Component", () => {
  let active: number;
  let list: string[];
  let numbered: boolean;
  beforeAll(() => {
    active = 1;
    list = [
      "Property location",
      "About the works",
      "Application",
      "Declaration",
      "Pay fee"
    ];
    numbered = true;
  });
  it("should render snapshot", () => {
    const { asFragment } = render(
      <Stepper active={active} list={list} numbered={numbered} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render the menu when the arrow is clicked", async () => {
    const { getByTestId, findByText } = render(
      <Stepper active={active} list={list} numbered={numbered} />
    );
    fireEvent.click(getByTestId("stepperButton"));
    expect(await findByText(/pay fee/i)).toBeInTheDocument();
  });
});
