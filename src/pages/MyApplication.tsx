import { withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as React from "react";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: "#C5C5C5"
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#000000"
  }
})(LinearProgress);

const MyApplication = ({ sections, percentageComplete = 100 }) => {
  return (
    <>
      <h1>My application</h1>
      <p>Please complete all sections</p>
      <p>{percentageComplete}% complete</p>
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={percentageComplete}
      />
      <ul>
        {Object.entries(sections).map(([name, status]) => (
          <li key={name}>
            {name} {status}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyApplication;
