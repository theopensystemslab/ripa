import { map, mount, route } from "navi";
import * as React from "react";

import { EditStatement, NewStatement } from "../components/forms/StatementForm";
import { api } from "../lib/store";
import { IContext } from ".";

export default map(async (req, context) => {
  const handleClose = () => {
    (context as IContext).navigation.navigate(
      `/${req.params.team}/${req.params.flowId}`
    );
  };

  const ids = req.params.flowId.split(",");

  const responseId =
    req.params.responseId || (ids.length > 1 ? ids.pop() : null);

  return mount({
    "/new": route({
      title: "Add Statement",
      view: <NewStatement handleClose={handleClose} responseId={responseId} />
    }),

    "/new/:beforeId": route(req => ({
      title: "Add Statement",
      view: (
        <NewStatement
          beforeId={req.params.beforeId}
          handleClose={handleClose}
          responseId={responseId}
        />
      )
    })),

    "/:id/edit": route(async req => {
      const store = api.getState();

      const node = store.flow.nodes[req.params.id];
      // if (node.$src)

      const data = {
        id: req.params.id,
        ...node,
        responses: store.flow.edges
          .filter(([src]) => src === req.params.id)
          .map(([, tgt]) => ({ id: tgt, ...store.flow.nodes[tgt] }))
      };

      return {
        title: `Edit Statement #${req.params.id}`,
        view: (
          <EditStatement
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
