import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import Text from "../Text";

afterEach(cleanup);

describe("Text Component", () => {
  it("should render snapshot", () => {
    const title = " test title";
    const name = "test name";
    const type = "text";
    const { asFragment } = render(
      <Text title={title} name={name} type={type} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
