import axios from "axios";
import { compose, mount, route, withView } from "navi";
import * as React from "react";
import { View } from "react-navi";

import { ExpandableCheckboxes } from "../amira/ExpandableCheckboxes.fixture";
import HVCenterContainer from "../components/HVCenterContainer";
import { api, useStore } from "../lib/store";
import AddressSelect from "../pages/AddressSelect";
import Dashboard from "../pages/Dashboard";
import MyApplication from "../pages/MyApplication";
import PostcodeSearch from "../pages/PostcodeSearch";
import PropertyInformation from "../pages/PropertyInformation";
import Section from "../pages/Section";
import { IContext } from ".";

const Flow = () => {
  const flow = useStore(state => state.flow);
  const set = useStore(state => state.set);

  if (!flow) return null;

  const id = "d24ffc88-cf93-4f59-9c65-631cdd2c5f45";
  const panels = flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt);

  const data = panels.map(id => {
    const tgt = flow.edges.find(([src]) => src === id)[1];

    return {
      sectionTitle: flow.nodes[id].text,
      values: flow.edges
        .filter(([src]) => src === tgt)
        .map(([, tgt]) => flow.nodes[tgt].text)
    };
  });

  return (
    <HVCenterContainer light verticalCenter={false}>
      <ExpandableCheckboxes
        name="ExpandableCheckboxes"
        title={flow.nodes[id].text}
        panelsOptions={data}
        callback={() =>
          set(state => {
            state.data.activeStep = 2;
          })
        }
      />
    </HVCenterContainer>
  );
};

const Flow2 = () => {
  const flow = useStore(state => state.flow);
  const id = "048a5ef5-fc45-492b-a123-f6894bd0a766";
  const sections = flow.edges
    .filter(([src]) => src === id)
    .map(([, tgt]) => {
      const response = flow.nodes[tgt];
      return {
        id: tgt,
        text: response.text,
        status: 0
      };
    });

  return <MyApplication sections={sections} />;
};

const App = () => {
  const set = useStore(state => state.set);
  const postcode = useStore(state => state.data.postcode || "");
  const address = useStore(state => state.data.address);
  const addresses = useStore(state => state.data.addresses);
  const activeStep = useStore(state => state.data.activeStep);

  return (
    <>
      {!activeStep && (
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
      {!activeStep && addresses && (
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
                delete state.data.activeStep;
              }
            });
          }}
        />
      )}
      {!activeStep && address && (
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
              state.data.activeStep = 1;
            });
          }}
        />
      )}
      {activeStep === 1 && <Flow />}
      {activeStep === 2 && <Flow2 />}
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

    "/start": route(async (_req, context: IContext) => {
      // if (!api.getState().data.flow) {
      //   const { data } = await context.gqlClient.query({
      //     query: gql`
      //       query Flow($id: uuid!) {
      //         flows_by_pk(id: $id) {
      //           data
      //         }
      //       }
      //     `,
      //     variables: {
      //       id: process.env.REACT_APP_FLOW_ID
      //     }
      //   });

      //   api.getState().set(state => {
      //     state.data.flow = data.flows_by_pk.data;
      //   });
      // }

      return {
        title: "Start",
        view: <App />
      };
    }),

    "/start/:id": route(async (req, context: IContext) => {
      const { id } = req.params;
      return {
        view: <Section id={id} />
      };
    })
  })
);
