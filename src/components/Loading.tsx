import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";

const Loading = () => {
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      color="#fff"
    >
      <CircularProgress color="inherit" />
      <Box fontSize="subtitle1.fontSize" pt={2}>
        Loading...
      </Box>
    </Box>
  );
};

export default Loading;
