import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import Date from "../Date";

describe("Date Component", () => {
  let title: string;
  let name: string;
  let type: string;
  let options: string[];
  let inputProps: {
    day: { min: number; max: number };
    month: { min: number; max: number };
    year: { min: number; max: number };
  };
  beforeEach(() => {
    title = " test title";
    name = "test name";
    type = "number";
    options = ["day", "month", "year"];
    inputProps = {
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
  });
  it("should render snapshot", () => {
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
  it("should not accept text", () => {
    const { getByLabelText } = render(
      <Date
        title={title}
        name={name}
        type={type}
        options={options}
        inputProps={inputProps}
      />
    );
    fireEvent.change(getByLabelText(/day/i), {
      target: { value: "test text" }
    });
    expect(getByLabelText(/day/i)).not.toHaveValue("test text");
    fireEvent.change(getByLabelText(/month/i), {
      target: { value: "test text" }
    });
    expect(getByLabelText(/month/i)).not.toHaveValue("test text");
    fireEvent.change(getByLabelText(/year/i), {
      target: { value: "test text" }
    });
    expect(getByLabelText(/year/i)).not.toHaveValue("test text");
  });
});
