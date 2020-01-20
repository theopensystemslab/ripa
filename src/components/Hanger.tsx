import React from "react";
import { TYPES, useStore } from "../lib/store";

const Hanger = ({ before = null, parent = null }) => {
  const addNode = useStore(state => state.addNode);

  const handleClick = _e => {
    addNode(
      {
        id: Math.random().toString(),
        $t: TYPES.Statement,
        text: `new node ${Date.now()}`
      },
      parent,
      before
    );
  };

  const handleContext = e => {
    e.preventDefault();
    addNode(
      {
        id: Math.random().toString(),
        $t: TYPES.Portal,
        text: `new portal ${Date.now()}`
      },
      parent,
      before
    );
  };

  return (
    <li className="Hanger">
      <div onClick={handleClick} onContextMenu={handleContext}>
        Hanger
      </div>
    </li>
  );
};

export default Hanger;
