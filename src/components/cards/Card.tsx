import React from "react";

import { TYPES, useStore } from "../../lib/store";
import Portal from "./Portal";
import Statement from "./Statement";

const Card = props => {
  const node = useStore(state => state.flow.nodes[props.id]);

  if (!node) return null;

  switch (node?.$t) {
    case TYPES.Statement:
      return <Statement {...props} node={node} />;
    case TYPES.Portal:
      return <Portal {...props} node={node} />;
    default:
      console.log({ node, t: node.$t, t2: TYPES.Statement });
      return null;
  }
};

export default Card;
