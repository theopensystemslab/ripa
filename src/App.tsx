import React from "react";
import Statement from "./components/cards/Statement";
import Hanger from "./components/Hanger";
import { useStore } from "./lib/store";

const App: React.FC = () => {
  const roots = useStore(state =>
    state.flow.edges.filter(([src]) => !src).map(([, tgt]) => tgt)
  );

  return (
    <ol id="Flow">
      <Hanger />
      {roots.map(id => (
        <Statement id={id} key={id} />
      ))}
    </ol>
  );
};

export default App;
