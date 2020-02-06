import "./editor.scss";

import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import scrollIntoView from "scroll-into-view-if-needed";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

import Breadcrumb from "./components/cards/Breadcrumb";
import Card from "./components/cards/Card";
import Hanger from "./components/Hanger";
import { useStore } from "./lib/store";

const scrollIntoViewSmoothly =
  "scrollBehavior" in document.documentElement.style
    ? scrollIntoView
    : smoothScrollIntoView;

export const scrollIn = (node, overrides = {}) => {
  scrollIntoViewSmoothly(node, {
    // scrollMode: "if-needed",
    behavior: "smooth",
    block: "start",
    inline: "center",
    ...overrides
  });
};

interface IApp {
  ids: string[];
  children?: React.ReactNode;
}

const Flow: React.FC<IApp> = React.memo(
  ({ ids }) => {
    const ref = React.useRef(null);

    const id = ids.length > 1 ? ids[ids.length - 1] : null;

    React.useLayoutEffect(() => {
      scrollIn(ref.current);
    }, [id]);

    const roots = useStore(state =>
      state.flow.edges.filter(([src]) => src === id).map(([, tgt]) => tgt)
    );

    return (
      <div id="editor">
        <ol className="Flow" ref={ref} data-testid="Flow">
          {ids.map((id, i) => (
            <Breadcrumb
              id={id}
              key={id}
              current={i === ids.length - 1}
              url={ids.slice(0, i + 1)}
            />
          ))}
          {roots.map(rId => (
            <Card id={rId} key={rId} parent={id} />
          ))}
          <Hanger parent={id} />
        </ol>
      </div>
    );
  },
  (a, b) => a.ids.toString() === b.ids.toString()
);

const App: React.FC<IApp> = ({ ids, children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Flow ids={ids} />
      {children}
    </DndProvider>
  );
};

export default App;
