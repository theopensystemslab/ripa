import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import marked from "marked";
import * as React from "react";

import MoreInfo from "../MoreInfo";

afterEach(cleanup);
jest.mock("marked");

describe("MoreInfo Component", () => {
  it("should render snapshot", () => {
    // console.log(jest.mock("marked"));
    // const { findByText } = render(
    //   <MoreInfo open={true} handleClose content="##content title" />
    // );
    // expect(findByText("content title")).toBeInTheDocument();
  });
});
