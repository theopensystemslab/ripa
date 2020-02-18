import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const PropertyInformation = ({ streetAddress, information, constraints }) => {
  return (
    <Box py={3} bgcolor="background.paper">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img src="https://i.imgur.com/S16hH4J.png" width="100%" />
            <a href="#">Redraw the site boundary</a>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" component="h2">
              <strong>{streetAddress}</strong>
            </Typography>
            <Typography variant="subtitle2">
              This is information we have about this property
            </Typography>
            <ul>
              {Object.entries(information).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong> {value}
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">
          These are constraints that apply to this property
        </Typography>
        <ul>
          {constraints.map(constraint => (
            <li key={constraint}>{constraint}</li>
          ))}
        </ul>
        <a href="#">Report an inaccuracy</a>
      </Container>
    </Box>
  );
};

export default PropertyInformation;
