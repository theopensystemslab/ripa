import React from "react";
import { api, TYPES, useStore } from "../../lib/store";
import Hanger from "../Hanger";

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
        text: "new statement"
      },
      statement
    );
  };

  return (
    <>
      <Hanger beforeId={id} />
      <li className="Response">
        <div onClick={handleClick}>{node.text}</div>
        <ol className="Statements">
          {statements.map(id => (
            <Statement id={id} key={id} />
          ))}
        </ol>
      </li>
    </>
  );
};

const Statement = ({ id }) => {
  const node = useStore(state => state.flow.nodes[id]);
  const responses = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  if (!node) return null;

  const handleClick = _e => {
    api.getState().removeNode(id);
  };

  return (
    <>
      <Hanger beforeId={id} />
      <li className="Statement">
        <div onClick={handleClick}>{node.text}</div>
        <ol className="Responses">
          {responses.map(id => (
            <Response id={id} statement={id} key={id} />
          ))}
        </ol>
      </li>
    </>
  );
};

export default Statement;
