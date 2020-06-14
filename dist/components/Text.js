import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { useFormik } from "formik";
import * as React from "react";
import FocusWithin from "react-focus-within";
import Messages from "../shared/components/submit-messages";
import Question from "./Question";
export const Text = ({ title, topSpacing, label = false, fullWidth = true, placeholder = "", multiline = false, required = false, name = "", type = "", unit = "", maxWords, inputProps = {
    min: 0,
    max: Infinity
}, includeSubmit = false }) => {
    const [errorMessageVisible, setErrorMessageVisible] = React.useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const diff = maxWords - count;
    const formik = useFormik({
        initialValues: {
            [name]: ""
        },
        onSubmit: values => {
            if (diff > 0) {
                console.log(JSON.stringify(values, null, 2));
                setSuccessMessageVisible(true);
                setErrorMessageVisible(false);
            }
            else {
                setSuccessMessageVisible(false);
                setErrorMessageVisible(true);
            }
        }
    });
    return (React.createElement(FocusWithin, null, ({ isFocused, getFocusProps }) => (React.createElement("div", Object.assign({}, getFocusProps()),
        React.createElement(Box, { py: topSpacing || 4, maxWidth: 480 },
            React.createElement("form", { "data-testid": "textForm", onSubmit: formik.handleSubmit },
                title && (React.createElement(Box, { mb: 1.5 },
                    React.createElement(Question, { inFocus: isFocused }, title))),
                React.createElement(Box, null,
                    label && React.createElement(InputLabel, { htmlFor: name }, label),
                    React.createElement(Input, Object.assign({ placeholder: placeholder, fullWidth: fullWidth, multiline: multiline, name: name, id: name, type: type, onChange: e => {
                            if (maxWords) {
                                setCount(e.target.value.split(" ").length - 1);
                            }
                            formik.handleChange(e);
                        }, rows: multiline ? 5 : 1, value: formik.values[name], required: required }, inputProps)),
                    maxWords && (React.createElement(Box, { fontSize: "caption.fontSize", color: "text.secondary", pt: 1, textAlign: "right" },
                        React.createElement("span", null,
                            " ",
                            diff >= 0
                                ? `${diff} words Remaining`
                                : `0 words Remaining`,
                            " "))),
                    unit && (React.createElement(Box, { component: "span", fontSize: "caption.fontSize", style: { verticalAlign: "bottom", lineHeight: "40px" }, pl: 1.5 }, unit)),
                    React.createElement("div", null, errorMessageVisible && formik.touched ? (React.createElement(Messages, { type: "error", message: "You exceeded the max number of words allowed!" })) : null)),
                includeSubmit && (React.createElement(Button, { variant: "contained", color: "primary", type: "submit" }, "Save and Continue")),
                React.createElement("div", null, successMessageVisible ? (React.createElement(Messages, { type: "success", message: "Form submitted successfully" })) : null)))))));
};
export default Text;
