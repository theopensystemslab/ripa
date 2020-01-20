import React from "react";
import Card from "./components/cards/Card";
import Hanger from "./components/Hanger";
import "./editor.scss";
import { useStore } from "./lib/store";

const App: React.FC = () => {
  const roots = useStore(state =>
    state.flow.edges.filter(([src]) => !src).map(([, tgt]) => tgt)
  );

  return (
    <ol className="Flow">
      {roots.map(id => (
        <Card id={id} key={id} />
      ))}
      <Hanger />
    </ol>
  );
};

export default App;
