import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import StreetAddress from "../StreetAddress";

jest.useFakeTimers();

describe("Street Address Component", () => {
  let title: string;
  let name: string;
  let type: string;
  let options: string[];
  beforeEach(() => {
    title = "test title";
    name = "test name";
    type = "text";
    options = ["building", "street", "city", "country", "postcode"];
  });
  it("should render success message when all required fields are filled", async () => {
    const { getByPlaceholderText, getByText, getByTestId, findByText } = render(
      <StreetAddress title={title} type={type} options={options} />
    );
    expect(getByText(/look up address/i).closest("button")).toHaveAttribute(
      "disabled"
    );
    fireEvent.change(getByPlaceholderText(/building/i), {
      target: { value: "102" }
    });
    fireEvent.change(getByPlaceholderText(/street/i), {
      target: { value: "123" }
    });
    fireEvent.change(getByPlaceholderText(/city/i), {
      target: { value: "london" }
    });
    fireEvent.change(getByPlaceholderText(/country/i), {
      target: { value: "england" }
    });
    fireEvent.change(getByPlaceholderText(/postcode/i), {
      target: { value: "12345" }
    });
    fireEvent.submit(getByTestId("streetAddressForm"));
    expect(getByText(/look up address/i).closest("button")).not.toHaveAttribute(
      "disabled"
    );
    expect(
      await findByText(/form submitted successfully/i)
    ).toBeInTheDocument();
    expect(setTimeout).toHaveBeenCalled();
  });
  it("should render fail message when all required fields are not filled", async () => {
    const { getByPlaceholderText, getByText, getByTestId, findByText } = render(
      <StreetAddress title={title} type={type} options={options} />
    );
    expect(getByText(/look up address/i).closest("button")).toHaveAttribute(
      "disabled"
    );
    fireEvent.change(getByPlaceholderText(/country/i), {
      target: { value: "england" }
    });
    expect(
      await findByText(/please Fill the Building, Street and Town fields/i)
    ).toBeInTheDocument();
  });
  it("should render snapshot", () => {
    const { asFragment } = render(
      <StreetAddress title={title} type={type} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
