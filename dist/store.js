import produce from "immer";
import { create } from "zustand";
export const [useStore, api] = create(set => ({
    data: JSON.parse(localStorage.getItem("data") || "{}"),
    set: fn => set(produce(fn))
}));
api.subscribe((data) => {
    localStorage.setItem("data", data);
}, state => JSON.stringify(state.data));
