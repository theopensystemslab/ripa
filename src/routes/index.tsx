import { gql } from "apollo-boost";
import { compose, lazy, map, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

import Login from "../components/Login";
import TeamsList from "../pages/TeamsList";

export type IContext = {
  gqlClient;
  navigation;
  currentUser;
};

const renderNotFound: React.FC<any> = () => <h1>404 - Not Found</h1>;

export default compose(
  withView(
    <NotFoundBoundary render={renderNotFound}>
      <View />
    </NotFoundBoundary>
  ),

  mount({
    "/login": map(async (req, context: IContext) =>
      context.currentUser
        ? redirect(
            req.params.redirectTo
              ? decodeURIComponent(req.params.redirectTo)
              : "/osl"
          )
        : route({
            title: "Login",
            view: <Login />
          })
    ),

    "/:teamId": lazy(() => import("./team")),

    "*": map(async (req, context: IContext) =>
      context.currentUser
        ? // ? mount({
          //     "/:teamId/:flowId": lazy(async () => import("./flow"))
          //   })
          mount({
            "/:teamId": lazy(() => import("./team"))
          })
        : redirect(
            `/login/?redirectTo=${encodeURIComponent(req.originalUrl)}`,
            { exact: false }
          )
    ),

    // "/": route({
    //   title: "Teams",
    //   view: <TeamsList />
    // })
    "/": route(async (req, context: IContext) => {
      const { data } = await context.gqlClient.query({
        query: gql`
          query Teams {
            teams {
              id
              name
            }
          }
        `
      });

      return {
        view: <TeamsList teams={data.teams} />
      };
    })
  })
);
