import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const ApplicationComplete = ({ reference }) => {
  return (
    <HVCenterContainer light>
      <Box
        bgcolor="success.main"
        textAlign="center"
        color="#fff"
        py={5}
        px={3}
        mb={4}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          <strong>Application complete</strong>
        </Typography>
        <Typography variant="subtitle2">Reference number</Typography>
        <Typography variant="subtitle1">{reference}</Typography>
      </Box>
      <Typography component="h2" variant="h4" gutterBottom>
        <strong>What happens next?</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Your application will be checked. If there are any issues, or further
        information is required, a case officer will contact you.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Once the application has been checked, a planning officer will contact
        you to arrange a site visit.{" "}
        <a href="#">Find out more about the planning process</a>
      </Typography>
    </HVCenterContainer>
  );
};

export default ApplicationComplete;
