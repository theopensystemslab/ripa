import "typeface-inter";

import "./app.scss";

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import ApolloClient, { gql } from "apollo-boost";
import { Graph } from "graphlib";
import { createBrowserNavigation } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";

import Loading from "./components/Loading";
import { api, useStore } from "./lib/store";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import defaultTheme from "./themes/default";
import getTeam from "./themes/teams";

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
  const { loading, data } = useQuery(
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

  const graph = new Graph({ directed: true, multigraph: false });
  graph.setNode("null");
  flow.edges.forEach(([src, tgt]) => {
    [src, tgt].forEach(id => {
      if (!graph.hasNode(id)) {
        graph.setNode(id);
      }
    });
    graph.setEdge(src, tgt);
  });

  api.setState({ flow, graph });

  return (
    <Suspense fallback={<Loading />}>
      <View />
    </Suspense>
  );
};

const App = () => {
  const currentUser = useStore(state => state.data.currentUser);
  localStorage.setItem("team", window.location.pathname.split("/")[1]);
  const team = getTeam(localStorage.getItem("team") || "default");

  return (
    <ApolloProvider client={gqlClient}>
      <ThemeProvider
        theme={createMuiTheme({
          ...defaultTheme,
          palette: {
            ...defaultTheme.palette,
            primary: {
              main: team.theme.primary
            }
          },
          overrides: {
            ...defaultTheme.overrides,
            MuiCssBaseline: {
              "@global": {
                body: {
                  backgroundColor: team.theme.primary
                }
              }
            }
          }
        })}
      >
        <CssBaseline />
        <Router
          navigation={navigation}
          context={{ navigation, gqlClient, currentUser, team }}
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
