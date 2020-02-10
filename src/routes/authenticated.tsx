import { gql } from "apollo-boost";
import { compose, lazy, map, mount, redirect, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import TeamsList from "../pages/TeamsList";
import { IContext } from ".";

export default compose(
  withView(
    <div>
      <header>
        <a href="/logout">Logout</a>
      </header>
      <View />
    </div>
  ),

  mount({
    "/": map(async (req, context: IContext) => {
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

      if (data.teams.length === 1) {
        return redirect(`/${data.teams[0].name}`);
      }

      if (data.teams.length === 0) {
        return route({ view: <h1>No teams found</h1> });
      }

      return route({ view: <TeamsList teams={data.teams} /> });
    }),

    "/:teamId": lazy(() => import("./team"))
  })
);
