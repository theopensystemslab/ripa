import * as React from "react";

const Application = ({ children }) => {
  return (
    <div>
      <header>Council logo</header>
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
