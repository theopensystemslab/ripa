import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Postcode from "postcode";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";
import InlineText from "../components/InlineText";

const useStyles = makeStyles({
  link: {
    color: "currentColor",
    opacity: 0.5
  },
  inputLabel: {
    fontSize: "1em",
    fontWeight: 700,
    display: "inline"
  }
});

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
  const classes = useStyles();

  return (
    <HVCenterContainer verticalCenter>
      <Box fontSize="h4.fontSize" fontWeight={700}>
        <InputLabel className={classes.inputLabel} id="postcode">
          The postcode of the property is{" "}
        </InputLabel>
        <InlineText
          id="postcode"
          autoFocus
          value={_postcode}
          onChange={handleLocalChange}
        />
      </Box>
    </HVCenterContainer>
  );
};

export default PostcodeSearch;
