import { render } from "@testing-library/react";
import * as React from "react";

import FocusHandler from "../FocusHandler";

describe("Focus Handler Component", () => {
  const children = "content goes here";
  it("should render snapshot", () => {
    const { asFragment } = render(<FocusHandler>{children}</FocusHandler>);
    expect(asFragment()).toMatchSnapshot();
  });
});
