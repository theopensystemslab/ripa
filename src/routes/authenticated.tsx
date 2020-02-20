import { gql } from "apollo-boost";
import { compose, map, mount, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import AddressSelect from "../pages/AddressSelect";
import MyApplication from "../pages/MyApplication";
import PostcodeSearch from "../pages/PostcodeSearch";
import PropertyInformation from "../pages/PropertyInformation";
import { IContext } from ".";

export default compose(
  withView(<View />),

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

      return route({
        view: (
          <>
            <PostcodeSearch />
            <AddressSelect />
            <PropertyInformation
              streetAddress="30 Lake Road"
              information={{
                District: "Southwark",
                Postcode: "SE22 9HL",
                "Property type": "Terrace",
                "Site area": "100m2"
              }}
              constraints={[
                "It is not in a Conservation area",
                "It does not include any Listed buildings",
                "It is not in a Flood Risk Area"
              ]}
            />
            <MyApplication
              sections={{
                "About the property": "Complete",
                Ownership: "Complete",
                "Applicant details": "In progress",
                "Agent details": "In progress",
                "Materials & appearance": "Not started",
                Heritage: "Not started"
              }}
              percentageComplete={12}
            />
          </>
        )
      });
    })
  })
);
