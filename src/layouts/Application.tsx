import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CouncilIcon from "@material-ui/icons/EcoOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

import Stepper from "../components/Stepper";

export const Header = ({ team, breadcrumbs = [] }) => {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box fontSize="h5.fontSize" px={1}>
          <CouncilIcon /> {team} logo
        </Box>
        <Box px={3} style={{ flexGrow: 1 }}>
          <Grid container alignItems="center">
            <Grid item>
              <Box fontSize="h6.fontSize">
                <Stepper
                  list={[
                    "My planning applications",
                    "Rear extension at 30 Lake Road"
                  ]}
                  active={2}
                ></Stepper>
              </Box>
            </Grid>
            <Grid item>
              <Box fontSize="subtitle1.fontSize" pl={2}>
                Saved 1m ago
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Container>
        <Box pt={8} pb={2}>
          <Stepper
            active={2}
            numbered
            list={breadcrumbs}
            Divider={ArrowForward}
          ></Stepper>
        </Box>
      </Container>
    </AppBar>
  );
};

const Application = ({ children }) => {
  return (
    <div>
      <Header team="Council" />
      <section role="main">{children}</section>
      <footer>
        <a href="#">Privacy</a>
        <a href="#">Terms &amp; conditions</a>
        <a href="#">Help</a>
      </footer>
    </div>
  );
};

export default Application;
