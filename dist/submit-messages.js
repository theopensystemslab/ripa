import Typography from "@material-ui/core/Typography";
import React from "react";
export const Messages = ({ message, type }) => {
    const renderColor = () => {
        return type === "error" ? "error" : "primary";
    };
    return (React.createElement(Typography, { gutterBottom: true, color: renderColor(), variant: "subtitle1", component: "strong" }, message));
};
export default Messages;
