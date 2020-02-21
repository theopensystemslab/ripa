import { makeStyles, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: "#C5C5C5",
    borderRadius: 20,
    marginBottom: 40
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#000000"
  }
})(LinearProgress);

const useStyles = makeStyles({
  listItem: {
    borderBottom: "1px solid #ccc",
    "&:first-child": {
      borderTop: "1px solid #ccc"
    }
  },
  status: { color: "#ccc" },
  complete: {
    color: "limegreen"
  },
  inProgress: {
    color: "#888"
  }
});

const MyApplication = ({ sections, percentageComplete = 100 }) => {
  const classes = useStyles();
  return (
    <HVCenterContainer light>
      <Typography variant="h3" component="h1" gutterBottom>
        <strong>My application</strong>
      </Typography>
      <Box fontSize="h6.fontSize" mb={3}>
        Please complete all sections
      </Box>
      <Box mb={1} fontSize="subtitle1.fontSize">
        {percentageComplete}% complete
      </Box>
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={percentageComplete}
      />
      <Box p={0}>
        {Object.entries(sections).map(([name, status]) => (
          <Box
            className={classes.listItem}
            key={name}
            fontSize="h6.fontSize"
            py={1.5}
          >
            <Grid container justify="space-between">
              <Grid item>{name}</Grid>
              <Grid
                item
                className={classNames(
                  classes.status,
                  status === "Complete" && classes.complete,
                  status === "In progress" && classes.inProgress
                )}
              >
                {status}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </HVCenterContainer>
  );
};

export default MyApplication;
