import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import SelectQuestion from "../InlineSelect";

afterEach(cleanup);

describe("Select Question Component", () => {
  it("should render snapshot", () => {
    const { asFragment } = render(<SelectQuestion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
