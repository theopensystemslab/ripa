import { compose, lazy, map, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

import Login from "../components/Login";

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
              : "/"
          )
        : route({
            title: "Login",
            view: <Login />
          })
    ),

    "/logout": map(async (req, context: IContext) => {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      context.gqlClient.resetStore();
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
