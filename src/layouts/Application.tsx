import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CouncilIcon from "@material-ui/icons/EcoOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

export const Header = ({ team, breadcrumbs = [] }) => {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Typography variant="h5" component="h1" style={{ flexGrow: 1 }}>
          <CouncilIcon /> {team} logo
        </Typography>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <ol>
        {breadcrumbs.map(breadcrumb => (
          <li key={breadcrumb}>{breadcrumb}</li>
        ))}
      </ol>
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
