import { render } from "@testing-library/react";
import * as React from "react";

import Loading from "../Loading";

describe("Loading Component", () => {
  it("should have loading text in document", async () => {
    const { findByText } = render(<Loading />);
    expect(await findByText(/loading.../i)).toBeInTheDocument();
  });
  it("should render snapshot", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
