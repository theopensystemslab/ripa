import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import HVCenterContainer from "../HVCenterContainer";

afterEach(cleanup);

describe("HVCenterContainer Component", () => {
  it("should render snapshot", () => {
    const children = "This should be rendered inside";
    const { asFragment } = render(
      <HVCenterContainer verticalCenter={true} light={true}>
        {children}
      </HVCenterContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
