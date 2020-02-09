// import { loader } from "graphql.macro";
import { gql } from "apollo-boost";
import natsort from "natsort";
import { map, mount, route } from "navi";
import * as React from "react";

import { EditPortal, NewPortal } from "../components/forms/PortalForm";
import { TYPES, api } from "../lib/store";
import { IContext } from ".";

export default map(async (req, context: any) => {
  const { data } = await context.gqlClient.query({
    query: gql`
      query Flows {
        flows {
          id
          version
        }
      }
    `
  });

  const handleClose = () => {
    (context as IContext).navigation.navigate(
      `/${req.params.team}/${req.params.flowId}`
    );
  };

  const ids = req.params.flowId.split(",");
  const responseId =
    req.params.responseId || (ids.length > 1 ? ids.pop() : null);

  const sorter = natsort({ insensitive: true });

  const portals = Object.entries(api.getState().flow.nodes)
    .filter(([, node]: any) => node.$t === TYPES.Portal)
    .map(([id, flow]: any) => ({
      id,
      name: flow.text || id
      // name: flow.name || flow.id
    }))
    .concat(data.flows.map(f => ({ id: f.id, name: f.data || f.id })))
    .filter(({ id }) => !window.location.pathname.includes(id))
    .sort((a, b) => sorter(a.name, b.name));

  return mount({
    "/new": route({
      title: "Add Portal",
      view: (
        <NewPortal
          handleClose={handleClose}
          portals={portals}
          responseId={responseId}
        />
      )
    }),

    "/new/:beforeId": route(req => ({
      title: "Add Portal",
      view: (
        <NewPortal
          beforeId={req.params.beforeId}
          handleClose={handleClose}
          portals={portals}
          responseId={responseId}
        />
      )
    })),

    "/:id/edit": route(async req => {
      const store = api.getState();
      const data = {
        id: req.params.id,
        ...store.flow.nodes[req.params.id],
        responses: store.flow.edges
          .filter(([src]) => src === req.params.id)
          .map(([src, tgt]) => ({ id: src, ...store.flow.nodes[tgt] }))
      };

      return {
        title: `Edit Portal #${req.params.id}`,
        view: (
          <EditPortal
            data={data}
            handleClose={handleClose}
            handleDelete={() => {
              api
                .getState()
                .removeNode(req.params.id, req.params.responseId || null);
            }}
          />
        )
      };
    })
  });
});
