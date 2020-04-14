import Grid from "@material-ui/core/Grid";
import React from "react";

import ResponseButton from "./ResponseButton";
import ResponseImageButton from "./ResponseImageButton";

const Response = ({
  selected = null,
  handleClick = null,
  response,
  responseKey = "A"
}) => {
  if (response.img) {
    return (
      <Grid item xs={6} sm={4} lg={3}>
        <ResponseImageButton
          key={response.id}
          selected={selected}
          handleClick={handleClick}
          responseKey={responseKey}
          image={response.img && <img src={response.img} />}
        >
          {response.text}
        </ResponseImageButton>
      </Grid>
    );
  }
  return (
    <Grid item xs={12}>
      <ResponseButton
        key={response.id}
        selected={selected}
        handleClick={handleClick}
        responseKey={responseKey}
      >
        {response.text}
      </ResponseButton>
    </Grid>
  );
};
export default Response;
