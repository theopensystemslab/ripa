import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";

import ResponseButton from "../ResponseButton";

afterEach(cleanup);

describe("Response Button Component", () => {
  let handleClick;
  let response;
  let responseKey;
  beforeEach(() => {
    handleClick = jest.fn();
    responseKey = "A";
    response = {
      id: "1",
      text: "inner text"
    };
  });
  it("should render snapshot when selected is true", () => {
    const { asFragment } = render(
      <ResponseButton
        key={response.id}
        handleClick={handleClick}
        selected={true}
        responseKey={responseKey}
      >
        {response.text}
      </ResponseButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render snapshot when selected is false", () => {
    const { asFragment } = render(
      <ResponseButton
        key={response.id}
        handleClick={handleClick}
        selected={false}
        responseKey={responseKey}
      >
        {response.text}
      </ResponseButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should trigger handleClick when clicked", () => {
    const { getByText } = render(
      <ResponseButton
        key={response.id}
        handleClick={handleClick}
        selected={false}
        responseKey={responseKey}
      >
        {response.text}
      </ResponseButton>
    );
    fireEvent.click(getByText("inner text"));
    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
