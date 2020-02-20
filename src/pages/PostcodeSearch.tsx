import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  form: {
    height: 500,
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const PostcodeSearch = () => {
  const classes = useStyles();
  const [postcode, setPostcode] = React.useState("");

  const changePostcode = e => {
    const { value } = e.currentTarget;
    setPostcode(value.toUpperCase());
  };

  return (
    <form className={classes.form}>
      <label htmlFor="postcode">The postcode of the property is </label>
      <TextField
        id="postcode"
        autoFocus
        value={postcode}
        onChange={changePostcode}
      />
    </form>
  );
};

export default PostcodeSearch;
