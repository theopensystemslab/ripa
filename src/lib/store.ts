import { Graph, alg } from "graphlib";
import * as jsondiffpatch from "jsondiffpatch";
import difference from "lodash/difference";
import create from "zustand";

// import defaultFlow from "../data/defaultFlow";
import defaultFlow from "../data/out.json"; // fetch('https://bit.ly/2GgbDyh')

export const TYPES = {
  Statement: 100,
  Response: 200,
  Portal: 300
};

const DEBUG = true;

const log = input => DEBUG && console.info(input);

const flow = JSON.parse(localStorage.getItem("flow")) || defaultFlow;

const jdiff = jsondiffpatch.create({
  objectHash: obj => obj.id || JSON.stringify(obj)
});

const g = new Graph({ directed: true, multigraph: false });
window["g"] = g;
g.setNode("null");

const isClone = id => (g.inEdges(id) || []).length > 1;

const remove = (id, parent, ids) => {
  // let ids = new Set();
  if (isClone(id)) {
    console.log("removing clone", { parent, id });
    g.removeEdge(parent, id);
  } else {
    const [root, ...children] = alg.preorder(g, id);
    g.removeNode(root);
    const [, ...remaining] = alg.preorder(g, "null" as any);

    const toRemove = difference(children, remaining);

    toRemove.forEach(id => g.removeNode(id));
  }
};

console.time("loading flow and initializing store");

class CycleInGraphError extends Error {
  constructor(message = "CycleInGraphError") {
    super(message);
    this.name = "CycleInGraphError";
  }
}

class MultiGraphError extends Error {
  constructor(message = "MultiGraphError") {
    super(message);
    this.name = "MultiGraphError";
  }
}

const checkGraph = oldGraph => {
  const edgesLength = oldGraph.edges().length;
  return () => {
    if (!alg.isAcyclic(g)) {
      log({ cycles: alg.findCycles(g) });
      throw new CycleInGraphError();
    } else if (edgesLength > 0 && edgesLength === g.edges().length) {
      console.error(`${edgesLength} === ${g.edges().length}`);
      throw new MultiGraphError();
    }
  };
};

export const [useStore, api] = create(set => ({
  flow,

  copyNode: id => {
    localStorage.setItem("clipboard", id);
  },

  pasteNode: (parent, before) => {
    const id = localStorage.getItem("clipboard");
    if (id && state.flow.nodes[id]) {
      const check = checkGraph(g);
      g.setEdge(parent, id);
      try {
        check();

        set(state => {
          const edge = [parent, id];
          if (before) {
            const idx = state.flow.edges.findIndex(
              ([src, tgt]) => src === parent && tgt === before
            );
            state.flow.edges.splice(idx, 0, edge);
          } else {
            state.flow.edges.push(edge);
          }
        });
      } catch (e) {
        console.error(e);
        if (e instanceof MultiGraphError) {
          alert(
            "cannot paste here, there is already another node with the same parent"
          );
        } else {
          if (e instanceof CycleInGraphError) {
            alert("cannot paste here as it would create a cycle");
          } else {
            alert("cannot paste here");
          }
          g.removeEdge(parent, id);
        }
      }
    }
  },

  setName: name => {
    set(state => (state.flow.name = name));
  },

  addNode: ({ id, ...node }, parent = null, before = null) => {
    console.log({ add: { id, parent, before } });
    g.setNode(id);
    g.setEdge(parent, id);

    const children = node.$children || {};
    delete node.$children;

    Object.keys(children).forEach(cId => {
      g.setNode(cId);
      g.setEdge(id, cId);
    });

    set(state => {
      state.flow.nodes[id] = node;
      const edge = [parent, id];
      if (before) {
        const idx = state.flow.edges.findIndex(
          ([src, tgt]) => src === parent && tgt === before
        );
        // console.log({ idx });
        state.flow.edges.splice(idx, 0, edge);
      } else {
        state.flow.edges.push(edge);
      }

      Object.entries(children).forEach(([cId, child]) => {
        state.flow.nodes[cId] = child;
        state.flow.edges.push([id, cId]);
      });
    });
  },

  removeNode: (id, parent = null) => {
    const origEdges = g.edges();
    const ids = new Set();
    remove(id, parent, ids);
    const edgesDiff = jdiff.diff(origEdges, g.edges());

    set(state => {
      ids.forEach((id: string) => delete state.flow.nodes[id]);

      Object.values(edgesDiff || {}).forEach(v => {
        if (Array.isArray(v)) {
          const s = v[0].v === "null" ? null : v[0].v;
          const t = v[0].w === "null" ? null : v[0].w;
          const i = state.flow.edges.findIndex(
            ([src, tgt]) => src === s && tgt === t
          );
          if (i >= 0) {
            state.flow.edges.splice(i, 1);
          } else {
            console.error("edge not found", v);
          }
        }
      });
    });
  },

  // cloneNode: (id) => {
  //   const newId = guid()
  //   g.setNode(newId)
  // },

  setNode: (id, data) => {
    g.setNode(id);
    set(state => {
      state.flow.nodes[id] = data;
    });
  },

  connectNodes: (src, tgt, before = null) => {
    console.log({ src, tgt, before });
    const check = checkGraph(g);
    g.setEdge(src, tgt);
    try {
      check();
      set(state => {
        const edge = [src, tgt];
        if (before) {
          const idx = state.flow.edges.findIndex(
            ([s, t]) => src === s && tgt === t
          );
          state.flow.edges.splice(idx, 0, edge);
        } else {
          state.flow.edges.push(edge);
        }
      });
    } catch (e) {
      alert("can't do that");
    }
  },

  moveNode: (s, tgt, newSrc, before = null) => {
    // const origEdges = g.edges();
    // const edgesDiff = jdiff.diff(origEdges, g.edges());

    log({
      moveNode: {
        tgt,
        before,
        src: s,
        parent: newSrc
      }
    });

    const src = s || "null";
    // log({ remove: { src, tgt } });
    g.removeEdge(src, tgt);

    const check = checkGraph(g);

    const src2 = newSrc || "null";
    // log({ add: { tgt, src: src2 } });
    g.setEdge(src2, tgt);

    try {
      check();

      set(state => {
        const toRemoveIdx = state.flow.edges.findIndex(
          ([eSrc, eTgt]) => eSrc === s && eTgt === tgt
        );

        if (toRemoveIdx >= 0) {
          state.flow.edges.splice(toRemoveIdx, 1);

          // log({ toRemoveIdx, newSrc, tgt });

          const edge = [newSrc, tgt];
          if (before) {
            const idx = state.flow.edges.findIndex(
              ([src, tgt]) => src === newSrc && tgt === before
            );
            // log({ idx });
            if (idx >= 0) {
              state.flow.edges.splice(idx, 0, edge);
            } else {
              console.error({ toRemoveIdx, newSrc, tgt, idx });
            }
          } else {
            state.flow.edges.push(edge);
          }
          // jdiff.patch(state.flow.edges, edgesDiff);
        } else {
          console.error({ toRemoveIdx, newSrc, tgt });
        }
      });
    } catch (e) {
      console.error(e);
      g.removeEdge(newSrc, tgt);
      if (e instanceof MultiGraphError) {
        alert("edge already exists here");
      }
      g.setEdge(src, tgt);
    }
  }
}));
console.timeEnd("loading flow and initializing store");

const checker = checkGraph(g);

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

setTimeout(() => checker(), 1000);

console.time("subscribing to changes");
// consider 'on-change' library https://github.com/sindresorhus/on-change
api.subscribe(
  (flow: string) => {
    localStorage.setItem("flow", flow);
  },
  state => JSON.stringify(state.flow)
);
console.timeEnd("subscribing to changes");

// console.log(alg.isAcyclic(g));
