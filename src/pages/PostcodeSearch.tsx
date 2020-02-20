import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";
import { useStore } from "../lib/store";

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
  const set = useStore(state => state.set);
  const _postcode = useStore(state => state.data.postcode || "");
  const [postcode, setPostcode] = React.useState(_postcode);

  const changePostcode = e => {
    const { value } = e.currentTarget;
    setPostcode(value.toUpperCase());
  };

  return (
    <HVCenterContainer>
      <form
        onSubmit={e => {
          e.preventDefault();
          set(state => {
            state.data.postcode = postcode;
          });
        }}
      >
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
