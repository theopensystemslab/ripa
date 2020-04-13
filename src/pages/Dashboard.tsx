import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { formatDistance } from "date-fns";
import * as React from "react";
import { Folder, Plus, Trash } from "react-feather";

// import { Link } from "react-navi";
import HVCenterContainer from "../components/HVCenterContainer";

const useStyles = makeStyles(theme => ({
  applications: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  application: {
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  link: {
    textDecoration: "none"
  },
  start: {
    width: 300,
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
    color: "currentColor"
  },
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
    color: "currentColor"
  },
  divider: {
    backgroundColor: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1
  },
  thumbnail: {
    height: 0,
    paddingTop: "56.25%"
  }
}));

const Dashboard = ({ applications = [] }) => {
  const classes = useStyles();
  return (
    <HVCenterContainer verticalCenter>
      <Typography variant="h3" gutterBottom>
        <strong>My planning applications</strong>
      </Typography>
      <Grid container spacing={3} wrap="wrap" className={classes.applications}>
        {applications.map(application => (
          <Grid item>
            <Card key={application.id} className={classes.application}>
              <CardMedia
                className={classes.thumbnail}
                image={application.thumbnail}
              >
                {/* <img src={application.thumbnail} /> */}
              </CardMedia>
              <CardContent className={classes.content}>
                <Box fontSize="h6.fontSize" mb={1}>
                  <strong>{application.description}</strong>
                </Box>
                <Box fontSize="subtitle1.fontSize" color="grey.400" mb={3}>
                  Last edited{" "}
                  {formatDistance(application.updatedAt, new Date())} ago
                </Box>
              </CardContent>
              <CardActions>
                <Box
                  pl={1}
                  flexGrow={1}
                  fontSize="subtitle1.fontSize"
                  color="grey.500"
                >
                  {application.status}
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item>
          <Box height={"100%"}>
            <ButtonBase href="/start" className={classes.start}>
              <Plus size={40} />
              <Box
                pt={2}
                fontSize="h5.fontSize"
                fontFamily="h5.fontFamily"
                px={3}
              >
                Start a new application
              </Box>
            </ButtonBase>
          </Box>
        </Grid>
      </Grid>
      <List>
        <Divider className={classes.divider} />
        <ListItem button>
          <ListItemIcon className={classes.listIcon}>
            <Folder size={20} />
          </ListItemIcon>
          <ListItemText primary="Archived" />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classes.listIcon}>
            <Trash size={20} />
          </ListItemIcon>
          <ListItemText primary="Deleted" />
        </ListItem>
      </List>
    </HVCenterContainer>
  );
};

export default Dashboard;
