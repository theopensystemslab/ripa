import classNames from "classnames";
import * as React from "react";
import { useDrop } from "react-dnd";
import { useNavigation } from "react-navi";

import { TYPES, api, useStore } from "../../lib/store";

// const Current = ({ id }) => {
//   const current = useStore(state => state.flow.nodes[id]);

//   const name = useStore(state => state.flow.name);

//   const { navigate } = useNavigation();

//   let currentName = name || "ROOT";
//   if (current) currentName = current.name || "ROOT";

//   return (
//     <li className="Current">
//       <div
//         onClick={() => {
//           if (current?.name) {
//             navigate(`${window.location.pathname}/edit`);
//           } else {
//             const name = prompt("Flow name", currentName);
//             api.getState().setName(name);
//           }
//         }}
//       >
//         {currentName}
//       </div>
//     </li>
//   );
// };

const Breadcrumb = ({ id, url, current = false }) => {
  const { navigate } = useNavigation();
  const [breadcrumb, name] = useStore(state => [
    state.flow.nodes[id],
    state.flow.name
  ]);

  const [{ item }, drop] = useDrop({
    accept: [TYPES.Statement.toString(), TYPES.Portal.toString()],
    drop: () => {
      // alert(id);
      api.getState().moveNode(item.parent, item.id, url[0] === id ? null : id);
    },
    canDrop: () => !current,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.isOver() && monitor.getItem()
    })
  });

  let breadcrumbName = name || "ROOT";
  if (breadcrumb) {
    breadcrumbName = breadcrumb.text || breadcrumb.name || id;
  }

  return (
    <li
      className={classNames("Portal", "Breadcrumb", { Current: current })}
      onClick={() => {
        if (current && url[0] !== id) {
          navigate([window.location.pathname, "portals", id, "edit"].join("/"));
        } else {
          navigate(
            [
              window.location.pathname
                .split("/")
                .slice(0, -1)
                .join("/"),
              url
            ].join("/")
          );
        }
      }}
    >
      <div ref={drop}>{breadcrumbName}</div>
    </li>
  );
};

export default Breadcrumb;
