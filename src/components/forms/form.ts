import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = theme => ({
  // modal styling
  paper: {
    position: "absolute",
    width: 750,
    maxWidth: "calc(100vw - 30px)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    maxHeight: "calc(100vh - 30px)",
    display: "flex",
    flexDirection: "column"
  },
  modalHeader: {
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  },
  modalFooter: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(2),
    textAlign: "right",
    "& input[type='submit']": {
      marginLeft: "1em"
    }
  },
  // response styling
  grow: {
    flexGrow: 1
  },
  shrink: {
    flexShrink: 4
  },
  deleteIcon: {
    borderRadius: 0,
    padding: 6
  },
  // form container styling
  formContainer: {
    flex: 1,
    overflowY: "auto"
  },
  // input styling
  inputRoot: {
    backgroundColor: theme.palette.grey[100],
    transition: "background-color 0.2s ease-out",
    display: "block",
    width: "100%",
    padding: 0,
    "& + $inputRoot": {
      marginTop: theme.spacing(1)
    }
  },
  inputFocused: {
    backgroundColor: theme.palette.grey[200]
  },
  input: {
    padding: theme.spacing(1)
  },
  inputMultiline: {
    padding: theme.spacing(1),
    "&$inputRoot": {
      padding: 0
    }
  },
  // select styling
  select: {
    padding: theme.spacing(1),
    paddingRight: 24,
    backgroundColor: theme.palette.grey[100],
    "& optgroup, & option": {
      padding: theme.spacing(1)
    }
  },
  selectFocused: {
    backgroundColor: theme.palette.grey[300]
  },
  // form section styling
  formSection: {
    position: "relative"
  },
  formSectionIcon: {
    [theme.breakpoints.down("sm")]: {
      position: "static",
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 8,
      marginBottom: "-.2em"
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: 0,
      left: 0
    }
  }
});

export const useStyles = makeStyles(styles as any) as any;
