import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

import HVCenterContainer from "../components/HVCenterContainer";
import InlineSelect from "../components/InlineSelect";

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

const AddressSelect = ({
  address = undefined,
  addresses = [],
  handleChange = undefined
}) => {
  const classes = useStyles();

  return (
    <HVCenterContainer verticalCenter>
      <Box fontSize="h4.fontSize" fontWeight={700}>
        <InputLabel className={classes.inputLabel} id="select">
          The address of the property is
        </InputLabel>{" "}
        <InlineSelect onChange={handleChange} value={address}>
          {addresses.map(address => {
            return (
              <MenuItem key={address.id} value={address.id}>
                {address.name}
              </MenuItem>
            );
          })}
        </InlineSelect>
      </Box>
      <Box fontSize="h6.fontSize" pt={1}>
        <a href="#" className={classes.link}>
          Address not listed
        </a>
      </Box>
    </HVCenterContainer>
  );
};

export default AddressSelect;
