import { alg, Graph } from "graphlib";
import jsondiffpatch from "jsondiffpatch";
import create from "zustand";

const jdiff = jsondiffpatch.create({
  objectHash: obj => obj.id || JSON.stringify(obj)
});

const g = new Graph({ directed: true });
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

export const [useStore, api] = create(set => ({
  flow: {
    name: undefined,
    nodes: {},
    edges: []
  },

  setName: name => {
    set(state => (state.flow.name = name));
  },

  addNode: ({ id, ...node }, src = null) => {
    g.setNode(id);
    g.setEdge(src, id);
    set(state => {
      state.flow.nodes[id] = node;
      state.flow.edges.push([src, id]);
    });
  },

  removeNode: id => {
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

  moveNode: (src, tgt, newSrc) => {
    const origEdges = g.edges();
    g.removeEdge(src, tgt);
    g.setEdge(newSrc, tgt);
    const edgesDiff = jdiff.diff(origEdges, g.edges());

    set(state => {
      jdiff.patch(state.flow.edges, edgesDiff);
    });
  }
}));
