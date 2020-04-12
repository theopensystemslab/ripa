import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import TextQuestion from "../InlineText";

afterEach(cleanup);

describe("Text Question Component", () => {
  it("should render snapshot", () => {
    const { asFragment } = render(<TextQuestion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
