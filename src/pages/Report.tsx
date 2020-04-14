import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Collapse from "@material-ui/core/Collapse";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  report: {},
  map: {
    paddingTop: "25%",
    backgroundColor: "#eee"
  },
  responseText: {
    marginRight: theme.spacing(1),
    verticalAlign: "middle"
  },
  panelButton: {
    display: "flex",
    width: "100%",
    fontSize: 17,
    fontFamily: "inherit",
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.035)"
    }
  },
  notExpandable: {
    visibility: "hidden",
    cursor: "default"
  },
  panelIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
    color: "currentColor"
  },
  collapseIcon: {
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transition: "transform 0.3s ease-out",
    transform: "translateY(-50%)"
  },
  panelButtonActive: {
    backgroundColor: "rgba(0,0,0,0.035)"
  },
  collapseIconActive: {
    transform: "translateY(-50%) rotate(180deg)"
  }
}));

const Map = () => {
  const classes = useStyles();
  return <Box className={classes.map} />;
};

const CollapsePanel = ({
  children,
  title = "Collapse Panel",
  titleClosed = null
}) => {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <Collapse in={panelOpen}>
        <Box mb={1}>{children}</Box>
      </Collapse>
      <ButtonBase
        className={classNames(
          classes.panelButton,
          panelOpen && classes.panelButtonActive
        )}
        disableRipple
        onClick={() => setPanelOpen(!panelOpen)}
      >
        {titleClosed ? <>{!panelOpen ? title : titleClosed}</> : title}
      </ButtonBase>
    </>
  );
};

const ExpansionPanelDemo = ({
  isExpandable = true,
  flag = null,
  text = "Reason"
}) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      elevation={0}
      style={flag && { boxShadow: `inset 5px 0 0 ${flag}` }}
    >
      <ExpansionPanelSummary
        classes={{ expandIcon: !isExpandable && classes.notExpandable }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" component="h3">
              <span className={classes.responseText}>{text}</span>
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      {isExpandable && (
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item sm={10}>
              <Typography variant="subtitle2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis, nulla qui! Incidunt modi, deleniti soluta
                molestiae, quaerat totam cum dolores officia ullam sunt
                pariatur, nobis ut exercitationem sapiente. Natus, atque.
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
};

const Report = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="#fff" className={classes.report}>
      <Map />
      <Box bgcolor={"#ccc"} height="1em"></Box>
      <Box p={5} pb={4}>
        <Box fontSize="subtitle1.fontSize" mb={2}>
          Report name
        </Box>
        <Box fontSize="h5.fontSize" fontWeight="700" mb={2}>
          Result/status
        </Box>
        <Box fontSize="h6.fontSize" mb={2}>
          Standardised result text likely to be in the form of a short
          paragraph, explaining what the result means.
        </Box>
        <Box fontSize="subtitle1.fontSize" mb={2}>
          Reasons
        </Box>
        <Box pb={3}>
          <ExpansionPanelDemo flag="#bbb"></ExpansionPanelDemo>
          <ExpansionPanelDemo isExpandable={false}></ExpansionPanelDemo>
        </Box>
        <CollapsePanel title="See all reasons" titleClosed="Show less">
          <Box py={2}>
            <ExpansionPanelDemo flag="#bbb"></ExpansionPanelDemo>
            <ExpansionPanelDemo isExpandable={false}></ExpansionPanelDemo>
            <ExpansionPanelDemo isExpandable={false}></ExpansionPanelDemo>
            <ExpansionPanelDemo isExpandable={false}></ExpansionPanelDemo>
            <ExpansionPanelDemo flag="#bbb"></ExpansionPanelDemo>
          </Box>
        </CollapsePanel>
      </Box>
    </Box>
  );
};

export default Report;
