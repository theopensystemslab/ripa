import classNames from "classnames";
import React from "react";
import { useDrag } from "react-dnd";
import { TYPES } from "../../lib/store";
import Hanger from "../Hanger";

const Portal = ({ id, node, response = null }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      text: node.text,
      type: TYPES.Portal.toString()
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleClick = _e => {
    // api.getState().removeNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={response} hidden={isDragging} />
      <li className={classNames("Portal", { isDragging })}>
        <div onClick={handleClick} ref={drag}>
          {node.text}
        </div>
      </li>
    </>
  );
};

export default Portal;
