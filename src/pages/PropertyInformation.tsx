import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const useStyles = makeStyles({
  propertyInfo: {
    padding: 0,
    "& li": {
      listStyle: "none",
      borderBottom: "1px solid #000"
    }
  },
  list: {
    listStyle: "none"
  },
  link: {
    color: "currentColor"
  }
});

const PropertyInformation = ({
  streetAddress,
  information = {},
  constraints = [],
  map = "https://i.imgur.com/S16hH4J.png",
  handleContinue = undefined
}) => {
  const classes = useStyles();
  return (
    <HVCenterContainer light>
      <Box pb={3}>
        <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              <strong>{streetAddress}</strong>
            </Typography>
            {information && Object.keys(information).length > 0 && (
              <>
                <Box fontSize="h6.fontSize">
                  This is the information we have about this property
                </Box>
                <Box
                  component="ul"
                  fontSize="h6.fontSize"
                  className={classes.propertyInfo}
                >
                  {Object.entries(information).map(([key, value]) => (
                    <Box
                      component="li"
                      fontSize="subtitle1.fontSize"
                      py={1}
                      key={key}
                    >
                      <strong>{key}</strong> {value}
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={map} width="100%" alt="Property Location Map" />
            <Box fontSize="subtitle1.fontSize" pt={1} color="#c00">
              <a href="#" className={classes.link}>
                Redraw the site boundary
              </a>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {constraints && Array.isArray(constraints) && constraints.length > 0 && (
        <Box pb={3}>
          <Box fontSize="h6.fontSize">
            These are constraints that apply to this property
          </Box>
          <Box component="ul" p={0}>
            {constraints.map(constraint => (
              <Box
                component="li"
                className={classes.list}
                p={2}
                mb={0.25}
                bgcolor="#f7f7f7"
                fontSize="subtitle1.fontSize"
                key={constraint}
              >
                {constraint}
              </Box>
            ))}
          </Box>
          <Box fontSize="subtitle1.fontSize" color="#aaa">
            <a href="#" className={classes.link}>
              Report an inaccuracy
            </a>
          </Box>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </HVCenterContainer>
  );
};

export default PropertyInformation;
