import "./editor.scss";

import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useNavigation } from "react-navi";

import Card from "./components/cards/Card";
import Hanger from "./components/Hanger";
import { api, useStore } from "./lib/store";

const Current = ({ id }) => {
  const current = useStore(state => state.flow.nodes[id]);

  const name = useStore(state => state.flow.name);

  const { navigate } = useNavigation();

  let currentName = name || "ROOT";
  if (current) currentName = current.name || "ROOT";

  return (
    <li className="Current">
      <div
        onClick={() => {
          if (current?.name) {
            navigate(`${window.location.pathname}/edit`);
          } else {
            const name = prompt("Flow name", currentName);
            api.getState().setName(name);
          }
        }}
      >
        {currentName}
      </div>
    </li>
  );
};

const App: React.FC = ({ children }) => {
  const navigation = useNavigation();
  const { pathname } = navigation.getCurrentValue().url;
  // const nodes = useStore(state => state.flow.nodes);

  const ids = pathname
    .split("/")
    .pop()
    .split(",");

  let id = null;
  if (ids.length > 1) {
    id = ids.pop();
  }

  // if (id && !nodes[id]) {
  //   const path = pathname
  //     .split(",")
  //     .slice(0, -1)
  //     .join(",");
  //   navigation.navigate(path);
  // }

  const roots = useStore(state =>
    state.flow.edges.filter(([src, tgt]) => src === id).map(([, tgt]) => tgt)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <ol className="Flow">
        <Current id={id} />
        {roots.map(id => (
          <Card id={id} key={id} />
        ))}
        <Hanger />
      </ol>
      {children}
    </DndProvider>
  );
};

export default App;
