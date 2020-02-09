import { gql } from "apollo-boost";
import { compose, lazy, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import Sharer from "../lib/sharer";
import Team from "../pages/Team";
import { IContext } from "./index";

const receivePatch = (ops, isLocal) => {
  console.log({ isLocal, received: ops });
};

const sharer = new Sharer({
  afterJoin: self => {
    console.log("joined");
    window["sharer"] = sharer;
    self.doc.on("op", receivePatch);
  },
  beforeRemove: self => {
    console.log("removing");
    self.doc.removeListener("op", receivePatch);
  },
  // onSocketError: console.error,
  // onSocketShareDB: data => {
  //   console.log({ received: data });
  // },
  socketUrl: process.env.REACT_APP_WEBSOCKET_URL
});
window["sharer"] = sharer;

const teamRoutes = compose(
  withView((_req, context: IContext) => (
    <div>
      {/* <header>{context.currentUser.username}</header> */}
      <View />
    </div>
  )),

  mount({
    "/": route(async (req, context: IContext) => {
      const { data } = await context.gqlClient.query({
        query: gql`
          query Team($slug: String!) {
            teams(where: { slug: { _eq: $slug } }) {
              id
              name
              users {
                id
                email
              }
              # members(order_by: { user: { username: asc } }) {
              members {
                id
                user {
                  id
                  # username
                }
              }
              flows(order_by: { id: desc }) {
                id
              }
            }
          }
        `,
        variables: {
          slug: req.params.teamId
        }
      });

      if (data.teams.length > 0) {
        const team = data.teams[0];
        return {
          title: team.name,
          view: <Team team={team} />
        };
      }

      redirect(`/`);
    }),

    "/:flowId": lazy(async req => {
      // const ids = req.params.flowId.split(",");
      // const id = ids[0];

      // await sharer.join("flows", id, {
      //   name: null,
      //   edges: [],
      //   nodes: {}
      // });

      // const flow = sharer.doc.data;
      // console.log({ flow });

      return import("./flow");
    })
  })
);

export default teamRoutes;
