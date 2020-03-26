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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { formatDistance } from "date-fns";
import * as React from "react";
import { Folder, Plus, Trash } from "react-feather";

//import { Link } from "react-navi";
import HVCenterContainer from "../components/HVCenterContainer";

const useStyles = makeStyles(theme => ({
  applications: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  application: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 264
    },
    height: "100%",
    display: "flex",
    flexDirection: "column"
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
    paddingTop: "56.25%",
    cursor: "pointer"
  },
  menu: {
    padding: 0
  },
  menuItem: {
    minWidth: "10rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.grey[800],
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

const Dashboard = ({ applications = [] }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HVCenterContainer verticalCenter>
      <Box p={{ xs: 3, sm: 0 }}>
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
              <Card key={application.id} className={classes.application}>
                <CardMedia
                  className={classes.thumbnail}
                  image={application.thumbnail}
                >
                  {/* <img src={application.thumbnail} /> */}
                </CardMedia>
                <CardContent className={classes.content}>
                  <Box fontSize="subtitle1.fontSize">
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
                    color={
                      application.status === "Submitted" ? "#000" : "grey.500"
                    }
                  >
                    {application.status}
                  </Box>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon></MoreVertIcon>
                  </IconButton>
                  <Menu
                    id="application-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      classes: {
                        root: classes.menu
                      }
                    }}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top"
                    }}
                  >
                    <MenuItem
                      className={classes.menuItem}
                      component="a"
                      onClick={handleClose}
                    >
                      <ListItemText primary="Archive" />
                      <Folder size={20} />
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      component="a"
                      onClick={handleClose}
                    >
                      <ListItemText primary="Delete" />
                      <Trash size={20} />
                    </MenuItem>
                  </Menu>
                </CardActions>
              </Card>
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
        <List>
          <Divider className={classes.divider}></Divider>
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
      </Box>
    </HVCenterContainer>
  );
};

export default Dashboard;
