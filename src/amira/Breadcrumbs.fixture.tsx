import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import DividerIcon from "@material-ui/icons/ArrowForward";
import classNames from "classnames";
import * as React from "react";

interface IMinMax {
  min?: number;
  max?: number;
}
interface IBreadcrumb {
  active?: number;
  list?: string[];
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: 0,
    margin: 0,
    alignItems: "center",
    color: "currentColor",
    flexWrap: "wrap",
    "& li": {
      color: "currentColor",
      fontSize: "20px",
      listStyle: "decimal inside",
      whiteSpace: "nowrap",
      paddingRight: "1rem",
      fontWeight: "500"
    }
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    opacity: 0.75
  },
  active: {
    fontWeight: 700,
    opacity: 1
  },
  icon: {
    color: "currentColor",
    margin: "0 0.5em",
    width: "0.75em",
    height: "0.75em"
  }
});

const Breadcrumb: React.FC<IBreadcrumb> = ({ active = 0, list = [] }) => {
  const classes = useStyles();
  return (
    <Box bgcolor="background.paper" py={3}>
      <Container maxWidth="lg">
        <Box fontSize="h6.fontSize" component="ol" className={classes.root}>
          {list.map((child, i) => (
            <div
              className={classNames(
                classes.breadcrumb,
                i + 1 === active && classes.active
              )}
              key={i}
            >
              {i + 1}. {child}
              {i + 1 < list.length && <DividerIcon className={classes.icon} />}
            </div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default {
  default: (
    <Breadcrumb
      active={2}
      list={[
        "Property location",
        "About the works",
        "Application",
        "Declaration",
        "Pay fee"
      ]}
    />
  )
};
