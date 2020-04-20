import { render } from "@testing-library/react";
import * as React from "react";

import SelectQuestion from "../InlineSelect";

describe("Select Question Component", () => {
  it("should render snapshot", () => {
    const { asFragment } = render(<SelectQuestion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
