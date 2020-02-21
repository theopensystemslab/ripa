import axios from "axios";
import { compose, mount, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import { ExpandableCheckboxes } from "../amira/ExpandableCheckboxes.fixture";
import { api, useStore } from "../lib/store";
import AddressSelect from "../pages/AddressSelect";
import Dashboard from "../pages/Dashboard";
import MyApplication from "../pages/MyApplication";
import PostcodeSearch from "../pages/PostcodeSearch";
import PropertyInformation from "../pages/PropertyInformation";

const App = () => {
  const set = useStore(state => state.set);
  const postcode = useStore(state => state.data.postcode || "");
  const address = useStore(state => state.data.address);
  const addresses = useStore(state => state.data.addresses);
  const continued = useStore(state => state.data.continued);

  return (
    <>
      {!continued && (
        <PostcodeSearch
          postcode={postcode}
          handleReset={() => {
            set(state => {
              state.data = { currentUser: state.data.currentUser };
            });
          }}
          handleChange={postcode => {
            axios
              .get(`https://api.planx.uk/v1/postcodes/${postcode}`)
              .then(({ data }) => {
                set(state => {
                  state.data.postcode = postcode;
                  state.data.addresses = data.results;
                  state.data.localAuthority = "Hampton";
                });
              });
          }}
        />
      )}
      {!continued && addresses && (
        <AddressSelect
          address={address?.id}
          addresses={addresses}
          handleChange={e => {
            set(state => {
              const address = state.data.addresses.find(
                a => a.id === e.target.value
              );
              if (address) {
                state.data.address = address;
                state.data.address.constraints = [];
              } else {
                delete state.data.address;
                delete state.data.continued;
              }
            });
          }}
        />
      )}
      {!continued && address && (
        <PropertyInformation
          streetAddress={address.name}
          information={{
            District: "Hampton",
            Postcode: postcode,
            "Property type": address.rawData.planx_description
            // "Site area": "100m2"
          }}
          constraints={address.constraints}
          handleContinue={() => {
            set(state => {
              state.data.continued = true;
            });
          }}
        />
      )}
      {continued && (
        <>
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
          <ExpandableCheckboxes
            title="Expandable Checkboxes"
            name="ExpandableCheckboxes"
            panelsOptions={[
              {
                sectionTitle: "section A",
                values: ["Response A1", "Response A2", "Response A3"]
              },
              {
                sectionTitle: "section B",
                values: ["Response B1", "Response B2", "Response B3"]
              },
              {
                sectionTitle: "section C",
                values: ["Response C1", "Response C2", "Response C3"]
              }
            ]}
          />
        </>
      )}
    </>
  );
};

export default compose(
  withView(<View />),

  mount({
    "/": route(() => {
      api.getState().set(state => {
        state.data = { currentUser: state.data.currentUser };
      });

      return {
        title: "Dashboard",
        view: (
          <Dashboard
            applications={[
              {
                id: 1,
                thumbnail: "https://i.imgur.com/S16hH4J.png",
                description: "30 Lake Road",
                updatedAt: new Date(2020, 1, 1),
                status: "In progress"
              }
            ]}
          />
        )
      };
    }),
    "/start": route({
      title: "Start",
      view: <App />
    })
  })
);
