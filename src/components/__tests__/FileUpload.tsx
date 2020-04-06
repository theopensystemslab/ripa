import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import FileUpload from "../FileUpload";

afterEach(cleanup);

describe("File Upload Component", () => {
  it("should render snapshot", () => {
    const maxSize = 40000;
    const accept = ["image/*"];
    const title = "File upload";
    const { asFragment } = render(
      <FileUpload maxSize={maxSize} accept={accept} title={title} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
