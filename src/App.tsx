import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { useNavigation } from "react-navi";
import Card from "./components/cards/Card";
import Hanger from "./components/Hanger";
import "./editor.scss";
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
