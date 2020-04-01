import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import Breadcrumbs from "../Breadcrumbs";

afterEach(cleanup);

it("renders items correctly", async () => {
  const list = [
    "Property location",
    "About the works",
    "Application",
    "Declaration",
    "Pay fee"
  ];
  const active = 2;
  const { getByText } = await render(
    <Breadcrumbs active={active} list={list} />
  );
  expect(getByText("Property location")).toBeInTheDocument();
});

it("renders snapshot", () => {
  const { asFragment } = render(<Breadcrumbs />);
  expect(asFragment()).toMatchSnapshot();
});
