import { makeStyles, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  MoreHorizontal
} from "react-feather";
import { Link } from "react-navi";

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

const useStyles = makeStyles(theme => ({
  listItem: {
    borderBottom: "1px solid #ccc",
    "&:first-child": {
      borderTop: "1px solid #ccc"
    }
  },
  status: {
    color: theme.palette.grey[400],
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  statusText: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-block"
    },
    "&:not(:last-child)": {
      marginRight: theme.spacing(2)
    }
  },
  notStarted: {},
  complete: {
    color: theme.palette.primary.light
  },
  incomplete: {
    color: theme.palette.grey[400]
  },
  issue: {
    color: theme.palette.error.main
  },
  link: {
    textDecoration: "none",
    color: "#000",
    display: "block",
    "&:hover .sectionTitle": {
      textDecoration: "underline"
    }
  }
}));

export const STATUS = [
  {
    className: "notStarted",
    text: "Not started"
  },
  {
    className: "incomplete",
    text: "Incomplete"
  },
  {
    className: "complete",
    text: "Complete"
  },
  {
    className: "issue",
    text: "Issue"
  }
];

const MyApplication = ({ sections = [] }) => {
  const classes = useStyles();

  const percentageComplete = Math.round(
    (sections.filter(s => s.status === 2).length / sections.length) * 100
  );

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
        {sections.map(({ id, text, status }) => (
          <Box
            className={classes.listItem}
            key={text}
            fontSize="h6.fontSize"
            py={1.5}
          >
            <Link
              href={`/start/${id}`}
              prefetch={false}
              className={classes.link}
            >
              <Grid container justify="space-between">
                <Grid item className="sectionTitle">
                  {text}
                </Grid>
                <Grid
                  item
                  className={classNames(
                    classes.status,
                    classes[STATUS[status].className]
                  )}
                >
                  <span className={classes.statusText}>
                    {STATUS[status].text}
                  </span>
                  {status === 0 && <ArrowRight></ArrowRight>}
                  {status === 1 && <MoreHorizontal></MoreHorizontal>}
                  {status === 2 && <Check></Check>}
                  {status === 3 && <AlertTriangle></AlertTriangle>}
                </Grid>
              </Grid>
            </Link>
          </Box>
        ))}
      </Box>
    </HVCenterContainer>
  );
};

export default MyApplication;
