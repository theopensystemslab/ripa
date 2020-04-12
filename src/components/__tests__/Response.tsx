import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import Response from "../Response";

afterEach(cleanup);

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
