import classNames from "classnames";
import React from "react";
import { useDrop } from "react-dnd";
import { useNavigation } from "react-navi";
import { api, TYPES } from "../lib/store";

const Hanger = ({ before = null, parent = null, hidden = false }) => {
  const navigate = useNavigation();
  // const addNode = useStore(state => state.addNode);

  const [{ canDrop, item }, drop] = useDrop({
    accept: [TYPES.Statement.toString(), TYPES.Portal.toString()],
    drop: () => {
      // moveNode(item, response || id, before);
      api.getState().moveNode(item.parent, item.id, parent, before);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.isOver() && monitor.getItem()
    })
  });

  const handleClick = _e => {
    const { pathname } = navigate.getCurrentValue().url;
    let url = [pathname, "statements", "new"];
    if (parent) {
      url = [pathname, "responses", parent, "statements", "new"];
    }
    navigate.navigate(url.join("/"));

    // api.getState().addNode(
    //   {
    //     id: Math.random().toString(),
    //     $t: TYPES.Statement,
    //     text: `new node ${Date.now()}`
    //   },
    //   parent,
    //   before
    // );
  };

  const handleContext = e => {
    e.preventDefault();
    api.getState().pasteNode(parent, before);

    // api.getState().addNode(
    //   {
    //     id: Math.random().toString(),
    //     $t: TYPES.Portal,
    //     text: `new portal ${Date.now()}`
    //   },
    //   parent,
    //   before
    // );
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
