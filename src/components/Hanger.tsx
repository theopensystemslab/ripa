import React from "react";
import { TYPES, useStore } from "../lib/store";

const Hanger = ({ beforeId = null }) => {
  const addNode = useStore(state => state.addNode);

  const handleClick = _e => {
    addNode(
      {
        id: Math.random().toString(),
        $t: TYPES.Statement,
        text: "new node"
      },
      beforeId
    );
  };

  return (
    <li className="Hanger">
      <div onClick={handleClick}>Hanger</div>
    </li>
  );
};

export default Hanger;
