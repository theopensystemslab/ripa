import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";
import { ChevronDown, Folder, Plus, Trash } from "react-feather";

import ApplicationCard from "../components/ApplicationCard";
//import { Link } from "react-navi";
import HVCenterContainer from "../components/HVCenterContainer";

//import { Link } from "react-navi";

const useStyles = makeStyles(theme => ({
  applications: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  },
  start: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 264
    },
    height: "100%",
    border: `1px solid ${theme.palette.primary.contrastText}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "rgba(200,200,200,0.2)"
    }
  },
  list: {
    color: "currentColor",
    padding: 0
  },
  divider: {
    backgroundColor: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1
  },
  listedApplication: {
    color: theme.palette.grey[900],
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    "&:not(:last-child)": {
      marginBottom: 2
    }
  },
  panelButton: {
    display: "flex",
    width: "100%",
    fontSize: 17,
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.035)"
    }
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

const CollapsePanel = ({
  children,
  title = "Collapse Panel",
  Icon = null,
  openOnRender = false
}) => {
  const [panelOpen, setPanelOpen] = React.useState(false);
  React.useEffect(() => {
    openOnRender && setPanelOpen(true);
  }, []);
  const classes = useStyles();
  return (
    <>
      <ButtonBase
        className={classNames(
          classes.panelButton,
          panelOpen && classes.panelButtonActive
        )}
        onClick={() => setPanelOpen(!panelOpen)}
      >
        {Icon && <Icon size={20} className={classes.panelIcon} />} {title}
        <ChevronDown
          className={classNames(
            classes.collapseIcon,
            panelOpen && classes.collapseIconActive
          )}
        />
      </ButtonBase>
      <Collapse in={panelOpen}>
        <Box bgcolor="rgba(0,0,0,0.035)" mb={1}>
          {children}
        </Box>
      </Collapse>
    </>
  );
};

const Dashboard = ({ applications = [] }) => {
  const classes = useStyles();

  return (
    <HVCenterContainer verticalCenter>
      <Box px={{ xs: 2, sm: 0 }} py={3}>
        <Typography variant="h2" gutterBottom>
          <strong>My planning applications</strong>
        </Typography>
        <Grid
          container
          spacing={3}
          wrap="wrap"
          className={classes.applications}
        >
          {applications.map(application => (
            <Grid item xs={12} sm={"auto"}>
              <ApplicationCard {...application}></ApplicationCard>
            </Grid>
          ))}
          <Grid item xs={12} sm={"auto"}>
            <Box height={"100%"}>
              <ButtonBase href="/start" className={classes.start}>
                <Plus size={40} />
                <Box pt={2} fontSize="h6.fontSize" px={3}>
                  Start a new application
                </Box>
              </ButtonBase>
            </Box>
          </Grid>
        </Grid>
        <Divider className={classes.divider}></Divider>
        <CollapsePanel title="Archived" Icon={Folder}>
          <Box
            px={{ xs: 0, sm: 3 }}
            pt={{ xs: 0, sm: 1 }}
            pb={{ xs: 0, sm: 3 }}
          >
            <List className={classes.list}>
              {applications.map(application => (
                <ApplicationCard {...application} listView></ApplicationCard>
              ))}
            </List>
          </Box>
        </CollapsePanel>
        <CollapsePanel title="Deleted" Icon={Trash}>
          <Box px={3} pt={1} pb={3}>
            Empty
          </Box>
        </CollapsePanel>
      </Box>
    </HVCenterContainer>
  );
};

export default Dashboard;
