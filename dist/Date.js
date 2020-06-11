import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from "formik";
import * as React from "react";
import FocusWithin from "react-focus-within";
import Question from "./Question";
export const Date = ({ title, type, name, options, inputProps, includeSubmit = false }) => {
    const formik = useFormik({
        initialValues: {},
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        }
    });
    return (React.createElement(Box, { py: 4 },
        React.createElement(FocusWithin, null, ({ isFocused, getFocusProps }) => (React.createElement("form", Object.assign({ onSubmit: formik.handleSubmit }, getFocusProps()),
            React.createElement(Box, { pb: 1 },
                React.createElement(Question, { inFocus: isFocused }, title)),
            React.createElement(Grid, { container: true, spacing: 1 }, options.map((el, index) => (React.createElement(Grid, { item: true, key: `${el}-${index}` },
                React.createElement(InputLabel, { htmlFor: name }, el),
                React.createElement(Input, { required: true, id: name, onChange: formik.handleChange, type: type, name: `${name}-${el}`, inputProps: inputProps[el] }))))),
            includeSubmit && (React.createElement(Box, { pt: 3 },
                React.createElement(Button, { type: "submit", variant: "contained", color: "primary" }, "Save and Continue"))))))));
};
export default Date;
