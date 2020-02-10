import { getByTestId, render } from "@testing-library/react";
import React from "react";

import App from "./App";

test("renders learn react link", () => {
  const { getByTestId } = render(<App ids={[]} />);
  const flow = getByTestId(/Flow/i);
  expect(flow).toBeInTheDocument();
});
