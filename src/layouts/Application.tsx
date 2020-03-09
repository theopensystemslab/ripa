import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CouncilLogo from "@material-ui/icons/EcoOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

import Stepper from "../components/Stepper";
import { useStore } from "../lib/store";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
    // paddingTop: "164px"
  },
  header: {
    padding: 20,
    "& a": {
      textDecoration: "none"
    }
  },
  main: {
    flex: 1,
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column"
    // marginTop: -100
  },
  footer: {
    padding: "0 20px 10px",
    "& a": {
      textDecoration: "none",
      padding: "0 20px 0 0"
    }
  },
  breadcrumbs: {
    "& > li": {
      display: "inline-block",
      marginRight: 20
    }
  }
}));

export const Header = ({
  team,
  currentUser = false,
  address = "",
  breadcrumbs = []
}) => {
  const nav = ["My planning applications", address];
  const active = useStore(state => state.data.activeStep + 1) || 1;

  return (
    <AppBar elevation={0} color="secondary" position="static">
      <Toolbar>
        <Box fontSize="h5.fontSize" display="flex" alignItems="center" px={1}>
          <CouncilLogo /> {team}
        </Box>
        {currentUser && (
          <>
            <Box px={3} style={{ flexGrow: 1 }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box fontSize="h6.fontSize">
                    <Stepper list={nav.filter(Boolean)} active={nav.length} />
                  </Box>
                </Grid>
                {/* <Grid item>
              <Box fontSize="subtitle1.fontSize" pl={2}>
                Saved 1m ago
              </Box>
            </Grid> */}
              </Grid>
            </Box>
            <Box>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <a href="/logout">Logout</a>
            </Box>
          </>
        )}
      </Toolbar>
      <Container maxWidth="md">
        <Box pt={8} pb={2}>
          <Stepper
            active={active}
            numbered
            list={breadcrumbs}
            Divider={ArrowForward}
          />
        </Box>
      </Container>
    </AppBar>
  );
};

const Application = ({
  children,
  currentUser = false,
  address = undefined
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header
        team="Hampton"
        currentUser={currentUser}
        address={address}
        breadcrumbs={
          address
            ? [
                "Property location",
                "About the works",
                "My application",
                "Declaration",
                "Pay & submit"
              ]
            : undefined
        }
      />
      <section role="main" className={classes.main}>
        {children}
      </section>
      <footer className={classes.footer}>
        <a href="#">Privacy</a>
        <a href="#">Terms &amp; conditions</a>
        <a href="#">Help</a>
      </footer>
    </div>
  );
};

export default Application;
