import { compose, lazy, map, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

import Application from "../layouts/Application";
import { api, useStore } from "../lib/store";
import Login from "../pages/SignIn";

export type IContext = {
  gqlClient;
  navigation;
  currentUser;
};

const renderNotFound: React.FC<any> = () => <h1>404 - Not Found</h1>;

const Layout = ({ currentUser }) => {
  const address = useStore(state => state.data.address);
  const continued = useStore(state => state.data.continued);

  return (
    <Application currentUser={currentUser} address={continued && address.name}>
      <NotFoundBoundary render={renderNotFound}>
        <View />
      </NotFoundBoundary>
    </Application>
  );
};

export default compose(
  withView((req, context: IContext) => (
    <Layout currentUser={context.currentUser} />
  )),

  mount({
    "/login": map(async (req, context: IContext) =>
      context.currentUser
        ? redirect(
            req.params.redirectTo
              ? decodeURIComponent(req.params.redirectTo)
              : "/"
          )
        : route({
            title: "Login",
            view: <Login />
          })
    ),

    "/logout": map(async (req, context: IContext) => {
      // context.gqlClient.resetStore();
      // localStorage.removeItem("token");
      api.getState().set(state => {
        state.data = {};
      });
      return redirect("/login");
    }),

    "*": map(async (req, context: IContext) =>
      context.currentUser
        ? lazy(() => import("./authenticated"))
        : redirect(
            `/login/?redirectTo=${encodeURIComponent(req.originalUrl)}`,
            { exact: false }
          )
    )
  })
);
