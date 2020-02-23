import "typeface-inter";

import "./app.scss";

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ApolloClient, { gql } from "apollo-boost";
import { createBrowserNavigation } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";

import defaultTheme from "./amira/themes/default";
import { api, useStore } from "./lib/store";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";

const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  request: operation => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   operation.setContext({
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
  }
});

const navigation = createBrowserNavigation({
  routes
});

const InnerApp = () => {
  const { loading, error, data } = useQuery(
    gql`
      query Flow($id: uuid!) {
        flows_by_pk(id: $id) {
          data
        }
      }
    `,
    {
      variables: {
        id: process.env.REACT_APP_FLOW_ID
      }
    }
  );
  if (loading) return null;

  const flow = data.flows_by_pk.data;
  api.setState({ flow });

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <View />
    </Suspense>
  );
};

const App = () => {
  const currentUser = useStore(state => state.data.currentUser);

  return (
    <ApolloProvider client={gqlClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router
          navigation={navigation}
          context={{ navigation, gqlClient, currentUser }}
        >
          <InnerApp />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
