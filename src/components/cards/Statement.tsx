import React from "react";
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
          <Card id={sId} key={sId} response={id} />
        ))}
        <Hanger parent={id} />
      </ol>
    </li>
  );
};

const Statement = ({ id, node, response = null }) => {
  const responses = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  const handleClick = _e => {
    api.getState().removeNode(id);
  };

  return (
    <>
      <Hanger before={id} parent={response} />
      <li className="Statement">
        <div onClick={handleClick}>{node.text}</div>
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
