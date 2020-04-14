import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import StreetAddress from "../StreetAddress";

afterEach(cleanup);

describe("Street Address Component", () => {
  it("should render snapshot", () => {
    const title = " test title";
    const name = "test name";
    const type = "text";
    const options = ["building", "street", "city", "county", "postcode"];
    const { asFragment } = render(
      <StreetAddress title={title} name={name} type={type} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
