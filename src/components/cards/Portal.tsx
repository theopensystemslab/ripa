import React from "react";
import Hanger from "../Hanger";

const Portal = ({ id, node, response = null }) => {
  const handleClick = _e => {
    // api.getState().removeNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={response} />
      <li className="Portal">
        <div onClick={handleClick}>{node.text}</div>
      </li>
    </>
  );
};

export default Portal;
