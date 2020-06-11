import scrollIntoView from "scroll-into-view-if-needed";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";
export const scrollIntoViewSmoothly = "scrollBehavior" in document.documentElement.style
    ? scrollIntoView
    : smoothScrollIntoView;
export const scrollIn = (node, overrides = {}) => {
    scrollIntoViewSmoothly(node, Object.assign({ behavior: "smooth", block: "start", inline: "center" }, overrides));
};
