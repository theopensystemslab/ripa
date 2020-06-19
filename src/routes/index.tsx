import {
  compose,
  lazy,
  map,
  mount,
  redirect,
  route,
  withData,
  withView
} from "navi";
import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

import Application from "../layouts/Application";
import { api, useStore } from "../lib/store";
import Login from "../pages/SignIn";
import { Teams } from "../themes/teams";

export type IContext = {
  gqlClient;
  navigation;
  currentUser;
  team;
};

const renderNotFound: React.FC<any> = () => <h1>404 - Not Found</h1>;

const Layout = ({ currentUser, team }) => {
  const address = useStore(state => state.data.address);
  const activeStep = useStore(state => state.data.activeStep);

  return (
    <Application
      currentUser={currentUser}
      address={activeStep > 0 && address.name}
      team={team}
    >
      <NotFoundBoundary render={renderNotFound}>
        <View />
      </NotFoundBoundary>
    </Application>
  );
};

const Icons = () => {};

export default compose(
  withView((_req, context: IContext) => (
    <Layout currentUser={context.currentUser} team={context.team} />
  )),

  mount({
    "/": route({
      view: <Teams />
    }),

    // "/": redirect(
    //   `/${localStorage.getItem("team") || sample(Object.keys(teams))}`
    // ),

    "/logout": map(() => {
      // context.gqlClient.resetStore();
      // localStorage.removeItem("token");
      api.getState().set(state => {
        state.data = {};
      });
      return redirect(`/${localStorage.getItem("team")}/login`);
    }),

    "/:team": compose(
      withData(req => ({
        team: req.params.team
      })),

      mount({
        "/login": map(async (req, context: IContext) => {
          console.log(decodeURIComponent(req.params.redirectTo));
          return context.currentUser
            ? redirect(
                req.params.redirectTo
                  ? decodeURIComponent(req.params.redirectTo)
                  : `/${req.params.team}`
              )
            : route({
                title: "Login",
                view: <Login />
              });
        }),

        "*": map(async (req, context: IContext) => {
          console.log(context.currentUser);
          return context.currentUser
            ? lazy(() => import("./authenticated"))
            : (redirect(
                `/${req.params.team}/login/?redirectTo=${encodeURIComponent(
                  req.originalUrl
                )}`,
                { exact: false }
              ) as any);
        })
      })
    )
  })
);
