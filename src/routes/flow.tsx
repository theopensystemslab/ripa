import { compose, mount, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";
import App from "../App";
import portalForm from "./portalForm";
import statementForm from "./statementForm";

export default compose(
  withView(
    <App>
      <View />
    </App>
  ),
  mount({
    "*": route({
      title: "Editor",
      view: <></>
    }),
    "/statements": statementForm,
    "/responses/:responseId/statements": statementForm,
    "/portals": portalForm,
    "/responses/:responseId/portals": portalForm
  })
);
