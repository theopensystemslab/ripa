import { alg, Graph } from "graphlib";
import * as jsondiffpatch from "jsondiffpatch";
import create from "zustand";

// import onChange from "../lib/proxy";
// const flow1 = {
//   a: 1
// };
// const changeable = onChange(flow1, console.log);
// changeable.a = 2;

export const TYPES = {
  Statement: 100,
  Response: 200,
  Portal: 300
};

const jdiff = jsondiffpatch.create({
  objectHash: obj => obj.id || JSON.stringify(obj)
});

const g = new Graph({ directed: true });
window["g"] = g;
g.setNode("null");

const removeOrphans = ids => {
  const [root, ...others] = alg.components(g);
  others.forEach(other => {
    const overlap = root.some(value => other.includes(value));
    if (!overlap) {
      other.forEach(id => {
        ids.push(id);
        g.removeNode(id);
      });
      removeOrphans(ids);
    }
  });
};

console.time("loading flow and initializing store");
const flow = JSON.parse(localStorage.getItem("flow")) || {
  name: undefined,
  nodes: {
    a: {
      $t: TYPES.Statement,
      text: "What do you think of XYZ?"
    },
    b: {
      $t: TYPES.Response,
      text: "Yes"
    },
    c: {
      $t: TYPES.Response,
      text: "No"
    },
    d: {
      $t: TYPES.Statement,
      text: "Another root question"
    },
    e: {
      $t: TYPES.Portal,
      text: "This is a portal"
    }
  },
  edges: [
    [null, "d"],
    [null, "a"],
    ["a", "b"],
    ["a", "c"],
    [null, "e"]
  ]
};

export const [useStore, api] = create(set => ({
  flow,

  copyNode: id => {
    localStorage.setItem("clipboard", id);
  },

  pasteNode: (parent, before) => {
    const id = localStorage.getItem("clipboard");
    if (id && state.flow.nodes[id]) {
      const edge = [parent, id];
      if (before) {
        const idx = state.flow.edges.findIndex(
          ([src, tgt]) => src === parent && tgt === before
        );
        state.flow.edges.splice(idx, 0, edge);
      } else {
        state.flow.edges.push(edge);
      }

      console.log(edge);
    }
  },

  setName: name => {
    set(state => (state.flow.name = name));
  },

  addNode: ({ id, node }, parent = null, before = null) => {
    g.setNode(id);
    g.setEdge(parent, id);
    set(state => {
      state.flow.nodes[id] = node;
      const edge = [parent, id];
      if (before) {
        const idx = state.flow.edges.findIndex(
          ([src, tgt]) => src === parent && tgt === before
        );
        console.log({ idx });
        state.flow.edges.splice(idx, 0, edge);
      } else {
        state.flow.edges.push(edge);
      }
    });
  },

  removeNode: id => {
    console.info({ remove: id });
    const origEdges = g.edges();
    g.removeNode(id);
    const ids = [id];
    removeOrphans(ids);
    const edgesDiff = jdiff.diff(origEdges, g.edges());

    set(state => {
      ids.forEach(id => delete state.flow.nodes[id]);
      jdiff.patch(state.flow.edges, edgesDiff);
    });
  },

  connectNodes: (src, tgt) => {
    g.setEdge(src, tgt);
    set(state => {
      state.flow.edges.push([src, tgt]);
    });
  },

  moveNode: (src, tgt, newSrc, before = null) => {
    // const origEdges = g.edges();
    // const edgesDiff = jdiff.diff(origEdges, g.edges());
    g.removeEdge(src, tgt);
    g.setEdge(newSrc, tgt);

    set(state => {
      const toRemoveIdx = state.flow.edges.findIndex(
        ([eSrc, eTgt]) => eSrc === src && eTgt === tgt
      );
      state.flow.edges.splice(toRemoveIdx, 1);

      const edge = [newSrc, tgt];
      if (before) {
        const idx = state.flow.edges.findIndex(
          ([src, tgt]) => src === newSrc && tgt === before
        );
        state.flow.edges.splice(idx, 0, edge);
      } else {
        state.flow.edges.push(edge);
      }
      // jdiff.patch(state.flow.edges, edgesDiff);
    });
  }
}));
console.timeEnd("loading flow and initializing store");

console.time("building internal DAG");
const state = api.getState();
state.flow.edges.forEach(([src, tgt]) => {
  [src, tgt].forEach(id => {
    if (!g.hasNode(id)) {
      g.setNode(id);
    }
  });
  g.setEdge(src, tgt);
});
console.timeEnd("building internal DAG");

console.time("subscribing to changes");
// consider 'on-change' library https://github.com/sindresorhus/on-change
api.subscribe(
  (flow: string) => {
    localStorage.setItem("flow", flow);
  },
  state => JSON.stringify(state.flow)
);
console.timeEnd("subscribing to changes");
