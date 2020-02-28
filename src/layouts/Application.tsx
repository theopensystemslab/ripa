import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CouncilLogo from "@material-ui/icons/EcoOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { Clipboard, LogOut } from "react-feather";

import Stepper from "../components/Stepper";
import { useStore } from "../lib/store";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
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
  menu: {
    minWidth: "10rem"
  },
  footer: {
    padding: theme.spacing(2, 3),
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
  const nav = [{ text: "My planning applications", link: "/" }, address];
  const active = useStore(state => state.data.activeStep + 1) || 1;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <AppBar elevation={0} color="primary" position="static">
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
              <IconButton
                color="inherit"
                aria-controls="nav-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
              >
                <MenuItem
                  className={classes.menu}
                  component="a"
                  href="/"
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Clipboard />
                  </ListItemIcon>
                  <ListItemText primary="My applications" />
                </MenuItem>
                <MenuItem
                  className={classes.menu}
                  component="a"
                  href="/logout"
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <LogOut />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
      <Container maxWidth="md">
        <Box fontSize="body1.fontSize" pt={8} pb={2}>
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
