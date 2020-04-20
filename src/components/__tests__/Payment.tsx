import { fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";

import Payment, { CardDetails, Receipt } from "../Payment";

describe("Payment Component", () => {
  describe("of type payment", () => {
    it("should have text in the dom", () => {
      const { getByText } = render(<Payment fee={204} />);
      expect(
        getByText(/the planning fee for this project is/i)
      ).toBeInTheDocument();
      expect(getByText(/£204/i)).toBeInTheDocument();
    });
    it("should render snapshot", () => {
      const { asFragment } = render(<Payment fee={204} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("of type Card Details", () => {
    it("should render success message when all inputs are entered successfully", async () => {
      const {
        getByPlaceholderText,
        findByPlaceholderText,
        findByText,
        getByTestId
      } = render(<CardDetails />);
      fireEvent.change(getByPlaceholderText(/card number/i), {
        target: { value: "12345678910" }
      });
      fireEvent.change(getByPlaceholderText(/month/i), {
        target: { value: "7" }
      });
      fireEvent.change(getByPlaceholderText(/year/i), {
        target: { value: "2020" }
      });
      fireEvent.change(getByPlaceholderText(/name/i), {
        target: { value: "Test user" }
      });
      fireEvent.change(getByPlaceholderText(/security code/i), {
        target: { value: "225" }
      });
      fireEvent.submit(getByTestId("cardDetailsForm"));
      expect(
        await findByText(/form submitted successfully/i)
      ).toBeInTheDocument();
    });
    it("should render snapshot", () => {
      const { asFragment } = render(<CardDetails />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("of type Receipt", () => {
    it("should have text in the dom", () => {
      const { getByText } = render(
        <Receipt
          fee={204}
          paidOn={new Date(2020, 0, 1)}
          reference={"0271911328"}
        />
      );
      expect(getByText(/Planning fee paid/i)).toBeInTheDocument();
      expect(getByText(/£204/i)).toBeInTheDocument();
      expect(getByText(/It was paid on/i)).toBeInTheDocument();
      expect(getByText("1/1/2020")).toBeInTheDocument();
    });
    it("should render snapshot", () => {
      const { asFragment } = render(
        <Receipt
          fee={204}
          paidOn={new Date(2020, 0, 1)}
          reference={"0271911328"}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
