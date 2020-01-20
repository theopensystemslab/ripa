import React from "react";
import { useStore } from "../../lib/store";
import Hanger from "../Hanger";

const Response = ({ id }) => {
  const node = useStore(state => state.flow.nodes[id]);
  const statements = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  return (
    <li className="Response">
      <div>{node.text}</div>
      <ol className="Statements">
        {statements.map(id => (
          <Statement id={id} key={id} />
        ))}
      </ol>
    </li>
  );
};

const Statement = ({ id }) => {
  const node = useStore(state => state.flow.nodes[id]);
  const responses = useStore(state =>
    state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
  );

  return (
    <>
      <li className="Statement">
        <div>{node.text}</div>
        <ol className="Responses">
          {responses.map(id => (
            <Response id={id} key={id} />
          ))}
        </ol>
      </li>
      <Hanger />
    </>
  );
};

export default Statement;
