import { render } from "@testing-library/react";
import * as React from "react";

import StyledCheckbox from "../Checkbox";

describe("Styled Checkbox Component", () => {
  it("should render snapshot", async () => {
    const { asFragment } = render(<StyledCheckbox />);
    expect(asFragment()).toMatchSnapshot();
  });
});
