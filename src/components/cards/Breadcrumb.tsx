import * as React from "react";
import { useDrop } from "react-dnd";
import { useNavigation } from "react-navi";

// import { moveNode, useStore } from "../../../../../lib/store";
import { TYPES, useStore } from "../../lib/store";

const Breadcrumb = ({ id, breadcrumbs }) => {
  const { navigate } = useNavigation();
  const [breadcrumb, name] = useStore(state => [
    state.flow.nodes[id],
    state.flow.name
  ]);

  const [{ item }, drop] = useDrop({
    accept: [TYPES.Statement.toString(), TYPES.Portal.toString()],
    drop: () => {
      // moveNode(item, breadcrumb ? id : null);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.isOver() && monitor.getItem()
    })
  });

  let breadcrumbName = name || "MASTER";

  if (breadcrumb) {
    breadcrumbName = breadcrumb.name;
  }
  breadcrumbName = breadcrumbName || id;

  return (
    <li
      className="Portal Breadcrumb"
      onClick={() =>
        navigate(
          [
            window.location.pathname
              .split("/")
              .slice(0, -1)
              .join("/"),
            breadcrumbs.join(",")
          ].join("/")
        )
      }
    >
      <div ref={drop}>{breadcrumbName}</div>
    </li>
  );
};

export default Breadcrumb;
