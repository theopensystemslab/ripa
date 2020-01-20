import classNames from "classnames";
import React from "react";
import { useDrop } from "react-dnd";
import { TYPES, useStore } from "../lib/store";

const Hanger = ({ before = null, parent = null, hidden = false }) => {
  const addNode = useStore(state => state.addNode);

  const [{ canDrop, item }, drop] = useDrop({
    accept: [TYPES.Statement.toString(), TYPES.Portal.toString()],
    drop: () => {
      // moveNode(item, response || id, before);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.isOver() && monitor.getItem()
    })
  });

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
    <li className={classNames("Hanger", { hidden })} ref={drop}>
      <div onClick={handleClick} onContextMenu={handleContext}>
        {canDrop && item ? item.text : "+"}
      </div>
    </li>
  );
};

export default Hanger;
