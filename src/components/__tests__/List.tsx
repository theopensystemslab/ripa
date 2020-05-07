import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import List from "../List";

describe("List Component", () => {
  it("should add new row when date field is blurred", async () => {
    const {
      getByTestId,
      getAllByPlaceholderText,
      findAllByPlaceholderText
    } = render(<List />);
    const numOfRows = getAllByPlaceholderText("dd / mm / yyyy").length;
    fireEvent.focus(getByTestId("lastYear").closest("input"));
    fireEvent.blur(getByTestId("lastYear").closest("input"));
    expect(
      await (await findAllByPlaceholderText("dd / mm / yyyy")).length
    ).toEqual(numOfRows + 1);
  });
  it("should delete row when close button is clicked", async () => {
    const {
      getByTestId,
      getAllByPlaceholderText,
      findAllByPlaceholderText
    } = render(<List />);
    const numOfRows = getAllByPlaceholderText("dd / mm / yyyy").length;
    fireEvent.click(getByTestId("closebtn"));
    expect(
      await (await findAllByPlaceholderText("dd / mm / yyyy")).length
    ).toEqual(numOfRows - 1);
  });
  describe("without total bar", () => {
    it("should render snapshot", () => {
      const { asFragment } = render(<List />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("with total bar", () => {
    it("should render snapshot", () => {
      const { asFragment } = render(<List total />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
