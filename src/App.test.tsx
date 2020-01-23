import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App ids={[]} />);
  const postcode = getByText(/My postcode is/i);
  expect(postcode).toBeInTheDocument();
});
