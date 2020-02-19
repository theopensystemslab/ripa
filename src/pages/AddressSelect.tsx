import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

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

const AddressSelect = () => {
  const classes = useStyles();
  return (
    <Box
      minHeight={"100vh"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bgcolor="primary.main"
      color="primary.contrastText"
    >
      <Container maxWidth="md">
        <Box fontSize="h4.fontSize" fontWeight={700}>
          <InputLabel className={classes.inputLabel} id="select">
            The address of the property is
          </InputLabel>{" "}
          <InlineSelect>
            <MenuItem></MenuItem>
            <MenuItem>30 Lake Road</MenuItem>
            <MenuItem>31 Lake Road</MenuItem>
          </InlineSelect>
        </Box>
        <Box fontSize="h6.fontSize" pt={1}>
          <a href="#" className={classes.link}>
            Address not listed
          </a>
        </Box>
      </Container>
    </Box>
  );
};

export default AddressSelect;
