import classNames from "classnames";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { LogIn as Share } from "react-feather";
import { useNavigation } from "react-navi";

import { TYPES, api } from "../../lib/store";
import Hanger from "../Hanger";

const Portal = ({ id, node, parent = null }) => {
  const navigate = useNavigation();

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

  const [{ canDrop, item }, drop] = useDrop({
    accept: [TYPES.Statement.toString(), TYPES.Portal.toString()],
    drop: () => {
      // moveNode(item, response || id, before);
      api.getState().moveNode(item.parent, item.id, id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.isOver() && monitor.getItem()
    })
  });

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const { pathname } = navigate.getCurrentValue().url;
    let url = [pathname, "portals", id, "edit"];
    if (parent) {
      url = [pathname, "responses", parent, "portals", id, "edit"];
    }
    navigate.navigate(url.join("/"));
  };

  const handleButtonClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const { pathname } = navigate.getCurrentValue().url;
    navigate.navigate([pathname, id].join(","));

    // api.getState().removeNode(id);
  };

  const handleContext = e => {
    e.preventDefault();
    api.getState().copyNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={parent} hidden={isDragging} />
      <li className={classNames("Portal", { isDragging })} ref={drop}>
        <div onContextMenu={handleContext} onClick={handleClick} ref={drag}>
          {node.text}
          <Share size={15} onClick={handleButtonClick} />
        </div>
      </li>
    </>
  );
};

export default Portal;
