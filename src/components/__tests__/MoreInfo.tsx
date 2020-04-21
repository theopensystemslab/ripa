import { render } from "@testing-library/react";
import * as React from "react";

import MoreInfo from "../MoreInfo";

const setOpen = jest.fn();

describe("More Info Component", () => {
  it("should render snapshot", () => {
    const { asFragment } = render(
      <MoreInfo
        open={false}
        handleClose={setOpen}
        content={`## Why it matters`}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
