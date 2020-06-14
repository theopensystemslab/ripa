import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import HVCenterContainer from "../components/HVCenterContainer";
import { useStore } from "../lib/store";
const useStyles = makeStyles({
    link: {
        color: "currentColor"
    }
});
const SignIn = ({ fullPage, topSpacing, title }) => {
    const [email, setEmail] = React.useState("");
    const set = useStore(state => state.set);
    const handleSubmit = e => {
        e.preventDefault();
        set(state => {
            state.data.currentUser = email;
        });
        window.location.href = "/";
    };
    const signInComponent = () => {
        return (React.createElement(Box, { py: topSpacing, maxWidth: 400 },
            title && (React.createElement(Typography, { component: "h1", variant: "h3", gutterBottom: true },
                React.createElement("strong", null, title))),
            React.createElement(Box, { pb: 2 },
                "Sign in or",
                " ",
                React.createElement("a", { href: "#", className: classes.link }, "create an account"),
                " ",
                "to get started"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement(FormControl, { fullWidth: true, margin: "normal" },
                    React.createElement(InputLabel, null, "Email Address"),
                    React.createElement(Input, { type: "email", value: email, onChange: e => setEmail(e.currentTarget.value), fullWidth: true })),
                React.createElement(FormControl, { fullWidth: true, margin: "normal" },
                    React.createElement(InputLabel, null, "Password"),
                    React.createElement(Input, { type: "password", fullWidth: true })),
                React.createElement(Box, { py: 2 },
                    React.createElement(Button, { variant: "contained", type: "submit" }, "Sign in"),
                    React.createElement(Box, { pt: 2 },
                        React.createElement("a", { href: "#", className: classes.link }, "Forgot your password?"))))));
    };
    const classes = useStyles();
    return (React.createElement(React.Fragment, null, fullPage ? (React.createElement(HVCenterContainer, { verticalCenter: true }, signInComponent())) : (signInComponent())));
};
export default SignIn;
