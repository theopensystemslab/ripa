import Typography from "@material-ui/core/Typography";
import React from "react";

export const Messages = ({ message, type }) => {
  const renderColor = () => {
    return type == "error" ? "error" : "primary";
  };
  return (
    <Typography
      gutterBottom
      color={renderColor()}
      variant="subtitle1"
      component="strong"
    >
      {message}
    </Typography>
  );
};

export default Messages;
