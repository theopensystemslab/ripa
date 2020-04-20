import { render } from "@testing-library/react";
import * as React from "react";

import TextQuestion from "../InlineText";

describe("Text Question Component", () => {
  it("should render snapshot", () => {
    const { asFragment } = render(<TextQuestion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
