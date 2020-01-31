import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { createBrowserNavigation } from "navi";
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";

import { AuthService } from "./lib/authService";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";

const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

const navigation = createBrowserNavigation({
  routes
});

const authService = new AuthService();

const App = () => {
  const [currentUser, setCurrentUser] = useState(() =>
    authService.getCurrentUser()
  );
  useEffect(() => authService.subscribe(setCurrentUser), []);

  return (
    <ApolloProvider client={gqlClient}>
      <HelmetProvider>
        <Router
          navigation={navigation}
          context={{ navigation, currentUser, gqlClient }}
        >
          <Suspense fallback={<div>Loading... </div>}>
            <View />
          </Suspense>
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
