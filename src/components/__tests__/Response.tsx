import { render } from "@testing-library/react";
import * as React from "react";

import Response from "../Response";

describe("Response Component", () => {
  it("should render snapshot when image is available", () => {
    const response = { id: "1", text: "example text", img: "img.png" };
    const { asFragment } = render(<Response response={response} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render snapshot when image is not available", () => {
    const response = { id: "2", text: "example text" };

    const { asFragment } = render(<Response response={response} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
