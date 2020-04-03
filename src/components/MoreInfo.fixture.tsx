import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";
import { HelpCircle } from "react-feather";

import MoreInfo from "./MoreInfo";

const MoreInfoDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Box p={3} fontSize="h6.fontSize" fontWeight="700">
        Toggle more info{" "}
        <IconButton onClick={() => setOpen(!open)}>
          <HelpCircle />
        </IconButton>
      </Box>
      <MoreInfo
        open={open}
        handleClose={() => setOpen(false)}
        content={`
  ## Why it matters

  If any part of the new extension will be visible from the front of a house, a drawing is required to assess any visual impact.

  [Town and Country Planning (Development Management Procedure)](#)

  ## How it is defined

  All drawings should be to scale (eg 1:50), which should be clearly labelled on the drawing, along with a scale bar.
  `}
      />
    </>
  );
};
export default MoreInfoDemo;
