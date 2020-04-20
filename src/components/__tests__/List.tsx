import { render } from "@testing-library/react";
import * as React from "react";

import List from "../List";

describe("List Component", () => {
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
