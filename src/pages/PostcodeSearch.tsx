import TextField from "@material-ui/core/TextField";
import Postcode from "postcode";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";

const PostcodeSearch = ({
  handleChange = undefined,
  handleReset = undefined,
  postcode = ""
}) => {
  const [_postcode, setPostcode] = React.useState(postcode);

  const handleLocalChange = e => {
    if (handleReset) handleReset();

    const { value } = e.currentTarget;
    let pc = value.toUpperCase();

    const p = Postcode.parse(pc);

    if (p.valid) {
      pc = p.postcode;
      if (handleChange) handleChange(pc);
    }

    setPostcode(pc);
  };

  return (
    <HVCenterContainer>
      <label htmlFor="postcode">The postcode of the property is </label>
      <TextField
        id="postcode"
        autoFocus
        value={_postcode}
        onChange={handleLocalChange}
      />
    </HVCenterContainer>
  );
};

export default PostcodeSearch;
