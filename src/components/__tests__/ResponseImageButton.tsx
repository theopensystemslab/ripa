import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";

import ResponseImageButton from "../ResponseImageButton";

afterEach(cleanup);

describe("Response Button Component", () => {
  let handleClick: jest.Mock<any, any>;
  let children;
  let responseKey;
  let image;

  beforeEach(() => {
    responseKey = "A";
    handleClick = jest.fn();
    image = "img.png";
    children = "Inner text";
  });
  it("should render snapshot when selected is true", () => {
    const { asFragment } = render(
      <ResponseImageButton
        image={image}
        responseKey={responseKey}
        handleClick={handleClick}
        selected={true}
      >
        {children}
      </ResponseImageButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render snapshot when selected is false", () => {
    const { asFragment } = render(
      <ResponseImageButton
        image={image}
        responseKey={responseKey}
        handleClick={handleClick}
        selected={false}
      >
        {children}
      </ResponseImageButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should trigger handleClick when clicked", async () => {
    const { getByText } = render(
      <ResponseImageButton
        image={image}
        responseKey={responseKey}
        handleClick={handleClick}
        selected={false}
      >
        {children}
      </ResponseImageButton>
    );
    fireEvent.click(getByText(/inner text/i));
    expect(handleClick).toHaveBeenCalled();
  });
});
