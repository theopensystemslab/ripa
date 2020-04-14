import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { formatDistance } from "date-fns";
import * as React from "react";
import { CornerRightUp, Folder, Trash } from "react-feather";

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
  list: {
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

interface IApplication {
  thumbnail: string;
  updatedAt: number;
  description: string;
  status: string;
  listView?: boolean;
}

const ApplicationCard = (
  { thumbnail, description, updatedAt, status, listView }: IApplication,
  { ...props }
) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  if (!listView) {
    return (
      <Card
        data-testid="standardCard"
        className={classes.application}
        {...props}
      >
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <CardContent className={classes.content}>
          <Box fontSize="subtitle1.fontSize">
            <strong>{description}</strong>
          </Box>
          <Box fontSize="subtitle1.fontSize" color="grey.400" mb={3}>
            Last edited {formatDistance(updatedAt, new Date())} ago
          </Box>
        </CardContent>
        <CardActions>
          <Box
            pl={1}
            flexGrow={1}
            fontSize="subtitle1.fontSize"
            color={status === "Submitted" ? "#000" : "grey.500"}
          >
            {status}
          </Box>
          <IconButton data-testid="moreButtonStandard" onClick={handleClick}>
            <MoreVertIcon />
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
    );
  }
  return (
    <ListItem data-testid="listViewCard" className={classes.listedApplication}>
      <ListItemText
        primary={description}
        secondary={`Last edited ${formatDistance(updatedAt, new Date())} ago`}
      />
      <ListItemSecondaryAction>
        <IconButton
          data-testid="moreButtonList"
          onClick={handleClick}
          color="default"
        >
          <MoreVertIcon />
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
            <ListItemText primary="Restore" />
            <CornerRightUp size={20} />
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
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ApplicationCard;
