import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-navi";

import HVCenterContainer from "../components/HVCenterContainer";
import { useStore } from "../lib/store";

const useStyles = makeStyles({
  backLink: {
    color: "#999"
  }
});

const Section = ({ id }) => {
  const flow = useStore(state => state.flow);
  const classes = useStyles();

  return (
    <HVCenterContainer light>
      <Link href="/start" className={classes.backLink}>
        ← back
      </Link>
      <Typography variant="h3" component="h1" gutterBottom>
        <strong>{flow.nodes[id].text}</strong>
      </Typography>
    </HVCenterContainer>
  );
};

export default Section;
