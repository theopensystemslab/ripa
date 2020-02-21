import { makeStyles } from "@material-ui/core";
import { formatDistance } from "date-fns";
import * as React from "react";
import { Folder, Trash } from "react-feather";

import HVCenterContainer from "../components/HVCenterContainer";

const useStyles = makeStyles({
  applications: {},
  application: {
    display: "inline-block",
    border: "1px solid black",
    margin: 20,
    "& > img": {
      height: 100
    },
    "& > span": {
      display: "block",
      padding: "5px 10px"
    }
  }
});

const Dashboard = ({ applications = [] }) => {
  const classes = useStyles();
  return (
    <HVCenterContainer>
      <h1>My planning applications</h1>
      <div className={classes.applications}>
        {applications.map(application => (
          <div key={application.id} className={classes.application}>
            <img src={application.thumbnail} />
            <span>{application.description}</span>
            <span>
              Last edited {formatDistance(application.updatedAt, new Date())}{" "}
              ago
            </span>
            <span>{application.status}</span>
          </div>
        ))}
        <div className={classes.application}>Start a new application</div>
      </div>
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
