import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const useStyles = makeStyles(theme => ({
  form: {
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
    <HVCenterContainer>
      <form className={classes.form}>
        <label htmlFor="postcode">The postcode of the property is </label>
        <TextField
          id="postcode"
          autoFocus
          value={postcode}
          onChange={changePostcode}
        />
      </form>
    </HVCenterContainer>
  );
};

export default PostcodeSearch;
