import { cleanup, fireEvent, render, wait } from "@testing-library/react";
import * as React from "react";

import ApplicationCard from "../ApplicationCard";

afterEach(cleanup);

describe("Application Card Component", () => {
  let thumbnail: string;
  let updatedAt: number;
  let description: string;
  let status: string;
  let listView: boolean;
  beforeAll(() => {
    thumbnail = "pic.png";
    description = "description";
    updatedAt = 7;
    status = "Submitted";
  });
  describe("of type list view", () => {
    it("should render snapshot", () => {
      listView = true;
      const { asFragment } = render(
        <ApplicationCard
          thumbnail={thumbnail}
          description={description}
          updatedAt={updatedAt}
          status={status}
          listView={listView}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should open a menu when clicked", async () => {
      listView = true;
      const { getByTestId, findByText } = render(
        <ApplicationCard
          thumbnail={thumbnail}
          description={description}
          updatedAt={updatedAt}
          status={status}
          listView={listView}
        />
      );
      fireEvent.click(getByTestId("moreButtonList"));
      expect(await findByText(/restore/i)).toBeInTheDocument();
      expect(await findByText(/delete/i)).toBeInTheDocument();
    });
  });
  describe("of type standard view", () => {
    it("should render snapshot", () => {
      const { asFragment } = render(
        <ApplicationCard
          thumbnail={thumbnail}
          description={description}
          updatedAt={updatedAt}
          status={status}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("should open a menu when clicked", async () => {
      const { getByTestId, findByText } = render(
        <ApplicationCard
          thumbnail={thumbnail}
          description={description}
          updatedAt={updatedAt}
          status={status}
        />
      );
      fireEvent.click(getByTestId("moreButtonStandard"));
      expect(await findByText(/delete/i)).toBeInTheDocument();
      expect(await findByText(/archive/i)).toBeInTheDocument();
    });
  });
});
