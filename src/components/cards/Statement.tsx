import classNames from "classnames";
import React from "react";
import { useDrag } from "react-dnd";
import { useNavigation } from "react-navi";
import { api, TYPES, useStore } from "../../lib/store";
import Hanger from "../Hanger";
import Card from "./Card";

const Response = ({ id, statement }) => {
  const node = useStore(state => state.flow.nodes[id]);

  const statements = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  const handleClick = _e => {
    api.getState().addNode(
      {
        id: Math.random().toString(),
        $t: TYPES.Statement,
        text: `new statement`
      },
      statement
    );
  };

  return (
    <li className="Response">
      <div onClick={handleClick}>{node.text}</div>
      <ol className="Statements">
        {statements.map(sId => (
          <Card id={sId} key={sId} parent={id} />
        ))}
        <Hanger parent={id} />
      </ol>
    </li>
  );
};

const Statement = ({ id, node, parent = null }) => {
  const navigate = useNavigation();

  const responses = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      parent,
      text: node.text,
      type: TYPES.Statement.toString()
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  if (!node) return null;

  const handleClick = e => {
    // api.getState().removeNode(id);
    e.preventDefault();
    e.stopPropagation();

    const { pathname } = navigate.getCurrentValue().url;
    let url = [pathname, "statements", id, "edit"];
    if (parent) {
      url = [pathname, "responses", parent, "statements", id, "edit"];
    }
    navigate.navigate(url.join("/"));
  };

  const handleContext = e => {
    e.preventDefault();
    e.stopPropagation();
    api.getState().copyNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={parent} hidden={isDragging} />
      <li className={classNames("Statement", { isDragging })}>
        <div onClick={handleClick} onContextMenu={handleContext} ref={drag}>
          {node.text}
        </div>
        <ol className="Responses">
          {responses.map(rId => (
            <Response id={rId} key={rId} statement={id} />
          ))}
        </ol>
      </li>
    </>
  );
};

export default Statement;
