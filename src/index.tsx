import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

import defaultTheme from "./amira/themes/default";
import Application from "./layouts/Application";
import SignIn from "./pages/SignIn";
import * as serviceWorker from "./serviceWorker";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Application>
        <SignIn />
      </Application>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
