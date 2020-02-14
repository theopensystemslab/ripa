import * as React from "react";

export const Header = ({ team, breadcrumbs = [] }) => {
  return (
    <header>
      {team} logo
      <ol>
        {breadcrumbs.map(breadcrumb => (
          <li key={breadcrumb}>{breadcrumb}</li>
        ))}
      </ol>
    </header>
  );
};

const Application = ({ children }) => {
  return (
    <div>
      <Header team="Council" />
      <section role="main">{children}</section>
      <footer>
        <a href="#">Privacy</a>
        <a href="#">Terms & conditions</a>
        <a href="#">Help</a>
      </footer>
    </div>
  );
};

export default Application;
