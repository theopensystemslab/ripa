import classNames from "classnames";
import React from "react";
import { useDrag } from "react-dnd";
import { useNavigation } from "react-navi";
import { api, TYPES } from "../../lib/store";
import Hanger from "../Hanger";

const Portal = ({ id, node, parent = null }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      parent,
      text: node.text,
      type: TYPES.Portal.toString()
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const navigate = useNavigation();

  const handleClick = _e => {
    // api.getState().removeNode(id);
    const { pathname } = navigate.getCurrentValue().url;
    navigate.navigate([pathname, id].join(","));
  };

  const handleContext = e => {
    e.preventDefault();
    api.getState().copyNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={parent} hidden={isDragging} />
      <li className={classNames("Portal", { isDragging })}>
        <div onClick={handleClick} onContextMenu={handleContext} ref={drag}>
          {node.text}
        </div>
      </li>
    </>
  );
};

export default Portal;
