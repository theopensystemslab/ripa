import * as React from "react";
import { Folder, Trash } from "react-feather";

import HVCenterContainer from "../components/HVCenterContainer";

const Dashboard = ({ applications = [] }) => {
  return (
    <HVCenterContainer>
      <h1>My planning applications</h1>
      <hr />
      <ul>
        <li>
          <Folder /> Archive
        </li>
        <li>
          <Trash /> Deleted
        </li>
      </ul>
    </HVCenterContainer>
  );
};

export default Dashboard;
