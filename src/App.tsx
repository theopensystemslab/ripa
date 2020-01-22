import "./editor.scss";

import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useNavigation } from "react-navi";

import Breadcrumb from "./components/cards/Breadcrumb";
import Card from "./components/cards/Card";
import Hanger from "./components/Hanger";
import { useStore } from "./lib/store";

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
    id = ids[ids.length - 1];
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
        {ids.map((id, i) => (
          <Breadcrumb
            id={id}
            key={id}
            current={i === ids.length - 1}
            url={ids.slice(0, i + 1)}
          />
        ))}
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
