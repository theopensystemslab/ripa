import { gql } from "apollo-boost";
import { compose, lazy, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import Team from "../pages/Team";
import { IContext } from "./index";

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

    "/:flowId": lazy(async req => import("./flow"))
  })
);

export default teamRoutes;
