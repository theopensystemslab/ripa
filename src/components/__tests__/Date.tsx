import { cleanup, render } from "@testing-library/react";
import * as React from "react";

import Date from "../Date";

afterEach(cleanup);

describe("Date Component", () => {
  it("should render snapshot", () => {
    const title = " test title";
    const name = "test name";
    const type = "number";
    const options = ["day", "month", "year"];
    const inputProps = {
      day: {
        min: 1,
        max: 31
      },
      month: {
        min: 1,
        max: 12
      },
      year: {
        min: 1920,
        max: 2020
      }
    };
    const { asFragment } = render(
      <Date
        title={title}
        name={name}
        type={type}
        options={options}
        inputProps={inputProps}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
