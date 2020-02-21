import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

import logo from "./logo.png";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    padding: 20
  },
  main: {
    flex: 1,
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column"
    // marginTop: -100
  },
  footer: {
    padding: 20,
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
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <div>
        <img src={logo} height={16} />
        {team}
      </div>
      {address && <div>My planning applications / {address}</div>}
      {currentUser && <a href="/logout">Logout</a>}
      <ol className={classes.breadcrumbs}>
        {breadcrumbs.map(breadcrumb => (
          <li key={breadcrumb}>{breadcrumb}</li>
        ))}
      </ol>
    </header>
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
        breadcrumbs={[
          "Property location",
          "About the works",
          "My application",
          "Declaration",
          "Pay & submit"
        ]}
      />
      <section role="main" className={classes.main}>
        {children}
      </section>
      <footer className={classes.footer}>
        <a href="#">Privacy</a>
        <a href="#">Terms & conditions</a>
        <a href="#">Help</a>
      </footer>
    </div>
  );
};

export default Application;
