import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

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

const PropertyInformation = ({ streetAddress, information, constraints }) => {
  const classes = useStyles();
  return (
    <Box py={3} bgcolor="background.paper">
      <Container maxWidth="md">
        <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              <strong>{streetAddress}</strong>
            </Typography>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src="https://i.imgur.com/S16hH4J.png" width="100%" />
            <Box fontSize="subtitle1.fontSize" pt={1} color="#c00">
              <a href="#" className={classes.link}>
                Redraw the site boundary
              </a>
            </Box>
          </Grid>
        </Grid>
        <Box py={3}>
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
      </Container>
    </Box>
  );
};

export default PropertyInformation;
