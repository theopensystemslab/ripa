import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import FileUpload from "../FileUpload";

const createFile = (name, size, type) => {
  const file = new File([], name, { type });
  Reflect.defineProperty(file, "size", {
    get() {
      return size;
    }
  });
  return file;
};
describe("File Upload Component", () => {
  let maxSize: number;
  let accept: string[];
  let title: string;
  beforeEach(() => {
    maxSize = 40000;
    accept = ["image/*"];
    title = "File upload";
  });
  it("should upload a file when the size is in range", async () => {
    const files = [createFile("bar.jpg", 200, "image/jpeg")];
    const { debug, findByText, getByTestId } = render(
      <FileUpload maxSize={maxSize} accept={accept} title={title} />
    );
    fireEvent.change(getByTestId("fileupload"), {
      target: { files }
    });
    expect(await findByText("bar.jpg")).toBeInTheDocument();
  });
  it("should not upload a file when the size is out of range", async () => {
    const files = [createFile("bar2.jpg", 2000000000, "image/jpeg")];
    const { debug, findByText, getByTestId } = render(
      <FileUpload maxSize={maxSize} accept={accept} title={title} />
    );
    fireEvent.change(getByTestId("fileupload"), {
      target: { files }
    });
    expect(
      await findByText(/please choose a file with max size 40000 Bytes/i)
    ).toBeInTheDocument();
  });
  it("should render snapshot", () => {
    const { asFragment } = render(
      <FileUpload maxSize={maxSize} accept={accept} title={title} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
