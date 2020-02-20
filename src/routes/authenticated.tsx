import { gql } from "apollo-boost";
import { compose, map, mount, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import PostcodeSearch from "../pages/PostcodeSearch";
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
          query Flow($id: uuid!) {
            flows_by_pk(id: $id) {
              data
            }
          }
        `,
        variables: {
          id: process.env.REACT_APP_FLOW_ID
        }
      });

      return route({ view: <PostcodeSearch /> });
    })
  })
);
