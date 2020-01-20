import { createBrowserNavigation } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";

const navigation = createBrowserNavigation({
  routes
});

const App = () => (
  <HelmetProvider>
    <Router navigation={navigation} context={{ navigation }}>
      <Suspense fallback={<div>Loading... </div>}>
        <View />
      </Suspense>
    </Router>
  </HelmetProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
