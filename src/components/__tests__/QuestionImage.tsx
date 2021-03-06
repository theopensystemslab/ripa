import { render } from "@testing-library/react";
import * as React from "react";

import StatementImage from "../QuestionImage";

describe("Statement Image Component", () => {
  it("should render snapshot when image is available", () => {
    const { asFragment } = render(<StatementImage src={"example.png"} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render snapshot when image is not available", () => {
    const { asFragment } = render(<StatementImage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
