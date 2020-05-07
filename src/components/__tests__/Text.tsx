import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import Text from "../Text";

describe("Text Component", () => {
  let title: string;
  let name: string;
  let type: string;
  let placeholder: string;
  let multiline: boolean;
  let maxWords: number;
  let label: string;
  // let unit: string;

  beforeEach(() => {
    title = "test title";
    name = "test name";
  });
  describe("of type short text", () => {
    beforeEach(() => {
      placeholder = "short text input placeholder";
      type = "text";
      label = "short text input label";
    });
    it("should render snapshot", () => {
      const { asFragment } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          name={name}
          type={type}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should have the right label and placeholder text", async () => {
      const { findByPlaceholderText, findByLabelText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          name={name}
          type={type}
        />
      );
      expect(await findByPlaceholderText(placeholder)).toBeInTheDocument();
      expect(await findByLabelText(label)).toBeInTheDocument();
    });
    it("should have a value if an text is entered", async () => {
      const value = "Lorem ipsum dolor sit amet, consectetur adipiscing";
      const { findByPlaceholderText, getByPlaceholderText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          name={name}
          type={type}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value }
      });
      expect(await findByPlaceholderText(placeholder)).toHaveValue(value);
    });
  });
  describe("Of type long text", () => {
    beforeEach(() => {
      type = "text";
      maxWords = 10;
      placeholder = "long text input placeholder";
      multiline = true;
      label = "long text input label";
    });
    it("should render snapshot", () => {
      const { asFragment } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should have the right label and placeholder text", async () => {
      const { findByPlaceholderText, findByLabelText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
        />
      );
      expect(await findByPlaceholderText(placeholder)).toBeInTheDocument();
      expect(await findByLabelText(label)).toBeInTheDocument();
    });
    it("should have a value if an text is entered", async () => {
      const value =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      const { findByPlaceholderText, getByPlaceholderText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value }
      });
      expect(await findByPlaceholderText(placeholder)).toHaveValue(value);
    });
    it("should render number of words remaining", async () => {
      const value =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      const { findByText, getByPlaceholderText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value }
      });
      expect(await findByText(/0 words Remaining/i)).toBeInTheDocument();
    });
    it("should render FAIL message when submit is enabled and no of words is OUT OF range", async () => {
      const value =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      const { findByText, getByTestId, getByPlaceholderText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
          includeSubmit={true}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value }
      });
      fireEvent.submit(getByTestId("textForm"));

      expect(
        await findByText(/you exceeded the max number of words allowed!/i)
      ).toBeInTheDocument();
    });
    it("should render success message when submit is enabled and no of words is within range", async () => {
      const value = "Lorem ipsum dolor sit amet";
      const { findByText, getByTestId, getByPlaceholderText } = render(
        <Text
          title={title}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          maxWords={maxWords}
          name={name}
          type={type}
          includeSubmit={true}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value }
      });
      fireEvent.submit(getByTestId("textForm"));
      expect(
        await findByText(/form submitted successfully/i)
      ).toBeInTheDocument();
    });
  });
  describe("of type Email", () => {
    beforeEach(() => {
      type = "email";
      label = "Email text input label";
      placeholder = "Email text input placeholder";
    });
    it("should render snapshot", () => {
      const { asFragment } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should have the right label and placeholder text", async () => {
      const { findByPlaceholderText, findByLabelText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      expect(await findByPlaceholderText(placeholder)).toBeInTheDocument();
      expect(await findByLabelText(label)).toBeInTheDocument();
    });
    it("should have a value if an email is entered", async () => {
      const { findByPlaceholderText, getByPlaceholderText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value: "test@test.com" }
      });
      expect(await findByPlaceholderText(placeholder)).toHaveValue(
        "test@test.com"
      );
    });
  });
  describe("of type Number", () => {
    beforeEach(() => {
      type = "number";
      label = "number input label";
      placeholder = "number input placeholder";
    });
    it("should render snapshot", () => {
      const { asFragment } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should have the right label and placeholder text", async () => {
      const { findByPlaceholderText, findByLabelText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      expect(await findByPlaceholderText(placeholder)).toBeInTheDocument();
      expect(await findByLabelText(label)).toBeInTheDocument();
    });
    it("should render the unit when specified", async () => {
      const unit = "meters";
      const { findByText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          unit={unit}
          label={label}
        />
      );
      expect(await findByText("meters")).toBeInTheDocument();
    });
    it("should not have any value if text is entered", async () => {
      const { findByPlaceholderText, getByPlaceholderText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value: "Test text" }
      });
      expect(await findByPlaceholderText(placeholder)).toHaveValue(null);
    });
    it("should have a value if a number is entered", async () => {
      const { findByPlaceholderText, debug, getByPlaceholderText } = render(
        <Text
          title={title}
          placeholder={placeholder}
          name={name}
          type={type}
          label={label}
        />
      );
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value: 123 }
      });
      expect(await findByPlaceholderText(placeholder)).toHaveValue(123);
    });
  });
});
