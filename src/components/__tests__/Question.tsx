import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import Question from "../Question";

afterEach(cleanup);

describe("Question Component", () => {
  it("render snapshot", () => {
    const children = "This is a question";
    const { asFragment } = render(<Question>{children}</Question>);
    expect(asFragment()).toMatchSnapshot();
  });
});
