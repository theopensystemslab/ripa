import { render } from "@testing-library/react";
import * as React from "react";

import Breadcrumbs from "../Breadcrumbs";

describe("Breadcrumbs Component", () => {
  it("should render items correctly", () => {
    const list = [
      "Property location",
      "About the works",
      "Application",
      "Declaration",
      "Pay fee"
    ];
    const active = 2;
    const { getByText } = render(<Breadcrumbs active={active} list={list} />);
    expect(getByText(/property location/i)).toBeInTheDocument();
  });

  it("render snapshot", () => {
    const { asFragment } = render(<Breadcrumbs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
